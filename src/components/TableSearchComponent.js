import React, {Component} from "react";
import {Grid, IconButton, InputAdornment, TextField} from "@material-ui/core";
import {Clear} from "@material-ui/icons";

class TableSearchComponent extends Component {
    render() {
        return (
            <Grid container style={{alignItems: "center"}} justify="flex-end">
                <TextField
                    label="Search..."
                    value={this.props.query}
                    onChange={event => this.props.setQuery(event.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => this.props.setQuery("")}>
                                    <Clear/>
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>
        );
    }
}

export default TableSearchComponent;
