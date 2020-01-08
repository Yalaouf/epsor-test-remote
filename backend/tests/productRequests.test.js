import { tester } from "graphql-tester";
const API = "http://localhost:4242/graphql";

describe("A product", function() {
    const self = this;

    beforeAll(() => {
        self.test = tester({
            url: API,
            contentType: "application/json"
        });
    });

    it("Should get all products", done => {
        const okProducts = JSON.stringify({
            query: `
                query {
                    products {
                        id,
                        uuid,
                        name,
                        price,
                        type,
                        enable
                    }
                }`
        });
        self.test(okProducts)
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
