const { server, handle } = require("../index");
const { client } = require("../db");
const { Sock } = require("../db");
const supertest = require("supertest");
const request = supertest(server);

describe("api/socks endpoint", () => {
  let createdSock;

  afterAll(async () => {
    const message = await Sock.destroySock(createdSock.id);
    await Sock.destroySock(createdSock.id);
    console.log(message);
    await client.end();
    handle.close();
  });

  it("GET /socks returns all socks with the new socks added", async () => {
    const response = await request.get("/api/socks");
    expect(response.status).toBe(200);
    const sock = response.body;
    expect(sock).toBeTruthy();
  });

  it("POST /users creates a sock and returns the new sock object", async () => {
    const postSock = {
      name: "post_Sock1",
      price: "123123123",
      size: "L",
      description: "test of socks",
      product_img: "www.google.com",
    };

    const response = await request.post("/api/socks").send(postSock);
    expect(response.status).toBe(200);
    const sock = response.body;

    // assign newly created user in parent scope so it's available for deletion after tests
    // this guarantees idempotence
    createdSock = sock;

    expect(sock).toBeTruthy();
    expect(sock.name).toEqual(postSock.name);
  });
});
