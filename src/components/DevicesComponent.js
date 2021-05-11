import React, {Component} from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import EditDeviceDialogComponent from "./EditDeviceDialogComponent";
import {editDevice, getDevices} from "../actions/devices";
import {connect} from "react-redux";
import {getFirmwares} from "../actions/firmwares";
import moment from 'moment';

class DevicesComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            devices: [],
            dialogOpen: false,
            selectedDevice: null
        }
    }

    componentDidMount() {
        this.props.getDevices();
        this.props.getFirmwares();  // needs to be loaded to allow firmware selection in edit device dialog
    }

    openDialog = (device) => {
        this.setState({
            dialogOpen: true,
            selectedDevice: device
        });
    };

    handleDialogClose = () => {
        this.setState({
            dialogOpen: false
        });
    };

    handleDialogOk = async (device) => {
        this.handleDialogClose();
        this.props.editDevice(device)
    };

    render() {
        const rows = ["ID", "Title", "Model", "Current Firmware", "Available Firmware", "Last seen"]

        return (
            <React.Fragment>
                {
                    this.state.dialogOpen &&
                    <EditDeviceDialogComponent
                        device={this.state.selectedDevice}
                        handleClose={this.handleDialogClose}
                        handleOk={this.handleDialogOk}
                    />
                }

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
                                    <TableRow hover key={`device-table-body-${device.id}`} onClick={() => this.openDialog(device)}>
                                        <TableCell>{device.id}</TableCell>
                                        <TableCell>{device.title}</TableCell>
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
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    devices: state.devicesReducer.devices,
    error: state.devicesReducer.error,
    loaded: state.devicesReducer.loaded
});

const mapDispatchToProps = {
    getDevices,
    getFirmwares,
    editDevice
};

export default connect(mapStateToProps, mapDispatchToProps)(
    DevicesComponent
);
