import React, {Component} from "react";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import FQBNs from "../data-classes/FQBNs";

class FqbnSelectComponent extends Component {
    render() {
        return (
            <FormControl
                fullWidth
                margin="dense"
                disabled={this.props.disabled}
                required
            >
                <InputLabel id="fqbn-select-label">FQBN</InputLabel>
                <Select
                    labelId="fqbn-select-label"
                    id="fqbn"
                    name="fqbn"
                    value={this.props.fqbn}
                    onChange={this.props.onChange}
                >
                    <MenuItem value={""} key={`fqbn-menuitem-`}>-</MenuItem>
                    {FQBNs.map(fqbn => (
                        <MenuItem
                            value={fqbn}
                            key={`fqbn-menuitem-${fqbn}`}
                        >
                            {fqbn}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        );
    }
}

export default FqbnSelectComponent;
