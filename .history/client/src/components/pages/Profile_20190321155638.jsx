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
    Axios.get(`${SERVER_URL}/getUser`).then(userFromServer => {
      this.setState({user:userFromServer})
    })
    console.log({this.state.user})
  }

  render(){
   
    return(
      <div>
      <h1>Yeet</h1>
      {/* <p>{this.state.user}</p> */}
      </div>
    )
  }
}