import React, { Component } from "react";
import "./Error.css";

class Error extends Component {
    render() {
        return (
            <div className={"error"}>
                <p>Error: {this.props.error}</p>
                <br />
            </div>
        );
    }
}

export default Error;
