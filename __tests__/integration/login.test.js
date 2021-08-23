import '../../enviroment';
import 'regenerator-runtime/runtime';
import request from 'supertest';
import app from '../../src/app';
import factory from '../utils/factories';

describe('GIVEN I have authentication credentials on /login/ route', () => {
  describe('WHEN I send valid authentication credentials', () => {
    it('THEN I receive HTTP Status 200', async () => {
      const user = await factory.create('User', {
        password: '123456',
      });

      const response = await request.agent(app).post('/login/').send({
        email: user.email,
        password: '123456',
      });

      expect(response.status).toBe(200);
    });

    it('', async () => {
      //
    });
  });
});
