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
    TableSortLabel,
    Tooltip,
    withStyles
} from "@material-ui/core";
import {deleteProduct, setProductQuery, setProductSort} from "../actions/products";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {Add, Delete, Edit} from "@material-ui/icons";
import {CONFIRMATION_DIALOG, openDialog, PRODUCT_DIALOG} from "../actions/dialog";
import {getFilteredAndSortedProducts} from "../selectors/products";
import TableSearchComponent from "./TableSearchComponent";

const styles = theme => ({
    button: {
        textTransform: "none"
    },
    fab: {
        position: "fixed",
        bottom: theme.spacing(2),
        right: theme.spacing(2)
    },
    spacing: {
        height: theme.spacing(8)
    }
});

class ProductsComponent extends Component {
    deleteProduct(product) {
        this.props.openDialog(
            CONFIRMATION_DIALOG,
            {
                title: "Delete product",
                content: `Are you sure you want to delete the product ${product.id}?`,
                handleOk: () => this.props.deleteProduct(product.id)
            }
        );
    }

    openDeviceDialog(productId = null) {
        this.props.openDialog(
            PRODUCT_DIALOG,
            {
                productId
            }
        );
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
                                        [
                                            {key: "title", label: "Title"},
                                            {key: "description", label: "Description"},
                                            {key: "model", label: "Model"},
                                            {key: "auto_update", label: "Auto update"},
                                            {key: "firmware_id", label: "Latest firmware"},
                                        ].map(
                                            row => (
                                                <TableCell key={`products-table-head-${row.key}`}>
                                                    <TableSortLabel
                                                        active={this.props.sortBy === row.key}
                                                        direction={this.props.sortOrder}
                                                        onClick={() => this.props.setProductSort(row.key, this.props.sortOrder)}
                                                    >
                                                        {row.label}
                                                    </TableSortLabel>
                                                </TableCell>
                                            )
                                        )
                                    }
                                    <TableCell key={`products-table-head-search`} align="right">
                                        <TableSearchComponent setQuery={this.props.setProductQuery}/>
                                    </TableCell>
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
                                        <TableCell>{product.model}</TableCell>
                                        <TableCell>{product.auto_update ? "yes" : "no"}</TableCell>
                                        <TableCell>{product.firmware_id}</TableCell>
                                        <TableCell align="right">
                                            <Button onClick={() => this.openDeviceDialog(product.id)}>
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
                         onClick={() => this.openDeviceDialog()}
                    >
                        <Add/>
                    </Fab>
                </Tooltip>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    products: getFilteredAndSortedProducts(state),
    query: state.productsReducer.query,
    sortBy: state.productsReducer.sortBy,
    sortOrder: state.productsReducer.sortOrder
});

const mapDispatchToProps = {
    deleteProduct,
    setProductQuery,
    setProductSort,
    openDialog
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(
        withStyles(styles)(
            ProductsComponent
        )
    )
);
