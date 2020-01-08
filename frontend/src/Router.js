import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Login from "./Views/Login/Login";
import Signup from "./Views/Signup/Signup";
import Home from "./Views/Home/Home";
import Add from "./Views/Add/Add";
import Modify from "./Views/Modify/Modify";
import { Consumer } from "./UserContext";

class Router extends Component {
    render() {
        return (
            <main>
                <BrowserRouter>
                    <Header />
                    <Switch>
                        <Route exact path={"/"} component={Login} />
                        <Route exact path={"/Login"} component={Login} />
                        <Route exact path={"/Signup"} component={Signup} />
                        <Route exact path={"/Home"} component={Home} />
                        <Route exact path={"/Add"} component={Add} />
                        <Route exact path={"/Modify"} component={Modify} />
                        <Consumer>
                            {context => {
                                if (context.loggedIn)
                                    return <Route exact path={"/"} component={Home} />;
                                else return <Route exact path={"/"} component={Login} />;
                            }}
                        </Consumer>
                    </Switch>
                </BrowserRouter>
            </main>
        );
    }
}

export default Router;
