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
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@material-ui/core";
import Product from "../data-classes/Product";
import {closeDialog} from "../actions/dialog";
import FqbnSelectComponent from "./FqbnSelectComponent";

class ProductDialogComponent extends Component {
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
        if (event.key === "Enter" && event.target.type !== "textarea") {
            this.handleSubmit();
        }
    };

    handleSubmit = () => {
        let productId = this.props.product.id;
        let payload = this.state.updates;

        if (this.props.isPresent) {
            this.props.editProduct(productId, payload)
                .then(() => this.props.closeDialog());
        } else {
            this.props.createProduct(payload)
                .then(() => this.props.closeDialog());
        }
    };

    getValue = (key, defaultValue = "") => {
        let res = this.state.updates[key] ? this.state.updates[key] : this.props.product[key];
        return res ? res : defaultValue;
    };

    render() {
        let product = {
            id: this.props.product.id,
            title: this.getValue("title"),
            description: this.getValue("description"),
            fqbn: this.getValue("fqbn"),
            auto_update: this.getValue("auto_update", false),
            firmware_id: this.getValue("firmware_id")
        };

        let okButtonDisabled = !Object.keys(this.props.product).some(key =>
            this.state.updates[key] && this.state.updates[key] !== this.props.product[key]);

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
                    <FqbnSelectComponent
                        fqbn={product.fqbn}
                        onChange={this.handleFqbnChange}
                    />
                    <FormControlLabel
                        style={{width: "100%"}}
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
                    <FormControl
                        fullWidth
                        margin="dense"
                        disabled={!this.props.isPresent}
                    >
                        <InputLabel id="firmware-select-label">
                            Latest firmware
                        </InputLabel>
                        <Select
                            labelId="firmware-select-label"
                            id="firmware_id"
                            name="firmware_id"
                            value={product.firmware_id}
                            onChange={this.handleChange}
                        >
                            <MenuItem value={""} key={`firmware-menuitem-`}>-</MenuItem>
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
                        disabled={okButtonDisabled}
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
    let firmwares = state.firmwaresReducer.firmwares.filter(firmware => firmware.product_id === productId);
    return {
        open: state.dialogReducer.open,
        isPresent: !!productId,
        productId,
        product,
        firmwares
    };
};

const mapDispatchToProps = {
    closeDialog,
    createProduct,
    editProduct
};

export default connect(mapStateToProps, mapDispatchToProps)(
    ProductDialogComponent
);
