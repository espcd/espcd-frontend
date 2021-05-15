import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {getFirmwares} from "../actions/firmwares";
import {connect} from "react-redux";
import {editDevice, getDevices} from "../actions/devices";
import {Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField, withStyles} from "@material-ui/core";
import Device from "../data-classes/Device";
import Firmware from "../data-classes/Firmware";
import {getProducts} from "../actions/products";

const styles = theme => ({
    button: {
        marginTop: theme.spacing(2)
    },
    paper: {
        padding: '16px'
    }
});

class DeviceComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            device: new Device()
        }
    }

    setDevice() {
        let device = this.props.devices.find(device => device.id === this.props.match.params.id)
        this.setState({
            device: {...device}
        })
    }

    componentDidMount() {
        this.setDevice()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.devices !== prevProps.devices) {
            this.setDevice()
        }
    }

    handleChange = (event) => {
        const target = event.target
        let device = this.state.device
        device[target.name] = target.value
        this.setState({
            device: device
        })
    }

    render() {
        const {classes} = this.props;

        let current_firmware = this.props.firmwares
            .find(firmware => firmware.id === this.state.device.current_firmware_id) || new Firmware()

        return (
            <Paper className={classes.paper}>
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
                <TextField
                    InputLabelProps={{shrink: true}}
                    disabled
                    margin="dense"
                    id="current_firmware_id"
                    name="current_firmware_id"
                    label="Current Firmware"
                    type="text"
                    fullWidth
                    value={current_firmware.id ? `${current_firmware.title} (${current_firmware.id})` : 'none'}
                />
                <FormControl
                    fullWidth
                    margin="dense"
                >
                    <InputLabel
                        id="firmware-select-label"
                        shrink={true}
                    >
                        Available firmware
                    </InputLabel>
                    <Select
                        labelId="firmware-select-label"
                        id="available_firmware_id"
                        name="available_firmware_id"
                        value={this.state.device.available_firmware_id}
                        onChange={this.handleChange}
                    >
                        {this.props.firmwares.map(firmware => (
                            <MenuItem
                                value={firmware.id}
                                key={`firmware-menuitem-${firmware.id}`}
                            >
                                {firmware.title} ({firmware.id})
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
                        <MenuItem value={''} key={`product-menuitem-none`}>-</MenuItem>
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
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={() => this.props.editDevice(this.state.device)}
                >
                    Edit device
                </Button>
            </Paper>
        )
    }
}

const mapStateToProps = (state) => ({
    devices: state.devicesReducer.devices,
    firmwares: state.firmwaresReducer.firmwares,
    products: state.productsReducer.products
})

const mapDispatchToProps = {
    getFirmwares,
    getDevices,
    editDevice,
    getProducts
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(
        withStyles(styles)(
            DeviceComponent
        )
    )
);
