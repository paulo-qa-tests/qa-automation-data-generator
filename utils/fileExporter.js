/**
 * File Exporter Module
 * Modulo para exportacao de dados em diferentes formatos (JSON, CSV, SQL)
 * 
 * @module FileExporter
 * @requires fs
 * @requires path
 */

// Importa modulo nativo do Node.js para manipulacao de arquivos
const fs = require('fs');

// Importa modulo nativo do Node.js para manipulacao de caminhos de arquivos
const path = require('path');

/**
 * Classe responsavel por exportar dados gerados para arquivos em diferentes formatos
 * 
 * @class FileExporter
 * @example
 * const exporter = new FileExporter('data/output');
 * exporter.export(users, 'users', 'json');
 * exporter.export(products, 'products', 'csv');
 * exporter.export(orders, 'pedidos', 'sql');
 */
class FileExporter {
  
  /**
   * Cria uma instancia do exportador de arquivos
   * 
   * @constructor
   * @param {string} outputDir - Diretorio onde os arquivos serao salvos (padrao: 'data/output')
   */
  constructor(outputDir = 'data/output') {
    // Define o diretorio de saida
    this.outputDir = outputDir;
    
    // Garante que o diretorio existe ao criar a instancia
    this.ensureDirectoryExists();
  }

  /**
   * Verifica se o diretorio de saida existe, se nao existir, cria recursivamente
   * 
   * @method ensureDirectoryExists
   * @returns {void}
   */
  ensureDirectoryExists() {
    // Verifica se o diretorio ja existe
    if (!fs.existsSync(this.outputDir)) {
      // Cria o diretorio recursivamente (cria pastas aninhadas se necessario)
      // recursive: true permite criar caminhos como 'data/output/teste'
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  /**
   * Exporta dados para o formato JSON
   * 
   * @method exportToJSON
   * @param {Array|Object} data - Dados a serem exportados
   * @param {string} filename - Nome do arquivo (sem extensao)
   * @returns {string} Caminho completo do arquivo gerado
   * 
   * @example
   * exporter.exportToJSON(users, 'usuarios');
   * // Gera: data/output/usuarios.json
   */
  exportToJSON(data, filename) {
    // Constrói o caminho completo do arquivo com extensao .json
    const filepath = path.join(this.outputDir, `${filename}.json`);
    
    // Escreve o arquivo JSON com indentacao de 2 espacos e encoding UTF-8
    // JSON.stringify(data, null, 2) - formata JSON de forma legivel
    fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf-8');
    
    // Log informativo usando emojis para melhor visualizacao
    console.log(`✅ JSON exported: ${filepath}`);
    
    return filepath;
  }

  /**
   * Exporta dados para o formato CSV (Comma Separated Values)
   * 
   * @method exportToCSV
   * @param {Array<Object>} data - Array de objetos a serem exportados
   * @param {string} filename - Nome do arquivo (sem extensao)
   * @returns {string|null} Caminho do arquivo gerado ou null se sem dados
   * 
   * @description
   * Recursos implementados:
   * - Escrita de cabecalhos baseados nas chaves dos objetos
   * - Tratamento de dados aninhados (objetos e arrays)
   * - Escape de caracteres especiais (virgulas, aspas, quebras de linha)
   * - Formatacao de datas para ISO string
   * 
   * @example
   * exporter.exportToCSV(products, 'produtos');
   * // Gera: data/output/produtos.csv
   */
  exportToCSV(data, filename) {
    // Valida se os dados existem e nao estao vazios
    if (!data || data.length === 0) {
      console.warn(`⚠️  No data to export to CSV: ${filename}`);
      return null;
    }

    // Obtem as chaves do primeiro objeto como cabecalhos das colunas
    const headers = Object.keys(data[0]);
    const csvRows = [];
    
    // Adiciona linha de cabecalhos
    csvRows.push(headers.join(','));
    
    // Adiciona linhas de dados
    for (const row of data) {
      // Mapeia cada cabecalho para seu respectivo valor
      const values = headers.map(header => {
        const value = row[header];
        
        // Tratamento de valores nulos ou indefinidos
        if (value === null || value === undefined) return '';
        
        // Converte datas para formato ISO string entre aspas
        if (value instanceof Date) return `"${value.toISOString()}"`;
        
        // Converte objetos complexos para JSON string e escapa aspas
        if (typeof value === 'object') {
          return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
        }
        
        // Escapa strings que contem caracteres especiais
        const stringValue = String(value);
        if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
          return `"${stringValue.replace(/"/g, '""')}"`;
        }
        
        return stringValue;
      });
      csvRows.push(values.join(','));
    }
    
    // Constrói caminho do arquivo e escreve no disco
    const filepath = path.join(this.outputDir, `${filename}.csv`);
    fs.writeFileSync(filepath, csvRows.join('\n'), 'utf-8');
    
    console.log(`✅ CSV exported: ${filepath}`);
    return filepath;
  }

  /**
   * Exporta dados para o formato SQL (INSERT statements)
   * 
   * @method exportToSQL
   * @param {Array<Object>} data - Array de objetos a serem exportados
   * @param {string} tableName - Nome da tabela no banco de dados
   * @param {string} filename - Nome do arquivo (sem extensao)
   * @returns {string|null} Caminho do arquivo gerado ou null se sem dados
   * 
   * @description
   * Gera comandos INSERT para cada registro no formato:
   * INSERT INTO tabela (col1, col2) VALUES (val1, val2);
   * 
   * @example
   * exporter.exportToSQL(users, 'usuarios', 'insert_users');
   * // Gera: data/output/insert_users.sql
   * // Conteudo: INSERT INTO usuarios (id, name) VALUES (1, 'Joao');
   */
  exportToSQL(data, tableName, filename) {
    // Valida se os dados existem e nao estao vazios
    if (!data || data.length === 0) {
      console.warn(`⚠️  No data to export to SQL: ${tableName}`);
      return null;
    }

    // Obtem as colunas a partir das chaves do primeiro objeto
    const columns = Object.keys(data[0]);
    const inserts = [];
    
    // Gera um comando INSERT para cada registro
    for (const row of data) {
      // Mapeia valores, tratando tipos especiais
      const values = columns.map(col => {
        const value = row[col];
        
        // NULL para valores nulos ou indefinidos
        if (value === null || value === undefined) return 'NULL';
        
        // Strings devem estar entre aspas simples e com escape
        if (typeof value === 'string') {
          return `'${value.replace(/'/g, "''")}'`;
        }
        
        // Datas convertidas para ISO string entre aspas
        if (value instanceof Date) return `'${value.toISOString()}'`;
        
        // Objetos convertidos para JSON string com escape
        if (typeof value === 'object') {
          return `'${JSON.stringify(value).replace(/'/g, "''")}'`;
        }
        
        // Numeros e booleanos sao inseridos diretamente
        return value;
      });
      
      // Monta o comando INSERT completo
      inserts.push(`INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${values.join(', ')});`);
    }
    
    // Constrói caminho do arquivo e escreve no disco
    const filepath = path.join(this.outputDir, `${filename}.sql`);
    fs.writeFileSync(filepath, inserts.join('\n'), 'utf-8');
    
    console.log(`✅ SQL exported: ${filepath}`);
    return filepath;
  }

  /**
   * Metodo generico para exportar dados baseado no formato especificado
   * 
   * @method export
   * @param {Array|Object} data - Dados a serem exportados
   * @param {string} filename - Nome base do arquivo (sem extensao)
   * @param {string} format - Formato de saida ('json', 'csv', 'sql')
   * @returns {string|null} Caminho do arquivo gerado ou null se formato invalido
   * 
   * @example
   * // Exporta usuarios como JSON
   * exporter.export(users, 'usuarios', 'json');
   * 
   * // Exporta produtos como CSV
   * exporter.export(products, 'produtos', 'csv');
   * 
   * // Exporta pedidos como SQL
   * exporter.export(orders, 'pedidos', 'sql');
   */
  export(data, filename, format) {
    // Converte formato para lowercase para comparacao case-insensitive
    switch(format.toLowerCase()) {
      case 'json':
        return this.exportToJSON(data, filename);
      case 'csv':
        return this.exportToCSV(data, filename);
      case 'sql':
        // Para SQL, usa o filename como nome da tabela e arquivo
        return this.exportToSQL(data, filename, filename);
      default:
        // Formato nao suportado
        console.error(`❌ Unsupported format: ${format}`);
        return null;
    }
  }
}

// Exporta a classe para uso em outros modulos
module.exports = FileExporter;