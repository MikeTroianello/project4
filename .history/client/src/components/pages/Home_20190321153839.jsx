import React, { Component } from 'react';
import Axios from 'axios';
import api from '../../api'
import ReadStory from './ReadStory';
import { SERVER_URL } from '../../config'

export default class Home extends Component {

  
  componentDidMount(){

    console.log(api.isLoggedIn())
    console.log(api.getLocalStorageUser())

    Axios.get(`${SERVER_URL}/whatever`).then(res=>{
      // console.log("PLEASE GOD DISPLAY THIS", res)
    })

  }


  render() {                
    return (
      <div className="Home">
        <h2>Home</h2>
        <p>This is an interactive story in which anyone can play a part in the creation and expansion in the world.</p><br></br>
        
        {!api.isLoggedIn() && <p><a href="Signup">Create an account</a> or <a href="Login">Log in</a> to start playing!</p>}
        {api.isLoggedIn() && <p><a href="readstory">Let's Play!</a> </p>}
      </div>
    );
  }
}
