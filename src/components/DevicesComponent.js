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
import {getDevices} from "../actions/devices";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import moment from 'moment';
import {Edit} from "@material-ui/icons";

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

    componentDidMount() {
        this.props.getDevices();
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
                                    ["Title", "Description", "Model", "Current Firmware", "Available Firmware", "Last seen", ""].map(
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
                                        <Button
                                            className={classes.button}
                                            onClick={() => this.props.history.push(`/firmwares/${device.current_firmware_id}`)}
                                        >
                                            {device.current_firmware_id}
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            className={classes.button}
                                            onClick={() => this.props.history.push(`/firmwares/${device.available_firmware_id}`)}
                                        >
                                            {device.available_firmware_id}
                                        </Button>
                                    </TableCell>
                                    <TableCell>{device.last_seen ? moment(device.last_seen).fromNow() : "never"}</TableCell>
                                    <TableCell align="right">
                                        <Button onClick={() => this.props.history.push(`/devices/${device.id}`)}>
                                            <Edit/>
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
    getDevices
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(
        withStyles(styles)(
            DevicesComponent
        )
    )
);
