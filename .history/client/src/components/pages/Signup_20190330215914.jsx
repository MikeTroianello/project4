import React, { Component } from 'react';
import api from '../../api';
import { SERVER_URL } from '../../config'

//THIS IS THE SIGNUP PAGE

export default class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
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
    let data = {
      username: this.state.username,
      password: this.state.password,
    }
    api.signup(data)
      .then(result => {
        console.log('SUCCESS!')
        this.props.setUser()
        this.props.history.push("/") // Redirect to the home page
      })
      .catch(err => this.setState({ message: err.toString() }))
  }

  render() {
    return (
      <div className="Signup">
        <h2>Create a Character!</h2>
        <form>
          Username: <input type="text" value={this.state.username} name="username" onChange={this.handleInputChange} /> <br />
          Password: <input type="password" value={this.state.password} name="password" onChange={this.handleInputChange} /> <br />
          <button onClick={(e) => this.handleClick(e)}>Signup</button>
        </form>
        {this.state.message && <div className="info info-danger">
          {this.state.message}
        </div>}
        <p>Already have an account? <a href="Login">Log In</a></p>
      </div>
    );
  }
}