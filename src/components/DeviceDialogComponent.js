import React, {Component} from "react";
import {connect} from "react-redux";
import {editDevice} from "../actions/devices";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@material-ui/core";
import Device from "../data-classes/Device";
import Firmware from "../data-classes/Firmware";
import moment from "moment";
import {closeDialog} from "../actions/dialog";
import Models from "../data-classes/Models";

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
        if (this.props.devices !== prevProps.devices || this.props.deviceId !== prevProps.deviceId) {
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
                    <FormControl
                        fullWidth
                        margin="dense"
                        disabled
                    >
                        <InputLabel id="model-select-label">Model</InputLabel>
                        <Select
                            labelId="model-select-label"
                            id="model"
                            name="model"
                            value={this.state.device.model}
                            onChange={this.handleChange}
                        >
                            <MenuItem value={""} key={`model-menuitem-`}>-</MenuItem>
                            {Models.map(model => (
                                <MenuItem
                                    value={model}
                                    key={`model-menuitem-${model}`}
                                >
                                    {model}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl
                        fullWidth
                        margin="dense"
                    >
                        <InputLabel
                            id="product-select-label"
                        >
                            Product
                        </InputLabel>
                        <Select
                            labelId="product-select-label"
                            id="product_id"
                            name="product_id"
                            value={this.state.device.product_id}
                            onChange={this.handleChange}
                        >
                            <MenuItem value={""} key={`product-menuitem-`}>-</MenuItem>
                            {this.props.products.map(product => (
                                <MenuItem
                                    value={product.id}
                                    key={`product-menuitem-${product.id}`}
                                >
                                    {product.title ? product.title : product.id} ({product.model})
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
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

const mapStateToProps = (state) => {
    let deviceId = state.dialogReducer.props.deviceId;
    let devices = state.devicesReducer.devices;
    let device = devices.find(device => device.id === deviceId);
    let products = state.productsReducer.products.filter(product => {
        let productModel = product.model ? product.model.toLocaleLowerCase() : null;
        let deviceModel = device.model.toLocaleLowerCase();
        return productModel === deviceModel;
    });
    return {
        open: state.dialogReducer.open,
        deviceId,
        devices,
        firmwares: state.firmwaresReducer.firmwares,
        products
    };
};

const mapDispatchToProps = {
    closeDialog,
    editDevice
};

export default connect(mapStateToProps, mapDispatchToProps)(
    DeviceDialogComponent
);
