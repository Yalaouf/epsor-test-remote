import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import jwt from "jsonwebtoken";
import { TextField, Button } from "@material-ui/core";
import Error from "../../Components/Error/Error";
import { signupRequest } from "../../requests";
import { UserContext } from "../../UserContext";
import "./Signup.css";

class Signup extends Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = { email: "", password: "", name: "", redirect: null };
    }

    onEmailChange = e => {
        this.setState({ email: e.target.value });
    };

    onNameChange = e => {
        this.setState({ name: e.target.value });
    };

    onPasswordChange = e => {
        this.setState({ password: e.target.value });
    };

    signupProcess = async (email, name, password) => {
        if (email === "" || password === "" || name === "") {
            this.setState({ error: <Error error="failed to signup" /> });
            return null;
        }

        await signupRequest(email, name, password)
            .then(() => {
                this.setState({ error: null, redirect: <Redirect to={"/Login"} /> });
            })
            .catch(() => {
                this.setState({ error: <Error error={"failed to signup"} /> });
            });
    };

    goLogin = () => {
        this.setState({ redirect: <Redirect to={"/Login"} /> });
    };

    render() {
        if (this.context) {
            const check = jwt.verify(this.context.token, "riddlemethis", err => {
                if (err) return false;
                return true;
            });

            if (this.context.loggedIn || check) return <Redirect to={"/Home"} />;
        }

        return (
            <div className={"signupStyle"}>
                {this.state.redirect}

                <h2>Signup</h2>

                <form className={"formStyle"} autoComplete="off">
                    {this.state.error}

                    <TextField
                        color="secondary"
                        id="name"
                        label="Username"
                        variant="outlined"
                        onChange={this.onNameChange}
                        required
                    />
                    <br />
                    <br />
                    <TextField
                        color="secondary"
                        id="email"
                        label="Email"
                        variant="outlined"
                        onChange={this.onEmailChange}
                        required
                    />
                    <br />
                    <br />
                    <TextField
                        color="secondary"
                        id="password"
                        label="Password"
                        variant="outlined"
                        type={"password"}
                        onChange={this.onPasswordChange}
                        required
                    />
                    <br />
                    <br />
                    <Button
                        style={{ backgroundColor: "#bd93f9" }}
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                            this.signupProcess(
                                this.state.email,
                                this.state.name,
                                this.state.password
                            );
                        }}
                    >
                        Signup
                    </Button>
                </form>
                <br />
                <br />
                <Button
                    style={{ backgroundColor: "#bd93f9" }}
                    variant="contained"
                    color="secondary"
                    onClick={this.goLogin}
                >
                    Already have an account ?
                </Button>
            </div>
        );
    }
}

export default Signup;
