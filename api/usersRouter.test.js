const { server, handle } = require('../index');
const { client } = require('../db');
const { User } = require('../db');
const supertest = require('supertest');
const request = supertest(server);

describe('/api/users endpoint', () => {
  let createdUser;

  // close db connection and supertest server tcp connection
  afterAll(async () => {
    const message = await User.hardDeleteUser(createdUser.id);
    /* also delete the postUser that was stored in the parent scope */
    await User.hardDeleteUser(createdUser.id);
    console.log(message);
    await client.end();
    handle.close();
  });

  it('GET /users returns all users with the new user added', async () => {
    const response = await request.get('/api/users');
    expect(response.status).toBe(200);
    const user = response.body.users[response.body.users.length - 1];
    expect(user).toBeTruthy();
  });

  it('POST /users creates a user and returns the new user object', async () => {
    const postUser = {
      username: 'post_userTest1',
      password: '123123123',
      first_name: 'wally1',
      email: 'wally@mail.com',
    };

    const response = await request.post('/api/users/register').send(postUser);
    expect(response.status).toBe(201);
    const { user } = response.body;

    // assign newly created user in parent scope so it's available for deletion after tests
    // this guarantees idempotence
    createdUser = user;

    expect(user).toBeTruthy();
    expect(user.username).toEqual(postUser.username);
  });

  it('POST /login logs in a new users, checks password is match and returns token', async () => {
    const response = await request
      .post('/api/users/login')
      .send({ username: createdUser.username, password: '123123123' });
    expect(response.status).toBe(200);
    const token = response.body.token;
    expect(token).toBeTruthy();
  });
});
