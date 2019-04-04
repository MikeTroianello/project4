import React, { Component } from 'react';
import Axios from 'axios';
import { SERVER_URL } from '../../config';

//THIS IS FOR VIEWING OTHER PROFILES

export default class ViewProfile extends Component{
  constructor(props){
    super(props)
    this.state = {
      user: {}
    }
  }


  componentDidMount(){
    Axios.get(`${SERVER_URL}/getUser`).then(userFromServer => {
      this.setState({user:userFromServer.data.user})
    })
  }


  render(){
    return(
      <div>
        <button onClick={this.props.history.goBack}>Back</button>
        <h1>Hello</h1>
      </div>
    )
  }
}