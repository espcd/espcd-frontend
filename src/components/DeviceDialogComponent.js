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

    handleSubmit = () => {
        let deviceId = this.state.device.id;
        let payload = this.updates;

        this.props.editDevice(deviceId, payload);
    };

    render() {
        let firmware = this.props.firmwares.find(firmware => firmware.id === this.state.device.firmware_id) || new Firmware();

        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.closeDialog}
            >
                <DialogTitle>
                    Edit device
                </DialogTitle>
                <DialogContent dividers>
                    <TextField
                        InputLabelProps={{shrink: true}}
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
                        InputLabelProps={{shrink: true}}
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
                        InputLabelProps={{shrink: true}}
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
                    <TextField
                        InputLabelProps={{shrink: true}}
                        disabled
                        margin="dense"
                        id="model"
                        name="model"
                        label="Model"
                        type="text"
                        fullWidth
                        value={this.state.device.model}
                    />
                    <FormControl
                        fullWidth
                        margin="dense"
                    >
                        <InputLabel
                            id="product-select-label"
                            shrink={true}
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
                                    {product.title} ({product.id})
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        InputLabelProps={{shrink: true}}
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
                        InputLabelProps={{shrink: true}}
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
                        onClick={() => {
                            this.handleSubmit();
                            this.props.closeDialog();
                        }}
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
