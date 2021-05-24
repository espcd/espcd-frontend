import React, {Component} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import {closeConfirmationDialog} from "../actions/confirmationDialog";
import {connect} from "react-redux";

class DeleteConfirmationDialog extends Component {
    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.closeConfirmationDialog}
            >
                <DialogTitle>{this.props.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{this.props.content}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.closeConfirmationDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => {
                        this.props.handleOk();
                        this.props.closeConfirmationDialog();
                    }} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

const mapStateToProps = (state) => ({
    open: state.confirmationDialogReducer.open,
    title: state.confirmationDialogReducer.title,
    content: state.confirmationDialogReducer.content,
    handleOk: state.confirmationDialogReducer.handleOk
});


const mapDispatchToProps = {
    closeConfirmationDialog
};

export default connect(mapStateToProps, mapDispatchToProps)(
    DeleteConfirmationDialog
);
