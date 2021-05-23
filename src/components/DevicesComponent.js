import React, {Component} from "react";
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    withStyles
} from "@material-ui/core";
import {deleteDevice} from "../actions/devices";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import moment from 'moment';
import {Delete, Edit} from "@material-ui/icons";
import {openConfirmationDialog} from "../actions/confirmationDialog";

const styles = () => ({
    button: {
        textTransform: 'none'
    }
});

class DevicesComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            devices: []
        }
    }

    deleteDevice(device) {
        this.props.openConfirmationDialog(
            "Delete device",
            `Are you sure you want to delete the device ${device.id}?`,
            () => this.props.deleteDevice(device.id)
        )
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
                                    ["Title", "Description", "Model", "Product", "Installed firmware", "Last seen", ""].map(
                                        row => (
                                            <TableCell key={`devices-table-head-${row}`}>{row}</TableCell>
                                        )
                                    )
                                }
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
        )
    }
}

const mapStateToProps = (state) => ({
    devices: state.devicesReducer.devices,
    error: state.devicesReducer.error,
    loaded: state.devicesReducer.loaded
});

const mapDispatchToProps = {
    deleteDevice,
    openConfirmationDialog
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(
        withStyles(styles)(
            DevicesComponent
        )
    )
);
