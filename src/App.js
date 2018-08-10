import React, { Component } from 'react';
import {connect} from 'react-redux';

import Data from './components/Data'
import { Form, Grid, Container } from 'semantic-ui-react'

import {removeLine, fieldUpdate, urlUpdate, methodUpdate, newLine} from './actions';

import ReactJson from 'react-json-view'

import axios from 'axios';

//import _ from 'lodash';

const options = [
  { key: 'GET', text: 'GET', value: 'GET' },
  { key: 'POST', text: 'POST', value: 'POST' }
]


class App extends Component {
  
  constructor(props) {
    super(props);

    //this.onCloseClick = this.onCloseClick.bind(this);
    this.sendRequest = this.sendRequest.bind(this);

    this.state = {
      response: {},
      loading: false
    }

  }

  sendRequest() {
    if ( this.state.loading ) {
      return;
    }

    const {method, url, data} = this.props;
    let formData = data.filter(v=>v.active).reduce((a, b) => {
      //let obj = Object.assign({}, b);
      return {...a, [b.prop]:b.value};
    }, {});
    this.setState({loading: true});
    axios({
      data: formData,
      method,
      url
    })
    .then(response => {
      this.setState({response});
      console.log(response);
    })
    .catch(error => {
      console.log(error.response);
      this.setState({response:error.response});
    })
    .then(() => {
      this.setState({loading: false});
      localStorage.setItem("state", JSON.stringify({
        method,url,data
      }));
    });
  }


  render() {
    
    const fields = this.props.data.map((v, i) => (
      <Data key={v.id} obj={v} onCloseClick={this.props.onCloseClick} onChange={this.props.onChange}/>
    ));

    console.log('RENDER!!!!!!!')

    return (
      <Container>
        <Grid centered>
          <Grid.Column width="10">
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

              {fields}
            
                <Form.Group>
                  <Form.Field width="2">
                  </Form.Field>
                  <Form.Button
                  loading={this.state.loading}
                  >
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

            

          </Grid.Column>
          </Grid>


          { Object.keys(this.state.response).length ? (
            <div>
            <ReactJson name={null} src={{
              status: this.state.response.status,
              statusText: this.state.response.statusText,
              data: this.state.response.data
            }} />
            <h3>Full data:</h3>
            <ReactJson name={null} collapsed src={this.state.response} /> 
            </div>): ''}
          

      </Container>
    );
  }
}


const mapStateToProps = (state) => {
  const {data, url, method} = state;
  return {
    data,
    url,
    method
  }
}

const mapDispatchToProps = {
  onCloseClick: (id) => removeLine(id),
  onChange: (obj) => fieldUpdate(obj),
  onUrlChange: (e) => urlUpdate(e.target.value),
  onMethodChange: (e, {value}) => methodUpdate(value),
  addField: () => newLine()
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
