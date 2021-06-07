import React, {Component} from "react";
import {connect} from "react-redux";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@material-ui/core";
import {closeDialog} from "../actions/dialog";
import {editUser} from "../actions/user";

class UserDialogComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: ""
        };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleKeyPress = (event) => {
        if (event.key === "Enter" && !this.submitDisabled()) {
            this.handleSubmit();
        }
    };

    handleSubmit = () => {
        this.props.editUser(this.state.password)
            .then(() => this.props.closeDialog());
    };

    submitDisabled = () => !this.state.password;

    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.closeDialog}
                onKeyPress={this.handleKeyPress}
            >
                <DialogTitle>
                    Edit User
                </DialogTitle>
                <DialogContent dividers>
                    <TextField
                        disabled
                        fullWidth
                        margin="dense"
                        id="username"
                        name="username"
                        label="Username"
                        type="text"
                        value={this.props.username}
                    />
                    <TextField
                        autoFocus
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
                        onClick={this.handleSubmit}
                        disabled={this.submitDisabled()}
                    >
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

const mapStateToProps = (state) => ({
    open: state.dialogReducer.open,
    username: state.userReducer.username
});

const mapDispatchToProps = {
    closeDialog,
    editUser
};

export default connect(mapStateToProps, mapDispatchToProps)(
    UserDialogComponent
);
