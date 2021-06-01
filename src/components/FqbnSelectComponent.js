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
                required
            >
                <Autocomplete
                    id="fqbn"
                    name="fqbn"
                    value={this.props.fqbn}
                    options={FQBNs}
                    renderInput={params =>
                        <TextField {...params} label="FQBN"/>
                    }
                    onChange={this.props.onChange}
                />
            </FormControl>
        );
    }
}

export default FqbnSelectComponent;
