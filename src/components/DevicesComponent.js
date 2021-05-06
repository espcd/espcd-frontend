import React, {Component} from "react";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";
import BackendApi from "../api/BackendApi";
import EditDeviceDialogComponent from "./EditDeviceDialogComponent";

export default class DevicesComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            devices: [],
            dialogOpen: false,
            selectedDevice: null
        }
    }

    componentDidMount() {
        BackendApi.getDevices().then(response => {
            this.setState({
                devices: response
            })
        })
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
        await BackendApi.editDevice(device)
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
                                        <TableCell>{row}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.devices.map(device => (
                                    <TableRow hover key={`tablerow-device-${device.id}`} onClick={() => this.openDialog(device)}>
                                        <TableCell>{device.id}</TableCell>
                                        <TableCell>{device.title}</TableCell>
                                        <TableCell>{device.model}</TableCell>
                                        <TableCell>{device.current_firmware_id}</TableCell>
                                        <TableCell>{device.available_firmware_id}</TableCell>
                                        <TableCell>{device.last_seen}</TableCell>
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
