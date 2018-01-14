const request = require('supertest');
const server = require('../server.js');

describe('test root path', () => {
  it('should respond to GET', () => {
    request(server).get('/').then(response => {
      return expect(response.statusCode).toBe(200);
    });
  });

  it('should assert once', () => {
    request(server).get('/').then(response => {
      return expect.assertions(1);
    });
  });

  it('should return users', () => {
    request(server).get('/').then(response => {
      return expect(response).toContain('donkey');
    });
  });
});
