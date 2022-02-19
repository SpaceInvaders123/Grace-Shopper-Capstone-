const { server, handle } = require('../index');
const { client } = require('../db');
const { User } = require('../db');
const supertest = require('supertest');
const request = supertest(server);

describe('/api/users endpoint', () => {
  beforeAll(async () => {
    await client.connect();

    const newUser = {
      username: 'new user',
      password: '123123123',
      first_name: 'new user',
      email: 'new-user@mail.com',
    };

    const user = await User.createUser(newUser);

    console.dir(user, { depth: null });
  });

  // close db connection and supertest server tcp connection
  afterAll(async () => {
    await client.end();
    handle.close();
  });

  it('GET /users returns all users with the new user added', async () => {
    const response = await request.get('/api/users');

    console.dir(response, { depth: null });

    expect(response.status).toBe(200);
    const user = response.body.users[response.users.length - 1];
    expect(user).toBeTruthy();
    expect(user.email).toEqual(newUser.email);
  });
});
