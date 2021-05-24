import React, {Component} from "react";
import {
    Button,
    Grid,
    IconButton,
    InputAdornment,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    TextField,
    withStyles
} from "@material-ui/core";
import {deleteDevice, setDeviceQuery, setDeviceSort} from "../actions/devices";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import moment from "moment";
import {Clear, Delete, Edit} from "@material-ui/icons";
import {openConfirmationDialog} from "../actions/confirmationDialog";
import {getFilteredAndSortedDevices} from "../selectors/devices";

const styles = () => ({
    button: {
        textTransform: "none"
    }
});

class DevicesComponent extends Component {
    deleteDevice(device) {
        this.props.openConfirmationDialog(
            "Delete device",
            `Are you sure you want to delete the device ${device.id}?`,
            () => this.props.deleteDevice(device.id)
        );
    }

    render() {
        const {classes} = this.props;

        return (
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
                                        {key: "product_id", label: "Product"},
                                        {key: "firmware_id", label: "Installed firmware"},
                                        {key: "last_seen", label: "Last seen"},
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
                                <TableCell key={`products-table-head-search`} align="right">
                                    <Grid container style={{alignItems: "center"}} justify="flex-end">
                                        <TextField
                                            label="Search..."
                                            value={this.props.query}
                                            onChange={event => this.props.setDeviceQuery(event.target.value)}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton onClick={() => this.props.setDeviceQuery("")}>
                                                            <Clear/>
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.devices.map(device => (
                                <TableRow
                                    hover
                                    key={`device-table-body-${device.id}`}
                                >
                                    <TableCell>{device.title}</TableCell>
                                    <TableCell>{device.description}</TableCell>
                                    <TableCell>{device.model}</TableCell>
                                    <TableCell>
                                        {
                                            device.product_id ?
                                                <Button
                                                    className={classes.button}
                                                    onClick={() => this.props.history.push(`/products/${device.product_id}`)}
                                                >
                                                    {device.product_id}
                                                </Button> :
                                                "none"
                                        }
                                    </TableCell>
                                    <TableCell>
                                        {
                                            device.firmware_id ?
                                                <Button
                                                    className={classes.button}
                                                    onClick={() => this.props.history.push(`/firmwares/${device.firmware_id}`)}
                                                >
                                                    {device.firmware_id}
                                                </Button> :
                                                "unknown"
                                        }
                                    </TableCell>
                                    <TableCell>{device.last_seen ? moment(device.last_seen).fromNow() : "never"}</TableCell>
                                    <TableCell align="right">
                                        <Button onClick={() => this.props.history.push(`/devices/${device.id}`)}>
                                            <Edit/>
                                        </Button>
                                        <Button onClick={() => this.deleteDevice(device)}>
                                            <Delete/>
                                        </Button>
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
    openConfirmationDialog
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(
        withStyles(styles)(
            DevicesComponent
        )
    )
);
