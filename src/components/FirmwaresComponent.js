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
import {Add} from "@material-ui/icons";
import {createFirmware, editFirmware, getFirmwares} from "../actions/firmwares";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import FirmwareDialogComponent from "./FirmwareDialogComponent";

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
        this.props.createFirmware(firmware, content)
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

                <Paper>
                    <TableContainer>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    {rows.map(row => (
                                        <TableCell key={`firmwares-table-head-${row}`}>{row}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.firmwares.map(firmware => (
                                    <TableRow hover key={`tablerow-firmware-${firmware.id}`}
                                              onClick={() => this.props.history.push(`/firmwares/${firmware.id}`)}>
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
    getFirmwares,
    createFirmware,
    editFirmware
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(
        withStyles(styles)(
            FirmwaresComponent
        )
    )
);
