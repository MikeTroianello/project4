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
      this.setState({
        show: true
      })
  }

  showStories = () => {
    return this.state.stories.map(story=>{
      return (
        <a href={`story/${story._id}`}>
         {story.pageNumber === 1 && <li>{story.title}</li> }
        </a>
      )
    })
  }

  render(){
      return(
        <div>
          <div className="left-side-button">
            <a href='/home'>Back</a>
          </div>
          <div>
            <h1>Choose your quest</h1>
            
            {this.showStories()}

            <button onClick={(e) => this.openPanel()}>New Story</button>
            {this.state.show && <CreateStory {...this.props}/>}
          </div>
        </div>
      )
    }
}