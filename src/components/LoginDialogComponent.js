import React, {Component} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@material-ui/core";
import {closeDialog} from "../actions/dialog";
import {connect} from "react-redux";
import {createSession} from "../actions/session";
import {initialRequests} from "../index";

class LoginDialogComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }

    handleKeyPress = (event) => {
        if (event.key === "Enter") {
            this.handleOk();
        }
    };

    handleOk = () => {
        this.props.createSession(this.state.username, this.state.password);
        this.props.closeDialog();
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.closeDialog}
                onKeyPress={this.handleKeyPress}
            >
                <DialogTitle>Login</DialogTitle>
                <DialogContent dividers>
                    <TextField
                        autoFocus
                        fullWidth
                        margin="dense"
                        id="username"
                        name="username"
                        label="Username"
                        type="text"
                        value={this.state.username}
                        onChange={this.handleChange}
                    />
                    <TextField
                        fullWidth
                        margin="dense"
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="default"
                        onClick={this.props.closeDialog}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={this.handleOk}
                    >
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

const mapStateToProps = (state) => ({
    open: state.dialogReducer.open
});

const mapDispatchToProps = {
    closeDialog,
    createSession
};

export default connect(mapStateToProps, mapDispatchToProps)(
    LoginDialogComponent
);
