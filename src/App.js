import React, {Component} from 'react';
import {
    AppBar,
    ButtonBase,
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
import {Apps, DeviceHub, Memory} from "@material-ui/icons";
import DevicesComponent from "./components/DevicesComponent";
import FirmwaresComponent from "./components/FirmwaresComponent";
import TitleComponent from "./components/TitleComponent";
import {Link, Redirect, Route, Switch, withRouter} from "react-router-dom";
import DeviceComponent from "./components/DeviceComponent";
import FirmwareComponent from "./components/FirmwareComponent";
import ProductsComponent from "./components/ProductsComponent";
import ProductComponent from "./components/ProductComponent";
import SnackbarComponent from "./components/SnackbarComponent";

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
                <SnackbarComponent/>

                <div className={classes.root}>
                    <CssBaseline/>
                    <AppBar position="fixed" className={classes.appBar}>
                        <Toolbar>
                            <ButtonBase onClick={() => this.props.history.push('/')}>
                                <Typography variant="h6" noWrap className={classes.title}>espcd-frontend</Typography>
                            </ButtonBase>
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
                                <DevicesComponent />
                            </Route>
                            <Route path="/devices/:id">
                                <DeviceComponent />
                            </Route>
                            <Route exact path="/firmwares">
                                <FirmwaresComponent />
                            </Route>
                            <Route path="/firmwares/new">
                                <FirmwareComponent isPresent={false} />
                            </Route>
                            <Route path="/firmwares/:id">
                                <FirmwareComponent isPresent={true} />
                            </Route>
                            <Route exact path="/products">
                                <ProductsComponent />
                            </Route>
                            <Route path="/products/new">
                                <ProductComponent isPresent={false} />
                            </Route>
                            <Route path="/products/:id">
                                <ProductComponent isPresent={true} />
                            </Route>
                        </Switch>
                    </main>
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(
    withStyles(styles)(
        App
    )
);
