import React, { Component } from 'react';
import Axios from 'axios';
import api from '../../api'
import CreateStory from './CreateStory';
import { SERVER_URL } from '../../config'

//THIS IS WHERE YOU CHOOSE THE BEGINNING OF YOUR STORY

export default class ReadStory extends Component {
  constructor(props){
    super(props)
    this.state={
      show: false,
      stories: []
    }
  //this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount(){
    Axios.get(`${SERVER_URL}/getStories`).then(storiesFromServer => {
      console.log("ALL STORIES",storiesFromServer.data.stories)
      this.setState({stories:storiesFromServer.data.stories})
    })
  }

  openPanel(){
    console.log("BUTTON CLICKED")
      this.setState({
        show: true
      })
  }

  showStories = () => {
    return this.state.stories.map(story=>{
      return (
        <a href={`story/${story._id}`}>
         {/* {story.pageNumber === 1 && <li>{story.title}</li> } */}
         <li>{story.title}</li>
        </a>
      )
    })
  }

  render(){
    console.log("DSVBASDJVBAJDSBVJSDBVJABDSV",this.props)
      return(
        <div>
          <h1>Choose your quest</h1>
          
          {this.showStories()}

          <button onClick={(e) => this.openPanel()}>New Story</button>
          {this.state.show && <CreateStory {...this.props}/>}
          <h3>(Note: for the sake of the demo, please do not create a new story, just add onto the existing one.</h3>
        </div>
      )
    }
}