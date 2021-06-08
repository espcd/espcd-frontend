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
import {Add, Delete, Edit, GetApp} from "@material-ui/icons";
import {deleteFirmware, setFirmwareQuery, setFirmwareSort} from "../actions/firmwares";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {backendUrl} from "../actions/common";
import {CONFIRMATION_DIALOG, FIRMWARE_DIALOG, openDialog} from "../actions/dialog";
import {getFilteredAndSortedFirmwares} from "../selectors/firmwares";
import TableSearchComponent from "./TableSearchComponent";
import moment from "moment";

const styles = theme => ({
    fab: {
        position: "fixed",
        bottom: theme.spacing(2),
        right: theme.spacing(2)
    },
    spacing: {
        height: theme.spacing(8)
    }
});

class FirmwaresComponent extends Component {
    deleteFirmware(firmware) {
        this.props.openDialog(
            CONFIRMATION_DIALOG,
            {
                title: "Delete firmware",
                content: `Are you sure you want to delete the firmware ${firmware.id}?`,
                handleOk: () => this.props.deleteFirmware(firmware.id)
            }
        );
    }

    openFirmwareDialog(firmwareId = null) {
        this.props.openDialog(
            FIRMWARE_DIALOG,
            {
                firmwareId
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
                                            {key: "fqbn", label: "FQBN"},
                                            {key: "version", label: "Version"},
                                            {key: "product_id", label: "Product"},
                                            {key: "updated_at", label: "Date"}
                                        ].map(
                                            row => (
                                                <TableCell key={`firmwares-table-head-${row.key}`}>
                                                    <TableSortLabel
                                                        active={this.props.sortBy === row.key}
                                                        direction={this.props.sortOrder}
                                                        onClick={() => this.props.setFirmwareSort(row.key, this.props.sortOrder)}
                                                    >
                                                        {row.label}
                                                    </TableSortLabel>
                                                </TableCell>
                                            )
                                        )
                                    }
                                    <TableCell key={`firmwares-table-head-search`} align="right">
                                        <TableSearchComponent
                                            query={this.props.query}
                                            setQuery={this.props.setFirmwareQuery}
                                        />
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.firmwares.map(firmware => (
                                    <TableRow
                                        hover
                                        key={`tablerow-firmware-${firmware.id}`}
                                    >
                                        <TableCell>{firmware.title}</TableCell>
                                        <TableCell>{firmware.fqbn}</TableCell>
                                        <TableCell>{firmware.version}</TableCell>
                                        <TableCell>{firmware.product_id}</TableCell>
                                        <TableCell>{moment(firmware.updated_at).fromNow()}</TableCell>
                                        <TableCell align="right">
                                            <Tooltip title="Download firmware" aria-label="download firmware">
                                                <IconButton
                                                    color="inherit"
                                                    href={`${backendUrl}/firmwares/${firmware.id}/content?api_key=${this.props.token}`}
                                                >
                                                    <GetApp/>
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Edit firmware" aria-label="edit firmware">
                                                <IconButton color="inherit"
                                                            onClick={() => this.openFirmwareDialog(firmware.id)}>
                                                    <Edit/>
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete firmware" aria-label="delete firmware">
                                                <IconButton color="inherit"
                                                            onClick={() => this.deleteFirmware(firmware)}>
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
                <Tooltip title="Add Firmware" aria-label="add firmware">
                    <Fab color="primary"
                         className={classes.fab}
                         onClick={() => this.openFirmwareDialog()}
                    >
                        <Add/>
                    </Fab>
                </Tooltip>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    firmwares: getFilteredAndSortedFirmwares(state),
    query: state.firmwaresReducer.query,
    sortBy: state.firmwaresReducer.sortBy,
    sortOrder: state.firmwaresReducer.sortOrder,
    token: state.sessionReducer.token
});

const mapDispatchToProps = {
    deleteFirmware,
    setFirmwareQuery,
    setFirmwareSort,
    openDialog
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(
        withStyles(styles)(
            FirmwaresComponent
        )
    )
);
