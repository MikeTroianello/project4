import React, { Component } from 'react';
import Axios from 'axios';
import { SERVER_URL } from '../../config'

export default class Profile extends Component{
  constructor(props){
    super(props)
    this.state={
      user:{}
    }
  }

  deleteProfile(event){

  }

  componentDidMount(){
    Axios.get(`${SERVER_URL}/getUser`).then(userFromServer => {
      console.log("ANYTHING", userFromServer.data.user)
      this.setState({user:userFromServer.data.user})
    })
  }

  render(){
   console.log(this.state.user.username)
    return(
      <div>
      <h1>Yeet</h1>
      <p>{this.state.user.username}'s profile</p>
      <h2>About {this.state.user.username}:</h2>

      <button onClick={(e) => deleteProfile()}>Delete Profile(!)</button>
      </div>
    )
  }
}