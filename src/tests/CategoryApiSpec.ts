import app from '../server';
import supertest from 'supertest';
import jwt from 'jsonwebtoken';

const token=jwt.sign({id:1,name:"omnia",email:"omnia@gmail.com"},process.env.TOKEN_SECRET as string,{expiresIn:"1h"});

const request = supertest(app);

describe('Category End Point Test Response', (): void => {
    it('Get The all Categories End Point', async () => {
        const response = await request.get('/categories');
        expect(response.status).toBe(200);
    });
    it('Get category By Id End Point', async () => {
        const response = await request.get('/category/1');
        expect(response.status).toBe(200);
    });
    it('Create category End Point', async () => {
        const response = await request.post('/category/create')
                            .send({ name: "Category 2"})
                            .set('Authorization', `Bearer ${token}`)
                            .expect(201, {
                                newCategory: {
                                    id: 2,
                                    name: "Category 2",
                                    }
                            });
        expect(response.status).toBe(201);
    });

    it('Update Category End Point', async () => {
        const response = await request.put('/category/update/2')
                            .send({ name: "Category2 updated"})
                            .set('Authorization', `Bearer ${token}`)
                            
        expect(response.status).toBe(201);
    });

    it('Delete Category End Point', async () => {
        const response = await request.delete('/category/2')
                            .set('Authorization', `Bearer ${token}`)
        expect(response.status).toBe(200);
    });

});


