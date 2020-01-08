import React, { Component } from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { Redirect } from "react-router-dom";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { redirect: null };
    }

    onLogin = () => {
        this.setState({ redirect: <Redirect to={"/Login"} /> });
    };

    goHome = () => {
        this.setState({ redirect: <Redirect to={"/"} /> });
    };

    render() {
        return (
            <AppBar style={{ backgroundColor: "#3c4556" }} position="static">
                {this.state.redirect}
                <Toolbar>
                    <Typography
                        style={{ flex: 1, textAlign: "center", color: "#50fa7b" }}
                        variant="h3"
                        onClick={() => this.goHome()}
                    >
                        Epsor
                    </Typography>
                </Toolbar>
            </AppBar>
        );
    }
}

export default Header;
