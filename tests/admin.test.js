const request = require('supertest');
const app = require('../app');

describe('Admin Routes', () => {
  let token;

  beforeAll(async () => {
    // Log in para obter um token para teste
    const res = await request(app)
      .post('/users/login')
      .send({
        email: 'admin@example.com', // Use um email de admin válido
        password: 'admin_password' // Use a senha do admin
      });
    token = res.body.token;
  });
  
  it('should create a new admin', async () => {
    const res = await request(app)
      .post('/admins')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'New Admin',
        email: 'newadmin@example.com',
        password: '123456'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toEqual('Admin created successfully');
  });
  
  

  it('should list all admins', async () => {
    const res = await request(app)
      .get('/admins')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
  

  it('should delete a user', async () => {
    // Primeiro, crie um usuário para ser excluído
    const userToDelete = await request(app)
      .post('/users/register')
      .send({
        name: 'User To Delete',
        email: 'deleteuser@example.com',
        password: '123456'
      });
  
    const res = await request(app)
      .delete(`/admins/${userToDelete.body._id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('User deleted successfully');
  });
  

  it('should update an admin', async () => {
    const adminToUpdate = await request(app)
      .post('/admins')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Admin To Update',
        email: 'adminupdate@example.com',
        password: '123456'
      });
  
    const res = await request(app)
      .put(`/admins/${adminToUpdate.body._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Updated Admin',
        email: 'updatedadmin@example.com',
        password: 'newpassword'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.admin.name).toEqual('Updated Admin');
  });
  
  
});
