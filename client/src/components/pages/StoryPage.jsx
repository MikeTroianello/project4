import React, { Component } from 'react';
import Axios from 'axios';
import api from '../../api'
import CreateStory from './CreateStory';

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
      <h2>Page {this.state.story.pageNumber}</h2><br></br>
      <h1>{this.state.story.title}</h1>
      <p>{this.state.story.content}<br></br>
      <h3>What will you do next?</h3>
      {!this.state.show && <button onClick={(e) => this.openPanel()}>Create a new Path!</button>}
          {this.state.show && <CreateStory {...this.props}/>}
      </p>
    </div>
    )
  }
}