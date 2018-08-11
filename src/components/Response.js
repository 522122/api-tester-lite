import React from "react";
import { connect } from "react-redux";
import ReactJson from "react-json-view";

const Response = ({ response }) => {
    return Object.keys(response).length ? (
        <div>
            <ReactJson
                name={null}
                src={{
                    status: response.status,
                    statusText: response.statusText,
                    data: response.data
                }}
            />
            <h3>Full data:</h3>
            <ReactJson name={null} collapsed src={response} />
        </div>
    ) : (
        ""
    );
};

const mapStateToProps = state => {
    const { response } = state;
    return {
        response
    };
};

export default connect(mapStateToProps)(Response);
