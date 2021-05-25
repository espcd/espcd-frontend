import {Component} from "react";
import ActionCable from "actioncable";
import {connect} from "react-redux";
import {dispatchAddDevice, dispatchDeleteDevice, dispatchEditDevice,} from "../actions/devices";
import {dispatchAddFirmware, dispatchDeleteFirmware, dispatchEditFirmware} from "../actions/firmwares";
import {dispatchAddProduct, dispatchDeleteProduct, dispatchEditProduct} from "../actions/products";

class ActioncableComponent extends Component {
    constructor(props) {
        super(props);
        this.cable = ActionCable.createConsumer("ws://localhost:3000/cable");
    }

    componentDidMount() {
        this.cable.subscriptions.create(
            {channel: "DevicesChannel"},
            {
                received: payload => {
                    console.log(payload);
                    let type = payload.type;
                    let device = payload.device;
                    switch (type) {
                        case "create":
                            this.props.dispatchAddDevice(device);
                            break;
                        case "update":
                            this.props.dispatchEditDevice(device);
                            break;
                        case "destroy":
                            this.props.dispatchDeleteDevice(device.id);
                            break;
                        default:
                            console.log("unknown device payload type: " + type);
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
                    let firmware = payload.firmware;
                    switch (type) {
                        case "create":
                            this.props.dispatchAddFirmware(firmware);
                            break;
                        case "update":
                            this.props.dispatchEditFirmware(firmware);
                            break;
                        case "destroy":
                            this.props.dispatchDeleteFirmware(firmware.id);
                            break;
                        default:
                            console.log("unknown firmware payload type: " + type);
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
                    let product = payload.product;
                    switch (type) {
                        case "create":
                            this.props.dispatchAddProduct(product);
                            break;
                        case "update":
                            this.props.dispatchEditProduct(product);
                            break;
                        case "destroy":
                            this.props.dispatchDeleteProduct(product.id);
                            break;
                        default:
                            console.log("unknown product payload type: " + type);
                    }
                }
            }
        );
    }

    render() {
        return null;
    }
}

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
};

export default connect(null, mapDispatchToProps)(
    ActioncableComponent
);
