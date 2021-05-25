import {Component} from "react";
import ActionCable from "actioncable";
import {connect} from "react-redux";
import {dispatchAddDevice, dispatchDeleteDevice, dispatchEditDevice,} from "../actions/devices";

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
    }

    render() {
        return null;
    }
}

const mapDispatchToProps = {
    dispatchAddDevice,
    dispatchEditDevice,
    dispatchDeleteDevice
};

export default connect(null, mapDispatchToProps)(
    ActioncableComponent
);
