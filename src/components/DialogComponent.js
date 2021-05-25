import React, {Component} from "react";
import {closeDialog, CONFIRMATION_DIALOG} from "../actions/dialog";
import {connect} from "react-redux";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";

class DialogComponent extends Component {
    render() {
        switch (this.props.type) {
            case CONFIRMATION_DIALOG:
                return <DeleteConfirmationDialog/>
            default:
                return null
        }
    }
}

const mapStateToProps = (state) => ({
    open: state.dialogReducer.open,
    type: state.dialogReducer.type,
    props: state.dialogReducer.props
});

const mapDispatchToProps = {
    closeDialog
};

export default connect(mapStateToProps, mapDispatchToProps)(
    DialogComponent
);
