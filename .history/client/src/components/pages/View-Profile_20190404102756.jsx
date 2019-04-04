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
      <div className='profile'>
        <button onClick={this.props.history.goBack}>Back</button>
        <h1>{this.state.user.username}'s profile</h1>
        
        {!this.state.about || !this.state.update || <h3>{this.state.user.username} hasn't filled out their profile yet. {this.state.about}</h3>}
        <h4>{this.state.user.about}</h4>

      </div>
    )
  }
}