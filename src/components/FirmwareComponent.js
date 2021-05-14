import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {createFirmware, editFirmware, getFirmwares} from "../actions/firmwares";
import {connect} from "react-redux";
import {Button, FormControl, Paper, TextField, withStyles} from "@material-ui/core";
import Firmware from "../data-classes/Firmware";

const styles = theme => ({
    button: {
        marginTop: theme.spacing(2)
    },
    paper: {
        padding: '16px'
    }
});

class FirmwareComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firmware: new Firmware(),
            selectedFile: null
        }
    }

    componentDidMount() {
        this.props.getFirmwares()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.firmwares !== prevProps.firmwares) {
            let firmware = this.props.firmwares
                .find(firmware => firmware.id === this.props.match.params.id) || new Firmware()
            this.setState({
                firmware: {...firmware}
            })
        }
    }

    handleChange = (event) => {
        const target = event.target
        let firmware = this.state.firmware
        firmware[target.name] = target.value
        this.setState({
            firmware: firmware
        })
    }

    handleSubmit = () => {
        this.props.isPresent ?
            this.props.editFirmware(this.state.firmware, this.state.selectedFile) :
            this.props.createFirmware(this.state.firmware, this.state.selectedFile)
    }

    selectFile = (event) => {
        const target = event.target;
        this.setState({
            selectedFile: target.files[0]
        })
    }

    render() {
        const {classes} = this.props;

        let shrink = !!this.props.isPresent

        return (
            <Paper className={classes.paper}>
                <TextField
                    InputLabelProps={{shrink: shrink}}
                    disabled
                    margin="dense"
                    id="id"
                    name="id"
                    label="ID"
                    type="text"
                    fullWidth
                    value={this.state.firmware.id}
                />
                <TextField
                    InputLabelProps={{shrink: shrink}}
                    autoFocus
                    margin="dense"
                    id="title"
                    name="title"
                    label="Title"
                    type="text"
                    fullWidth
                    value={this.state.firmware.title}
                    onChange={this.handleChange}
                />
                <TextField
                    InputLabelProps={{shrink: shrink}}
                    margin="dense"
                    id="description"
                    name="description"
                    label="Description"
                    type="text"
                    multiline
                    fullWidth
                    value={this.state.firmware.description}
                    onChange={this.handleChange}
                />
                <TextField
                    InputLabelProps={{shrink: shrink}}
                    margin="dense"
                    id="version"
                    name="version"
                    label="Version"
                    type="text"
                    fullWidth
                    value={this.state.firmware.version}
                    onChange={this.handleChange}
                />
                <FormControl
                    fullWidth
                    margin="dense"
                >
                    <label
                        htmlFor="firmware-file-label"
                        className="MuiFormLabel-root MuiInputLabel-formControl MuiInputLabel-shrink"
                    >
                        File
                    </label>
                    <input
                        id="firmware-file-label"
                        name="content"
                        type="file"
                        onChange={this.selectFile}
                        className="MuiInputBase-root MuiInput-formControl"
                    />
                </FormControl>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={this.handleSubmit}
                >
                    {this.props.isPresent ? "Edit firmware" : "Create firmware"}
                </Button>
            </Paper>
        )
    }
}

const mapStateToProps = (state) => ({
    firmwares: state.firmwaresReducer.firmwares
})

const mapDispatchToProps = {
    getFirmwares,
    createFirmware,
    editFirmware
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(
        withStyles(styles)(
            FirmwareComponent
        )
    )
);
