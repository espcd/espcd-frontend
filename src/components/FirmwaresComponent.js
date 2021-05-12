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
import {getFirmwares} from "../actions/firmwares";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

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
            firmwares: []
        }
    }

    componentDidMount() {
        this.props.getFirmwares();
    }

    render() {
        const {classes} = this.props;
        const rows = ["ID", "Title", "Version"]

        return (
            <React.Fragment>
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
                                    <TableRow
                                        hover
                                        key={`tablerow-firmware-${firmware.id}`}
                                        onClick={() => this.props.history.push(`/firmwares/${firmware.id}`)}
                                    >
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
    getFirmwares
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(
        withStyles(styles)(
            FirmwaresComponent
        )
    )
);
