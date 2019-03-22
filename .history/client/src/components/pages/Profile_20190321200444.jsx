import React, { Component } from 'react';
import Axios from 'axios';
import { SERVER_URL } from '../../config'

export default class Profile extends Component{
  constructor(props){
    super(props)
    this.state={
      user:{},
      show:false,
      update:false
    }
  }

  deleteProfile(){
    console.log("BUTTON CLICKED")
    this.setState({
      show: true
    })
  }

  deleteConfirm(){
    console.log("DELETING")
    Axios.post(`${SERVER_URL}/deleteUser`).then(result=>{
      window.localStorage.removeItem('user')
      this.props.history.push('/') 
    })}

  updateProfile(){
    this.setState({
      update:true
    })
  }

  updateAbout(event){
    event.preventDefault()
    console.log("UPDATING")
    const userUpdate={
      update:event.target.update.value
    }
    Axios.post(`${SERVER_URL}/updateUser`).then(result=>{
      window.location.reload()
    })}

  componentDidMount(){
    Axios.get(`${SERVER_URL}/getUser`).then(userFromServer => {
      console.log("ANYTHING", userFromServer.data.user)
      this.setState({user:userFromServer.data.user})
    })
  }

  render(){
   console.log(this.state.update)
    return(
      <div>
      <h1>{this.state.user.username}'s profile</h1>
      <h2>About {this.state.user.username}:</h2>
      <button onClick={(e) => this.updateProfile()}>Update Profile</button><br></br>
      {!this.state.about && !this.state.update && <h3>You don't have anything written about you yet...</h3>}
      <h1>{this.state.user.about}</h1>
      {this.state.update &&
        <form onSubmit={(e)=>this.updateAbout()}>
          <textarea 
              rows="4" 
              cols="50" 
              maxLength="400" 
              value={this.state.about} 
              name="content" 
              placeholder="Character length: 400" 
            
              /><br></br>
          <button>Submit</button>
        </form>
      }
      <button onClick={(e) => this.deleteProfile()}>Delete Profile(!)</button>
      {this.state.show && <h1>DELETE PROFILE?!</h1>}
      {this.state.show && <h3>(This cannot be undone)</h3>}
      {this.state.show && <button onClick={(e)=>this.deleteConfirm()}>Yes, kill it</button>}
      </div>
    )
  }
}


// onChange={this.handleInputChange} 