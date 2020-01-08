import axios from "axios";
const API = "http://localhost:4242/graphql";

export const loginRequest = async (email, password) => {
    return await axios.post(
        API,
        {
            query: `
            query {
                login(email:"${email}", password:"${password}") {
                    user { id, name, email },
                    token
                }
            }
        `
        },
        {
            headers: { "Content-Type": "application/json" }
        }
    );
};

export const signupRequest = async (email, name, password) => {
    await axios.post(
        API,
        {
            query: `
            mutation {
                createUser(email:"${email}", name:"${name}", password:"${password}") {
                    id,
                    name,
                    email
                }
            }
        `
        },
        {
            headers: { "Content-Type": "application/json" }
        }
    );
};

export const productsRequest = async token => {
    return await axios.post(
        API,
        {
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
            }
        `
        },
        {
            headers: {
                "Content-Type": "application/json",
                token: token
            }
        }
    );
};

export const deleteProductRequest = async (id, token) => {
    await axios.post(
        API,
        {
            query: `
            mutation {
                removeProduct(id:"${id}")
            }
        `
        },
        {
            headers: {
                "Content-Type": "application/json",
                token: token
            }
        }
    );
};

export const addProductRequest = async (product, token) => {
    await axios.post(
        API,
        {
            query: `
            mutation {
                createProduct(
                    uuid:"${product.uuid}",
                    name:"${product.name}",
                    price:${product.price},
                    type:"${product.type}",
                    enable:${product.enable}
                ) {
                    id
                }
            }
        `
        },
        {
            headers: {
                "Content-Type": "application/json",
                token: token
            }
        }
    );
};

export const modifyProductRequest = async (product, token) => {
    await axios.post(
        API,
        {
            query: `
            mutation {
                updateProduct(
                    id:"${product.id}",
                    uuid:"${product.uuid}",
                    name:"${product.name}",
                    price:${product.price},
                    type:"${product.type}",
                    enable:${product.enable}
                ) {
                    id
                }
            }
        `
        },
        {
            headers: {
                "Content-Type": "application/json",
                token: token
            }
        }
    );
};
