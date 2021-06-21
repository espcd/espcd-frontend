import React, {Component} from "react";
import {connect} from "react-redux";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Tooltip} from "@material-ui/core";
import {closeDialog} from "../actions/dialogs";
import {editProductFirmware} from "../actions/products";
import FqbnSelectComponent from "./FqbnSelectComponent";
import FirmwareSelectComponent from "./FirmwareSelectComponent";
import BoardType from "../data-classes/BoardType";
import {getBoardTypeVersions} from "../actions/boardTypes";
import {Restore} from "@material-ui/icons";
import moment from "moment";

class ProductFirmwareDialogComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fqbn: "",
            firmware_id: ""
        };
    }

    componentDidMount() {
        if (this.props.fqbns.length > 0) {
            this.changeFqbn(this.props.fqbns[0]);
        }
    }

    handleChange = (event) => {
        let target = event.target;
        let key = target.name;
        let value = target.type === "checkbox" ? target.checked : target.value;

        let updates = this.state.updates;
        updates[key] = value;
        this.setState({
            updates: updates
        });
    };

    handleFqbnChange = (event, fqbn) => {
        this.changeFqbn(fqbn);
    };

    changeFqbn = (fqbn) => {
        this.setState({
            fqbn
        });
        let boardType = this.props.boardTypes.find(boardType => boardType.fqbn === fqbn);
        if (boardType) {
            this.props.getBoardTypeVersions(boardType.id);
        }
    };

    handleFirmwareChange = (event) => {
        this.setState({
            firmware_id: event.target.value
        });
    };

    handleKeyPress = (event) => {
        if (event.key === "Enter" && !this.submitDisabled() && event.target.type !== "textarea") {
            this.handleSubmit();
        }
    };

    handleRestore = (firmwareId) => {
        this.props.editProductFirmware(this.props.productId, this.state.fqbn, firmwareId)
            .then(() => this.props.closeDialog());
    };

    handleSubmit = () => {
        this.props.editProductFirmware(this.props.productId, this.state.fqbn, this.state.firmware_id)
            .then(() => this.props.closeDialog());
    };

    render() {
        let boardType = this.props.boardTypes.find(boardType => boardType.fqbn === this.state.fqbn) || new BoardType();
        let productFirmware = this.state.fqbn && this.state.firmware_id ? this.state.firmware_id : boardType.firmware_id;
        let versions = this.props.versions && this.props.versions[boardType.id] ? this.props.versions[boardType.id] : [];
        let submitEnabled = this.state.fqbn && this.state.firmware_id && this.state.firmware_id !== boardType.firmware_id;

        return (
            <Dialog
                fullWidth
                open={this.props.open}
                onClose={this.props.closeDialog}
                onKeyPress={this.handleKeyPress}
            >
                <DialogTitle>Edit product firmware</DialogTitle>
                <DialogContent dividers>
                    <FqbnSelectComponent
                        options={this.props.fqbns}
                        fqbn={this.state.fqbn}
                        onChange={this.handleFqbnChange}
                    />
                    <FirmwareSelectComponent
                        fqbn={this.state.fqbn}
                        firmware_id={this.state.fqbn ? productFirmware : ""}
                        onChange={this.handleFirmwareChange}
                    />
                    {
                        (this.state.fqbn && versions.length > 0) &&
                        <div>
                            <h3>History</h3>
                            {versions.map(version => (
                                <Grid container justify="space-between" alignItems="center" key={version.id}>
                                    <Grid item>
                                        <div>{moment(version.created_at).fromNow()}</div>
                                        <div>Firmware: {version.object.firmware_id}</div>
                                    </Grid>
                                    <Grid item>
                                        <Tooltip
                                            title="Restore firmware"
                                            aria-label="restore firmware"
                                        >
                                            <IconButton onClick={() => this.handleRestore(version.object.firmware_id)}>
                                                <Restore/>
                                            </IconButton>
                                        </Tooltip>
                                    </Grid>
                                </Grid>
                            ))}
                        </div>
                    }

                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="default"
                        onClick={this.props.closeDialog}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleSubmit}
                        disabled={!submitEnabled}
                    >
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

const mapStateToProps = (state) => {
    let productId = state.dialogsReducer.props.productId;
    let firmwares = state.firmwaresReducer.firmwares;
    let boardTypes = state.boardTypesReducer.boardTypes.filter(boardType => boardType.product_id === productId);
    let versions = state.boardTypesReducer.versions;
    return ({
        open: state.dialogsReducer.open,
        productId,
        fqbns: [...new Set(firmwares.map(firmware => firmware.fqbn))],
        boardTypes,
        versions
    });
};

const mapDispatchToProps = {
    closeDialog,
    editProductFirmware,
    getBoardTypeVersions
};

export default connect(mapStateToProps, mapDispatchToProps)(
    ProductFirmwareDialogComponent
);
