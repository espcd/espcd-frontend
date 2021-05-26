import React, {Component} from "react";
import Helmet from "react-helmet";

export default class TitleComponent extends Component {
    render() {
        return (
            <Helmet>
                <title>espcd-frontend</title>
            </Helmet>
        );
    }
}
