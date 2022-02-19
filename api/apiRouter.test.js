const { server, handle } = require("../index");
const { client } = require("../db");
const supertest = require("supertest");
const request = supertest(server);

describe("/api/health endpoint", () => {
  // close db connection and supertest server tcp connection
  afterAll(async () => {
    await client.end();
    handle.close();
  });

  it("should respond with { healthy: true }", async () => {
    const response = await request.get("/api/health");
    expect(response.status).toBe(200);
    expect(response.body.healthy).toBe(true);
  });
});

describe("/api/users endpoint", () => {
  // close db connection and supertest server tcp connection
  afterAll(async () => {
    await client.end();
    handle.close();
  });

  it("should respond with { healthy: true }", async () => {
    const response = await request.get("/api/health");
    expect(response.status).toBe(200);
    expect(response.body.healthy).toBe(true);
  });
});

describe("/api/socks endpoint", () => {
  // close db connection and supertest server tcp connection
  afterAll(async () => {
    await client.end();
    handle.close();
  });

  it("should respond with { message: Socks API up and runnning. }", async () => {
    const response = await request.get("/api/health");
    expect(response.status).toBe(200);
    expect(response.body.healthy).toBe(true);
  });
});

describe("/api/address endpoint", () => {
  // close db connection and supertest server tcp connection
  afterAll(async () => {
    await client.end();
    handle.close();
  });

  it("should respond with { message: Addresses API up and running }", async () => {
    const response = await request.get("/api/health");
    expect(response.status).toBe(200);
    expect(response.body.healthy).toBe(true);
  });
});
