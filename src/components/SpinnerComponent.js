import React, {Component} from "react";
import {CircularProgress, Dialog} from "@material-ui/core";
import {backendUrl} from "../actions/common";

class SpinnerComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: true
        };
    }

    doRequest = () => {
        const requestOptions = {
            method: "HEAD"
        };
        fetch(`${backendUrl}/devices`, requestOptions)
            .then(response => {
                if (response.ok || response.status === 401) {
                    this.setState({active: false});
                }
            });
    };

    componentDidMount() {
        this.doRequest();
        this.interval = setInterval(
            () => {
                if (!this.state.active) {
                    clearInterval(this.interval);
                } else {
                    this.doRequest();
                }
            },
            4000
        );
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <Dialog
                fullWidth
                open={this.state.active}
                PaperProps={{
                    style: {
                        backgroundColor: "transparent",
                        boxShadow: "none",
                        overflow: "hidden"
                    },
                }}
            >
                <CircularProgress color="inherit" style={{color: "white"}}/>
            </Dialog>
        );
    }
}

export default SpinnerComponent;
