import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import jwt from "jsonwebtoken";
import { TextField, Button, Checkbox, FormControlLabel } from "@material-ui/core";
import Error from "../../Components/Error/Error";
import { modifyProductRequest } from "../../requests";
import { UserContext } from "../../UserContext";
import "./Modify.css";

const escapeStrings = string => {
    return string.replace(/[.*+?^"'${}()|[\]\\]/g, "\\$&");
};

class Modify extends Component {
    static contextType = UserContext;

    state = {
        error: null,
        redirect: null,
        name: this.props.location.state ? this.props.location.state.name : "",
        uuid: this.props.location.state ? this.props.location.state.uuid : "",
        price: this.props.location.state ? this.props.location.state.price : 0,
        type: this.props.location.state ? this.props.location.state.type : "",
        enable: this.props.location.state ? this.props.location.state.enable : false
    };

    onNameChange = e => this.setState({ name: e.target.value });
    onUUIDChange = e => this.setState({ uuid: e.target.value });
    onPriceChange = e => this.setState({ price: Number(e.target.value) });
    onTypeChange = e => this.setState({ type: e.target.value });
    onEnableChange = () => this.setState({ enable: this.state.enable ? false : true });

    goHome = () => {
        this.setState({ redirect: <Redirect to={"/Home"} /> });
    };

    modifyProduct = () => {
        const product = {
            id: this.props.location.state.id,
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

        modifyProductRequest(product, this.context.token)
            .then(res => {
                this.setState({ error: null, redirect: <Redirect to={"/Home"} /> });
            })
            .catch(err => {
                this.setState({ error: <Error error="failed to modify product" /> });
                console.log(err.message);
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
            <div className="modifyStyle">
                {this.state.redirect}
                <h2>Modify a product</h2>
                <form className={"formStyle"} autoComplete="off">
                    {this.state.error}

                    <TextField
                        defaultValue={this.state.name}
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
                        defaultValue={this.state.uuid}
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
                        defaultValue={this.state.price}
                        color="secondary"
                        id="price"
                        label="Price"
                        variant="outlined"
                        onChange={this.onPriceChange}
                        required
                    />
                    <br />
                    <br />
                    <TextField
                        defaultValue={this.state.type}
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
                        onClick={() => this.modifyProduct()}
                    >
                        Modify product
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

export default Modify;
