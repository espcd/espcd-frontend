import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {createFirmware, editFirmware} from "../actions/firmwares";
import {connect} from "react-redux";
import {Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField, withStyles} from "@material-ui/core";
import Firmware from "../data-classes/Firmware";

const styles = theme => ({
    button: {
        marginTop: theme.spacing(2)
    },
    paper: {
        padding: '16px'
    }
});

class FirmwareComponent extends Component {
    constructor(props) {
        super(props);
        this.updates = {}
        this.state = {
            firmware: new Firmware(),
            selectedFile: null
        }
    }

    setFirmware() {
        let firmware = this.props.firmwares.find(firmware => firmware.id === this.props.match.params.id) || new Firmware()
        this.setState({
            firmware: {...firmware}
        })
    }

    componentDidMount() {
        this.setFirmware()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.firmwares !== prevProps.firmwares) {
            this.setFirmware()
        }
    }

    handleChange = (event) => {
        let target = event.target
        let key = target.name
        let value = target.value

        this.updates[key] = value

        let firmware = this.state.firmware
        firmware[key] = value
        this.setState({
            firmware: firmware
        })
    }

    handleSubmit = () => {
        let firmwareId = this.state.firmware.id
        let payload = this.updates
        let file = this.selectedFile

        this.props.isPresent ?
            this.props.editFirmware(firmwareId, payload, file)
            :
            this.props.createFirmware(payload, file)
    }

    selectFile(event) {
        const target = event.target;
        this.setState({
            selectedFile: target.files[0]
        })
    }

    render() {
        const {classes} = this.props;

        return (
            <Paper className={classes.paper}>
                <TextField
                    disabled
                    margin="dense"
                    id="id"
                    name="id"
                    label="ID"
                    type="text"
                    fullWidth
                    value={this.state.firmware.id}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="title"
                    name="title"
                    label="Title"
                    type="text"
                    fullWidth
                    value={this.state.firmware.title}
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
                    value={this.state.firmware.description ? this.state.firmware.description : ""}
                    onChange={this.handleChange}
                />
                <TextField
                    margin="dense"
                    id="model"
                    name="model"
                    label="Model"
                    type="text"
                    fullWidth
                    value={this.state.firmware.model}
                    onChange={this.handleChange}
                />
                <TextField
                    margin="dense"
                    id="version"
                    name="version"
                    label="Version"
                    type="text"
                    fullWidth
                    value={this.state.firmware.version}
                    onChange={this.handleChange}
                />
                <FormControl
                    fullWidth
                    margin="dense"
                >
                    <label
                        htmlFor="firmware-file-label"
                        className="MuiFormLabel-root MuiInputLabel-formControl MuiInputLabel-shrink"
                    >
                        File
                    </label>
                    <input
                        id="firmware-file-label"
                        name="content"
                        type="file"
                        onChange={this.selectFile}
                        className="MuiInputBase-root MuiInput-formControl"
                    />
                </FormControl>
                <FormControl
                    fullWidth
                    margin="dense"
                >
                    <InputLabel id="product-select-label">
                        Product
                    </InputLabel>
                    <Select
                        labelId="product-select-label"
                        id="product_id"
                        name="product_id"
                        value={this.state.firmware.product_id}
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
                    onClick={this.handleSubmit}
                >
                    {this.props.isPresent ? "Edit firmware" : "Create firmware"}
                </Button>
            </Paper>
        )
    }
}

const mapStateToProps = (state) => ({
    firmwares: state.firmwaresReducer.firmwares,
    products: state.productsReducer.products
})

const mapDispatchToProps = {
    createFirmware,
    editFirmware
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(
        withStyles(styles)(
            FirmwareComponent
        )
    )
);
