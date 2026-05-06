/**
 * Validators Module
 * Modulo de validacao para dados de usuarios, produtos e batches
 * 
 * @module Validators
 */

class Validators {
  /**
   * Valida formato de email
   * @param {string} email - Email a ser validado
   * @returns {boolean}
   */
  static validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Valida formato de telefone
   * @param {string} phone - Telefone a ser validado
   * @returns {boolean}
   */
  static validatePhone(phone) {
    const phoneRegex = /^[\+\d\s\(\)-]{10,}$/;
    return phoneRegex.test(phone);
  }

  /**
   * Valida objeto de usuario
   * @param {Object} user - Dados do usuario
   * @returns {Object} { isValid, errors }
   */
  static validateUser(user) {
    const errors = [];
    
    // Validacao do nome
    if (!user.name || user.name.length < 3) {
      errors.push('Name must have at least 3 characters');
    }
    
    // CORRIGIDO: Usar Validators.validateEmail em vez de this.validateEmail
    if (!Validators.validateEmail(user.email)) {
      errors.push(`Invalid email: ${user.email}`);
    }
    
    // Validacao do preco (opcional)
    if (user.price && (user.price < 0 || user.price > 10000)) {
      errors.push(`Invalid price: ${user.price}`);
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Valida lote de dados
   * @param {Array} data - Array de dados
   * @param {Function} validatorFn - Funcao de validacao
   * @returns {Object} Estatisticas da validacao
   */
  static validateDataBatch(data, validatorFn) {
    const results = data.map((item, index) => ({
      index,
      ...validatorFn(item)
    }));
    
    const invalidItems = results.filter(r => !r.isValid);
    
    if (invalidItems.length > 0) {
      console.warn(`⚠️  Found ${invalidItems.length} invalid items out of ${data.length}`);
      invalidItems.forEach(item => {
        console.warn(`  Item ${item.index}: ${item.errors.join(', ')}`);
      });
    }
    
    return {
      totalItems: data.length,
      validItems: data.length - invalidItems.length,
      invalidItems: invalidItems.length,
      details: results
    };
  }
}

module.exports = Validators;