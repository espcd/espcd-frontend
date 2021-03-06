import React, {Component} from "react";
import {createToken, editToken} from "../actions/tokens";
import {connect} from "react-redux";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@material-ui/core";
import Token from "../data-classes/Token";
import {closeDialog} from "../actions/dialogs";
import {DateTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/moment";
import ProductSelectComponent from "./ProductSelectComponent";
import {objectValueChanged} from "./common";

class TokenDialogComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updates: {}
        };
    }

    componentDidMount() {
        if (!this.props.token.expires_at) {
            this.handleDateChange(new Date(new Date().getTime() + 365 * 24 * 60 * 60 * 1000));
        }
    }

    handleChange = (event) => {
        let target = event.target;
        let key = target.name;
        let value = target.type === "checkbox" ? target.checked : target.value;

        let updates = this.state.updates;
        updates[key] = value;
        this.setState({
            updates: updates
        });
    };

    handleDateChange = (value) => {
        let updates = this.state.updates;
        updates.expires_at = value;
        this.setState({
            updates: updates
        });
    };

    handleKeyPress = (event) => {
        if (event.key === "Enter" && !this.submitDisabled() && event.target.type !== "textarea") {
            this.handleSubmit();
        }
    };

    handleSubmit = () => {
        let tokenId = this.props.token.id;
        let payload = this.state.updates;

        if (this.props.isPresent) {
            this.props.editToken(tokenId, payload)
                .then(() => this.props.closeDialog());
        } else {
            this.props.createToken(payload)
                .then(() => this.props.closeDialog());
        }
    };

    valueChanged = key => objectValueChanged(this.state.updates, this.props.token, key);

    getValue = key => this.valueChanged(key) ? this.state.updates[key] : this.props.token[key];

    submitDisabled = () => !Object.keys(this.props.token).some(key => this.valueChanged(key));

    render() {
        let token = {
            id: this.props.token.id,
            title: this.getValue("title"),
            description: this.getValue("description"),
            token: this.getValue("token"),
            expires_at: this.getValue("expires_at"),
            product_id: this.getValue("product_id")
        };

        return (
            <Dialog
                fullWidth
                open={this.props.open}
                onClose={this.props.closeDialog}
                onKeyPress={this.handleKeyPress}
            >
                <DialogTitle>
                    {this.props.isPresent ? "Edit token" : "Add token"}
                </DialogTitle>
                <DialogContent dividers>
                    <TextField
                        disabled
                        margin="dense"
                        id="id"
                        name="id"
                        label="ID"
                        type="text"
                        fullWidth
                        value={token.id}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        name="title"
                        label="Title"
                        type="text"
                        fullWidth
                        required
                        value={token.title}
                        onChange={this.handleChange}
                    />
                    <TextField
                        margin="dense"
                        id="description"
                        name="description"
                        label="Description"
                        type="text"
                        multiline
                        fullWidth
                        value={token.description}
                        onChange={this.handleChange}
                    />
                    <TextField
                        disabled
                        margin="dense"
                        id="token"
                        name="token"
                        label="Token"
                        type="text"
                        multiline
                        fullWidth
                        value={token.token}
                        onChange={this.handleChange}
                    />
                    <ProductSelectComponent
                        product_id={token.product_id}
                        onChange={this.handleChange}
                    />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DateTimePicker
                            required
                            fullWidth
                            autoOk
                            showTodayButton
                            margin="dense"
                            ampm={false}
                            value={token.expires_at}
                            onChange={this.handleDateChange}
                            format="DD/MM/YYYY HH:mm"
                            id="expires_at"
                            name="expires_at"
                            label="Expires at"
                        />
                    </MuiPickersUtilsProvider>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="default"
                        onClick={this.props.closeDialog}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleSubmit}
                        disabled={this.submitDisabled()}
                    >
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

const mapStateToProps = (state) => {
    let tokenId = state.dialogsReducer.props.tokenId;
    let token = state.tokensReducer.tokens.find(token => token.id === tokenId) || new Token();
    return {
        open: state.dialogsReducer.open,
        isPresent: !!tokenId,
        tokenId,
        token
    };
};

const mapDispatchToProps = {
    closeDialog,
    createToken,
    editToken
};

export default connect(mapStateToProps, mapDispatchToProps)(
    TokenDialogComponent
);
