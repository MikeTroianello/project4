import React, { Component } from 'react';
import Axios from 'axios';
import { SERVER_URL } from '../../config';

//THIS IS FOR VIEWING OTHER PROFILES

export default class ViewProfile extends Component{
  state = {
    user: {}
  }

  filterUser = (viewProfile) => {
    let trueUser = viewProfile.filter(user=>{
      return user.username === this.props.match.params.id
    })
    console.log(trueUser)
    return trueUser
  }

  componentDidMount(){
    Axios.get(`${SERVER_URL}/view-profile/${this.props.match.params.id}`).then(userFromServer => {
      console.log(userFromServer.data.viewProfile)
      // this.setState({user:userFromServer.data.ViewProfile})
      this.setState({user:this.filterUser(userFromServer.data.viewProfile)})
    })
  }


  render(){
    console.log("RENDER", this.state.user)
    console.log("user.about[0]", this.state.user[0])
    console.log("user.about", this.state.user.about)
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