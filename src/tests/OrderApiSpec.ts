import app from '../server';
import supertest from 'supertest';
import jwt from 'jsonwebtoken';

const token=jwt.sign({id:2,name:"aya",email:"aya@gmail.com"},process.env.TOKEN_SECRET as string,{expiresIn:"1h"});

const request = supertest(app);

describe('Orders End Point Test Response', (): void => {
    it('Get The all orders', async () => {
        const response = await request.get('/orders');
        expect(response.status).toBe(200);
    });
    it('Get order By Id ', async () => {
        const response = await request.get('/order/1');
        expect(response.status).toBe(200);
    });
    
    it('Create order ', async () => {
        const service = {
            order_status:"active",
            user_id:1
        };

        const response = await request.post('/order/create')
                            .send(service)
                            .set('Authorization', `Bearer ${token}`)
                            .expect(201,{
                                newOrder:{
                                    id: 2,
                                    order_status: 'active',
                                    user_id: '1',
                                  }
                            })
                            
        expect(response.status).toBe(201);
    });


    it('add order product to cart', async () => {
        const service = {
            quantity:2,
            product_id:1
        }
        const response = await request.post('/cart/orders/2/products')
                            .send(service)
                            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(201);
    });

    it('remove order product from cart', async () => {
    
        const response = await request.delete('/cart/orders/2/products').set('Authorization', `Bearer ${token}`)
                            
        expect(response.status).toBe(200);
    });

    it('Update order status ', async () => {
        
        const response = await request.put('/order/update/2')
                            .send({order_status: 'closed'})
                            .set('Authorization', `Bearer ${token}`)
                            
        expect(response.status).toBe(201);
    });

    it('get completed porducts End Point', async () => {
        
        const response = await request.get('/orders/completed')
                            
        expect(response.status).toBe(200);
    });

    it('Delete order', async () => {
        const response = await request.delete('/order/2')
                            .set('Authorization', `Bearer ${token}`)
        expect(response.status).toBe(200);
    });

});


