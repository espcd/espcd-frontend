import React, {Component} from "react";
import {connect} from "react-redux";
import {editDevice} from "../actions/devices";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@material-ui/core";
import Device from "../data-classes/Device";
import Firmware from "../data-classes/Firmware";
import moment from "moment";
import {closeDialog} from "../actions/dialog";
import FqbnSelectComponent from "./FqbnSelectComponent";
import ProductSelectComponent from "./ProductSelectComponent";

class DeviceDialogComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updates: {}
        };
    }

    handleFqbnChange = (event, value) => {
        let updates = this.state.updates;
        updates.fqbn = value;
        this.setState({
            updates: updates
        });
    };

    handleChange = (event) => {
        let target = event.target;
        let key = target.name;
        let value = target.type === "checkbox" ? target.checked : target.value;

        let updates = this.state.updates;
        updates[key] = value;
        this.setState({
            updates: updates
        });
    };

    handleKeyPress = (event) => {
        if (event.key === "Enter" && !this.submitDisabled() && event.target.type !== "textarea") {
            this.handleSubmit();
        }
    };

    handleSubmit = () => {
        let deviceId = this.props.device.id;
        let payload = this.state.updates;

        this.props.editDevice(deviceId, payload)
            .then(() => this.props.closeDialog());
    };

    getValue = (key, defaultValue = "") => {
        let res = this.state.updates[key] ? this.state.updates[key] : this.props.device[key];
        return res ? res : defaultValue;
    };

    submitDisabled = () => !Object.keys(this.props.device).some(key =>
        this.state.updates[key] && this.state.updates[key] !== this.props.device[key]);

    render() {
        let device = {
            id: this.props.device.id,
            title: this.getValue("title"),
            description: this.getValue("description"),
            fqbn: this.getValue("fqbn"),
            product_id: this.getValue("product_id"),
            firmware_id: this.getValue("firmware_id"),
            last_seen: this.props.device.last_seen ? moment(this.props.device.last_seen).fromNow() : "never",
        };

        let firmware = this.props.firmwares.find(firmware => firmware.id === device.firmware_id) || new Firmware();
        let products = this.props.products.filter(product => product.fqbn === device.fqbn);

        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.closeDialog}
                onKeyPress={this.handleKeyPress}
            >
                <DialogTitle>
                    Edit device
                </DialogTitle>
                <DialogContent dividers>
                    <TextField
                        disabled
                        margin="dense"
                        id="id"
                        name="id"
                        label="ID"
                        type="text"
                        fullWidth
                        value={device.id}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        name="title"
                        label="Title"
                        type="text"
                        fullWidth
                        value={device.title}
                        onChange={this.handleChange}
                    />
                    <TextField
                        margin="dense"
                        id="description"
                        name="description"
                        label="Description"
                        type="text"
                        multiline
                        fullWidth
                        value={device.description}
                        onChange={this.handleChange}
                    />
                    <FqbnSelectComponent
                        disabled
                        fqbn={device.fqbn}
                        onChange={this.handleFqbnChange}
                    />
                    <ProductSelectComponent
                        product_id={device.product_id}
                        products={products}
                        onChange={this.handleChange}
                    />
                    <TextField
                        disabled
                        margin="dense"
                        id="firmware_id"
                        name="firmware_id"
                        label="Installed firmware"
                        type="text"
                        fullWidth
                        value={firmware.id ? `${firmware.title} (${firmware.id})` : "unknown"}
                    />
                    <TextField
                        disabled
                        margin="dense"
                        id="last_seen"
                        name="last_seen"
                        label="Last seen"
                        type="text"
                        fullWidth
                        value={device.last_seen}
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

const mapStateToProps = (state) => {
    let deviceId = state.dialogReducer.props.deviceId;
    let device = state.devicesReducer.devices.find(device => device.id === deviceId) || new Device();
    return {
        device,
        open: state.dialogReducer.open,
        firmwares: state.firmwaresReducer.firmwares,
        products: state.productsReducer.products
    };
};

const mapDispatchToProps = {
    closeDialog,
    editDevice
};

export default connect(mapStateToProps, mapDispatchToProps)(
    DeviceDialogComponent
);
