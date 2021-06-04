import React, {Component} from "react";
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import LoginComponent from "./components/LoginComponent";
import DefaultRouteComponent from "./components/DefaultRouteComponent";
import DashboardRouteComponent from "./components/DashboardRouteComponent";
import {connect} from "react-redux";
import DevicesComponent from "./components/DevicesComponent";
import FirmwaresComponent from "./components/FirmwaresComponent";
import ProductsComponent from "./components/ProductsComponent";
import TitleComponent from "./components/TitleComponent";
import SnackbarComponent from "./components/SnackbarComponent";

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <TitleComponent/>
                <SnackbarComponent/>

                <Switch>
                    <Route exact path="/">
                        <Redirect to="/devices"/>
                    </Route>
                    <DefaultRouteComponent path="/login" component={LoginComponent}/>
                    <DashboardRouteComponent path="/devices" component={DevicesComponent}/>
                    <DashboardRouteComponent path="/firmwares" component={FirmwaresComponent}/>
                    <DashboardRouteComponent path="/products" component={ProductsComponent}/>
                </Switch>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    loggedIn: !!state.sessionReducer.token
});

export default withRouter(
    connect(mapStateToProps, null)(
        App
    )
);
