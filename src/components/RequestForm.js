import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import Params from "./Params";
import { connect } from "react-redux";
import { urlUpdate, newLine, methodUpdate, setResponse } from "../actions";
import axios from "axios";

const options = [
    { key: "GET", text: "GET", value: "GET" },
    { key: "POST", text: "POST", value: "POST" }
];

class RequestForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };

        this.sendRequest = this.sendRequest.bind(this);
    }

    sendRequest() {
        if (this.state.loading) {
            return;
        }

        const { method, url, data } = this.props;
        let formData = data.filter(v => v.active).reduce((a, b) => {
            return { ...a, [b.prop]: b.value };
        }, {});
        this.setState({ loading: true });
        axios({
            data: formData,
            method,
            url
        })
            .then(response => {
                this.props.setResponse(response);
            })
            .catch(error => {
                this.props.setResponse(error.response);
            })
            .then(() => {
                this.setState({ loading: false });
                localStorage.setItem(
                    "state",
                    JSON.stringify({
                        method,
                        url,
                        data
                    })
                );
            });
    }

    render() {
        return (
            <Form onSubmit={this.sendRequest}>
                <Form.Group>
                    <Form.Select
                        fluid
                        width="3"
                        options={options}
                        placeholder="Method"
                        onChange={this.props.onMethodChange}
                        value={this.props.method}
                    />
                    <Form.Input
                        width="13"
                        placeholder="URL"
                        name="URL"
                        value={this.props.url}
                        onChange={this.props.onUrlChange}
                    />
                </Form.Group>

                <Params />

                <Form.Group>
                    <Form.Field width="2" />
                    <Form.Button loading={this.state.loading}>
                        Send request
                    </Form.Button>
                    <Form.Button
                        type="button"
                        primary
                        onClick={this.props.addField}
                    >
                        Add field
                    </Form.Button>
                </Form.Group>
            </Form>
        );
    }
}

const mapStateToProps = state => {
    const { data, url, method } = state;
    return {
        data,
        url,
        method
    };
};

const mapDispatchToProps = {
    onUrlChange: e => urlUpdate(e.target.value),
    onMethodChange: (e, { value }) => methodUpdate(value),
    addField: () => newLine(),
    setResponse
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RequestForm);
