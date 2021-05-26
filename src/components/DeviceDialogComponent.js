import React, {Component} from "react";
import {connect} from "react-redux";
import {editDevice} from "../actions/devices";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@material-ui/core";
import Device from "../data-classes/Device";
import Firmware from "../data-classes/Firmware";
import moment from "moment";
import {closeDialog} from "../actions/dialog";
import ModelSelectComponent from "./ModelSelectComponent";
import ProductSelectComponent from "./ProductSelectComponent";

class DeviceDialogComponent extends Component {
    constructor(props) {
        super(props);
        this.updates = {};
        this.state = {
            device: new Device()
        };
    }

    setDevice() {
        let device = this.props.devices.find(device => device.id === this.props.deviceId);
        this.setState({
            device: {...device}
        });
    }

    componentDidMount() {
        this.setDevice();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.deviceId !== prevProps.deviceId) {
            this.setDevice();
        }
    }

    handleChange = (event) => {
        let target = event.target;
        let key = target.name;
        let value = target.value;

        this.updates[key] = value;

        let device = this.state.device;
        device[key] = value;
        this.setState({
            device: device
        });
    };

    handleKeyPress = (event) => {
        if (event.key === "Enter") {
            this.handleSubmit();
        }
    };

    handleSubmit = () => {
        let deviceId = this.state.device.id;
        let payload = this.updates;

        this.props.editDevice(deviceId, payload)
            .then(() => this.props.closeDialog());
    };

    render() {
        let firmware = this.props.firmwares.find(firmware => firmware.id === this.state.device.firmware_id) || new Firmware();

        let model = this.updates.model ? this.updates.model : this.state.device.model;
        let products = this.props.products.filter(product => {
            let productModel = product.model ? product.model.toLocaleLowerCase() : null;
            let modelLow = model ? model.toLocaleLowerCase() : null;
            return productModel === modelLow;
        });

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
                        value={this.state.device.id}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        name="title"
                        label="Title"
                        type="text"
                        fullWidth
                        value={this.state.device.title}
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
                        value={this.state.device.description}
                        onChange={this.handleChange}
                    />
                    <ModelSelectComponent
                        disabled
                        model={this.state.device.model}
                        onChange={this.handleChange}
                    />
                    <ProductSelectComponent
                        product_id={this.state.device.product_id}
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
                        value={this.state.device.last_seen ? moment(this.state.device.last_seen).fromNow() : "never"}
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
    deviceId: state.dialogReducer.props.deviceId,
    devices: state.devicesReducer.devices,
    firmwares: state.firmwaresReducer.firmwares,
    products: state.productsReducer.products
});

const mapDispatchToProps = {
    closeDialog,
    editDevice
};

export default connect(mapStateToProps, mapDispatchToProps)(
    DeviceDialogComponent
);
