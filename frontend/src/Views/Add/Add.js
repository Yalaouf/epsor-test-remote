import React, { Component } from "react";
import jwt from "jsonwebtoken";
import { Redirect } from "react-router-dom";
import { TextField, Button, Checkbox, FormControlLabel } from "@material-ui/core";
import Error from "../../Components/Error/Error";
import { addProductRequest } from "../../requests";
import { UserContext } from "../../UserContext";
import "./Add.css";

const escapeStrings = string => {
    return string.replace(/[.*+?^"'${}()|[\]\\]/g, "\\$&");
};

class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            redirect: null,
            name: "",
            uuid: "",
            price: 0,
            type: "",
            enable: false
        };
    }

    static contextType = UserContext;

    onNameChange = e => this.setState({ name: e.target.value });
    onUUIDChange = e => this.setState({ uuid: e.target.value });
    onPriceChange = e => this.setState({ price: Number(e.target.value) });
    onTypeChange = e => this.setState({ type: e.target.value });
    onEnableChange = () => this.setState({ enable: this.state.enable ? false : true });

    goHome = () => {
        this.setState({ redirect: <Redirect to={"/Home"} /> });
    };

    addProduct = () => {
        const product = {
            name: escapeStrings(this.state.name),
            uuid: escapeStrings(this.state.uuid),
            price: this.state.price,
            type: escapeStrings(this.state.type),
            enable: this.state.enable
        };

        if (product.name === "" || product.uuid === "" || product.type === "") {
            this.setState({ error: <Error error={"enter all the needed values"} /> });
            return null;
        }
        if (isNaN(product.price)) {
            this.setState({ error: <Error error={"enter a real price"} /> });
            return null;
        }

        addProductRequest(product, this.context.token)
            .then(res => {
                this.setState({ error: null, redirect: <Redirect to={"/Home"} /> });
            })
            .catch(err => {
                this.setState({ error: <Error error="failed to add product" /> });
            });
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
            <div className="addStyle">
                {this.state.redirect}
                <h2>Add a product</h2>
                <form className={"formStyle"} autoComplete="off">
                    {this.state.error}

                    <TextField
                        color="secondary"
                        id="name"
                        label="Name"
                        variant="outlined"
                        onChange={this.onNameChange}
                        required
                    />
                    <br />
                    <br />
                    <TextField
                        color="secondary"
                        id="uuid"
                        label="UUID"
                        variant="outlined"
                        onChange={this.onUUIDChange}
                        required
                    />
                    <br />
                    <br />
                    <TextField
                        color="secondary"
                        defaultValue="0"
                        id="price"
                        label="Price"
                        variant="outlined"
                        onChange={this.onPriceChange}
                        required
                    />
                    <br />
                    <br />
                    <TextField
                        color="secondary"
                        id="type"
                        label="Type"
                        variant="outlined"
                        onChange={this.onTypeChange}
                        required
                    />
                    <br />
                    <br />
                    <FormControlLabel
                        style={{ color: "white" }}
                        control={
                            <Checkbox
                                checked={this.state.enable}
                                onChange={() => this.onEnableChange()}
                                value="Enable"
                            />
                        }
                        label="Enable"
                    />
                    <br />
                    <br />
                    <Button
                        style={{ backgroundColor: "#bd93f9" }}
                        variant="contained"
                        color="secondary"
                        onClick={() => this.addProduct()}
                    >
                        Add product
                    </Button>
                </form>
                <br />
                <Button
                    style={{ backgroundColor: "#bd93f9" }}
                    variant="contained"
                    color="secondary"
                    onClick={() => this.goHome()}
                >
                    Cancel
                </Button>
                <br />
            </div>
        );
    }
}

export default Add;
