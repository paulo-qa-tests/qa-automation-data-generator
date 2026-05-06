/**
 * User Generator Module
 * Gerador de dados falsos para usuarios com suporte a localizacao e semente aleatoria
 * 
 * @module UserGenerator
 * @requires @faker-js/faker
 */

// Importa o Faker.js - biblioteca para geracao de dados falsos realistas
// locale pt_BR para dados em portugues do Brasil
const { faker } = require('@faker-js/faker');

/**
 * Classe responsavel por gerar dados de usuarios para testes QA
 * 
 * @class UserGenerator
 * @example
 * const userGen = new UserGenerator('pt_BR', 12345);
 * const users = userGen.generate(10);
 * const singleUser = userGen.generateOne();
 */
class UserGenerator {
  
  /**
   * Cria uma instancia do gerador de usuarios
   * 
   * @constructor
   * @param {string} locale - Localizacao dos dados (ex: 'pt_BR', 'en_US')
   * @param {number|null} seed - Semente para reproducao dos dados (mesmo seed = mesmos dados)
   */
  constructor(locale = 'pt_BR', seed = null) {
    // Se uma semente for fornecida, aplica para garantir reproducao dos dados
    // Util para testes deterministicos
    if (seed !== null) {
      faker.seed(seed);
    }
    
    // Armazena a instancia do faker e a localizacao para uso nos metodos
    this.faker = faker;
    this.locale = locale;
  }

  /**
   * Gera uma lista de usuarios falsos
   * 
   * @param {number} quantity - Quantidade de usuarios a serem gerados (padrao: 1)
   * @returns {Array<Object>} Array de objetos contendo dados dos usuarios
   * 
   * @property {number} id - ID numerico unico (1000-9999)
   * @property {string} name - Nome completo do usuario
   * @property {string} email - E-mail valido
   * @property {string} phone - Numero de telefone
   * @property {string} address - Endereco residencial
   * @property {string} city - Cidade
   * @property {string} state - Estado
   * @property {string} zipCode - Codigo postal (CEP)
   * @property {Date} birthDate - Data de nascimento (idade entre 18-80 anos)
   * @property {boolean} isActive - Status de atividade
   * @property {Date} createdAt - Data de criacao do registro
   * 
   * @example
   * const userGen = new UserGenerator();
   * const usuarios = userGen.generate(5);
   * console.log(usuarios[0].name); // "Ana Silva"
   */
  generate(quantity = 1) {
    const users = [];
    
    // Loop para gerar a quantidade solicitada de usuarios
    for (let i = 0; i < quantity; i++) {
      users.push({
        // ID numerico aleatorio entre 1000 e 9999
        id: this.faker.number.int({ min: 1000, max: 9999 }),
        
        // Nome completo com suporte ao locale configurado
        name: this.faker.person.fullName(),
        
        // E-mail gerado baseado no nome e dominio aleatorio
        email: this.faker.internet.email(),
        
        // Numero de telefone no formato do locale
        phone: this.faker.phone.number(),
        
        // Endereco residencial (rua + numero)
        address: this.faker.location.streetAddress(),
        
        // Cidade (suporte ao locale)
        city: this.faker.location.city(),
        
        // Estado (suporte ao locale)
        state: this.faker.location.state(),
        
        // Codigo postal (CEP para Brasil)
        zipCode: this.faker.location.zipCode(),
        
        // Data de nascimento com idade entre 18 e 80 anos
        birthDate: this.faker.date.birthdate({ min: 18, max: 80, mode: 'age' }),
        
        // Status de atividade (true/false aleatorio)
        isActive: this.faker.datatype.boolean(),
        
        // Data de criacao em algum momento no passado
        createdAt: this.faker.date.past()
      });
    }
    
    return users;
  }

  /**
   * Gera um unico usuario (metodo de conveniencia)
   * 
   * @returns {Object} Objeto com dados de um usuario
   * @see {@link module:UserGenerator#generate}
   * 
   * @example
   * const userGen = new UserGenerator();
   * const usuario = userGen.generateOne();
   * console.log(usuario.name, usuario.email);
   */
  generateOne() {
    // Reutiliza o metodo generate para criar um unico usuario
    // Retorna o primeiro elemento do array
    return this.generate(1)[0];
  }
}

// Exporta a classe para uso em outros modulos
module.exports = UserGenerator;