import React, { Component } from 'react';
import api from '../../api';

export default class CreateStory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      content: "",
      creatorId: "",
      idOfLastPage: "",
      teaser: "",
      message: null

    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleClick(e) {
    e.preventDefault()
    api.login(this.state.title, this.state.content, this.state.teaser)
      .then(result => {
        // console.log(api.getLocalStorageUser())
        this.setState({user:api.getLocalStorageUser()})
        this.props.setUser()
        this.props.history.push("/") // Redirect to the home page
      })
      .catch(err => this.setState({ message: err.toString() }))
  }

  render(){
    return (
      <div className="CreateStory">
        <h1>Create Your Story!</h1>
        <form>
          Enter your Story Title: <input type="text" maxlength="40" value={this.state.title} name="title" placeholder="Character length: 40" onChange={this.handleInputChange} /> <br></br>
          Tell us your Story: <textarea rows="6" cols="50" maxlength="500" value={this.state.content} name="content" placeholder="Character length: 500" onChange={this.handleInputChange} /> <br></br>
          Put the teaser for this route: <input type="text" maxlength="15" value={this.state.teaser} name="teaser" placeholder="Character length: 15" onChange={this.handleInputChange} /> <br></br>
          <button onClick={(e) => this.handleClick}>Let's get creatin'!</button>
        </form>
      </div>
    )
  }
}