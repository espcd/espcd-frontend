import React, {Component} from "react";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {connect} from "react-redux";

class FirmwareSelectComponent extends Component {
    render() {
        let fqbn = this.props.fqbn;
        let firmwareId = this.props.firmware_id;
        let firmwares = this.props.firmwares.filter(firmware => firmware.fqbn === fqbn);

        return (
            <FormControl
                fullWidth
                margin="dense"
            >
                <InputLabel id="firmware-select-label">Firmware</InputLabel>
                <Select
                    labelId="firmware-select-label"
                    id="firmware_id"
                    name="firmware_id"
                    value={firmwareId}
                    onChange={this.props.onChange}
                >
                    <MenuItem value={""} key={`firmware-menuitem-`}>-</MenuItem>
                    {firmwares.map(firmware => (
                        <MenuItem
                            value={firmware.id}
                            key={`firmware-menuitem-${firmware.id}`}
                        >
                            {firmware.id} {firmware.title && `(${firmware.title})`}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        );
    }
}

const mapStateToProps = (state) => ({
    firmwares: state.firmwaresReducer.firmwares
});

export default connect(mapStateToProps)(
    FirmwareSelectComponent
);
