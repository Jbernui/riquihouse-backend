const request = require('supertest');
const app = require('../index');

describe('Pruebas Integrales - Seguridad y Autenticación', () => {

    test('Debe rechazar un inicio de sesión con credenciales falsas', async () => {
        const credencialesFalsas = {
            usuario: 'NoDeseo',
            password: 'QuieroEntrar123'
        };
        const response = await request(app)
            .post('/api/auth/login')
            .send(credencialesFalsas);
        expect(response.statusCode).not.toBe(200);
        expect(response.body).toHaveProperty('mensaje');
    });
});