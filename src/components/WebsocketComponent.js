import {Component} from "react";
import {connect} from "react-redux";
import {dispatchAddDevice, dispatchDeleteDevice, dispatchEditDevice,} from "../actions/devices";
import {dispatchAddFirmware, dispatchDeleteFirmware, dispatchEditFirmware} from "../actions/firmwares";
import {dispatchAddProduct, dispatchDeleteProduct, dispatchEditProduct} from "../actions/products";
import {dispatchAddToken, dispatchDeleteToken, dispatchEditToken} from "../actions/tokens";

class WebsocketComponent extends Component {
    constructor(props) {
        super(props);
        let scheme = process.env.REACT_APP_BACKEND_SECURE === "true" ? "wss" : "ws";
        this.baseUrl = `${scheme}://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/cable`;
        this.connections = {};
    }

    componentDidMount() {
        this.connect();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.token !== this.props.token) {
            this.connect();
        }
    }

    componentWillUnmount() {
        Object.keys(this.connections).forEach(key => {
            try {
                this.connections[key].close();
            } catch (e) {
            }
        });
        this.connections = {};
    }

    connectChannel = (channel, onMessage) => {
        let url = `${this.baseUrl}?api_key=${this.props.token}`;
        let connection = new WebSocket(url);

        connection.onclose = event => {
            if (!event.wasClean) {
                setTimeout(() => {
                    this.connectChannel(channel, onMessage);
                }, 4000);
            }
        };
        connection.onerror = () => {
            connection.close();
        };
        connection.onopen = () => {
            connection.send(JSON.stringify({
                "command": "subscribe",
                "identifier": JSON.stringify({
                    channel: channel
                })
            }));
        };
        connection.onmessage = event => {
            let data = JSON.parse(event.data);
            if (!data.type) {
                onMessage(data.message);
            }
        };

        this.connections[channel] = connection;
    };

    connect = () => {
        this.connectChannel("DevicesChannel", payload => {
            switch (payload.type) {
                case "create":
                    this.props.dispatchAddDevice(payload.data);
                    break;
                case "update":
                    this.props.dispatchEditDevice(payload.data);
                    break;
                case "destroy":
                    this.props.dispatchDeleteDevice(payload.data);
                    break;
                default:
                    console.error("unknown device payload: " + payload);
            }
        });

        this.connectChannel("FirmwaresChannel", payload => {
            switch (payload.type) {
                case "create":
                    this.props.dispatchAddFirmware(payload.data);
                    break;
                case "update":
                    this.props.dispatchEditFirmware(payload.data);
                    break;
                case "destroy":
                    this.props.dispatchDeleteFirmware(payload.data);
                    break;
                default:
                    console.error("unknown firmware payload: " + payload);
            }
        });

        this.connectChannel("ProductsChannel", payload => {
            switch (payload.type) {
                case "create":
                    this.props.dispatchAddProduct(payload.data);
                    break;
                case "update":
                    this.props.dispatchEditProduct(payload.data);
                    break;
                case "destroy":
                    this.props.dispatchDeleteProduct(payload.data);
                    break;
                default:
                    console.error("unknown product payload: " + payload);
            }
        });

        this.connectChannel("TokensChannel", payload => {
            switch (payload.type) {
                case "create":
                    this.props.dispatchAddToken(payload.data);
                    break;
                case "update":
                    this.props.dispatchEditToken(payload.data);
                    break;
                case "destroy":
                    this.props.dispatchDeleteToken(payload.data);
                    break;
                default:
                    console.error("unknown token payload: " + payload);
            }
        });
    };

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
    WebsocketComponent
);
