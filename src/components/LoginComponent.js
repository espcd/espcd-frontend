import React, {Component} from "react";
import {Button, Container, CssBaseline, TextField, Typography, withStyles} from "@material-ui/core";
import {connect} from "react-redux";
import {createSession} from "../actions/session";
import {withRouter} from "react-router-dom";

const styles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    submit: {
        margin: theme.spacing(3, 0),
    },
});

class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
    }

    handleKeyPress = (event) => {
        if (event.key === "Enter") {
            this.handleSubmit();
        }
    };

    handleSubmit = () => {
        let {from} = this.props.location.state || {from: {pathname: "/"}};
        this.props.createSession(this.state.username, this.state.password)
            .then(() => this.props.history.replace(from));
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {
        const {classes} = this.props;

        return (
            <Container component="main" maxWidth="xs" onKeyPress={this.handleKeyPress}>
                <CssBaseline/>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <div>
                        <TextField
                            autoFocus
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            id="username"
                            name="username"
                            label="Username"
                            type="text"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            size="large"
                            className={classes.submit}
                            onClick={this.handleSubmit}
                        >
                            Sign In
                        </Button>
                    </div>
                </div>
            </Container>
        );
    }
}

const mapDispatchToProps = {
    createSession
};

export default withRouter(connect(null, mapDispatchToProps)(
    withStyles(styles)(
        LoginComponent
    )
));
