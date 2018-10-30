/* eslint-disable no-console */
import supertest from 'supertest';
import mongoose from 'mongoose';
import server from '../index';
import User from '../models/User';

describe('Easy Class API', () => {
  beforeAll(async (done) => {
    const user = new User({
      name: 'Test User',
      email: 'testuser@test.com',
      password: '123456',
    });

    await user.save();

    done();
  });

  afterAll(async (done) => {
    try {
      await User.remove({});
      await mongoose.disconnect();
      server.close();
      done();
    } catch (err) {
      console.log('Error ending tests: ', err);
    }
  });

  describe('GET api/user', () => {
    test('Obtém lista de usuários administradores', async (done) => {
      try {
        const res = await supertest(server).get('/api/user');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveLength(1);
        done();
      } catch (err) {
        console.log('GET api/user error:', err);
      }
    });
  });
});
