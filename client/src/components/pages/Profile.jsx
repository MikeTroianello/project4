import React, { Component } from 'react';
import Axios from 'axios';
import { SERVER_URL } from '../../config'

export default class Profile extends Component{
  constructor(props){
    super(props)
    this.state={
      // user:{}
      is:true
    }
  }


  componentDidMount(){
    Axios.get(`${SERVER_URL}/getUser`).then(userFromServer => {
      console.log("User",userFromServer)
      this.setState({user:userFromServer})
    })
  }

  render(){
    return(
      <h1>YEET</h1>
    )
  }
}