import React, {Component} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {FormLabel, TextField, withStyles} from "@material-ui/core";

const styles = theme => ({
    input: {
        display: "none",
    },
    faceImage: {
        color: theme.palette.primary.light,
    }
});

class AddFirmwareDialogComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firmware: {},
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
                <DialogTitle>
                    Add Firmware
                </DialogTitle>
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
                        autoFocus
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
                        autoFocus
                        margin="dense"
                        id="version"
                        name="version"
                        label="Version"
                        type="text"
                        fullWidth
                        value={this.state.firmware.version}
                        onChange={this.handleFirmwareChange}
                    />
                    <p>
                        <FormLabel>File</FormLabel>
                    </p>
                    <input
                        id="content"
                        name="content"
                        type="file"
                        onChange={this.selectFile}
                    />
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

export default withStyles(styles)(AddFirmwareDialogComponent);
