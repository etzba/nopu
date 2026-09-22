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

  test("login success", async () => {
    const credentials = {
      username: "nadav",
      password: "Aa123456",
    };

    const response = await api
      .post("/api/login")
      .send(credentials)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body.token).toBeDefined();
  });
});