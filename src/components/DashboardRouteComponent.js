import React, {Component} from "react";
import {Link, Redirect, Route, withRouter} from "react-router-dom";
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
import {CONFIRMATION_DIALOG, openDialog} from "../actions/dialog";
import {Apps, DeviceHub, ExitToApp, Memory, VpnKey} from "@material-ui/icons";
import {connect} from "react-redux";
import {deleteSession} from "../actions/session";
import {getDevices} from "../actions/devices";
import {getFirmwares} from "../actions/firmwares";
import {getProducts} from "../actions/products";
import {getTokens} from "../actions/tokens";

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

class DashboardRouteComponent extends Component {
    render() {
        const {component: Component, classes, ...rest} = this.props;

        if (!this.props.loggedIn) {
            return <Redirect to="/login"/>;
        }

        return (
            <Route {...rest} render={matchProps => (
                <React.Fragment>
                    <div className={classes.root}>
                        <CssBaseline/>
                        <AppBar position="fixed" className={classes.appBar}>
                            <Toolbar>
                                <Typography variant="h6" edge="start" noWrap className={classes.title}>
                                <span style={{cursor: "pointer"}}
                                      onClick={() => this.props.history.push("/")}>espcd-frontend</span>
                                </Typography>
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
                                    <ListItem button key="tokens" component={Link} to="/tokens">
                                        <ListItemIcon>
                                            <VpnKey/>
                                        </ListItemIcon>
                                        <ListItemText primary="Tokens"/>
                                    </ListItem>
                                </List>
                            </div>
                        </Drawer>
                        <main className={classes.content}>
                            <Toolbar/>
                            <Component {...matchProps} />
                        </main>
                    </div>
                </React.Fragment>
            )}/>
        );
    }
}

const mapStateToProps = (state) => ({
    loggedIn: !!state.sessionReducer.token
});

const mapDispatchToProps = {
    openDialog,
    deleteSession,
    getDevices,
    getFirmwares,
    getProducts,
    getTokens
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(
        withStyles(styles)(
            DashboardRouteComponent
        )
    )
);
