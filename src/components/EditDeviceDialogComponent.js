import React, {Component} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import {connect} from "react-redux";

class EditDeviceDialogComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            device: this.props.device,
        };
    }

    handleDeviceChange = (event) => {
        const target = event.target;
        let device = this.state.device;
        device[target.name] = target.value;
        this.setState({
            device: device
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
                    Edit Device
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
                        value={this.state.device.title}
                        onChange={this.handleDeviceChange}
                    />
                    <TextField
                        margin="dense"
                        id="description"
                        name="description"
                        label="Description"
                        type="text"
                        fullWidth
                        value={this.state.device.description}
                        onChange={this.handleDeviceChange}
                    />
                    <FormControl
                        fullWidth
                        margin="dense"
                    >
                        <InputLabel id="firmware-select-label">Firmware</InputLabel>
                        <Select
                            labelId="firmware-select-label"
                            id="available_firmware_id"
                            name="available_firmware_id"
                            value={this.state.device.available_firmware_id}
                            onChange={this.handleDeviceChange}
                        >
                            {this.props.firmwares.map(firmware => (
                                <MenuItem
                                    value={firmware.id}
                                    key={`firmware-menuitem-${firmware.id}`}
                                >
                                    {firmware.title} ({firmware.id})
                                </MenuItem>
                            ))}
                        </Select>
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
                        onClick={() => this.props.handleOk(this.state.device)}
                    >
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

const mapStateToProps = (state) => ({
    firmwares: state.firmwaresReducer.firmwares
});

export default connect(mapStateToProps)(EditDeviceDialogComponent);
