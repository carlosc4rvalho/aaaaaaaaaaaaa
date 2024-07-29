const { createProduct, getProductById, getProductsByIds, getAllProducts, deleteProductsByIds, activateProductsByIds, deactivateProductsByIds } = require('../models/productModels');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const crypto = require('crypto');

const algorithm = 'aes-128-cbc';
const secretKey = crypto.randomBytes(16);

function encryptId(id) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    let encrypted = cipher.update(id.toString(), 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
}

function decryptId(encryptedId) {
    try {
        const textParts = encryptedId.split(':');
        const iv = Buffer.from(textParts.shift(), 'hex');
        const encryptedText = Buffer.from(textParts.join(':'), 'hex');
        const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
        let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    } catch (error) {
        console.error('Erro ao descriptografar o ID:', error);
        throw error;
    }
}

const storage = multer.diskStorage({
    destination: 'src/uploads/',
    filename: (req, file, cb) => {
        const imageExt = path.extname(file.originalname);
        const uniqueImageName = generateUniqueImageName(imageExt);
        cb(null, uniqueImageName);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 25 * 1024 * 1024 }
}).array('images', 10);

function generateUniqueImageName(ext) {
    const brazilTime = new Intl.DateTimeFormat('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    }).format(new Date()).replace(/[^\d]/g, '');
    return `${brazilTime}-${Math.round(Math.random() * 1E9)}${ext}`;
}

async function uploadImages(req, res) {
    upload(req, res, async (err) => {
        if (err) {
            console.error('Erro ao fazer upload dos arquivos:', err);
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(413).json({ error: 'Arquivo muito grande. O tamanho máximo permitido é 25MB.' });
            }
            return res.status(500).json({ error: 'Erro ao fazer upload dos arquivos' });
        }

        try {
            const { name, price, mileage, displacement, brakes, transmission, fuel, color, description, categoryIds } = req.body;
            const images = req.files.map(file => file.filename);
            const categories = categoryIds.split(',').map(item => parseInt(item));
                        
            const newProduct = await createProduct({
                name,
                price,
                mileage,
                displacement,
                brakes,
                transmission,
                fuel,
                color,
                description,
                product_images: {
                    create: images.map(imageName => ({ url: imageName }))
                },
                product_categories: {
                    create: categories.map(categoryId => ({ category_id: categoryId }))
                }
            });

            res.status(200).json({ message: 'Arquivos enviados com sucesso e produto criado', product: newProduct });
        } catch (error) {
            console.error('Erro ao criar produto:', error);
            res.status(500).json({ error: 'Erro ao criar produto' });
        }
    });
}

async function getProduct(req, res) {
    try {
        const encryptedId = req.params.productId;
        const decryptedId = decryptId(encryptedId);

        const productId = parseInt(decryptedId, 10);
        const product = await getProductById(productId);

        if (!product) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }

        const imageUrls = product.product_images.map(image => image.url);

        const categoryNames = product.product_categories.map(category => category.categories.name);

        const newEncryptedId = encryptId(product.id);
        product.id = newEncryptedId;

        const simplifiedProduct = {
            id: product.id,
            name: product.name,
            price: product.price,
            mileage: product.mileage,
            displacement: product.displacement,
            brakes: product.brakes,
            transmission: product.transmission,
            fuel: product.fuel,
            color: product.color,
            description: product.description,
            is_active: product.is_active,
            product_images: imageUrls,
            product_categories: categoryNames
        };

        res.status(200).json(simplifiedProduct);
    } catch (error) {
        console.error('Erro ao buscar o produto:', error);
        res.status(500).json({ error: 'Erro ao buscar o produto' });
    }
}

async function getProducts(req, res) {
    try {
        const products = await getAllProducts();

        if (!products.length) {
            return res.status(200).json({ error: 'Nenhum produto encontrado.' });
        }

        const productsWithEncryptedIds = products.map(product => {
            const encryptedId = encryptId(product.id);

            const imageUrls = product.product_images.map(image => image.url);

            const categoryNames = product.product_categories.map(category => category.categories.name);

            return {
                id: encryptedId,
                name: product.name,
                price: product.price,
                mileage: product.mileage,
                displacement: product.displacement,
                brakes: product.brakes,
                transmission: product.transmission,
                fuel: product.fuel,
                color: product.color,
                description: product.description,
                is_active: product.is_active,
                product_images: imageUrls,
                product_categories: categoryNames
            };
        });

        res.status(200).json(productsWithEncryptedIds);
    } catch (error) {
        console.error('Erro ao buscar os produtos:', error);
        res.status(500).json({ error: 'Erro ao buscar os produtos' });
    }
}

async function deleteProducts(req, res) {
    const { productIds } = req.body;

    if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
        return res.status(400).json({ error: 'Por favor, forneça uma lista válida de IDs de produtos.' });
    }

    try {
        const decryptedProductIds = productIds.map(encryptedId => decryptId(encryptedId));

        const products = await getProductsByIds(decryptedProductIds);

        if (products.length === 0) {
            return res.status(404).json({ error: 'Nenhum produto encontrado para os IDs fornecidos.' });
        }

        const deleteImagePromises = products.flatMap(product => product.product_images.map(async image => {
            const filePath = path.join(__dirname, '../uploads', image.url);
            try {
                await fs.unlink(filePath);
                return image.url;
            } catch (error) {
                return null;
            }
        }));

        await Promise.all(deleteImagePromises);

        await deleteProductsByIds(decryptedProductIds);

        res.status(200).json({ message: 'Produtos deletados com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar os produtos' });
        console.error(error);
    }
}

async function activateProducts(req, res) {
    const { productIds } = req.body;

    if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
        return res.status(400).json({ error: 'Por favor, forneça uma lista válida de IDs de produtos.' });
    }

    try {
        const decryptedProductIds = productIds.map(encryptedId => decryptId(encryptedId));

        const products = await getProductsByIds(decryptedProductIds);

        if (products.length === 0) {
            return res.status(404).json({ error: 'Nenhum produto encontrado para os IDs fornecidos.' });
        }

        await activateProductsByIds(decryptedProductIds);

        res.status(200).json({ message: 'Produtos ativados com sucesso.' });
    } catch (error) {
        console.error('Erro ao ativar os produtos:', error);
        res.status(500).json({ error: 'Erro ao ativar os produtos.' });
    }
}

async function deactivateProducts(req, res) {
    const { productIds } = req.body;

    if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
        return res.status(400).json({ error: 'Por favor, forneça uma lista válida de IDs de produtos.' });
    }

    try {
        const decryptedProductIds = productIds.map(encryptedId => decryptId(encryptedId));

        const products = await getProductsByIds(decryptedProductIds);

        if (products.length === 0) {
            return res.status(404).json({ error: 'Nenhum produto encontrado para os IDs fornecidos.' });
        }

        await deactivateProductsByIds(decryptedProductIds); // Corrigido para chamar a função correta

        res.status(200).json({ message: 'Produtos desativados com sucesso.' });
    } catch (error) {
        console.error('Erro ao desativar os produtos:', error);
        res.status(500).json({ error: 'Erro ao desativar os produtos.' });
    }
}

module.exports = {
    uploadImages,
    getProduct,
    getProducts,
    deleteProducts,
    activateProducts,
    deactivateProducts
};