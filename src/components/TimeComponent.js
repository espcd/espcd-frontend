import {Component} from "react";
import moment from "moment";

class TimeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formatted: null
        };
    }

    formatDatetime = () => {
        let formatted;
        if (this.props.onPast && new Date(this.props.datetime) < new Date()) {
            formatted = this.props.onPast;
        } else {
            formatted = moment(this.props.datetime).fromNow();
        }
        if (formatted !== this.state.formatted) {
            this.setState({
                formatted: formatted
            });
        }
    };

    componentDidMount() {
        this.formatDatetime();
        this.interval = setInterval(
            () => this.formatDatetime(),
            1000
        );
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.datetime !== this.props.datetime) {
            this.formatDatetime();
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return <span>{this.state.formatted}</span>;
    }
}

export default TimeComponent;
