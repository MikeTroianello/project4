import React, { Component } from 'react';
import Axios from 'axios';
import { SERVER_URL } from '../../config'

export default class Profile extends Component{
  constructor(props){
    super(props)
    this.state={
      user:{},
      show:false,
      update:false,
      about: ''
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


  //UPDATE PROFILE

  updateProfile(){
    this.setState({
      update:true
    })
  }

  updateAbout = (event) =>{
    event.preventDefault()
    console.log("ZZZZZZXZXZXZXZXZXZXZZXZXZXZXZXZXZXZ")
    const userUpdate={
      update:event.target.updater.value
    }
    console.log(userUpdate)
    //debugger;
    Axios.post(`${SERVER_URL}/updateUser`, userUpdate).then(result=>{
      // window.location.reload()
      //this.setState({about:userUpdate.update})
    })}

  componentDidMount(){
    Axios.get(`${SERVER_URL}/getUser`).then(userFromServer => {
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
      {!this.state.about && !this.state.update && <h3>You don't have anything written about you yet... {this.state.about}</h3>}
      <h1>{this.state.user.about}</h1>
      {this.state.update &&
        <form onSubmit={this.updateAbout}>
          <textarea 
              rows="4" 
              cols="50" 
              maxLength="400" 
              value={this.state.about} 
              name="updater" 
              placeholder="Character length: 400" 
            
              /><br></br>
          <button type="submit">is this itSubmit</button>
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