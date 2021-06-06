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
import TokensComponent from "./components/TokensComponent";
import DialogComponent from "./components/DialogComponent";
import WebsocketComponent from "./components/WebsocketComponent";
import {getDevices} from "./actions/devices";
import {getFirmwares} from "./actions/firmwares";
import {getProducts} from "./actions/products";
import {getTokens} from "./actions/tokens";
import SpinnerComponent from "./components/SpinnerComponent";

class App extends Component {
    componentDidMount() {
        this.init();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.loggedIn !== this.props.loggedIn) {
            this.init();
        }
    }

    init = () => {
        if (this.props.loggedIn) {
            this.props.getDevices();
            this.props.getFirmwares();
            this.props.getProducts();
            this.props.getTokens();
        }
    };

    render() {
        return (
            <React.Fragment>
                <SpinnerComponent/>
                <TitleComponent/>
                <SnackbarComponent/>

                {
                    this.props.loggedIn &&
                    <React.Fragment>
                        <DialogComponent/>
                        <WebsocketComponent/>
                    </React.Fragment>
                }

                <Switch>
                    <Route exact path="/">
                        <Redirect to="/devices"/>
                    </Route>
                    <DefaultRouteComponent path="/login" component={LoginComponent}/>
                    <DashboardRouteComponent path="/devices" component={DevicesComponent}/>
                    <DashboardRouteComponent path="/firmwares" component={FirmwaresComponent}/>
                    <DashboardRouteComponent path="/products" component={ProductsComponent}/>
                    <DashboardRouteComponent path="/tokens" component={TokensComponent}/>
                </Switch>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    loggedIn: !!state.sessionReducer.token
});

const mapDispatchToProps = {
    getDevices,
    getFirmwares,
    getProducts,
    getTokens
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(
        App
    )
);
