import React, {Component} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import {closeDialog} from "../actions/dialogs";
import {connect} from "react-redux";

class DeleteConfirmationDialog extends Component {
    handleKeyPress = (event) => {
        if (event.key === "Enter") {
            this.handleOk();
        }
    };

    handleOk = () => {
        this.props.handleOk();
        this.props.closeDialog();
    };

    render() {
        return (
            <Dialog
                fullWidth
                open={this.props.open}
                onClose={this.props.closeDialog}
                onKeyPress={this.handleKeyPress}
            >
                <DialogTitle>{this.props.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{this.props.content}</DialogContentText>
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
    open: state.dialogsReducer.open,
    title: state.dialogsReducer.props.title,
    content: state.dialogsReducer.props.content,
    handleOk: state.dialogsReducer.props.handleOk
});

const mapDispatchToProps = {
    closeDialog
};

export default connect(mapStateToProps, mapDispatchToProps)(
    DeleteConfirmationDialog
);
