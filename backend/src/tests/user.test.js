// backend/src/tests/user.test.js
const request = require('supertest');
const app = require('../index'); // Assurez-vous que votre app est exportée correctement depuis index.js

describe('User Endpoints', () => {
    it('should create a new user', async () => {
        const res = await request(app)
            .post('/api/users/register')
            .send({
                username: 'testuser',
                password: 'testpassword',
                email: 'testuser@example.com',
                role: 'user'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('message', 'User registered successfully');
    });

    it('should login a user', async () => {
        const res = await request(app)
            .post('/api/users/login')
            .send({
                username: 'testuser',
                password: 'testpassword'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });
});
