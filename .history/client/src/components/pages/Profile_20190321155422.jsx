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


  componentDidMount(){
    console.log("MOUNTED")
    Axios.get(`${SERVER_URL}/getUser`).then(userFromServer => {
      console.log("Userlahkvnwvfj",userFromServer)
      this.setState({user:userFromServer})
    })
  }

  render(){
    return(
      <div>
      <h1>Yeet</h1>
      <p>{this.state.user}</p>
      </div>
    )
  }
}