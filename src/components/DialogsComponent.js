import React, {Component} from "react";
import {
    closeDialog,
    CONFIRMATION_DIALOG,
    DEVICE_DIALOG,
    FIRMWARE_DIALOG,
    PRODUCT_DIALOG,
    PRODUCT_FIRMWARE_DIALOG,
    TOKEN_DIALOG,
    USER_DIALOG
} from "../actions/dialogs";
import {connect} from "react-redux";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import DeviceDialogComponent from "./DeviceDialogComponent";
import FirmwareDialogComponent from "./FirmwareDialogComponent";
import ProductDialogComponent from "./ProductDialogComponent";
import TokenDialogComponent from "./TokenDialogComponent";
import UserDialogComponent from "./UserDialogComponent";
import ProductFirmwareDialogComponent from "./ProductFirmwareDialogComponent";

class DialogsComponent extends Component {
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
            case TOKEN_DIALOG:
                return <TokenDialogComponent/>;
            case USER_DIALOG:
                return <UserDialogComponent/>;
            case PRODUCT_FIRMWARE_DIALOG:
                return <ProductFirmwareDialogComponent/>;
            default:
                return null;
        }
    }
}

const mapStateToProps = (state) => ({
    open: state.dialogsReducer.open,
    type: state.dialogsReducer.type,
    props: state.dialogsReducer.props
});

const mapDispatchToProps = {
    closeDialog
};

export default connect(mapStateToProps, mapDispatchToProps)(
    DialogsComponent
);
