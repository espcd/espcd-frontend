import React, {Component} from "react";
import {
    Button,
    Fab,
    Grid,
    IconButton,
    InputAdornment,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    TextField,
    Tooltip,
    withStyles
} from "@material-ui/core";
import {Add, Clear, Delete, Edit, GetApp} from "@material-ui/icons";
import {deleteFirmware, setFirmwareQuery, setFirmwareSort} from "../actions/firmwares";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {backendUrl} from "../actions/common";
import {openConfirmationDialog,} from "../actions/confirmationDialog";
import {getFilteredAndSortedFirmwares} from "../selectors/firmwares";

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
                                        [
                                            {key: "title", label: "Title"},
                                            {key: "description", label: "Description"},
                                            {key: "model", label: "Model"},
                                            {key: "version", label: "Version"},
                                            {key: "product_id", label: "Product"}
                                        ].map(
                                            row => (
                                                <TableCell key={`firmwares-table-head-${row.key}`}>
                                                    <TableSortLabel
                                                        active={this.props.sortBy === row.key}
                                                        direction={this.props.sortOrder}
                                                        onClick={() => this.props.setFirmwareSort(row.key, this.props.sortOrder)}
                                                    >
                                                        {row.label}
                                                    </TableSortLabel>
                                                </TableCell>
                                            )
                                        )
                                    }
                                    <TableCell key={`firmwares-table-head-search`} align="right">
                                        <Grid container style={{alignItems: 'center'}} justify="flex-end">
                                            <TextField
                                                label="Search..."
                                                value={this.props.query}
                                                onChange={event => this.props.setFirmwareQuery(event.target.value)}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton onClick={() => this.props.setFirmwareQuery("")}>
                                                                <Clear/>
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                    </TableCell>
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
                                            <Button
                                                onClick={() => this.props.history.push(`/firmwares/${firmware.id}`)}>
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
    firmwares: getFilteredAndSortedFirmwares(state),
    query: state.firmwaresReducer.query,
    sortBy: state.firmwaresReducer.sortBy,
    sortOrder: state.firmwaresReducer.sortOrder
})

const mapDispatchToProps = {
    deleteFirmware,
    setFirmwareQuery,
    setFirmwareSort,
    openConfirmationDialog
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(
        withStyles(styles)(
            FirmwaresComponent
        )
    )
)
