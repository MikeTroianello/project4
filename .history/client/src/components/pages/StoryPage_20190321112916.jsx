import React, { Component } from 'react';
import Axios from 'axios';
import api from '../../api'
import CreateStory from './CreateStory';
import { SERVER_URL } from '../../config'

//THIS PAGE RENDERS THE CURRENT PAGE OF THE STORY


export default class StoryPage extends Component{
  state ={
    message:null,
    story:{}
  }

  openPanel(props){
    console.log("BUTTON CLICKED")
      this.setState({
        show: true
      })
  }

  
  componentDidMount(){
    console.log(this)
    Axios.get(`${SERVER_URL}/getPage/${this.props.match.params.id}`)
      .then(specificStoryFromServer=>{
        this.setState({
          story:specificStoryFromServer.data.storyToClient
        })
      })

  }

  render(){
    console.log("HERE I AM", this.props)
    return(
    <div>
      <h2>Page {this.state.story.pageNumber}</h2><br></br>
      <h1>{this.state.story.title}</h1>
      <p>{this.state.story.content}<br></br>
      <h3>What will you do next?</h3>
      {!this.state.show && <button onClick={(e) => this.openPanel()}>Create a new Path!</button>}
          {this.state.show && <CreateStory {...this.props}, {...this.state}/>}
      </p>
    </div>
    )
  }
}

