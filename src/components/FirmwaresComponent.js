import React, {Component} from "react";
import {
    Button,
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
import {Add, Delete, Edit, GetApp} from "@material-ui/icons";
import {deleteFirmware, getFirmwares} from "../actions/firmwares";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {backendUrl} from "../actions/common";
import {openConfirmationDialog,} from "../actions/confirmationDialog";

const styles = theme => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2)
    },
    spacing: {
        height: theme.spacing(8)
    }
});

class FirmwaresComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firmwares: []
        }
    }

    deleteFirmware(firmware) {
        this.props.openConfirmationDialog(
            "Delete firmware",
            `Are you sure you want to delete the firmware ${firmware.id}?`,
            () => this.props.deleteFirmware(firmware.id)
        )
    }

    render() {
        const {classes} = this.props;

        return (
            <React.Fragment>
                <Paper>
                    <TableContainer>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    {
                                        ["Title", "Description", "Model", "Version", "Product", ""].map(
                                            row => (
                                                <TableCell key={`firmwares-table-head-${row}`}>{row}</TableCell>
                                            )
                                        )
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.firmwares.map(firmware => (
                                    <TableRow
                                        hover
                                        key={`tablerow-firmware-${firmware.id}`}
                                    >
                                        <TableCell>{firmware.title}</TableCell>
                                        <TableCell>{firmware.description}</TableCell>
                                        <TableCell>{firmware.model}</TableCell>
                                        <TableCell>{firmware.version}</TableCell>
                                        <TableCell>{firmware.product_id}</TableCell>
                                        <TableCell align="right">
                                            <a href={`${backendUrl}/firmwares/${firmware.id}/content`} download>
                                                <Button>
                                                    <GetApp/>
                                                </Button>
                                            </a>
                                            <Button onClick={() => this.props.history.push(`/firmwares/${firmware.id}`)}>
                                                <Edit/>
                                            </Button>
                                            <Button onClick={() => this.deleteFirmware(firmware)}>
                                                <Delete/>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
                <div className={classes.spacing}/>
                <Tooltip title="Add Firmware" aria-label="add firmware">
                    <Fab color="primary"
                         className={classes.fab}
                         onClick={() => this.props.history.push('/firmwares/new')}
                    >
                        <Add/>
                    </Fab>
                </Tooltip>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    firmwares: state.firmwaresReducer.firmwares,
});

const mapDispatchToProps = {
    getFirmwares,
    deleteFirmware,
    openConfirmationDialog
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(
        withStyles(styles)(
            FirmwaresComponent
        )
    )
);
