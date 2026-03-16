const request = require('supertest');
const app = require('../index');

describe('Pruebas Unitarias - Módulo de Productos', () => {

    test('Debe obtener la lista de productos correctamente', async () => {
        const response = await request(app).get('/api/productos');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toBeGreaterThan(0);
    });
});