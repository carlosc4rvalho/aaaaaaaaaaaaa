const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createProduct(data) {
    return prisma.products.create({
        data,
        include: {
            product_images: true,
            product_categories: true
        }
    });
}

async function getProductById(productId) {
    return prisma.products.findUnique({
        where: { id: parseInt(productId, 10) },
        include: {
            product_images: true,
            product_categories: {
                include: {
                    categories: true
                }
            }
        }
    });
}

async function getProductsByIds(productIds) {
    return prisma.products.findMany({
        where: { id: { in: productIds.map(id => parseInt(id, 10)) } },
        include: {
            product_images: true,
            product_categories: {
                include: {
                    categories: true
                }
            }
        }
    });
}

async function getAllProducts() {
    return prisma.products.findMany({
        include: {
            product_images: true,
            product_categories: {
                include: {
                    categories: true
                }
            }
        }
    });
}

async function deleteProductsByIds(productIds) {
    return prisma.products.deleteMany({
        where: {
            id: { in: productIds.map(id => parseInt(id, 10)) }
        }
    });
}

async function activateProductsByIds(productIds) {
    console.log("Ativando produtos com IDs:", productIds);
    return prisma.products.updateMany({
        where: { id: { in: productIds.map(id => parseInt(id, 10)) } },
        data: { is_active: true }
    });
}

async function deactivateProductsByIds(productIds) {
    console.log("Desativando produtos com IDs:", productIds);
    return prisma.products.updateMany({
        where: { id: { in: productIds.map(id => parseInt(id, 10)) } },
        data: { is_active: false }
    });
}

module.exports = {
    createProduct,
    getProductById,
    getProductsByIds,
    getAllProducts,
    deleteProductsByIds,
    activateProductsByIds,
    deactivateProductsByIds
};