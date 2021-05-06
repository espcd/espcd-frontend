import React, {Component} from "react";
import {
    Fab,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    withStyles
} from "@material-ui/core";
import BackendApi from "../api/BackendApi";
import {Add} from "@material-ui/icons";
import FirmwareDialogComponent from "./FirmwareDialogComponent";
import {getFirmwares} from "../actions/firmwares";
import {connect} from "react-redux";

const styles = theme => ({
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2)
    }
});

class FirmwaresComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firmwares: [],
            addDialogOpen: false,
            editDialogOpen: false,
            selectedFirmware: null
        }
    }

    componentDidMount() {
        this.props.getFirmwares();
    }

    openAddDialog = () => {
        this.setState({
            addDialogOpen: true
        });
    };

    handleAddDialogClose = () => {
        this.setState({
            addDialogOpen: false
        });
    };

    handleAddDialogOk = async (firmware, content) => {
        this.handleAddDialogClose();
        firmware = await BackendApi.createFirmware(firmware)
        await BackendApi.addFirmwareContent(firmware.id, content)
        this.props.getFirmwares();
    };

    openEditDialog = (firmware) => {
        this.setState({
            editDialogOpen: true,
            selectedFirmware: firmware
        });
    };

    handleEditDialogClose = () => {
        this.setState({
            editDialogOpen: false
        });
    };

    handleEditDialogOk = async (firmware, content) => {
        console.log(firmware)
        console.log(content)
        this.handleEditDialogClose();
        await BackendApi.editFirmware(firmware)
        await BackendApi.addFirmwareContent(firmware.id, content)
        this.props.getFirmwares();
    };

    render() {
        const {classes} = this.props;
        const rows = ["ID", "Title", "Version"]

        return (
            <React.Fragment>
                {
                    this.state.addDialogOpen &&
                    <FirmwareDialogComponent
                        title="Add Firmware"
                        handleClose={this.handleAddDialogClose}
                        handleOk={this.handleAddDialogOk}
                    />
                }

                {
                    this.state.editDialogOpen &&
                    <FirmwareDialogComponent
                        title="Edit Firmware"
                        firmware={this.state.selectedFirmware}
                        handleClose={this.handleEditDialogClose}
                        handleOk={this.handleEditDialogOk}
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
                                {this.props.firmwares.map(firmware => (
                                    <TableRow hover key={`tablerow-firmware-${firmware.id}`}
                                              onClick={() => this.openEditDialog(firmware)}>
                                        <TableCell>{firmware.id}</TableCell>
                                        <TableCell>{firmware.title}</TableCell>
                                        <TableCell>{firmware.version}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>

                <Tooltip title="Add Firmware" aria-label="add firmware">
                    <Fab color="primary" className={classes.fab} onClick={this.openAddDialog}>
                        <Add/>
                    </Fab>
                </Tooltip>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    firmwares: state.firmwaresReducer.firmwares,
    error: state.firmwaresReducer.error,
    loaded: state.firmwaresReducer.loaded
});

const mapDispatchToProps = {
    getFirmwares
};

export default connect(mapStateToProps, mapDispatchToProps)(
    withStyles(styles)(
        FirmwaresComponent
    )
);
