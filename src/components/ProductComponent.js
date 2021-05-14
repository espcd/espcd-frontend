import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {createProduct, editProduct, getProducts} from "../actions/products";
import {connect} from "react-redux";
import {Button, Checkbox, FormControlLabel, Paper, TextField, withStyles} from "@material-ui/core";
import Product from "../data-classes/Product";
import {getFirmwares} from "../actions/firmwares";
import {getDevices} from "../actions/devices";

const styles = theme => ({
    button: {
        marginTop: theme.spacing(2)
    },
    paper: {
        padding: '16px'
    }
});

class ProductComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: new Product()
        }
    }

    componentDidMount() {
        this.props.getDevices()
        this.props.getFirmwares()
        this.props.getProducts()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.products !== prevProps.products) {
            let product = this.props.products
                .find(product => product.id === this.props.match.params.id) || new Product()
            this.setState({
                product: {...product}
            })
        }
    }

    handleChange = (event) => {
        const target = event.target
        let product = this.state.product
        if (target.type === 'checkbox') {
            product[target.name] = target.checked
        } else {
            product[target.name] = target.value
        }
        this.setState({
            product: product
        })
    }

    handleSubmit = () => {
        this.props.isPresent ?
            this.props.editProduct(this.state.product) :
            this.props.createProduct(this.state.product)
    }

    render() {
        const {classes} = this.props

        let shrink = !!this.props.isPresent

        return (
            <Paper className={classes.paper}>
                <TextField
                    InputLabelProps={{shrink: shrink}}
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
                    InputLabelProps={{shrink: shrink}}
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
                    InputLabelProps={{shrink: shrink}}
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
                <FormControlLabel
                    style={{width: '100%'}}
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
                <p>
                    Devices: {this.props.devices.map(device => device.id).join(', ')}
                </p>
                <p>
                    Firmwares: {this.props.firmwares.map(firmware => firmware.id).join(', ')}
                </p>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={this.handleSubmit}
                >
                    {this.props.isPresent ? "Edit product" : "Create product"}
                </Button>
            </Paper>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    let productId = ownProps.match.params.id
    let devices = state.devicesReducer.devices.filter(device => device.product_id === productId);
    let firmwares = state.firmwaresReducer.firmwares.filter(firmware => firmware.product_id === productId);
    return {
        products: state.productsReducer.products,
        devices,
        firmwares
    }
}

const mapDispatchToProps = {
    getDevices,
    getFirmwares,
    getProducts,
    createProduct,
    editProduct
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(
        withStyles(styles)(
            ProductComponent
        )
    )
);
