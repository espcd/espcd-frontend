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
import {deleteToken, setTokenQuery, setTokenSort} from "../actions/tokens";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {Add, Delete, Edit} from "@material-ui/icons";
import {openConfirmationDialog, openProductDialog, openTokenDialog} from "../actions/dialogs";
import {getFilteredAndSortedTokens} from "../selectors/tokens";
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

class TokensComponent extends Component {
    deleteToken(token) {
        this.props.openConfirmationDialog({
            title: "Delete token",
            content: `Are you sure you want to delete the token ${token.id}?`,
            handleOk: () => this.props.deleteToken(token.id)
        });
    }

    openTokenDialog(tokenId = null) {
        this.props.openTokenDialog({
            tokenId
        });
    }

    openProductDialog(productId = null) {
        this.props.openProductDialog({
            productId
        });
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
                                            {key: "token", label: "Token"},
                                            {key: "product_id", label: "Product"},
                                            {key: "expires_at", label: "Expires at"},
                                            {key: "updated_at", label: "Date"}
                                        ].map(
                                            row => (
                                                <TableCell key={`tokens-table-head-${row.key}`}>
                                                    <TableSortLabel
                                                        active={this.props.sortBy === row.key}
                                                        direction={this.props.sortOrder}
                                                        onClick={() => this.props.setTokenSort(row.key, this.props.sortOrder)}
                                                    >
                                                        {row.label}
                                                    </TableSortLabel>
                                                </TableCell>
                                            )
                                        )
                                    }
                                    <TableCell key={`tokens-table-head-search`} align="right">
                                        <TableSearchComponent
                                            query={this.props.query}
                                            setQuery={this.props.setTokenQuery}
                                        />
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.tokens.map(token => (
                                    <TableRow
                                        hover
                                        key={`token-table-body-${token.id}`}
                                    >
                                        <TableCell>{token.id}</TableCell>
                                        <TableCell>{token.title}</TableCell>
                                        <TableCell>{token.token}</TableCell>
                                        <TableCell
                                            style={token.product_id ? {cursor: "pointer"} : {}}
                                            onClick={() => token.product_id ? this.openProductDialog(token.product_id) : {}}
                                        >
                                            {token.product_id ? token.product_id : "none"}
                                        </TableCell>
                                        <TableCell>
                                            <TimeComponent datetime={token.expires_at} onPast="expired"/>
                                        </TableCell>
                                        <TableCell>
                                            <TimeComponent datetime={token.updated_at}/>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Tooltip title="Edit token" aria-label="edit token">
                                                <IconButton
                                                    color="inherit"
                                                    onClick={() => this.openTokenDialog(token.id)}
                                                >
                                                    <Edit/>
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete token" aria-label="delete token">
                                                <IconButton
                                                    color="inherit"
                                                    onClick={() => this.deleteToken(token)}
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
                    title="Add Token"
                    aria-label="add token"
                >
                    <Fab
                        color="primary"
                        className={classes.fab}
                        onClick={() => this.openTokenDialog()}
                    >
                        <Add/>
                    </Fab>
                </Tooltip>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    tokens: getFilteredAndSortedTokens(state),
    query: state.tokensReducer.query,
    sortBy: state.tokensReducer.sortBy,
    sortOrder: state.tokensReducer.sortOrder
});

const mapDispatchToProps = {
    deleteToken,
    setTokenQuery,
    setTokenSort,
    openConfirmationDialog,
    openTokenDialog,
    openProductDialog
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(
        withStyles(styles)(
            TokensComponent
        )
    )
);
