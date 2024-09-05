const request = require('supertest');
const app = require('../app');

describe('User Routes', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/users/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: '123456'
      });
    expect(res.statusCode).toEqual(201);
  });

  it('should return error when email already exists', async () => {
    await request(app)
      .post('/users/register')
      .send({
        name: 'Existing User',
        email: 'test@example.com', // Use um email que já existe
        password: '123456'
      });
  
    const res = await request(app)
      .post('/users/register')
      .send({
        name: 'New User',
        email: 'test@example.com',
        password: '123456'
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body.errors).toContainEqual(expect.objectContaining({
      msg: 'Email already exists'
    }));
  });
  

  it('should login a user', async () => {
    const res = await request(app)
      .post('/users/login')
      .send({
        email: 'test@example.com',
        password: '123456'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should return error for invalid login', async () => {
    const res = await request(app)
      .post('/users/login')
      .send({
        email: 'invalid@example.com',
        password: 'wrongpassword'
      });
    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toEqual('Invalid credentials');
  });
  

  it('should update user information', async () => {
    const loginRes = await request(app)
      .post('/users/login')
      .send({
        email: 'test@example.com',
        password: '123456'
      });
    const token = loginRes.body.token;

    const res = await request(app)
      .put('/users/update')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Updated Test User',
        email: 'updated@example.com'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.user.name).toEqual('Updated Test User');
  });
});
