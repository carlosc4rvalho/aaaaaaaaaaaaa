const express = require('express');
const productRoutes = require('../routes/routes.js');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

// Rota para os endpoints relacionados aos produtos
app.use('/api', productRoutes);

// Servindo arquivos estáticos na rota '/api/uploads'
app.use('/api/uploads', express.static(path.join(__dirname, '..', 'uploads')));

module.exports = app;