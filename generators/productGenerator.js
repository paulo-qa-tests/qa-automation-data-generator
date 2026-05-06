/**
 * Product Generator Module
 * Gerador de dados falsos para produtos com suporte a categorias e precos
 * 
 * @module ProductGenerator
 * @requires @faker-js/faker
 */

// Importa o Faker.js - biblioteca para geracao de dados falsos realistas
const { faker } = require('@faker-js/faker');

/**
 * Classe responsavel por gerar dados de produtos para testes QA
 * 
 * @class ProductGenerator
 * @example
 * const productGen = new ProductGenerator('pt_BR', 12345);
 * const products = productGen.generate(20);
 * const singleProduct = productGen.generate(1)[0];
 */
class ProductGenerator {
  
  /**
   * Cria uma instancia do gerador de produtos
   * 
   * @constructor
   * @param {string} locale - Localizacao dos dados (ex: 'pt_BR', 'en_US')
   * @param {number|null} seed - Semente para reproducao dos dados (mesmo seed = mesmos dados)
   */
  constructor(locale = 'pt_BR', seed = null) {
    // Aplica semente se fornecida para garantir reproducao dos dados
    // Util para testes deterministicos e debugging
    if (seed !== null) {
      faker.seed(seed);
    }
    
    // Armazena a instancia do faker e a localizacao
    this.faker = faker;
    this.locale = locale;
  }

  /**
   * Gera uma lista de produtos falsos
   * 
   * @param {number} quantity - Quantidade de produtos a serem gerados (padrao: 1)
   * @returns {Array<Object>} Array de objetos contendo dados dos produtos
   * 
   * @property {string} id - UUID unico do produto
   * @property {string} name - Nome do produto
   * @property {string} description - Descricao detalhada do produto
   * @property {number} price - Preco do produto (entre R$10 e R$1000)
   * @property {string} category - Categoria do produto (Eletronicos, Roupas, etc)
   * @property {string} sku - Codigo SKU unico (8 caracteres alfanumericos)
   * @property {number} stock - Quantidade em estoque (0-500 unidades)
   * @property {number} rating - Avaliacao do produto (0-5 estrelas)
   * @property {boolean} isAvailable - Disponibilidade para venda
   * @property {Date} createdAt - Data de criacao do registro
   * 
   * @example
   * const productGen = new ProductGenerator();
   * const produtos = productGen.generate(3);
   * console.log(produtos[0].name); // "Smartphone X2000"
   * console.log(produtos[0].price); // 599.99
   */
  generate(quantity = 1) {
    const products = [];
    
    // Lista predefinida de categorias de produtos
    const categories = ['Eletronicos', 'Roupas', 'Alimentos', 'Livros', 'Esportes'];
    
    // Loop para gerar a quantidade solicitada de produtos
    for (let i = 0; i < quantity; i++) {
      products.push({
        // ID unico universal (UUID v4)
        id: this.faker.string.uuid(),
        
        // Nome do produto gerado pelo commerce module
        name: this.faker.commerce.productName(),
        
        // Descricao detalhada do produto
        description: this.faker.commerce.productDescription(),
        
        // Preco entre R$10 e R$1000, convertido para numero com 2 decimais
        price: parseFloat(this.faker.commerce.price({ min: 10, max: 1000 })),
        
        // Seleciona uma categoria aleatoria da lista predefinida
        category: this.faker.helpers.arrayElement(categories),
        
        // SKU (Stock Keeping Unit) - 8 caracteres alfanumericos em maiusculo
        sku: this.faker.string.alphanumeric(8).toUpperCase(),
        
        // Quantidade em estoque (0 a 500 unidades)
        stock: this.faker.number.int({ min: 0, max: 500 }),
        
        // Avaliacao de 0 a 5 estrelas com 1 casa decimal
        rating: this.faker.number.float({ min: 0, max: 5, multipleOf: 0.1 }),
        
        // Status de disponibilidade (true/false aleatorio)
        isAvailable: this.faker.datatype.boolean(),
        
        // Data de criacao em algum momento no passado
        createdAt: this.faker.date.past()
      });
    }
    
    return products;
  }
}

// Exporta a classe para uso em outros modulos
module.exports = ProductGenerator;

