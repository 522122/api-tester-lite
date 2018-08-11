import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import Params from "./Params";
import { connect } from "react-redux";
import { urlUpdate, newLine, methodUpdate, submitRequest } from "../actions";

const options = [
    { key: "GET", text: "GET", value: "GET" },
    { key: "POST", text: "POST", value: "POST" },
    { key: "DELETE", text: "DELETE", value: "DELETE" },
    { key: "PUT", text: "PUT", value: "PUT" }
];

class RequestForm extends Component {
    render() {
        let { method, url, data } = this.props;
        return (
            <Form onSubmit={() => this.props.onSubmit({ url, method, data })}>
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
                    <Form.Button loading={this.props.response.fetching}>
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
    const { data, url, method, response } = state;
    return {
        data,
        url,
        method,
        response
    };
};

const mapDispatchToProps = {
    onUrlChange: e => urlUpdate(e.target.value),
    onMethodChange: (e, { value }) => methodUpdate(value),
    addField: () => newLine(),
    onSubmit: request => {
        let filteredData = request.data.filter(v => v.active).reduce((a, b) => {
            return { ...a, [b.prop]: b.value };
        }, {});
        localStorage.setItem("state", JSON.stringify(request));
        return submitRequest({
            data: filteredData,
            method: request.method,
            url: request.url
        });
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RequestForm);
