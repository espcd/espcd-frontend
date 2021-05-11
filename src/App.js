import React, {Component} from 'react';
import {
    AppBar,
    CssBaseline,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    withStyles
} from "@material-ui/core";
import {DeviceHub, Memory} from "@material-ui/icons";
import DevicesComponent from "./components/DevicesComponent";
import FirmwaresComponent from "./components/FirmwaresComponent";
import TitleComponent from "./components/TitleComponent";
import {Link, Route, Switch, Redirect} from "react-router-dom";

const drawerWidth = 200;

const styles = theme => ({
    root: {
        display: 'flex'
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
        overflow: 'auto'
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
                <TitleComponent title="espcd-frontend"/>

                <div className={classes.root}>
                    <CssBaseline/>
                    <AppBar position="fixed" className={classes.appBar}>
                        <Toolbar>
                            <Typography variant="h6" noWrap className={classes.title}>espcd-frontend</Typography>
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
                            </List>
                        </div>
                    </Drawer>
                    <main className={classes.content}>
                        <Toolbar/>
                        <Switch>
                            <Redirect exact from="/" to="/devices"/>
                            <Route path="/devices">
                                <DevicesComponent />
                            </Route>
                            <Route path="/firmwares">
                                <FirmwaresComponent />
                            </Route>
                        </Switch>
                    </main>
                </div>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(App);
