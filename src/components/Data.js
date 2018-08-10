import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import { Close } from '@material-ui/icons'

export default class Data extends Component {
  render() {
    return (
    <Form.Group>

        <Form.Input type='checkbox' width="2" />
        <Form.Input fluid type="text" width="7" placeholder='Prop' />
        <Form.Input fluid type="text" width="7" placeholder='Value' />
        <Close />
      </Form.Group>
    )
  }
}
