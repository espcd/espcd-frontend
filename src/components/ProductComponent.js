import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {createProduct, editProduct} from "../actions/products";
import {connect} from "react-redux";
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    withStyles
} from "@material-ui/core";
import Product from "../data-classes/Product";

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

    setProduct() {
        let product = this.props.products.find(product => product.id === this.props.match.params.id) || new Product()
        this.setState({
            product: {...product}
        })
    }

    componentDidMount() {
        this.setProduct()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.products !== prevProps.products) {
            this.setProduct()
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
                <FormControl
                    fullWidth
                    margin="dense"
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
                        <MenuItem value={''} key={`firmware-menuitem-`}>-</MenuItem>
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
    let firmwares = state.firmwaresReducer.firmwares.filter(firmware => firmware.product_id === productId);
    return {
        products: state.productsReducer.products,
        firmwares
    }
}

const mapDispatchToProps = {
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
