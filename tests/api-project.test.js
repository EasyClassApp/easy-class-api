/* eslint-disable no-console */
import supertest from 'supertest';
import mongoose from 'mongoose';
import server from '../index';
import User from '../models/User';

describe('Easy Class API', () => {
  let request;

  beforeEach(async (done) => {
    request = supertest(server);

    await User.remove({});

    const user = new User({
      name: 'Test User',
      email: 'testuser@test.com',
      password: '123456',
    });

    await user.save();

    done();
  });

  afterAll((done) => {
    mongoose.connection.close();
    server.close();
    done();
  });

  describe('GET api/user', () => {
    test('Obtém lista de usuários administradores', async (done) => {
      try {
        const res = await request.get('/api/user');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveLength(1);
        done();
      } catch (err) {
        console.log('GET api/user error:', err);
      }
    });
  });
});
