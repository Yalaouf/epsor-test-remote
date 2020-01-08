import React, { Component } from "react";
import jwt from "jsonwebtoken";
import { Redirect } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import Error from "../../Components/Error/Error";
import { loginRequest } from "../../requests";
import { UserContext } from "../../UserContext";
import "./Login.css";

class Login extends Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = { email: "", password: "", redirect: null };
    }

    onEmailChange = e => {
        this.setState({ email: e.target.value });
    };

    onPasswordChange = e => {
        this.setState({ password: e.target.value });
    };

    loginProcess = async (email, password) => {
        if (email === "" || password === "") {
            this.setState({ error: <Error error="failed to login" /> });
            return null;
        }

        await loginRequest(email, password)
            .then(res => {
                this.context.onLogin(res.data.data.login.token, res.data.data.login.user);
            })
            .catch(() => {
                this.setState({ error: <Error error="failed to login" /> });
            });
    };

    goSignup = () => {
        this.setState({ redirect: <Redirect to={"/Signup"} /> });
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
            <div className={"loginStyle"}>
                {this.state.redirect}

                <h2>Login</h2>

                <form className={"formStyle"} autoComplete="off">
                    {this.state.error}

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
                            this.loginProcess(this.state.email, this.state.password);
                        }}
                    >
                        Login
                    </Button>
                </form>
                <br />
                <Button
                    style={{ backgroundColor: "#bd93f9" }}
                    variant="contained"
                    color="secondary"
                    onClick={this.goSignup}
                >
                    You don't have an account ?
                </Button>
            </div>
        );
    }
}

export default Login;
