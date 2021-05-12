import React, {Component} from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {getDevices} from "../actions/devices";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import moment from 'moment';

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
        const rows = ["ID", "Title", "Description", "Model", "Current Firmware", "Available Firmware", "Last seen"]

        return (
            <Paper>
                <TableContainer>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                {rows.map(row => (
                                    <TableCell key={`devices-table-head-${row}`}>{row}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.devices.map(device => (
                                <TableRow
                                    hover
                                    key={`device-table-body-${device.id}`}
                                    onClick={() => this.props.history.push(`/devices/${device.id}`)}
                                >
                                    <TableCell>{device.id}</TableCell>
                                    <TableCell>{device.title}</TableCell>
                                    <TableCell>{device.description}</TableCell>
                                    <TableCell>{device.model}</TableCell>
                                    <TableCell>{device.current_firmware_id}</TableCell>
                                    <TableCell>{device.available_firmware_id}</TableCell>
                                    <TableCell>{moment(device.last_seen).fromNow()}</TableCell>
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

export default connect(mapStateToProps, mapDispatchToProps)(
    withRouter(DevicesComponent)
);
