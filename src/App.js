import React, { Component } from 'react';
import {connect} from 'react-redux';

import Data from './components/Data'
import { Form, Grid } from 'semantic-ui-react'

class App extends Component {
  
  render() {
    
    const fields = this.props.data.map((v, i) => (
      <Data key={i} />
    ));

    return (
      <Grid container centered>
        <Grid.Column width="10">
        <Form>
        {fields}
        </Form>
        </Grid.Column>
      </Grid>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    data: state.data
  }
}


export default connect(mapStateToProps)(App);
