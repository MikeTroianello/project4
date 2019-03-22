import React, { Component } from 'react';
import Axios from 'axios';
import api from '../../api'
import CreateStory from './CreateStory';
import { SERVER_URL } from '../../config'

//THIS PAGE RENDERS THE CURRENT PAGE OF THE STORY


export default class StoryPage extends Component{
  state ={
    message:null,
    story:{},
    stories:[]
  }

  openPanel(){
    console.log("BUTTON CLICKED")
      this.setState({
        show: true
      })
  }

  filterNextStories = (stories) => {
    let showNextStories = stories.filter(story=>{
      return story.idOfLastPage === this.props.match.params.id
    })
    console.log(showNextStories)
    return showNextStories;
  }
  showNextStories = () => {
    return this.state.stories.map(story=>{
      return <a href={`/story/${story._id}`}>{story.teaser}</a>
    })
  }

  componentDidMount(){
    console.log(this)
    Axios.get(`${SERVER_URL}/getPage/${this.props.match.params.id}`)
      .then(specificStoryFromServer=>{
        console.log(specificStoryFromServer)
        this.setState({
          story:specificStoryFromServer.data.storyToClient
        })
      })
      Axios.get(`${SERVER_URL}/getStories`).then(storiesFromServer => {
        console.log("ALL STORIES",storiesFromServer.data.stories)

        this.setState({stories:this.filterNextStories(storiesFromServer.data.stories)})
      })
  }

  render(){
    console.log("HERE I AM", this.state.story)
    //const currentStory= {...this.state.story}
    return(
    <div>
      <h2>Page {this.state.story.pageNumber}</h2><br></br>
      <h1>{this.state.story.title}</h1>
      <p>{this.state.story.content}<br></br>
      <h3>What will you do next?</h3>

      <h2>{this.showNextStories()}</h2>

      {!this.state.show && <button onClick={(e) => this.openPanel()}>Create a new Path!</button>}
          {this.state.show && <CreateStory {...this.props} {...this.state.story}/>}
      </p>
    </div>
    )
  }
}
