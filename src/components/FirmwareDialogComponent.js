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
import Firmware from "../data-classes/Firmware";
import {closeDialog} from "../actions/dialog";
import FqbnSelectComponent from "./FqbnSelectComponent";
import ProductSelectComponent from "./ProductSelectComponent";
import {lower} from "../common";

class FirmwareDialogComponent extends Component {
    constructor(props) {
        super(props);
        this.updates = {};
        this.state = {
            firmware: new Firmware(),
            selectedFile: null
        };
    }

    setFirmware() {
        let firmware = this.props.firmwares.find(firmware => firmware.id === this.props.firmwareId) || new Firmware();
        this.setState({
            firmware: {...firmware}
        });
    }

    componentDidMount() {
        this.setFirmware();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.firmwareId !== prevProps.firmwareId) {
            this.setFirmware();
        }
    }

    handleChange = (event, value) => {
        let key;
        if (value) {
            // autocomplete component onChange event
            key = "fqbn";
        } else {
            let target = event.target;
            key = target.name;
            value = target.type === "checkbox" ? target.checked : target.value;
        }

        this.updates[key] = value;

        let firmware = this.state.firmware;
        firmware[key] = value;
        this.setState({
            firmware: firmware
        });
    };

    handleKeyPress = (event) => {
        if (event.key === "Enter" && event.target.type !== "textarea") {
            this.handleSubmit();
        }
    };

    handleSubmit = () => {
        let firmwareId = this.state.firmware.id;
        let payload = this.updates;
        let file = this.state.selectedFile;

        if (this.props.firmwareId) {
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

    render() {
        let fqbn = this.updates.fqbn ? this.updates.fqbn : this.state.firmware.fqbn;
        let products = this.props.products.filter(product => lower(product.fqbn) === lower(fqbn));

        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.closeDialog}
                onKeyPress={this.handleKeyPress}
            >
                <DialogTitle>
                    {this.props.firmwareId ? "Edit firmware" : "Add firmware"}
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
                        value={this.state.firmware.id}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        name="title"
                        label="Title"
                        type="text"
                        fullWidth
                        value={this.state.firmware.title}
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
                        value={this.state.firmware.description ? this.state.firmware.description : ""}
                        onChange={this.handleChange}
                    />
                    <FqbnSelectComponent
                        disabled={!!this.props.firmwareId}
                        fqbn={this.state.firmware.fqbn}
                        onChange={this.handleChange}
                    />
                    <TextField
                        required
                        margin="dense"
                        id="version"
                        name="version"
                        label="Version"
                        type="text"
                        fullWidth
                        value={this.state.firmware.version}
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
                        product_id={this.state.firmware.product_id}
                        products={products}
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
                    >
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

const mapStateToProps = (state) => ({
    open: state.dialogReducer.open,
    firmwareId: state.dialogReducer.props.firmwareId,
    firmwares: state.firmwaresReducer.firmwares,
    products: state.productsReducer.products
});

const mapDispatchToProps = {
    closeDialog,
    createFirmware,
    editFirmware
};

export default connect(mapStateToProps, mapDispatchToProps)(
    FirmwareDialogComponent
);
