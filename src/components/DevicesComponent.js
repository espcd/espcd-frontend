import React, {Component} from "react";
import {
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    Tooltip
} from "@material-ui/core";
import {deleteDevice, setDeviceQuery, setDeviceSort} from "../actions/devices";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {Delete, Edit} from "@material-ui/icons";
import {openConfirmationDialog, openDeviceDialog, openFirmwareDialog, openProductDialog} from "../actions/dialogs";
import {getFilteredAndSortedDevices} from "../selectors/devices";
import TableSearchComponent from "./TableSearchComponent";
import TimeComponent from "./TimeComponent";

class DevicesComponent extends Component {
    deleteDevice(device) {
        this.props.openConfirmationDialog({
            title: "Delete device",
            content: `Are you sure you want to delete the device ${device.id}?`,
            handleOk: () => this.props.deleteDevice(device.id)
        });
    }

    openDeviceDialog(deviceId) {
        this.props.openDeviceDialog({
            deviceId
        });
    }

    openProductDialog(productId = null) {
        this.props.openProductDialog({
            productId
        });
    }

    openFirmwareDialog(firmwareId = null) {
        this.props.openFirmwareDialog({
            firmwareId
        });
    }

    render() {
        return (
            <Paper>
                <TableContainer>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                {
                                    [
                                        {key: "id", label: "ID"},
                                        {key: "title", label: "Title"},
                                        {key: "fqbn", label: "FQBN"},
                                        {key: "product_id", label: "Product"},
                                        {key: "firmware_id", label: "Installed firmware"},
                                        {key: "last_seen", label: "Last seen"},
                                        {key: "updated_at", label: "Date"}
                                    ].map(
                                        row => (
                                            <TableCell key={`devices-table-head-${row.key}`}>
                                                <TableSortLabel
                                                    active={this.props.sortBy === row.key}
                                                    direction={this.props.sortOrder}
                                                    onClick={() => this.props.setDeviceSort(row.key, this.props.sortOrder)}
                                                >
                                                    {row.label}
                                                </TableSortLabel>
                                            </TableCell>
                                        )
                                    )
                                }
                                <TableCell key={`devices-table-head-search`} align="right">
                                    <TableSearchComponent
                                        query={this.props.query}
                                        setQuery={this.props.setDeviceQuery}
                                    />
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.devices.map(device => (
                                <TableRow
                                    hover
                                    key={`device-table-body-${device.id}`}
                                >
                                    <TableCell>{device.id}</TableCell>
                                    <TableCell>{device.title ? device.title : ""}</TableCell>
                                    <TableCell>{device.fqbn ? device.fqbn : ""}</TableCell>
                                    <TableCell
                                        style={device.product_id ? {cursor: "pointer"} : {}}
                                        onClick={() => device.product_id ? this.openProductDialog(device.product_id) : {}}
                                    >
                                        {device.product_id ? device.product_id : "none"}
                                    </TableCell>
                                    <TableCell
                                        style={device.firmware_id ? {cursor: "pointer"} : {}}
                                        onClick={() => device.firmware_id ? this.openFirmwareDialog(device.firmware_id) : {}}
                                    >
                                        {device.firmware_id ? device.firmware_id : "unknown"}
                                    </TableCell>
                                    <TableCell>{
                                        device.last_seen ?
                                            <TimeComponent datetime={device.last_seen}/> :
                                            "never"
                                    }</TableCell>
                                    <TableCell>
                                        <TimeComponent datetime={device.updated_at}/>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Tooltip
                                            title="Edit device"
                                            aria-label="edit device"
                                        >
                                            <IconButton
                                                color="inherit"
                                                onClick={() => this.openDeviceDialog(device.id)}
                                            >
                                                <Edit/>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip
                                            title="Delete device"
                                            aria-label="delete device"
                                        >
                                            <IconButton
                                                color="inherit"
                                                onClick={() => this.deleteDevice(device)}
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
        );
    }
}

const mapStateToProps = (state) => ({
    devices: getFilteredAndSortedDevices(state),
    query: state.devicesReducer.query,
    sortBy: state.devicesReducer.sortBy,
    sortOrder: state.devicesReducer.sortOrder
});

const mapDispatchToProps = {
    deleteDevice,
    setDeviceQuery,
    setDeviceSort,
    openConfirmationDialog,
    openDeviceDialog,
    openProductDialog,
    openFirmwareDialog
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DevicesComponent));
