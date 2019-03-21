import React, { Component } from 'react';
import api from '../../api';
import Axios from 'axios';
import { SERVER_URL } from '../../config'
import currentStory from './StoryPage'

//THIS PAGE IS CALLED TO CREATE NEW STORIES. SHOULD NOT SHOW UP ON ITS OWN

export default class CreateStory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      content: "",
      creatorId: "",
      teaser: "",
      message: null,
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    console.log("the event", event.target)
    let storyToSave = {
      title:event.target.title.value,
      content:event.target.content.value,
      teaser:event.target.teaser.value,
      pageNumber:Number(this.props.pageNumber)+1,
      idOfLastPage: null
    }
    Axios.post(`${SERVER_URL}/createstory`, storyToSave).then(res=>{
      console.log('post successful',res.data)

      console.log(this)
      this.props.history.push(`/story/${res.data._id}`)
      window.location.reload()
      //window.location.reload(`/story/${res.data._id}`);
    })
  }
  render(){
    console.log("Find Values", this.state)
    console.log("DID THIS WORK?", currentStory)
    return (
      <div className="CreateStory">
        <h1>Create Your Story!</h1>
        <form onSubmit={this.handleSubmit}>
          Enter your Story Title: <input 
            type="text" 
            maxLength="40" 
            value={this.state.title} 
            name="title" 
            placeholder="Character length: 40" 
            onChange={this.handleInputChange} 
            /> <br></br>
          Tell us your Story: <textarea 
            rows="6" 
            cols="50" 
            maxLength="500" 
            value={this.state.content} 
            name="content" 
            placeholder="Character length: 500" 
            onChange={this.handleInputChange} 
            /> <br></br>
          Put the teaser for this route: <input 
            type="text" 
            maxLength="25" 
            value={this.state.teaser} 
            name="teaser" 
            placeholder="Character length: 25" 
            onChange={this.handleInputChange} 
            /> <br></br>
          {/* <button onClick={(e) => this.handleClick}>Let's get creatin'!</button> */}
          <button>Let's get creatin'!</button>
          
        </form>
        {/* <h3>(Note: this button is when you want to create a new story.)</h3> */}
      </div>
    )
  }
}