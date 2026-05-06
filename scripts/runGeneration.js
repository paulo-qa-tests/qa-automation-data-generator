/**
 * Data Generation Main Script
 * Script principal para geracao de massa de dados para testes QA
 * 
 * @module runGeneration
 * @description Ponto de entrada principal que coordena geracao, validacao e exportacao
 */

// Modulos nativos do Node.js
const fs = require('fs');           // Manipulacao de arquivos
const path = require('path');       // Manipulacao de caminhos

// Modulos customizados do projeto
const UserGenerator = require('../generators/userGenerator');       // Gerador de usuarios
const ProductGenerator = require('../generators/productGenerator'); // Gerador de produtos
const FileExporter = require('../utils/fileExporter');             // Exportador de arquivos
const Validators = require('../utils/validators');                 // Validadores

/**
 * CARREGAMENTO DE CONFIGURACAO
 * ============================================
 */

// Define o caminho completo para o arquivo de configuracao
// __dirname = diretorio atual (scripts/)
// path.join = constroi caminho cross-platform
const configPath = path.join(__dirname, '../config/settings.json');

// Le o arquivo de configuracao sincronamente (bloqueante)
// fs.readFileSync - le arquivo de uma vez
// JSON.parse - converte string JSON para objeto JavaScript
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8')).default;

/**
 * INICIALIZACAO DOS COMPONENTES
 * ============================================
 */

// Cria instancia do exportador com diretorio padrao ('data/output')
const fileExporter = new FileExporter();

// Extrai configuracoes do arquivo settings.json
// Destructuring assignment - extrai propriedades especificas do objeto config
const { seed, locale, outputFormats, usersQty, productsQty } = config;

/**
 * LOG INICIAL DA EXECUCAO
 * ============================================
 */

// Exibe informacoes de inicio da geracao
console.log('🚀 Starting data generation...');
console.log(`📊 Configuration: ${usersQty} users, ${productsQty} products`);
console.log(`📍 Locale: ${locale} | Seed: ${seed}`);

/**
 * 1. GERACAO DE USUARIOS
 * ============================================
 */

console.log('\n👥 Generating users...');

// Cria instancia do gerador de usuarios com locale e seed configurados
// Seed garante reproducao dos dados (mesma seed = mesmos dados)
const userGenerator = new UserGenerator(locale, seed);

// Gera quantidade configurada de usuarios
const users = userGenerator.generate(usersQty);

// Valida todos os usuarios gerados
// validateDataBatch aplica a funcao de validacao em cada usuario
const userValidation = Validators.validateDataBatch(users, Validators.validateUser);

// Exibe estatisticas da validacao
console.log(`✅ Generated ${users.length} users (${userValidation.validItems} valid)`);

/**
 * 2. GERACAO DE PRODUTOS
 * ============================================
 */

console.log('\n📦 Generating products...');

// Cria instancia do gerador de produtos com mesma configuracao
const productGenerator = new ProductGenerator(locale, seed);

// Gera quantidade configurada de produtos
const products = productGenerator.generate(productsQty);

// Valida todos os produtos com funcao customizada
// A funcao anonima define regras especificas para validacao de produtos
const productValidation = Validators.validateDataBatch(products, (product) => {
  const errors = [];
  
  // Regra 1: Nome do produto e obrigatorio
  if (!product.name) errors.push('Product name is required');
  
  // Regra 2: Preco nao pode ser negativo
  if (product.price < 0) errors.push('Price cannot be negative');
  
  // Retorna objeto padrao de validacao
  return { isValid: errors.length === 0, errors };
});

console.log(`✅ Generated ${products.length} products (${productValidation.validItems} valid)`);

/**
 * 3. EXPORTACAO DOS DADOS
 * ============================================
 */

console.log('\n💾 Exporting data...');

// Gera timestamp unico para os arquivos
// .toISOString() -> "2024-01-15T10:30:00.000Z"
// .replace(/[:.]/g, '-') -> "2024-01-15T10-30-00-000Z"
// Evita sobreposicao de arquivos em execucoes diferentes
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

// Itera sobre todos os formatos de saida configurados (ex: ['json', 'csv'])
for (const format of outputFormats) {
  console.log(`\n📁 Exporting to ${format.toUpperCase()} format...`);
  
  // Exporta usuarios no formato atual
  // Nome do arquivo: users_{timestamp}.{formato}
  fileExporter.export(users, `users_${timestamp}`, format);
  
  // Exporta produtos no formato atual
  // Nome do arquivo: products_{timestamp}.{formato}
  fileExporter.export(products, `products_${timestamp}`, format);
  
  /**
   * RELATORIO DE VALIDACAO (apenas JSON)
   * ============================================
   * Exporta relatorio completo apenas quando formato for JSON
   * Relatorio contem:
   * - Timestamp da execucao
   * - Resultados de validacao de usuarios e produtos
   * - Configuracoes utilizadas
   */
  if (format === 'json') {
    const validationReport = {
      timestamp: new Date().toISOString(),           // Momento do relatorio
      users: userValidation,                         // Estatisticas dos usuarios
      products: productValidation,                   // Estatisticas dos produtos
      config: config                                 // Configuracoes usadas
    };
    
    // Exporta relatorio como JSON
    // Usa metodo especifico ao inves do generico para garantir formato
    fileExporter.exportToJSON(validationReport, `validation_report_${timestamp}`);
  }
}

/**
 * FINALIZACAO E RELATORIO FINAL
 * ============================================
 */

console.log('\n✨ Data generation completed successfully!');
console.log(`📂 Output directory: ${fileExporter.outputDir}`);