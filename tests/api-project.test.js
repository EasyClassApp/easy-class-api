/* eslint-disable no-console */
import supertest from 'supertest';
import mongoose from 'mongoose';
import server from '../index';
import Project from '../models/Project';

describe('Projects', () => {
  let request;

  beforeEach(async (done) => {
    request = supertest(server);

    await Project.remove({});

    const p1 = new Project({ name: 'Projeto Teste 1' });
    await p1.save();

    const p2 = new Project({ name: 'Projeto Teste 2' });
    await p2.save();

    done();
  });

  afterAll((done) => {
    mongoose.connection.close();
    server.close();
    done();
  });

  describe('GET api/projects', () => {
    test('Retrieve the complete list of projects', async (done) => {
      try {
        const res = await request.get('/api/projects');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveLength(2);
        done();
      } catch (err) {
        console.log('GET api/evictions error:', err);
      }
    });
  });

  describe('POST api/projects', () => {
    test('Create a new project', (done) => {
      request
        .post('/api/projects')
        .send({ name: 'Novo Projeto' })
        .set('Content-Type', 'application/json')
        .end(async (err, res) => {
          expect(res.statusCode).toBe(200);
          done();
        });
    });

    test("Can't create a project without a name", (done) => {
      request
        .post('/api/projects')
        .set('Content-Type', 'application/json')
        .end(async (err, res) => {
          expect(res.statusCode).toBe(422);
          done();
        });
    });

    test("Can't create a project with an empty name", (done) => {
      request
        .post('/api/projects')
        .send({ name: '' })
        .set('Content-Type', 'application/json')
        .end(async (err, res) => {
          expect(res.statusCode).toBe(422);
          done();
        });
    });
  });
});
