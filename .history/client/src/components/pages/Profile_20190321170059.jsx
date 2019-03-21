import React, { Component } from 'react';
import Axios from 'axios';
import { SERVER_URL } from '../../config'

export default class Profile extends Component{
  constructor(props){
    super(props)
    this.state={
      user:{},
      show:false
    }
  }

  deleteProfile(){
    console.log("BUTTON CLICKED")
    this.setState({
      show: true
    })
  }

  deleteConfirm(){
    console.log('DELETED')
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

      <button onClick={(e) => this.deleteProfile()}>Delete Profile(!)</button>
      {this.state.show && <h1>DELETE PROFILE?!</h1>}
      {this.state.show && <h3>(This cannot be undone)</h3>}
      {this.state.show && <button onClick={(e)=>this.deleteConfirm()}}>Yes, kill it</button>
      </div>
    )
  }
}