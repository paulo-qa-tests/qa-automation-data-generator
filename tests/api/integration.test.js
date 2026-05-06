/**
 * @file integration.test.js
 * @description Testes de integração entre o Gerador de Massa de Dados e a API JSONPlaceholder.
 * Este arquivo demonstra como usar os dados gerados dinamicamente para alimentar testes de API.
 * 
 * @requires axios
 * @requires ../../generators/userGenerator
 */

const axios = require('axios');
const UserGenerator = require('../../generators/userGenerator');

const BASE_URL = 'https://jsonplaceholder.typicode.com';

describe('Integração: Gerador de Massa -> JSONPlaceholder API', () => {
  let userGenerator;

  /**
   * Configuração inicial antes de rodar os testes
   */
  beforeAll(() => {
    // Inicializa o gerador com locale pt_BR e uma semente fixa para reprodutibilidade
    userGenerator = new UserGenerator('pt_BR', 42);
  });

  /**
   * @test POST /users - Deve criar um usuário usando dados gerados pelo UserGenerator
   */
  test('POST /users - should create a user with generated data', async () => {
    // 1. Gera um usuário fake usando a classe do projeto base
    const fakeUser = userGenerator.generateOne();
    
    // 2. Prepara o payload para a API (mapeando campos se necessário)
    const payload = {
      name: fakeUser.name,
      username: fakeUser.name.split(' ')[0].toLowerCase(),
      email: fakeUser.email,
      address: {
        street: fakeUser.address,
        city: fakeUser.city,
        zipcode: fakeUser.zipCode,
      },
      phone: fakeUser.phone,
      website: 'manus.im',
      company: {
        name: 'Manus AI',
        catchPhrase: 'The future of AI agents',
        bs: 'automation'
      }
    };

    // 3. Envia a requisição para a API
    const response = await axios.post(`${BASE_URL}/users`, payload);

    // 4. Validações (Assertions)
    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty('id');
    expect(response.data.name).toBe(payload.name);
    expect(response.data.email).toBe(payload.email);
    
    console.log(`Usuário criado com sucesso: ${response.data.name} (ID: ${response.data.id})`);
  });

  /**
   * @test POST /posts - Deve criar um post associado a um usuário gerado
   */
  test('POST /posts - should create a post for a generated user context', async () => {
    const fakeUser = userGenerator.generateOne();
    
    const postPayload = {
      title: `Post de ${fakeUser.name}`,
      body: `Conteúdo gerado para o usuário que mora em ${fakeUser.city}`,
      userId: fakeUser.id // Usando o ID gerado (mesmo que a API aceite qualquer um)
    };

    const response = await axios.post(`${BASE_URL}/posts`, postPayload);

    expect(response.status).toBe(201);
    expect(response.data.title).toContain(fakeUser.name);
    expect(response.data.userId).toBe(fakeUser.id);
  });
});
