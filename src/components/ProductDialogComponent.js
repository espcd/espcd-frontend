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
        this.updates = {};
        this.state = {
            product: new Product()
        };
    }

    setProduct() {
        let product = this.props.products.find(product => product.id === this.props.productId) || new Product();
        this.setState({
            product: {...product}
        });
    }

    componentDidMount() {
        this.setProduct();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.productId !== prevProps.productId) {
            this.setProduct();
        }
    }

    handleChange = (event, value) => {
        let key;
        if (value) {
            // autocomplete component onChange event
            key = "fqbn";
        } else {
            let target = event.target;
            key = target.name;
            value = target.type === "checkbox" ? target.checked : target.value;
        }

        this.updates[key] = value;

        let product = this.state.product;
        product[key] = value;
        this.setState({
            product: product
        });
    };

    handleKeyPress = (event) => {
        if (event.key === "Enter" && event.target.type !== "textarea") {
            this.handleSubmit();
        }
    };

    handleSubmit = () => {
        let productId = this.state.product.id;
        let payload = this.updates;

        if (this.props.productId) {
            this.props.editProduct(productId, payload)
                .then(() => this.props.closeDialog());
        } else {
            this.props.createProduct(payload)
                .then(() => this.props.closeDialog());
        }
    };

    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.closeDialog}
                onKeyPress={this.handleKeyPress}
            >
                <DialogTitle>
                    {this.props.productId ? "Edit product" : "Add product"}
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
                        value={this.state.product.id}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        name="title"
                        label="Title"
                        type="text"
                        fullWidth
                        value={this.state.product.title}
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
                        value={this.state.product.description}
                        onChange={this.handleChange}
                    />
                    <FqbnSelectComponent
                        fqbn={this.state.product.fqbn}
                        onChange={this.handleChange}
                    />
                    <FormControlLabel
                        style={{width: "100%"}}
                        control={
                            <Checkbox
                                checked={this.state.product.auto_update}
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
                        disabled={!this.props.productId}
                    >
                        <InputLabel id="firmware-select-label">
                            Latest firmware
                        </InputLabel>
                        <Select
                            labelId="firmware-select-label"
                            id="firmware_id"
                            name="firmware_id"
                            value={this.state.product.firmware_id}
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
    let firmwares = state.firmwaresReducer.firmwares.filter(firmware => firmware.product_id === productId);
    return {
        open: state.dialogReducer.open,
        productId,
        products: state.productsReducer.products,
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
