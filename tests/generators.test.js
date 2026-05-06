/**
 * Generators Test Suite
 * Suite de testes para os geradores de dados (usuarios e produtos)
 * 
 * @module generators.test
 * @description Testa a funcionalidade e integridade dos geradores de massa de dados
 */

/**
 * IMPORTACAO DOS MODULOS
 * ============================================
 * Importa as classes e utilitarios necessarios para os testes
 */

// Gerador de usuarios - sera testado
const UserGenerator = require('../generators/userGenerator');

// Gerador de produtos - sera testado
const ProductGenerator = require('../generators/productGenerator');

// Utilitarios de validacao - usado para verificar dados gerados
const Validators = require('../utils/validators');

/**
 * SUITE DE TESTES: UserGenerator
 * ============================================
 * Agrupa todos os testes relacionados ao gerador de usuarios
 * 
 * @describe UserGenerator
 */
describe('UserGenerator', () => {
  // Variavel que armazena a instancia do gerador para cada teste
  let userGenerator;
  
  /**
   * HOOK beforeEach
   * Executado antes de CADA teste individual
   * Garante que cada teste comeca com uma instancia nova e limpa
   * 
   * @hook
   */
  beforeEach(() => {
    // Cria nova instancia do gerador antes de cada teste
    // Locale: pt_BR (dados em portugues do Brasil)
    // Seed: 42 (garante reproducao nos testes)
    userGenerator = new UserGenerator('pt_BR', 42);
  });
  
  /**
   * TESTE 1: Estrutura do Usuario
   * Verifica se o objeto gerado possui todas as propriedades esperadas
   * 
   * @test
   */
  test('should generate user with correct structure', () => {
    // Gera um unico usuario usando metodo de conveniencia
    const user = userGenerator.generateOne();
    
    // Verifica existencia de propriedades obrigatorias
    // expect().toHaveProperty() - verifica se a propriedade existe no objeto
    expect(user).toHaveProperty('id');        // ID numerico
    expect(user).toHaveProperty('name');      // Nome completo
    expect(user).toHaveProperty('email');     // Endereco de email
    expect(user).toHaveProperty('phone');     // Numero de telefone
    expect(user).toHaveProperty('address');   // Endereco residencial
  });
  
  /**
   * TESTE 2: Geracao Multipla
   * Verifica se o metodo generate() cria a quantidade correta de usuarios
   * 
   * @test
   */
  test('should generate multiple users', () => {
    // Solicita geracao de 5 usuarios
    const users = userGenerator.generate(5);
    
    // Verifica se o array retornado tem exatamente 5 elementos
    // toHaveLength() - verifica o tamanho do array
    expect(users).toHaveLength(5);
  });
  
  /**
   * TESTE 3: Validacao de Email
   * Verifica se os emails gerados sao validos
   * Utiliza o modulo Validators para confirmar o formato
   * 
   * @test
   */
  test('should generate valid email', () => {
    // Gera um usuario
    const user = userGenerator.generateOne();
    
    // Valida o email usando o modulo de validacao
    // toBe(true) - verifica se o retorno e exatamente true
    expect(Validators.validateEmail(user.email)).toBe(true);
  });
});

/**
 * SUITE DE TESTES: ProductGenerator
 * ============================================
 * Agrupa todos os testes relacionados ao gerador de produtos
 * 
 * @describe ProductGenerator
 */
describe('ProductGenerator', () => {
  // Variavel que armazena a instancia do gerador para cada teste
  let productGenerator;
  
  /**
   * HOOK beforeEach
   * Executado antes de CADA teste individual
   * 
   * @hook
   */
  beforeEach(() => {
    // Cria nova instancia do gerador
    // Usa mesma configuracao do gerador de usuarios para consistencia
    productGenerator = new ProductGenerator('pt_BR', 42);
  });
  
  /**
   * TESTE 1: Validacao de Preco
   * Verifica se os precos gerados estao dentro do intervalo esperado
   * 
   * @test
   */
  test('should generate product with valid price', () => {
    // Gera 1 produto (retorna array com 1 elemento)
    const products = productGenerator.generate(1);
    
    // Verifica se o preco e maior que 0 (positivo)
    // toBeGreaterThan() - verifica se valor > limite
    expect(products[0].price).toBeGreaterThan(0);
    
    // Verifica se o preco e menor que 1000
    // toBeLessThan() - verifica se valor < limite
    expect(products[0].price).toBeLessThan(1000);
  });
  
  /**
   * TESTE 2: Unicidade dos IDs
   * Verifica se todos os produtos gerados possuem IDs unicos
   * Importante para integridade referencial
   * 
   * @test
   */
  test('should generate products with unique IDs', () => {
    // Gera 10 produtos
    const products = productGenerator.generate(10);
    
    // Extrai apenas os IDs dos produtos
    const ids = products.map(p => p.id);
    
    // Cria um Set (estrutura que so aceita valores unicos)
    const uniqueIds = new Set(ids);
    
    // Verifica se o tamanho do Set e igual ao tamanho do array original
    // Se todos IDs forem unicos, os tamanhos serao iguais
    expect(uniqueIds.size).toBe(ids.length);
  });
});

/**
 * TESTES ADICIONAIS (Exemplos - nao inclusos no codigo original)
 * ============================================
 * 
 * Estes sao exemplos de testes que poderiam ser adicionados:
 * 
 * @example
 * // Teste de reproducibilidade com seed
 * test('same seed generates same data', () => {
 *   const gen1 = new UserGenerator('pt_BR', 123);
 *   const gen2 = new UserGenerator('pt_BR', 123);
 *   
 *   const user1 = gen1.generateOne();
 *   const user2 = gen2.generateOne();
 *   
 *   expect(user1).toEqual(user2);
 * });
 * 
 * @example
 * // Teste de performance
 * test('should generate 1000 users quickly', () => {
 *   const startTime = Date.now();
 *   const users = userGenerator.generate(1000);
 *   const endTime = Date.now();
 *   
 *   expect(users).toHaveLength(1000);
 *   expect(endTime - startTime).toBeLessThan(1000); // menos de 1 segundo
 * });
 * 
 * @example
 * // Teste de validacao de telefone
 * test('should generate valid phone number', () => {
 *   const user = userGenerator.generateOne();
 *   expect(Validators.validatePhone(user.phone)).toBe(true);
 * });
 */