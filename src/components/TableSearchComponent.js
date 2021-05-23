import React, {Component} from "react";
import {Grid, IconButton, InputAdornment, TextField} from "@material-ui/core";
import {Clear} from "@material-ui/icons";


class TableSearchComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ""
        }
    }

    handleSearch = (event) => {
        let target = event.target
        let value = target.value

        this.setState({
            search: value
        })
    }

    clearSearch = () => {
        this.setState({
            search: ""
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.items !== prevProps.items || this.state.search !== prevState.search) {
            this.doFilter()
        }
    }

    doFilter = () => {
        let items
        if (this.state.search) {
            items = this.props.items.filter(item => {
                return Object.keys(item).some(key => {
                    let value = item[key];
                    return value && String(value).includes(this.state.search);
                })
            })
        } else {
            items = this.props.items
        }
        this.props.handleFilter(items)
    }

    render() {
        return (
            <Grid container style={{alignItems: 'center'}} justify="flex-end">
                <TextField
                    label="Search..."
                    value={this.state.search}
                    onChange={this.handleSearch}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={this.clearSearch}>
                                    <Clear/>
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>
        )
    }
}

export default TableSearchComponent
