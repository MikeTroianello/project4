import React, { Component } from 'react';
import Axios from 'axios';
import { SERVER_URL } from '../../config'

export default class Profile extends Component{


  componentDidMount(){
    Axios.get(`${SERVER_URL}/getStories`).then(storiesFromServer => {
      console.log("ALL STORIES",storiesFromServer.data.stories)
      this.setState({stories:storiesFromServer.data.stories})
    })
  }

  render(){
    return(
      <h1>YEET</h1>
    )
  }
}