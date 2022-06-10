import app from '../server';
import supertest from 'supertest';
import jwt from 'jsonwebtoken';

const token=jwt.sign({id:1,name:"omnia",email:"omnia@gmail.com"},process.env.TOKEN_SECRET as string,{expiresIn:"1h"});

const request = supertest(app);

describe('Product End Point Test Response', (): void => {
    it('Get The Home End Point', async () => {
        const response = await request.get('/');
        expect(response.status).toBe(200);
    });
    it('Get The all products End Point', async () => {
        const response = await request.get('/products');
        expect(response.status).toBe(200);
    });
    it('Get Product By Id End Point', async () => {
        const response = await request.get('/product/1');
        expect(response.status).toBe(200);
    });
    it('Get Product By category End Point', async () => {
        const response = await request.get('/product/category/1');
        expect(response.status).toBe(200);
    });
    it('Create Product End Point', async () => {
        const service = {
            name: "product",
            price: 100,
            pieces:20,
            category_id:1,
            user_id:1
        };
        const response = await request.post('/product/create')
                            .send(service)
                            .set('Authorization', `Bearer ${token}`)
                            .expect(201, {
                                newProduct: {
                                    id: 2,
                                    name: "product",
                                    price: 100,
                                    pieces:20,
                                    category_id:'1',
                                    user_id:'1'
                                    }
                            });
        expect(response.status).toBe(201);
    });

    it('Update Product End Point', async () => {
        const service = {
            name: "product",
            price: 100,
            pieces:15,
        };
        const response = await request.put('/product/update/2')
                            .send(service)
                            .set('Authorization', `Bearer ${token}`)
                            
        expect(response.status).toBe(201);
    });

    it('Delete Product End Point', async () => {
        const response = await request.delete('/product/2')
                            .set('Authorization', `Bearer ${token}`)
        expect(response.status).toBe(200);
    });

});


