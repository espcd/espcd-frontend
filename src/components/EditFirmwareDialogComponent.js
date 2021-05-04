import React, {Component} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {TextField} from "@material-ui/core";

export default class EditFirmwareDialogComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firmware: this.props.firmware,
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

    render() {
        return (
            <Dialog
                open={true}
                onClose={this.props.handleClose}
                fullWidth={true}
            >
                <DialogTitle>
                    Edit Firmware
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
                        onClick={() => this.props.handleOk(this.state.firmware)}
                    >
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}
