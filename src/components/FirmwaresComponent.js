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
import EditFirmwareDialogComponent from "./EditFirmwareDialogComponent";

export default class FirmwaresComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firmwares: [],
            dialogOpen: false,
            selectedFirmware: null
        }
    }

    componentDidMount() {
        BackendApi.getFirmwares().then(response => {
            this.setState({
                firmwares: response
            })
        })
    }

    openDialog = (firmware) => {
        this.setState({
            dialogOpen: true,
            selectedFirmware: firmware
        });
    };

    handleDialogClose = () => {
        this.setState({
            dialogOpen: false
        });
    };

    handleDialogOk = async (firmware) => {
        this.handleDialogClose();
        await BackendApi.editFirmware(firmware)
    };

    render() {
        const rows = ["ID", "Title", "Version"]

        return (
            <React.Fragment>
                {
                    this.state.dialogOpen &&
                    <EditFirmwareDialogComponent
                        firmware={this.state.selectedFirmware}
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
                                {this.state.firmwares.map(firmware => (
                                    <TableRow hover key={`tablerow-firmware-${firmware.id}`} onClick={() => this.openDialog(firmware)}>
                                        <TableCell>{firmware.id}</TableCell>
                                        <TableCell>{firmware.title}</TableCell>
                                        <TableCell>{firmware.version}</TableCell>
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
