import '../../enviroment';
import 'regenerator-runtime/runtime';
import request from 'supertest';
import app from '../../src/app';
import factory from '../utils/factories';
import database from '../../src/database/index';

describe('GIVEN I have authentication credentials on /login/ route', () => {
  beforeEach(async () => {
    await database.truncate();
  });

  describe('WHEN I send valid authentication credentials', () => {
    it('THEN I receive HTTP Status 200', async () => {
      const user = await factory.create('User');

      const response = await request.agent(app).post('/login/').send({
        email: user.email,
        password: user.password,
      });

      expect(response.status).toBe(200);
    });

    it('THEN I receive a JWT token in response', async () => {
      const user = await factory.create('User');

      const response = await request.agent(app).post('/login/').send({
        email: user.email,
        password: user.password,
      });

      expect(response.body).toHaveProperty('token');
    });
  });

  describe('WHEN I send invalid authentication credentials', () => {
    it('THEN I receive HTTP Status 401', async () => {
      const user = await factory.create('User');

      const response = await request.agent(app).post('/login/').send({
        email: user.email,
        password: 'wrong password',
      });

      expect(response.status).toBe(401);
    });
  });
});
