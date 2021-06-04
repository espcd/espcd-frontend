import React, {Component} from "react";
import {
    closeDialog,
    CONFIRMATION_DIALOG,
    DEVICE_DIALOG,
    FIRMWARE_DIALOG,
    LOGIN_DIALOG_COMPONENT,
    PRODUCT_DIALOG
} from "../actions/dialog";
import {connect} from "react-redux";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import DeviceDialogComponent from "./DeviceDialogComponent";
import FirmwareDialogComponent from "./FirmwareDialogComponent";
import ProductDialogComponent from "./ProductDialogComponent";
import LoginDialogComponent from "./LoginDialogComponent";

class DialogComponent extends Component {
    render() {
        switch (this.props.type) {
            case CONFIRMATION_DIALOG:
                return <DeleteConfirmationDialog/>;
            case DEVICE_DIALOG:
                return <DeviceDialogComponent/>;
            case FIRMWARE_DIALOG:
                return <FirmwareDialogComponent/>;
            case PRODUCT_DIALOG:
                return <ProductDialogComponent/>;
            case LOGIN_DIALOG_COMPONENT:
                return <LoginDialogComponent/>;
            default:
                return null;
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
