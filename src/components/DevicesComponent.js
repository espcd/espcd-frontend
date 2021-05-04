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

export default class DevicesComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            devices: []
        }
    }

    componentDidMount() {
        BackendApi.getDevices().then(response => {
            this.setState({
                devices: response
            })
        })
    }

    render() {
        return (
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Model</TableCell>
                            <TableCell>Last seen</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.devices.map(device => (
                            <TableRow key={`tablerow-device-${device.id}`}>
                                <TableCell>{device.id}</TableCell>
                                <TableCell>{device.title}</TableCell>
                                <TableCell>{device.model}</TableCell>
                                <TableCell>{device.last_seen}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
}
