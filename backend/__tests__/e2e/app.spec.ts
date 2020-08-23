import supertest from 'supertest';
import { describe, it, afterAll } from '@jest/globals';
import server from '../../src/app';
// @ts-ignore
import itemsJson from './items.json';

afterAll(async () => {
    await server.close();
});

describe('Testing the items API', () => {
    it('tests the base route returns all items', async (done) => {
        await supertest(server)
            .get('/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, itemsJson);
        done();
    });
});
