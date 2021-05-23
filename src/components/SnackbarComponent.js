import React, {Component} from "react";
import {Snackbar} from "@material-ui/core";
import {connect} from "react-redux";
import {clearNotification} from "../actions/notifications";
import {Alert} from '@material-ui/lab';


class SnackbarComponent extends Component {
    render() {
        return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={this.props.open}
                autoHideDuration={6000}
                onClose={this.props.clearNotification}
            >
                <Alert
                    onClose={this.props.clearNotification}
                    severity={this.props.severity}
                    elevation={6}
                    variant="filled"
                >
                    {this.props.message}
                </Alert>
            </Snackbar>
        )
    }
}

const mapStateToProps = (state) => ({
    open: state.notificationsReducer.open,
    message: state.notificationsReducer.message,
    severity: state.notificationsReducer.severity
});

const mapDispatchToProps = {
    clearNotification
};

export default connect(mapStateToProps, mapDispatchToProps)(
    SnackbarComponent
);
