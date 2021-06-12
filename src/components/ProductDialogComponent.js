import React, {Component} from "react";
import {createProduct, editProduct} from "../actions/products";
import {connect} from "react-redux";
import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    InputAdornment,
    TextField
} from "@material-ui/core";
import Product from "../data-classes/Product";
import {closeDialog} from "../actions/dialog";
import FqbnSelectComponent from "./FqbnSelectComponent";
import FirmwareSelectComponent from "./FirmwareSelectComponent";
import {editFirmware} from "../actions/firmwares";

class ProductDialogComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updates: {},
            fqbn: "",
            firmware_id: ""
        };
    }

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

    handleFqbnChange = (event, value) => {
        let fqbn = value;
        let firmware = this.props.firmwares.find(firmware =>
            firmware.product_id === this.props.productId && firmware.fqbn === fqbn);
        let firmware_id = firmware ? firmware.id : "";
        this.setState({
            fqbn,
            firmware_id
        });
    };

    handleFirmwareChange = (event) => {
        this.setState({
            firmware_id: event.target.value
        });
    };

    handleKeyPress = (event) => {
        if (event.key === "Enter" && this.submitEnabled() && event.target.type !== "textarea") {
            this.handleSubmit();
        }
    };

    handleSubmit = () => {
        let productId = this.props.product.id;
        let payload = this.state.updates;

        if (this.props.isPresent) {
            if (this.productChanged()) {
                this.props.editProduct(productId, payload)
                    .then(() => this.props.closeDialog());
            }
            if (this.productFirmwareChanged()) {
                this.props.editFirmware(this.state.firmware_id, {product_id: productId})
                    .then(() => this.props.closeDialog());
            }
        } else {
            if (this.productChanged()) {
                this.props.createProduct(payload)
                    .then(() => this.props.closeDialog());
            }
            if (this.productFirmwareChanged()) {
                this.props.editFirmware(this.state.firmware_id, {product_id: productId})
                    .then(() => this.props.closeDialog());
            }
        }
    };

    getValue = (key, defaultValue = "") => {
        let res = this.state.updates.hasOwnProperty(key) ? this.state.updates[key] : this.props.product[key];
        return res ? res : defaultValue;
    };

    submitEnabled = () => this.productChanged() || this.productFirmwareChanged();

    productChanged = () => Object.keys(this.props.product).some(key =>
        this.state.updates.hasOwnProperty(key) && this.state.updates[key] !== this.props.product[key]
    );

    productFirmwareChanged = () => this.state.fqbn && this.state.firmware_id;

    render() {
        let product = {
            id: this.props.product.id,
            title: this.getValue("title"),
            description: this.getValue("description"),
            auto_update: this.getValue("auto_update", false),
            check_interval: this.getValue("check_interval")
        };

        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.closeDialog}
                onKeyPress={this.handleKeyPress}
            >
                <DialogTitle>
                    {this.props.isPresent ? "Edit product" : "Add product"}
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
                        value={product.id}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        name="title"
                        label="Title"
                        type="text"
                        fullWidth
                        value={product.title}
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
                        value={product.description}
                        onChange={this.handleChange}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={product.auto_update}
                                onChange={this.handleChange}
                                id="auto_update"
                                name="auto_update"
                                color="primary"
                            />
                        }
                        label="Auto update"
                    />
                    <TextField
                        margin="dense"
                        id="check_interval"
                        name="check_interval"
                        label="Check interval"
                        type="number"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">s</InputAdornment>,
                        }}
                        fullWidth
                        value={product.check_interval}
                        onChange={this.handleChange}
                    />
                    <FqbnSelectComponent
                        options={this.props.fqbns}
                        fqbn={this.state.fqbn}
                        onChange={this.handleFqbnChange}
                    />
                    <FirmwareSelectComponent
                        fqbn={this.state.fqbn}
                        firmware_id={this.state.firmware_id}
                        onChange={this.handleFirmwareChange}
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
                        disabled={!this.submitEnabled()}
                    >
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

const mapStateToProps = (state) => {
    let productId = state.dialogReducer.props.productId;
    let product = state.productsReducer.products.find(product => product.id === productId) || new Product();
    let firmwares = state.firmwaresReducer.firmwares;
    return {
        open: state.dialogReducer.open,
        isPresent: !!productId,
        productId,
        product,
        firmwares,
        fqbns: [...new Set(firmwares.map(firmware => firmware.fqbn))]
    };
};

const mapDispatchToProps = {
    closeDialog,
    createProduct,
    editProduct,
    editFirmware
};

export default connect(mapStateToProps, mapDispatchToProps)(
    ProductDialogComponent
);
