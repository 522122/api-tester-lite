import React from "react";
import { connect } from "react-redux";
//import ReactJson from "react-json-view";

import styled from "styled-components";

import { Dimmer, Loader, Segment } from "semantic-ui-react";

const Pre = styled.pre`
    white-space: pre-wrap;
`;

const Response = ({ response }) => {
    return Object.keys(response.data).length ? (
        <Dimmer.Dimmable dimmed={response.fetching} as={Segment}>
            <Dimmer active={response.fetching} inverted />

            {/* <ReactJson name={null} src={response.data} /> */}
            <Pre>
                <code>{JSON.stringify(response.data, null, 4)}</code>
            </Pre>
        </Dimmer.Dimmable>
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
