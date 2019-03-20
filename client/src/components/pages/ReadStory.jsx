import React, { Component } from 'react';
import Axios from 'axios';
import api from '../../api'
import CreateStory from './CreateStory';

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
    Axios.get("http://localhost:5000/api/getStories").then(storiesFromServer => {
      console.log('all stories',storiesFromServer)
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
         <li>{story.title}</li>
        </a>
      )
    })
  }

  render(){
      return(
        <div>
          <h1>Choose your quest</h1>
          
          {this.showStories()}

          <button onClick={(e) => this.openPanel()}>New Story</button>
          {this.state.show && <CreateStory {...this.props}/>}
        </div>
      )
    }
}