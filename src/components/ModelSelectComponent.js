import React, {Component} from "react";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import Models from "../data-classes/Models";

class ModelSelectComponent extends Component {
    render() {
        return (
            <FormControl
                fullWidth
                margin="dense"
                disabled={this.props.disabled}
            >
                <InputLabel id="model-select-label">Model</InputLabel>
                <Select
                    labelId="model-select-label"
                    id="model"
                    name="model"
                    value={this.props.model}
                    onChange={this.props.onChange}
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
        );
    }
}

export default ModelSelectComponent;
