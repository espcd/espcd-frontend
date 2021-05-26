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
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@material-ui/core";
import Firmware from "../data-classes/Firmware";
import {closeDialog} from "../actions/dialog";
import Models from "../data-classes/Models";

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
        if (this.props.firmwares !== prevProps.firmwares || this.props.firmwareId !== prevProps.firmwareId) {
            this.setFirmware();
        }
    }

    handleChange = (event) => {
        let target = event.target;
        let key = target.name;
        let value = target.value;

        this.updates[key] = value;

        let firmware = this.state.firmware;
        firmware[key] = value;
        this.setState({
            firmware: firmware
        });
    };

    handleKeyPress = (event) => {
        if (event.key === "Enter") {
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
                    <FormControl
                        fullWidth
                        margin="dense"
                    >
                        <InputLabel id="model-select-label">Model</InputLabel>
                        <Select
                            labelId="model-select-label"
                            id="model"
                            name="model"
                            value={this.state.firmware.model}
                            onChange={this.handleChange}
                        >
                            <MenuItem value={""} key={`model-menuitem-`}>-</MenuItem>
                            {Models.map(model => (
                                <MenuItem
                                    value={model}
                                    key={`model-menuitem-${model}`}
                                >
                                    {model}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
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
                    <FormControl
                        fullWidth
                        margin="dense"
                    >
                        <InputLabel id="product-select-label">
                            Product
                        </InputLabel>
                        <Select
                            labelId="product-select-label"
                            id="product_id"
                            name="product_id"
                            value={this.state.firmware.product_id}
                            onChange={this.handleChange}
                        >
                            <MenuItem value={""} key={`product-menuitem-none`}>-</MenuItem>
                            {this.props.products.map(product => (
                                <MenuItem
                                    value={product.id}
                                    key={`product-menuitem-${product.id}`}
                                >
                                    {product.title} ({product.id})
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
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
