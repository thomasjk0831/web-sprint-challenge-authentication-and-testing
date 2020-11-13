const supertest = require("supertest");

const server = require("../api/server");
const db = require('../database/dbConfig')
const Users = require('../users/users-model')

describe("server.js", () => {
    describe("GET /", () => {
        it("should return 200 OK", () => {
            return supertest(server)
                .get("/")
                .then(res => {
                    expect(res.status).toBe(200);
                });
        });

        it("should have a body", () => {
            return supertest(server)
                .get("/")
                .then(res => {
                    expect(res.body).toEqual({ msg: "api is working" });
                });
        });


    });

    describe("add", () => {
        it("/post", async () => {
            await db('users').truncate()
            await Users.add({ username: "joe", password: "schmo" })

            const users = await db('users')
            expect(users).toHaveLength(1)
        })
        it("/post", async () => {
            await Users.add({ username: "person", password: "person" })

            const users = await db('users')
            expect(users).toHaveLength(2)
        })
    })
});

// the res object has a property called body,
// write a test for the body has an api property and the value is "up"'
