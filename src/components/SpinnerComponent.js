import React, {Component} from "react";
import {Backdrop, CircularProgress, withStyles} from "@material-ui/core";
import {backendUrl} from "../actions/common";

const styles = theme => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 2,
        color: "#fff",
    },
});

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
                if (response.status === 401) {
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

    render() {
        const {classes} = this.props;

        return (
            <Backdrop className={classes.backdrop} open={this.state.active}>
                <CircularProgress color="inherit"/>
            </Backdrop>
        );
    }
}

export default withStyles(styles)(
    SpinnerComponent
);
