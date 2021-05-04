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

export default class FirmwaresComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firmwares: []
        }
    }

    componentDidMount() {
        BackendApi.getFirmwares().then(response => {
            this.setState({
                firmwares: response
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
                            <TableCell>Version</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.firmwares.map(firmware => (
                            <TableRow key={`tablerow-device-${firmware.id}`}>
                                <TableCell>{firmware.id}</TableCell>
                                <TableCell>{firmware.title}</TableCell>
                                <TableCell>{firmware.version}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
}
