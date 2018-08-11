import React from "react";

import { connect } from "react-redux";
import Param from "./Param";

import { removeLine, fieldUpdate } from "../actions";

const Params = props => {
    const { data, onCloseClick, onChange } = props;

    return data.map((v, i) => (
        <Param
            key={v.id}
            obj={v}
            onCloseClick={onCloseClick}
            onChange={onChange}
        />
    ));
};

const mapStateToProps = state => {
    return {
        data: state.data
    };
};

const mapDispatchToProps = {
    onCloseClick: id => removeLine(id),
    onChange: obj => fieldUpdate(obj)
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Params);
