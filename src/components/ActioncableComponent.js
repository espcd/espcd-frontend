import {Component} from "react";
import ActionCable from "actioncable";
import {connect} from "react-redux";
import {dispatchAddDevice, dispatchDeleteDevice, dispatchEditDevice,} from "../actions/devices";
import {dispatchAddFirmware, dispatchDeleteFirmware, dispatchEditFirmware} from "../actions/firmwares";
import {dispatchAddProduct, dispatchDeleteProduct, dispatchEditProduct} from "../actions/products";
import {dispatchAddToken, dispatchDeleteToken, dispatchEditToken} from "../actions/tokens";

class ActioncableComponent extends Component {
    constructor(props) {
        super(props);
        let scheme = process.env.REACT_APP_BACKEND_SECURE === "true" ? "wss" : "ws";
        this.baseUrl = `${scheme}://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/cable`;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.token !== this.props.token) {
            this.disconnectCable();
            this.connectCable();
        }
    }

    disconnectCable = () => {
        if (this.cable) {
            this.cable.disconnect();
        }
    };

    connectCable = () => {
        if (!this.props.token) {
            return;
        }
        let url = `${this.baseUrl}?api_key=${this.props.token}`;
        this.cable = ActionCable.createConsumer(url);
    };

    componentDidMount() {
        this.connectCable();

        this.cable.subscriptions.create(
            {channel: "DevicesChannel"},
            {
                received: payload => {
                    console.log(payload);
                    let type = payload.type;
                    let data = payload.data;
                    switch (type) {
                        case "create":
                            this.props.dispatchAddDevice(data);
                            break;
                        case "update":
                            this.props.dispatchEditDevice(data);
                            break;
                        case "destroy":
                            this.props.dispatchDeleteDevice(data);
                            break;
                        default:
                            console.error("unknown device payload type: " + type);
                    }
                }
            }
        );

        this.cable.subscriptions.create(
            {channel: "FirmwaresChannel"},
            {
                received: payload => {
                    console.log(payload);
                    let type = payload.type;
                    let data = payload.data;
                    switch (type) {
                        case "create":
                            this.props.dispatchAddFirmware(data);
                            break;
                        case "update":
                            this.props.dispatchEditFirmware(data);
                            break;
                        case "destroy":
                            this.props.dispatchDeleteFirmware(data);
                            break;
                        default:
                            console.error("unknown firmware payload type: " + type);
                    }
                }
            }
        );

        this.cable.subscriptions.create(
            {channel: "ProductsChannel"},
            {
                received: payload => {
                    console.log(payload);
                    let type = payload.type;
                    let data = payload.data;
                    switch (type) {
                        case "create":
                            this.props.dispatchAddProduct(data);
                            break;
                        case "update":
                            this.props.dispatchEditProduct(data);
                            break;
                        case "destroy":
                            this.props.dispatchDeleteProduct(data);
                            break;
                        default:
                            console.error("unknown product payload type: " + type);
                    }
                }
            }
        );

        this.cable.subscriptions.create(
            {channel: "TokensChannel"},
            {
                received: payload => {
                    console.log(payload);
                    let type = payload.type;
                    let data = payload.data;
                    switch (type) {
                        case "create":
                            this.props.dispatchAddToken(data);
                            break;
                        case "update":
                            this.props.dispatchEditToken(data);
                            break;
                        case "destroy":
                            this.props.dispatchDeleteToken(data);
                            break;
                        default:
                            console.error("unknown token payload type: " + type);
                    }
                }
            }
        );
    }

    componentWillUnmount() {
        this.disconnectCable();
    }

    render() {
        return null;
    }
}

const mapStateToProps = (state) => ({
    token: state.sessionReducer.token
});

const mapDispatchToProps = {
    dispatchAddDevice,
    dispatchEditDevice,
    dispatchDeleteDevice,
    dispatchAddFirmware,
    dispatchEditFirmware,
    dispatchDeleteFirmware,
    dispatchAddProduct,
    dispatchEditProduct,
    dispatchDeleteProduct,
    dispatchAddToken,
    dispatchEditToken,
    dispatchDeleteToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(
    ActioncableComponent
);
