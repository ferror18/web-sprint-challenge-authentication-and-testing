const supertest = require("supertest");
const server = require("./server.js");
const BASE_URL = 'http://localhost/api/auth/';
const db = require('../database/dbConfig.js')
const Users = require('../auth/userModel.js')
const myUser = {username:'Dominick',password:'Klauss'}
describe("server", function () {
    afterAll(async () => {
        await db("users").truncate();
      });
    it("runs the tests", function () {
        expect(true).toBe(true);
    });
    describe("environment", function () {
        it("should be using the testing database", function () {
            expect(process.env.DB_ENV).toBe("testing");
        });
    });

    describe("/register endpoint", function () {

        beforeEach(async () => {
                await db("users").truncate();
            });

        it("should respond with 200 OK", function () {
            return supertest(server)
                .post('/api/auth/register')
                .send(myUser)
                .then(res => {
                    expect(res.status).toBe(200);
                })
                .catch(e => e)
        });

        it("should respond with JSON", function () {
            return supertest(server)
                .post('/api/auth/register')
                .send(myUser)
                .then(res => {
                    expect(res.type).toMatch(/json/i);
                });
        });

        it("should respond WHITOUT the password", function () {
            return supertest(server)
                .post('/api/auth/register')
                .send(myUser)
                .then(res => {
                    expect(res.body.data.password).toBeUndefined();
                });
        });
        it("should respond with proper data", function () {
            return supertest(server)
                .post('/api/auth/register')
                .send(myUser)
                .then( async res => {
                    const dbUser = await Users.findById(res.body.data.id)
                    await expect(res.body.data.username).toBe(myUser.username);
                    await expect(res.body.data.username).toBe(dbUser.username);
                });
        });
    });

    describe("/login endpoint", function () {
        afterEach(async () => {
            return await supertest(server)
                .get('/api/auth/logout');
          });
        it("should respond with 200 OK", function () {
            return supertest(server)
                .post('/api/auth/login')
                .send(myUser)
                .then(res => {
                    expect(res.status).toBe(200);
                })
                .catch(e => e)
        });

        it("should respond with JSON", function () {
            return supertest(server)
                .post('/api/auth/login')
                .send(myUser)
                .then(res => {
                    expect(res.type).toMatch(/json/i);
                });
        });

        it("should get a cookie", function () {
            return supertest(server)
                .post('/api/auth/login')
                .send(myUser)
                .then(res => {
                    expect(JSON.parse(res.req.res.text).session).toBeDefined();
                });
        });
        it("should get the apropriate session on cookie", function () {
            return supertest(server)
                .post('/api/auth/login')
                .send(myUser)
                .then(  res => {
                     expect(JSON.parse(res.req.res.text).session.username).toBe(myUser.username);
                });
        });
    });
});