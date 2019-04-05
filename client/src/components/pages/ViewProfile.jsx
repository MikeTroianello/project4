import React, { Component } from 'react';
import Axios from 'axios';
import { SERVER_URL } from '../../config';

//THIS IS FOR VIEWING OTHER PROFILES

export default class ViewProfile extends Component{
  state = {
    user: {}
  }


  componentDidMount(){
    console.log("COMPONENT DID MOUNT")
    console.log(this.props)
    Axios.get(`${SERVER_URL}/view-profile/${this.props.match.params.id}`).then(userFromServer => {
      console.log(userFromServer
      this.setState({user:userFromServer.data.ViewProfile})
    })
  }


  render(){
    console.log("RENDER", this.state)
    return(
      <div className='profile'>
        <button onClick={this.props.history.goBack}>Back</button>
        {/* <h1>{this.state.user.username}'s profile</h1>
        
        {!this.state.about || !this.state.update || <h3>{this.state.user.username} hasn't filled out their profile yet. {this.state.about}</h3>}
        <h4>{this.state.user.about}</h4> */}

      </div>
    )
  }
}