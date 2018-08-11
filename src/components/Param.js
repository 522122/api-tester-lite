import React from "react";
import { Form, Button } from "semantic-ui-react";
import { Close } from "@material-ui/icons";

const styles = {
    checkbox: {
        marginTop: 13
    },
    icon: {
        width: 16,
        height: 16
    }
};

const Param = props => {
    const { id, prop, value, active } = props.obj;
    return (
        <Form.Group>
            <Form.Input
                style={styles.checkbox}
                width="2"
                type="checkbox"
                name="active"
                checked={active}
                onChange={e =>
                    props.onChange({
                        ...props.obj,
                        [e.target.name]: e.target.checked
                    })
                }
            />
            <Form.Input
                width="6"
                type="text"
                placeholder="Prop"
                value={prop}
                name="prop"
                onChange={e =>
                    props.onChange({
                        ...props.obj,
                        [e.target.name]: e.target.value
                    })
                }
            />
            <Form.Input
                width="6"
                type="text"
                placeholder="Value"
                value={value}
                name="value"
                onChange={e =>
                    props.onChange({
                        ...props.obj,
                        [e.target.name]: e.target.value
                    })
                }
            />
            <Form.Field width="2">
                <Button
                    type="button"
                    onClick={e => props.onCloseClick(id)}
                    compact
                    size="mini"
                >
                    <Close style={styles.icon} />
                </Button>
            </Form.Field>
        </Form.Group>
    );
};

export default Param;
