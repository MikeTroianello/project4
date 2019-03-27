import React, { Component } from 'react';

export default class About extends Component{
  render(){
    return (
      <div>
        <h1>About IronQuest</h1>
        <p>IronQuest is a choose <i>and</i> create-your-own-adventure game. Each page in the story is created by a user, which can then be continued by anyone.
        <h3>How To Play</h3>
        <p>First, create a character or log in to your account. Then, go to the "Let's Play!" option on the <i>Home</i>page.</p>
        <h5>From there:</h5>
        <ul>
          <li>Choose an existing story to read, or create your own</li>
          <li>While reading the story, click on the links near the bottom of the page to proceed with the story</li>
          <li>At any point, if you want to start creating your own story, press the create button a the bottom</li>
        </ul>
        
        </p>
      </div>
    )}
}