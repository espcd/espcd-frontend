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
import {closeDialog} from "../actions/dialogs";
import {objectValueChanged} from "./common";

class ProductDialogComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updates: {}
        };
    }

    handleChange = (event) => {
        let target = event.target;
        let key = target.name;
        let value;
        if (target.type === "checkbox") {
            value = target.checked;
        } else if (target.type === "number") {
            value = parseInt(target.value);
            if (isNaN(value)) {
                value = 0;
            }
        } else {
            value = target.value;
        }

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

    valueChanged = key => objectValueChanged(this.state.updates, this.props.product, key);

    getValue = key => this.valueChanged(key) ? this.state.updates[key] : this.props.product[key];

    submitDisabled = () => !Object.keys(this.props.product).some(key => this.valueChanged(key));

    render() {
        let product = {
            id: this.props.product.id,
            title: this.getValue("title"),
            description: this.getValue("description"),
            auto_update: this.getValue("auto_update"),
            check_interval: this.getValue("check_interval"),
            lock_firmwares: this.getValue("lock_firmwares")
        };

        return (
            <Dialog
                fullWidth
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
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={product.lock_firmwares}
                                onChange={this.handleChange}
                                id="lock_firmwares"
                                name="lock_firmwares"
                                color="primary"
                            />
                        }
                        label="Lock firmwares"
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
    let productId = state.dialogsReducer.props.productId;
    let product = state.productsReducer.products.find(product => product.id === productId) || new Product();
    return {
        open: state.dialogsReducer.open,
        isPresent: !!productId,
        product
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
