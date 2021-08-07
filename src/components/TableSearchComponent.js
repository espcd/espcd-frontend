import React, {Component} from "react";
import {Grid, IconButton, InputAdornment, TextField, withStyles} from "@material-ui/core";
import {Clear} from "@material-ui/icons";

const styles = () => ({
    grid: {
        alignItems: "center"
    },
    input: {
        minWidth: "110px"
    },
});

class TableSearchComponent extends Component {
    render() {
        const {classes} = this.props;

        return (
            <Grid container className={classes.grid} justify="flex-end">
                <TextField
                    label="Search..."
                    value={this.props.query}
                    onChange={event => this.props.setQuery(event.target.value)}
                    InputProps={{
                        className: classes.input,
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

export default withStyles(styles)(TableSearchComponent);
