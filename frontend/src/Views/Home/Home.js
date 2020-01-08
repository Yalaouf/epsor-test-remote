import React, { Component } from "react";
import jwt from "jsonwebtoken";
import { Redirect } from "react-router-dom";
import { Button } from "@material-ui/core";
import Error from "../../Components/Error/Error";
import { UserContext, Consumer } from "../../UserContext";
import Product from "../../Components/Product/Product";
import { productsRequest } from "../../requests";
import "./Home.css";

class Home extends Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = { redirect: null, error: null, products: [] };
    }

    componentDidMount() {
        this.getProducts();
    }

    getProducts = () => {
        let token = JSON.parse(localStorage.getItem("log"));
        if (!token) return null;
        token = token.token;
        productsRequest(token)
            .then(res => {
                const products = res.data.data.products.map(x => {
                    return <Product product={x} key={x.id} update={this.getProducts} />;
                });
                this.setState({ products: products });
            })
            .catch(() => {
                this.setState({ error: <Error type="fetch products" /> });
            });
    };

    goAdd = () => {
        this.setState({ redirect: <Redirect to={"/Add"} /> });
    };

    onLogout = () => {
        localStorage.removeItem("log");
        this.context.onLogout();
        this.setState({ redirect: <Redirect to={"/Login"} /> });
    };

    render() {
        if (this.context) {
            const check = jwt.verify(this.context.token, "riddlemethis", err => {
                if (err) return false;
                return true;
            });
            if (!check || !this.context.loggedIn) return <Redirect to={"/Login"} />;
        }

        return (
            <div className={"homeDesign"}>
                {this.state.redirect}
                <Consumer>
                    {context => {
                        if (context)
                            return (
                                <div className="profil">
                                    <p className="greeting">Welcome {context.user.name}</p>
                                    <Button
                                        onClick={() => this.onLogout()}
                                        style={{ color: "#9db7f0" }}
                                    >
                                        Logout
                                    </Button>
                                </div>
                            );
                    }}
                </Consumer>
                <br />
                <h2>Products</h2>
                <br />
                <Button
                    style={{ color: "white", backgroundColor: "#32a34e" }}
                    onClick={() => this.goAdd()}
                >
                    Add a product
                </Button>
                <div className={"products"}>{this.state.products}</div>
            </div>
        );
    }
}

export default Home;
