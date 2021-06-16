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
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography,
    withStyles
} from "@material-ui/core";
import {openConfirmationDialog, openUserDialog} from "../actions/dialogs";
import {AccountCircle, Apps, DeviceHub, Memory, VpnKey} from "@material-ui/icons";
import {connect} from "react-redux";
import {deleteSession} from "../actions/session";
import {getDevices} from "../actions/devices";
import {getFirmwares} from "../actions/firmwares";
import {getProducts} from "../actions/products";
import {getTokens} from "../actions/tokens";

const drawerWidth = 180;

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
        padding: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    },
});

class DashboardRouteComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null
        };
    }

    openMenu = event => {
        this.setState({
            anchorEl: event.currentTarget
        });
    };

    closeMenu = () => {
        this.setState({
            anchorEl: null
        });
    };

    handleEditUser = () => {
        this.closeMenu();
        this.props.openUserDialog();
    };

    handleLogout = () => {
        this.closeMenu();
        this.props.openConfirmationDialog({
            title: "Logout",
            content: "Do you really want to log out?",
            handleOk: this.props.deleteSession
        });
    };

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
                                <Menu
                                    id="user-menu"
                                    anchorEl={this.state.anchorEl}
                                    keepMounted
                                    open={Boolean(this.state.anchorEl)}
                                    onClose={this.closeMenu}
                                >
                                    <MenuItem onClick={this.handleEditUser}>Edit user</MenuItem>
                                    <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                                </Menu>
                                <Tooltip title="User" aria-label="user">
                                    <IconButton
                                        edge="end"
                                        color="inherit"
                                        onClick={this.openMenu}
                                    >
                                        <AccountCircle/>
                                    </IconButton>
                                </Tooltip>
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
    deleteSession,
    getDevices,
    getFirmwares,
    getProducts,
    getTokens,
    openUserDialog,
    openConfirmationDialog
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(
        withStyles(styles)(
            DashboardRouteComponent
        )
    )
);
