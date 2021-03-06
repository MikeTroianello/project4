import React, { Component } from "react";
import api from "../../api";
import { Route, Link, NavLink, Switch } from "react-router-dom";

//THIS IS THE ABOUT PAGE

export default class About extends Component {
  render() {
    return (
      <div>
        <h1>About IronQuest</h1>
        <p>
          IronQuest is a choose <i>and</i> create-your-own-adventure game. Each
          page in the story is created by a user, which can then be continued by
          anyone.
          <h3>How To Play</h3>
          <p>
            First, create a character or log in to your account. Then, go to the
            "Let's Play!" option on the <i>Home</i>page.
          </p>
          <h4>From there:</h4>
          <ul>
            <li>Choose an existing story to read, or create your own</li>
            <li>
              While reading the story, click on the links near the bottom of the
              page to proceed with the story
            </li>
            <li>
              At any point, if you want to start creating your own story page,
              press the <b>"Create a new Page!"</b> button a the bottom
            </li>
          </ul>
          <h3>Creating a new Page:</h3>
          <ul>
            <li>
              After pressing the <b>"Create a new Page!"</b> button, three text
              boxes will open up: the Title, Content, and Teaser
            </li>
            <li>
              The <strong>Title</strong> will be what is displayed towards the
              top of the page you are creating.
            </li>
            <li>
              The <strong>Content</strong> will be the events that you decide to
              write about. Be creative and have fun!
            </li>
            <li>
              The <strong>Teaser</strong> will be what is displayed on the
              previous page, as the link the next reader will see.
            </li>
            <li>
              <i>
                (For example, if you want your story to be about what happens
                when you leave a room, your teaser would be something along the
                lines of "Leave the Room", so the next player will know what
                they are choosing)
              </i>
            </li>
          </ul>
          {!api.isLoggedIn() && (
            <h2>
              Ready? <Link to="/signup">Create an account</Link> or{" "}
              <Link to="/login">Log in</Link>!
            </h2>
          )}
          {api.isLoggedIn() && (
            <h2>
              <Link to="/readstory">Now let's play!</Link>
            </h2>
          )}
        </p>
      </div>
    );
  }
}
