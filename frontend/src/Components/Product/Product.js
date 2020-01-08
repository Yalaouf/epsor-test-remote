import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Card, CardContent, CardActions, Typography, Button } from "@material-ui/core";
import { UserContext } from "../../UserContext";
import { deleteProductRequest } from "../../requests";
import "./Product.css";

class Product extends Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = { redirect: null };
    }

    deleteProduct = async id => {
        deleteProductRequest(id, this.context.token)
            .then(() => {
                this.props.update();
            })
            .catch(err => {
                console.log(err);
            });
    };

    modifyProduct = async product => {
        this.setState({
            redirect: (
                <Redirect
                    to={{
                        pathname: "/Modify",
                        state: product
                    }}
                />
            )
        });
    };

    render() {
        return (
            <Card style={{ backgroundColor: "#59667d", width: "300px", marginBottom: "3%" }}>
                {this.state.redirect}
                <CardContent>
                    <Typography
                        style={{ color: "#bd93f9" }}
                        variant="h5"
                        component="h2"
                        color={"secondary"}
                    >
                        {this.props.product.name}
                    </Typography>
                    <Typography style={{ color: "#BCC2CD" }}>
                        uuid: {this.props.product.uuid}
                    </Typography>
                    <Typography style={{ color: "white" }} variant="body2" component="p">
                        type: {this.props.product.type}
                    </Typography>
                    <Typography style={{ color: "white" }} variant="body2" component="p">
                        {this.props.product.price}€
                    </Typography>
                    <Typography style={{ color: "white" }} variant="body2" component="p">
                        Enable: {this.props.product.enable.toString()}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        onClick={() => this.deleteProduct(this.props.product.id)}
                        style={{ color: "#ffb86c" }}
                        size="small"
                    >
                        Delete
                    </Button>
                    <Button
                        onClick={() => this.modifyProduct(this.props.product)}
                        style={{ color: "#ffb86c" }}
                        size="small"
                    >
                        Update
                    </Button>
                </CardActions>
            </Card>
        );
    }
}

export default Product;
