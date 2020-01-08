import React, { Component } from "react";

export const UserContext = React.createContext();

export class UserProvider extends Component {
    componentDidMount() {
        const getLocal = JSON.parse(localStorage.getItem("log"));
        this.setState({
            loggedIn: getLocal !== null ? true : false,
            token: getLocal !== null ? getLocal.token : "",
            user: getLocal !== null ? getLocal.user : {},
            onLogin: (token, user) => this.login(token, user),
            onLogout: () => this.logout()
        });
    }

    logout = () => {
        localStorage.removeItem("log");
        this.setState({
            loggedIn: false,
            token: "",
            user: {}
        });
    };

    login = (token, user) => {
        localStorage.setItem("log", JSON.stringify({ token, user }));
        this.setState({
            loggedIn: true,
            token: token,
            user: user
        });
    };

    render() {
        return (
            <UserContext.Provider value={this.state}>{this.props.children}</UserContext.Provider>
        );
    }
}

export const Consumer = UserContext.Consumer;
