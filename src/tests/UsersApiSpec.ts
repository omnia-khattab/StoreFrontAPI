import app from '../server';
import supertest from 'supertest';
import jwt from 'jsonwebtoken';

const token=jwt.sign({id:2,name:"aya",email:"aya@gmail.com"},process.env.TOKEN_SECRET as string,{expiresIn:"1h"});

const request = supertest(app);

describe('User End Point Test Response', (): void => {
    it('Get The all users End Point', async () => {
        const response = await request.get('/users');
        expect(response.status).toBe(200);
    });
    it('Get user By Id End Point', async () => {
        const response = await request.get('/user/1');
        expect(response.status).toBe(200);
    });
    
    it('Create User End Point', async () => {
        const service = {
            first_name: "aya",
            last_name: "khattab",
            email:'aya@gmail.com'.toLowerCase(),
            password:"1234",
            user_role:"user"
        };

        const response = await request.post('/user/signup')
                            .send(service)
                            
        expect(response.status).toBe(201);
    });

    it('Update user End Point', async () => {
        const service = {
            first_name: "aya",
            last_name: "khattab",
            email:"ayak@gmail.com",
        };
        const response = await request.put('/user/update/2')
                            .send(service)
                            .set('Authorization', `Bearer ${token}`)
                            
        expect(response.status).toBe(201);
    });

    it('Update user password End Point', async () => {
        const service = {
            id: 2,
            password: "12345",
        };
        const response = await request.put('/user/updatePassword/2')
                            .send(service)
                            .set('Authorization', `Bearer ${token}`)
                            
        expect(response.status).toBe(201);
    });

    it('User Login End Point', async () => {
        const service = {
            email:'ayak@gmail.com'.toLowerCase(),
            password:"12345"
        }
        const response = await request.post('/user/login/')
                            .send(service)
                            
        expect(response.status).toBe(200);
    });

    it('Delete user End Point', async () => {
        const response = await request.delete('/user/2')
                            .set('Authorization', `Bearer ${token}`)
        expect(response.status).toBe(200);
    });

});


