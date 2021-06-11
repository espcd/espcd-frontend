import React, {Component} from "react";
import {createFirmware, editFirmware} from "../actions/firmwares";
import {connect} from "react-redux";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    TextField,
    Typography
} from "@material-ui/core";
import {closeDialog} from "../actions/dialog";
import FqbnSelectComponent from "./FqbnSelectComponent";
import ProductSelectComponent from "./ProductSelectComponent";
import Firmware from "../data-classes/Firmware";

class FirmwareDialogComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            updates: {}
        };
    }

    handleFqbnChange = (event, value) => {
        let updates = this.state.updates;
        updates.fqbn = value;
        this.setState({
            updates: updates
        });
    };

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

    handleKeyPress = (event) => {
        if (event.key === "Enter" && !this.submitDisabled() && event.target.type !== "textarea") {
            this.handleSubmit();
        }
    };

    handleSubmit = () => {
        let firmwareId = this.props.firmware.id;
        let payload = this.state.updates;
        let file = this.state.selectedFile;

        if (this.props.isPresent) {
            this.props.editFirmware(firmwareId, payload, file)
                .then(() => this.props.closeDialog());
        } else {
            this.props.createFirmware(payload, file)
                .then(() => this.props.closeDialog());
        }
    };

    selectFile = (event) => {
        let target = event.target;
        let file = target.files[0];
        this.setState({
            selectedFile: file
        });
    };

    getValue = (key, defaultValue = "") => {
        let res = this.state.updates.hasOwnProperty(key) ? this.state.updates[key] : this.props.firmware[key];
        return res ? res : defaultValue;
    };

    submitDisabled = () => !Object.keys(this.props.firmware).some(key =>
        this.state.updates.hasOwnProperty(key) && this.state.updates[key] !== this.props.firmware[key]
    ) && !this.state.selectedFile;

    render() {
        let firmware = {
            id: this.props.firmware.id,
            title: this.getValue("title"),
            description: this.getValue("description"),
            fqbn: this.getValue("fqbn"),
            version: this.getValue("version"),
            product_id: this.getValue("product_id")
        };

        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.closeDialog}
                onKeyPress={this.handleKeyPress}
            >
                <DialogTitle>
                    {this.props.isPresent ? "Edit firmware" : "Add firmware"}
                </DialogTitle>
                <DialogContent dividers>
                    <TextField
                        disabled
                        margin="dense"
                        id="id"
                        name="id"
                        label="ID"
                        type="text"
                        fullWidth
                        value={firmware.id}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        name="title"
                        label="Title"
                        type="text"
                        fullWidth
                        value={firmware.title}
                        onChange={this.handleChange}
                    />
                    <TextField
                        margin="dense"
                        id="description"
                        name="description"
                        label="Description"
                        type="text"
                        multiline
                        fullWidth
                        value={firmware.description}
                        onChange={this.handleChange}
                    />
                    <FqbnSelectComponent
                        disabled={this.props.isPresent}
                        fqbn={firmware.fqbn}
                        onChange={this.handleFqbnChange}
                    />
                    <TextField
                        required
                        margin="dense"
                        id="version"
                        name="version"
                        label="Version"
                        type="text"
                        fullWidth
                        value={firmware.version}
                        onChange={this.handleChange}
                    />
                    <FormControl margin="dense">
                        <div className="MuiFormLabel-root MuiInputLabel-shrink">
                            File
                            <span aria-hidden="true" className="MuiFormLabel-asterisk MuiInputLabel-asterisk">*</span>
                        </div>
                        <Grid container spacing={1} alignItems="center">
                            <Grid item>
                                <input
                                    id="firmware-file-label"
                                    name="content"
                                    type="file"
                                    accept=".bin"
                                    onChange={this.selectFile}
                                    hidden
                                />
                                <label htmlFor="firmware-file-label">
                                    <Button variant="contained" component="span" size="small">
                                        Select file
                                    </Button>
                                </label>
                            </Grid>
                            <Grid item>
                                <Typography>
                                    {this.state.selectedFile ? this.state.selectedFile.name : ""}
                                </Typography>
                            </Grid>
                        </Grid>
                    </FormControl>
                    <ProductSelectComponent
                        product_id={firmware.product_id}
                        onChange={this.handleChange}
                    />
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
                        disabled={this.submitDisabled()}
                    >
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

const mapStateToProps = (state) => {
    let firmwareId = state.dialogReducer.props.firmwareId;
    let firmware = state.firmwaresReducer.firmwares.find(firmware => firmware.id === firmwareId) || new Firmware();
    return {
        firmware,
        isPresent: !!firmwareId,
        open: state.dialogReducer.open,
        firmwares: state.firmwaresReducer.firmwares
    };
};

const mapDispatchToProps = {
    closeDialog,
    createFirmware,
    editFirmware
};

export default connect(mapStateToProps, mapDispatchToProps)(
    FirmwareDialogComponent
);
