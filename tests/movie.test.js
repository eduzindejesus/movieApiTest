const request = require('supertest');
const app = require('../app');

describe('Movie Routes', () => {
  let token;

  beforeAll(async () => {
    // Log in to get a token for testing
    const res = await request(app)
      .post('/users/login')
      .send({
        email: 'test@example.com',
        password: '123456'
      });
    token = res.body.token;
  });

  it('should add a new movie', async () => {
    const res = await request(app)
      .post('/movies')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Inception',
        director: 'Christopher Nolan',
        year: 2010,
        genre: 'Sci-Fi'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toEqual('Movie added successfully');
  });
  
  it('should list all movies with pagination', async () => {
    const res = await request(app)
      .get('/movies?limit=5&page=1')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
  

  it('should update a movie', async () => {
    const movieToUpdate = await request(app)
      .post('/movies')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Original Title',
        director: 'Original Director',
        year: 2020,
        genre: 'Drama'
      });
  
    const res = await request(app)
      .put(`/movies/${movieToUpdate.body._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Updated Title',
        director: 'Updated Director'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.movie.title).toEqual('Updated Title');
  });
  
  it('should delete a movie', async () => {
    const movieToDelete = await request(app)
      .post('/movies')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Movie to Delete',
        director: 'Director',
        year: 2021,
        genre: 'Horror'
      });
  
    const res = await request(app)
      .delete(`/movies/${movieToDelete.body._id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Movie deleted successfully');
  });
  
});
