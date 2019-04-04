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
    stories:[],
    creator: ""
  }

  openPanel(){
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
      return <li><a href={`/story/${story._id}`}>{story.teaser}</a></li>
    })
  }

  componentWillMount(){
    Axios.get(`${SERVER_URL}/getPage/${this.props.match.params.id}`)
    .then(specificStoryFromServer=>{
      this.setState({
        story:specificStoryFromServer.data.storyToClient
      })
    })
    Axios.get(`${SERVER_URL}/getStories`).then(storiesFromServer => {
      this.setState({stories:this.filterNextStories(storiesFromServer.data.stories)})
    })
  }

  componentDidMount(){
    console.log("this ", this)
    
      //NEWLY ADDED
      Axios.get(`${SERVER_URL}/view-profile/${this.state.story.creatorId}`).then(userNameFromServer=>{
        this.setState({creator:userNameFromServer.data.viewProfile})
      })
  }

  render(){
    return(
    <div className="storyPage">
    <button onClick={this.props.history.goBack}>Back</button>
    <h5>Created by {this.state.creator}</h5>

      <h2>Page {this.state.story.pageNumber}</h2>
      
      <div className='pageBorder'>
        <h1>{this.state.story.title}</h1>
        <p>{this.state.story.content}<br></br></p>
      </div>
      <h3>What will you do next?</h3>

      <h2>{this.showNextStories()}</h2>

      {!this.state.show && <button onClick={(e) => this.openPanel()}>Create a new Page!</button>}
          {this.state.show && <CreateStory {...this.props} {...this.state.story}/>}
      
    </div>
    )
  }
}

