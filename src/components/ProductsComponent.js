import React, {Component} from "react";
import {
    Fab,
    IconButton,
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
import {Add, Delete, Edit, Memory} from "@material-ui/icons";
import {CONFIRMATION_DIALOG, FIRMWARE_HISTORY_COMPONENT, openDialog, PRODUCT_DIALOG} from "../actions/dialog";
import {getFilteredAndSortedProducts} from "../selectors/products";
import TableSearchComponent from "./TableSearchComponent";
import TimeComponent from "./TimeComponent";

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

    openProductDialog(productId = null) {
        this.props.openDialog(
            PRODUCT_DIALOG,
            {
                productId
            }
        );
    }

    openFirmwareHistoryDialog(productId) {
        this.props.openDialog(
            FIRMWARE_HISTORY_COMPONENT,
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
                                            {key: "id", label: "ID"},
                                            {key: "title", label: "Title"},
                                            {key: "auto_update", label: "Auto update"},
                                            {key: "lock_firmwares", label: "Lock firmwares"},
                                            {key: "check_interval", label: "Check interval"},
                                            {key: "updated_at", label: "Date"}
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
                                        <TableSearchComponent
                                            query={this.props.query}
                                            setQuery={this.props.setProductQuery}
                                        />
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.products.map(product => (
                                    <TableRow
                                        hover
                                        key={`product-table-body-${product.id}`}
                                    >
                                        <TableCell>{product.id}</TableCell>
                                        <TableCell>{product.title}</TableCell>
                                        <TableCell>{product.auto_update ? "yes" : "no"}</TableCell>
                                        <TableCell>{product.lock_firmwares ? "yes" : "no"}</TableCell>
                                        <TableCell>{product.check_interval} s</TableCell>
                                        <TableCell>
                                            <TimeComponent datetime={product.updated_at}/>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Tooltip
                                                title="Edit product"
                                                aria-label="edit product"
                                            >
                                                <IconButton
                                                    color="inherit"
                                                    onClick={() => this.openProductDialog(product.id)}
                                                >
                                                    <Edit/>
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip
                                                title="Edit product firmware"
                                                aria-label="edit product firmware"
                                            >
                                                <IconButton
                                                    color="inherit"
                                                    onClick={() => this.openFirmwareHistoryDialog(product.id)}
                                                >
                                                    <Memory/>
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip
                                                title="Delete product"
                                                aria-label="delete product"
                                            >
                                                <IconButton
                                                    color="inherit"
                                                    onClick={() => this.deleteProduct(product)}
                                                >
                                                    <Delete/>
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
                <div className={classes.spacing}/>
                <Tooltip
                    title="Add Product"
                    aria-label="add product"
                >
                    <Fab
                        color="primary"
                        className={classes.fab}
                        onClick={() => this.openProductDialog()}
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
