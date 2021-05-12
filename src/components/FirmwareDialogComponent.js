import React, {Component} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {FormControl, TextField} from "@material-ui/core";

class FirmwareDialogComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firmware: this.props.firmware || {},
            selectedFile: null
        };
    }

    handleFirmwareChange = (event) => {
        const target = event.target;
        let firmware = this.state.firmware;
        firmware[target.name] = target.value;
        this.setState({
            firmware: firmware
        });
    };

    selectFile = (event) => {
        const target = event.target;
        this.setState({
            selectedFile: target.files[0]
        })
    }

    render() {
        return (
            <Dialog
                open={true}
                onClose={this.props.handleClose}
                fullWidth={true}
            >
                <DialogTitle>{this.props.title}</DialogTitle>
                <DialogContent dividers>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        name="title"
                        label="Title"
                        type="text"
                        fullWidth
                        value={this.state.firmware.title}
                        onChange={this.handleFirmwareChange}
                    />
                    <TextField
                        margin="dense"
                        id="description"
                        name="description"
                        label="Description"
                        type="text"
                        fullWidth
                        value={this.state.firmware.description}
                        onChange={this.handleFirmwareChange}
                    />
                    <TextField
                        margin="dense"
                        id="version"
                        name="version"
                        label="Version"
                        type="text"
                        fullWidth
                        value={this.state.firmware.version}
                        onChange={this.handleFirmwareChange}
                    />
                    <FormControl
                        fullWidth
                        margin="dense"
                    >
                        <label
                            htmlFor="firmware-file-label"
                            className="MuiFormLabel-root MuiInputLabel-formControl MuiInputLabel-shrink"
                        >
                            File
                        </label>
                        <input
                            id="firmware-file-label"
                            name="content"
                            type="file"
                            onChange={this.selectFile}
                            className="MuiInputBase-root MuiInput-formControl"
                        />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button
                        color="primary"
                        onClick={this.props.handleClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        color="primary"
                        onClick={() => this.props.handleOk(this.state.firmware, this.state.selectedFile)}
                    >
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default FirmwareDialogComponent;
