/**
 * @file jsonplaceholder.test.js
 * @description Testes de API para o JSONPlaceholder usando Jest.
 * Este arquivo contém exemplos de testes para os endpoints de posts.
 */

const axios = require('axios');

const BASE_URL = 'https://jsonplaceholder.typicode.com';

describe('JSONPlaceholder API - Posts Endpoint', () => {
  /**
   * @test GET /posts - Deve retornar todos os posts com status 200
   */
  test('GET /posts - should return all posts with status 200', async () => {
    const response = await axios.get(`${BASE_URL}/posts`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data.length).toBeGreaterThan(0);
  });

  /**
   * @test GET /posts/1 - Deve retornar um post específico com status 200
   */
  test('GET /posts/1 - should return a specific post with status 200', async () => {
    const postId = 1;
    const response = await axios.get(`${BASE_URL}/posts/${postId}`);
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('id', postId);
    expect(response.data).toHaveProperty('title');
    expect(response.data).toHaveProperty('body');
    expect(response.data).toHaveProperty('userId');
  });

  /**
   * @test POST /posts - Deve criar um novo post com status 201
   */
  test('POST /posts - should create a new post with status 201', async () => {
    const newPost = {
      title: 'foo',
      body: 'bar',
      userId: 1,
    };
    const response = await axios.post(`${BASE_URL}/posts`, newPost);
    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty('id');
    expect(response.data).toHaveProperty('title', newPost.title);
    expect(response.data).toHaveProperty('body', newPost.body);
    expect(response.data).toHaveProperty('userId', newPost.userId);
  });

  /**
   * @test PUT /posts/1 - Deve atualizar um post existente com status 200
   */
  test('PUT /posts/1 - should update an existing post with status 200', async () => {
    const postId = 1;
    const updatedPost = {
      id: postId,
      title: 'updated title',
      body: 'updated body',
      userId: 1,
    };
    const response = await axios.put(`${BASE_URL}/posts/${postId}`, updatedPost);
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('id', postId);
    expect(response.data).toHaveProperty('title', updatedPost.title);
    expect(response.data).toHaveProperty('body', updatedPost.body);
  });

  /**
   * @test DELETE /posts/1 - Deve deletar um post existente com status 200
   */
  test('DELETE /posts/1 - should delete an existing post with status 200', async () => {
    const postId = 1;
    const response = await axios.delete(`${BASE_URL}/posts/${postId}`);
    expect(response.status).toBe(200);
    expect(response.data).toEqual({}); // JSONPlaceholder retorna um objeto vazio para DELETE
  });
});
