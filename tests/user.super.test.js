const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);
const helper = require("./user.test.helper");

describe("when there is initially one user in db", () => {
  test("creation succeeds with a fresh username", async () => {
    await helper.beforeEach();

    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "nadav",
      name: "etzba",
      password: "Aa123456",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);

    const response = await api.get("/api/users").expect(200);
    expect(response.body[1].name).toBe("etzba");
  });

  test("creation failed because of short password", async () => {
    await helper.beforeEach();

    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "nadav",
      name: "etzba",
      password: "Aa123",
    };

    await api.post("/api/users").send(newUser).expect(400);

    const response = await api.get("/api/users").expect(200);
    expect(response.body).toHaveLength(1);
    expect(response.body).not.toContain("etzba");
  });

  test("creation failed because username is missing", async () => {
    await helper.beforeEach();

    const usersAtStart = await helper.usersInDb();

    const newUser = {
      name: "etzba",
      password: "Aa123456",
    };

    await api.post("/api/users").send(newUser).expect(400);

    const response = await api.get("/api/users").expect(200);
    expect(response.body).toHaveLength(1);
    expect(response.body).not.toContain("etzba");
  });

  test("creation failed when using the same username twice", async () => {
    await helper.beforeEach();

    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "Aa123456",
    };

    const resp = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(resp.body.error).toContain("expected `username` to be unique");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });
});