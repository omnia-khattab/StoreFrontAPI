import app from '../server';
import supertest from 'supertest';

const request = supertest(app);

describe('Dashboard End Point Test Response', (): void => {
    it('Get The all products orders', async () => {
        const response = await request.get('/dasboard/all/orders');
        expect(response.status).toBe(200);
    });
    it('Get Products In Orders ', async () => {
        const response = await request.get('/dasboard/products');
        expect(response.status).toBe(200);
    });
    
    it('Get users In Orders ', async () => {
        const response = await request.get('/dashboard/users');
        expect(response.status).toBe(200);
    });

    it('Get Most Popular Five Products ', async () => {
        const response = await request.get('/dashboard/topProducts');
        expect(response.status).toBe(200);
    });

});


