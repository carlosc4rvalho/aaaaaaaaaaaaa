const express = require('express');
const { 
    uploadImages, 
    getProduct, 
    getProducts, 
    deleteProducts, 
    activateProducts,
    deactivateProducts
} = require('../controllers/productController.js');

const router = express.Router();

// Rota para upload de imagens e criação de products
router.post('/upload', uploadImages);

// Rota para obter um products por ID
router.get('/products/:productId', getProduct);

// Rota para obter todos os productss
router.get('/products', getProducts);

// Rota para deletar productss por uma lista de IDs
router.delete('/products/delete', deleteProducts);

// Rota para ativar productss
router.put('/products/activate', activateProducts);

// Rota para desativar productss
router.put('/products/deactivate', deactivateProducts);

module.exports = router;