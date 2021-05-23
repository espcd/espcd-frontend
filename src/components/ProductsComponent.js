import React, {Component} from "react";
import {
    Button,
    Fab,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    withStyles
} from "@material-ui/core";
import {deleteProduct, getProducts} from "../actions/products";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {Add, Delete, Edit} from "@material-ui/icons";
import {openConfirmationDialog} from "../actions/confirmationDialog";

const styles = theme => ({
    button: {
        textTransform: 'none'
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2)
    },
    spacing: {
        height: theme.spacing(8)
    }
});

class ProductsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }

    deleteProduct(product) {
        this.props.openConfirmationDialog(
            "Delete product",
            `Are you sure you want to delete the product ${product.id}?`,
            () => this.props.deleteProduct(product.id)
        )
    }

    render() {
        const {classes} = this.props;

        return (
            <React.Fragment>
                <Paper>
                    <TableContainer>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    {
                                        ["Title", "Description", "Auto update", "Latest firmware", ""].map(
                                            row => (
                                                <TableCell key={`products-table-head-${row}`}>{row}</TableCell>
                                            )
                                        )
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.products.map(product => (
                                    <TableRow
                                        hover
                                        key={`product-table-body-${product.id}`}
                                    >
                                        <TableCell>{product.title}</TableCell>
                                        <TableCell>{product.description}</TableCell>
                                        <TableCell>{product.auto_update ? "yes" : "no"}</TableCell>
                                        <TableCell>{product.firmware_id}</TableCell>
                                        <TableCell align="right">
                                            <Button onClick={() => this.props.history.push(`/products/${product.id}`)}>
                                                <Edit/>
                                            </Button>
                                            <Button onClick={() => this.deleteProduct(product)}>
                                                <Delete/>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
                <div className={classes.spacing}/>
                <Tooltip title="Add Product" aria-label="add product">
                    <Fab color="primary"
                         className={classes.fab}
                         onClick={() => this.props.history.push('/products/new')}
                    >
                        <Add/>
                    </Fab>
                </Tooltip>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    products: state.productsReducer.products,
    error: state.productsReducer.error,
    loaded: state.productsReducer.loaded
});

const mapDispatchToProps = {
    getProducts,
    deleteProduct,
    openConfirmationDialog
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(
        withStyles(styles)(
            ProductsComponent
        )
    )
);
