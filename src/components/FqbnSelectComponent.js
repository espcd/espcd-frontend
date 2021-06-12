import React, {Component} from "react";
import {FormControl, TextField} from "@material-ui/core";
import FQBNs from "../data-classes/FQBNs";
import {Autocomplete} from "@material-ui/lab";

class FqbnSelectComponent extends Component {
    render() {
        return (
            <FormControl
                fullWidth
                margin="dense"
                disabled={this.props.disabled}
            >
                <Autocomplete
                    id="fqbn"
                    name="fqbn"
                    value={this.props.fqbn}
                    options={this.props.options ? this.props.options : FQBNs}
                    renderInput={params =>
                        <TextField
                            {...params}
                            label="FQBN"
                            required={this.props.required}
                        />
                    }
                    onChange={this.props.onChange}
                />
            </FormControl>
        );
    }
}

export default FqbnSelectComponent;
