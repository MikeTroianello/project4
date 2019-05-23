import React, { Component } from "react";
import Axios from "axios";
import api from "../../api";
import ReadStory from "./ReadStory";
import { SERVER_URL } from "../../config";
import { Route, Link, NavLink, Switch } from "react-router-dom";

//THIS IS THE HOME PAGE

export default class Home extends Component {
  componentDidMount() {
    console.log(api.isLoggedIn());
    console.log(api.getLocalStorageUser());

    Axios.get(`${SERVER_URL}/whatever`).then(res => {});
  }

  render() {
    return (
      <div className="Home">
        <h2>Welcome to IronQuest!</h2>
        <p>
          This is an interactive story in which anyone can play a part in the
          creation and expansion in the world.
        </p>
        <br />

        {!api.isLoggedIn() && (
          <p>
            <Link to="/signup">Create an account</Link> or{" "}
            <Link to="/login">Log in</Link> to start playing!
          </p>
        )}
        {api.isLoggedIn() && (
          <p>
            <Link to="/readstory">Let's Play!</Link>{" "}
          </p>
        )}
        <br />
        <p>
          New to IronQuest? <Link to="about">Read the About page</Link>
        </p>
      </div>
    );
  }
}
