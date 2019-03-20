import React, { Component } from 'react';
import Axios from 'axios';
import api from '../../api'

export default class StoryPage extends Component{
  state ={
    message:null,
    story:{}
  }

  componentDidMount(){
    console.log(this)
    Axios.get(`http://localhost:5000/api/getPage/${this.props.match.params.id}`)
      .then(specificStoryFromServer=>{
        this.setState({
          story:specificStoryFromServer.data.storyToClient
        })
      })
  }

  render(){
    return(
    <div>
      <h1>Story PAGE {this.state.story.title}</h1>
    </div>
    )
  }
}