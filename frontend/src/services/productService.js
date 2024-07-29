import axios from 'axios'

const BASE_URL = 'https://bacanamotors.com.br/api/'

const productService = {
  createProduct: async (formData, images) => {
    const data = new FormData()
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key])
    })
    for (let i = 0; i < images.length; i++) {
      data.append('images', images[i])
    }

    try {
      const response = await axios.post(`${BASE_URL}upload`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data
    } catch (error) {
      console.error('Erro ao criar produto:', error)
      throw error
    }
  },

  getProducts: async () => {
    try {
      const response = await axios.get(`${BASE_URL}products`)
      return response.data
    } catch (error) {
      console.error('Erro ao buscar produtos:', error)
      throw error
    }
  },

  getProductById: async (productId) => {
    try {
      const response = await axios.get(`${BASE_URL}products/${productId}`)
      return response.data
    } catch (error) {
      console.error(`Erro ao buscar produto com ID ${productId}:`, error)
      throw error
    }
  },

  deleteProducts: async (productIds) => {
    try {
      const response = await axios.delete(`${BASE_URL}products/delete`, {
        data: { productIds },
      })
      return response.data
    } catch (error) {
      console.error('Erro ao deletar produtos:', error)
      throw error
    }
  },

  activateProducts: async (productIds) => {
    try {
      const response = await axios.put(`${BASE_URL}products/activate`, { productIds })
      return response.data
    } catch (error) {
      console.error('Erro ao ativar produtos:', error)
      throw error
    }
  },

  deactivateProducts: async (productIds) => {
    try {
      const response = await axios.put(`${BASE_URL}products/deactivate`, { productIds })
      return response.data
    } catch (error) {
      console.error('Erro ao desativar produtos:', error)
      throw error
    }
  },
}

export default productService
