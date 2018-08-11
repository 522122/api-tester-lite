import React from "react";
import { connect } from "react-redux";
import ReactJson from "react-json-view";

import { Dimmer, Loader, Segment } from "semantic-ui-react";

const styles = {
    segment: {
        overflow: "scroll",
        maxHeight: "50vh"
    }
};

const Response = ({ response }) => {
    return Object.keys(response.data).length ? (
        <Dimmer.Dimmable
            dimmed={response.fetching}
            as={Segment}
            style={styles.segment}
        >
            <Dimmer active={response.fetching} inverted verticalAlign="top">
                <Loader>Loading</Loader>
            </Dimmer>

            {/* <SyntaxHighlighter language="javascript">
                {JSON.stringify(
                    {
                        response
                    },
                    null,
                    4
                )}
            </SyntaxHighlighter> */}
            {/* <ReactJson
                name={null}
                src={{
                    status: response.status,
                    statusText: response.statusText,
                    data: response.data
                }}
            /> */}
            <ReactJson name={null} src={response.data} />
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
