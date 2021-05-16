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

const styles = theme => ({
    button: {
        textTransform: 'none'
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2)
    }
});

class ProductsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
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
                                            <Button onClick={() => this.props.deleteProduct(product.id)}>
                                                <Delete/>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
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
    deleteProduct
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(
        withStyles(styles)(
            ProductsComponent
        )
    )
);
