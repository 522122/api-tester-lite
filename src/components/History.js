import React from "react";
import { connect } from "react-redux";
import { List } from "semantic-ui-react";
import { backInTime } from "../actions";
import styled from "styled-components";

const SListItem = styled(List.Item)`
    padding: 8px !important;
    cursor: pointer;
    background-color: ${props =>
        /^2\d*$/.test(props.status)
            ? "rgba(0, 255, 0, 0.2)"
            : "rgba(255,0,0,.2)"};
    &:hover {
        background-color: ${props =>
            /^2\d*$/.test(props.status)
                ? "rgba(0, 255, 0, 0.1)"
                : "rgba(255,0,0,.1)"};
    }
`;

const SListHeader = styled(List.Header)`
    white-space: nowrap !important;
    text-overflow: ellipsis;
    overflow: hidden !important;
`;

const History = props => {
    const list = props.history.map(h => (
        <SListItem
            key={h.id}
            status={h.response.status}
            onClick={e => props.backInTime(h.id)}
        >
            <SListHeader title={h.url}>{h.url}</SListHeader>
            <List.Description>
                {h.method} - {h.response.status} - {h.response.statusText}
            </List.Description>
        </SListItem>
    ));

    return (
        <List divided size="small">
            {list}
        </List>
    );
};

export default connect(
    state => ({ history: state.history }),
    { backInTime }
)(History);
