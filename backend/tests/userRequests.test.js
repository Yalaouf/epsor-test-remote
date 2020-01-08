import { tester } from "graphql-tester";
const API = "http://localhost:4242/graphql";

describe("A user", function() {
    const self = this;

    beforeAll(() => {
        self.test = tester({
            url: API,
            contentType: "application/json"
        });
    });

    it("Should create a new user", done => {
        const okCreate = JSON.stringify({
            query: `
            mutation { createUser(name: "test", email: "test", password: "test") {
                    id,
                    name,
                    email
                }}`
        });
        self.test(okCreate)
            .then(res => {
                expect(res.status).toBe(200);
                expect(res.success).toBe(true);
                done();
            })
            .catch(err => {
                expect(err).toBe(null);
                done();
            });
    });

    it("Should not create same user again", done => {
        const koCreate = JSON.stringify({
            query: `
            mutation { createUser(name: "test", email: "test", password: "test") {
                    id,
                    name,
                    email
                }}`
        });
        self.test(koCreate)
            .then(res => {
                expect(res.status).toBe(200);
                expect(res.success).toBe(false);
                done();
            })
            .catch(err => {
                expect(err).toBe(null);
                done();
            });
    });

    it("Should login user", done => {
        const okLogin = JSON.stringify({
            query: `
                query { login(email: "test", password: "test") {
                    user {
                        id,
                        name,
                        email
                    },
                    token
                }}`
        });
        self.test(okLogin)
            .then(res => {
                expect(res.status).toBe(200);
                expect(res.success).toBe(true);
                done();
            })
            .catch(err => {
                expect(err).toBe(null);
                done();
            });
    });

    it("Should not login with random credentials", done => {
        const okLogin = JSON.stringify({
            query: `
                query { login(email: "asdf", password: "asdf") {
                    user {
                        id,
                        name,
                        email
                    },
                    token
                }}`
        });
        self.test(okLogin)
            .then(res => {
                expect(res.status).toBe(200);
                expect(res.success).toBe(false);
                done();
            })
            .catch(err => {
                expect(err).toBe(null);
                done();
            });
    });

    it("Should not login with wrong password", done => {
        const okLogin = JSON.stringify({
            query: `
                query { login(email: "test", password: "asdf") {
                    user {
                        id,
                        name,
                        email
                    },
                    token
                }}`
        });
        self.test(okLogin)
            .then(res => {
                expect(res.status).toBe(200);
                expect(res.success).toBe(false);
                done();
            })
            .catch(err => {
                expect(err).toBe(null);
                done();
            });
    });
});
