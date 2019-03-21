import React, { Component } from 'react';
import Axios from 'axios';
import { SERVER_URL } from '../../config'
// import setUser from ''

export default class Profile extends Component{
  constructor(props){
    super(props)
    this.state={
      user:{}
    }
  }


  // componentDidMount(){
  //   Axios.get(`${SERVER_URL}/getUser`).then(userFromServer => {
  //     console.log("User",userFromServer)
  //     this.setState({user:userFromServer})
  //   })
  // }

  render(){
    console.log('thisthisthis',this)
    return(
      <h1>{this.setUser}</h1>
    )
  }
}