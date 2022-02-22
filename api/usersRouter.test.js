const { server, handle } = require("../index");
const { client } = require("../db");
const { User } = require("../db");
const supertest = require("supertest");
const request = supertest(server);

describe("/api/users endpoint", () => {
  let createdUser;
  /* put the post user bucket here */

  // idempotence: repeatability
  // if our tests are idempotent we can run them as many times as we like
  // and they'll always produce the same results
  // which is kind of a requirement for unit tests
  beforeAll(async () => {
    await client.connect();

    const newUser = {
      username: "new_userTest",
      password: "123123123",
      first_name: "new_userTest",
      email: "wally@mail.com",
    };

    createdUser = await User.createUser(newUser);
    console.dir(createdUser, { depth: null });
  });

  // close db connection and supertest server tcp connection
  afterAll(async () => {
    const message = await User.hardDeleteUser(createdUser.id);
    /* also delete the postUser that was stored in the parent scope */
    console.log(message);
    await client.end();
    handle.close();
  });

  it("GET /users returns all users with the new user added", async () => {
    const response = await request.get("/api/users");
    expect(response.status).toBe(200);
    const user = response.body.users[response.body.users.length - 1];
    expect(user).toBeTruthy();
    expect(user.email).toEqual(createdUser.email);
  });

  it("POST /users creates a user and returns the new user object", async () => {
    const postUser = {
      username: "post_userTest1",
      password: "123123123",
      first_name: "wally1",
      email: "wally@mail.com",
    };

    const response = await request.post("/api/users/register").send(postUser);
    expect(response.status).toBe(201);
    const user = response.body.user;
    expect(user).toBeTruthy();
    expect(user.username).toEqual(postUser.username);
  });

  it("POST /login logs in a new users, checks password is match and returns token", async () => {
    const loginUser = {
      username: "albert",
      password: "bertie99",
    };

    const response = await request.post("/api/users/login").send(loginUser);
    expect(response.status).toBe(200);
    const token = response.body.token;
    expect(token).toBeTruthy();
  });
});
