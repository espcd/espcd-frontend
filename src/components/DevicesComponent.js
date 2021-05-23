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
                                        <Button onClick={() => this.props.deleteDevice(device.id)}>
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
    deleteDevice
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(
        withStyles(styles)(
            DevicesComponent
        )
    )
);
