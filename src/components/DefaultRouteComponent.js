import {Route} from "react-router-dom";
import React, {Component} from "react";

class DefaultRouteComponent extends Component {
    render() {
        const {component: Component, ...rest} = this.props;

        return (
            <Route {...rest} render={matchProps => (
                <Component {...matchProps} />
            )}/>
        );
    }
}

export default DefaultRouteComponent;
