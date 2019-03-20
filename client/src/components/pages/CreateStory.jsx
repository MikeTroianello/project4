import React, { Component } from 'react';
import api from '../../api';
import Axios from 'axios';
import { SERVER_URL } from '../../config'


export default class CreateStory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      content: "",
      creatorId: "",
      idOfLastPage: "",
      teaser: "",
      message: null,
      pageNumber:""
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
    console.log(event.target.title.value, event.target.content.value)
    let storyToSave = {
      title:event.target.title.value,
      content:event.target.content.value,
      teaser:event.target.teaser.value,
      pageNumber:1,
      idOfLastPage: null
    }
    Axios.post(`${SERVER_URL}/createstory`, storyToSave).then(res=>{
      console.log('post successful',res.data)

      console.log(this)
      //this.props.history.push("/readstory") // Redirect to the home page
      window.location.reload();
    })
  }
  render(){
    console.log(process.env)

    return (
      <div className="CreateStory">
        <h1>Create Your Story!</h1>
        <form onSubmit={this.handleSubmit}>
          Enter your Story Title: <input 
            type="text" 
            maxlength="40" 
            value={this.state.title} 
            name="title" 
            placeholder="Character length: 40" 
            onChange={this.handleInputChange} 
            /> <br></br>
          Tell us your Story: <textarea 
            rows="6" 
            cols="50" 
            maxlength="500" 
            value={this.state.content} 
            name="content" 
            placeholder="Character length: 500" 
            onChange={this.handleInputChange} 
            /> <br></br>
          Put the teaser for this route: <input 
            type="text" 
            maxlength="25" 
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