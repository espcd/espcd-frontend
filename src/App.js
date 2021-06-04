import React, {Component} from "react";
import {
    AppBar,
    CssBaseline,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    withStyles
} from "@material-ui/core";
import {AccountCircle, Apps, DeviceHub, ExitToApp, Memory} from "@material-ui/icons";
import DevicesComponent from "./components/DevicesComponent";
import FirmwaresComponent from "./components/FirmwaresComponent";
import TitleComponent from "./components/TitleComponent";
import {Link, Redirect, Route, Switch, withRouter} from "react-router-dom";
import ProductsComponent from "./components/ProductsComponent";
import SnackbarComponent from "./components/SnackbarComponent";
import DialogComponent from "./components/DialogComponent";
import ActioncableComponent from "./components/ActioncableComponent";
import {CONFIRMATION_DIALOG, LOGIN_DIALOG_COMPONENT, openDialog} from "./actions/dialog";
import {connect} from "react-redux";
import {deleteSession} from "./actions/session";

const drawerWidth = 200;

const styles = theme => ({
    root: {
        display: "flex"
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth
    },
    drawerContainer: {
        overflow: "auto"
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    },
    title: {
        flexGrow: 1
    },
});

class App extends Component {
    render() {
        const {classes} = this.props;

        return (
            <React.Fragment>
                <TitleComponent/>
                <SnackbarComponent/>
                <DialogComponent/>
                <ActioncableComponent/>

                <div className={classes.root}>
                    <CssBaseline/>
                    <AppBar position="fixed" className={classes.appBar}>
                        <Toolbar>
                            <Typography variant="h6" edge="start" noWrap className={classes.title}>
                                <span style={{cursor: "pointer"}}
                                      onClick={() => this.props.history.push("/")}>espcd-frontend</span>
                            </Typography>
                            {this.props.loggedIn ? (
                                <IconButton
                                    edge="end"
                                    color="inherit"
                                    onClick={
                                        () => this.props.openDialog(
                                            CONFIRMATION_DIALOG,
                                            {
                                                title: "Logout",
                                                content: "Do you really want to log out?",
                                                handleOk: this.props.deleteSession
                                            }
                                        )
                                    }>
                                    <ExitToApp/>
                                </IconButton>
                            ) : (
                                <IconButton
                                    edge="end"
                                    color="inherit"
                                    onClick={() => this.props.openDialog(LOGIN_DIALOG_COMPONENT)}>
                                    <AccountCircle/>
                                </IconButton>
                            )}
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        className={classes.drawer}
                        variant="permanent"
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        <Toolbar/>
                        <div className={classes.drawerContainer}>
                            <List>
                                <ListItem button key="devices" component={Link} to="/devices">
                                    <ListItemIcon>
                                        <DeviceHub/>
                                    </ListItemIcon>
                                    <ListItemText primary="Devices"/>
                                </ListItem>
                                <ListItem button key="firmwares" component={Link} to="/firmwares">
                                    <ListItemIcon>
                                        <Memory/>
                                    </ListItemIcon>
                                    <ListItemText primary="Firmwares"/>
                                </ListItem>
                                <ListItem button key="products" component={Link} to="/products">
                                    <ListItemIcon>
                                        <Apps/>
                                    </ListItemIcon>
                                    <ListItemText primary="Products"/>
                                </ListItem>
                            </List>
                        </div>
                    </Drawer>
                    <main className={classes.content}>
                        <Toolbar/>
                        <Switch>
                            <Redirect exact from="/" to="/devices"/>
                            <Route exact path="/devices">
                                <DevicesComponent/>
                            </Route>
                            <Route exact path="/firmwares">
                                <FirmwaresComponent/>
                            </Route>
                            <Route exact path="/products">
                                <ProductsComponent/>
                            </Route>
                        </Switch>
                    </main>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    loggedIn: !!state.sessionReducer.token
});

const mapDispatchToProps = {
    openDialog,
    deleteSession
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(
        withStyles(styles)(
            App
        )
    )
);
