import React, { Component } from "react";
import Axios from "axios";
import api from "../../api";
import CreateStory from "./CreateStory";
import { SERVER_URL } from "../../config";
import { Route, Link, NavLink, Switch } from "react-router-dom";

//THIS PAGE RENDERS THE CURRENT PAGE OF THE STORY

export default class StoryPage extends Component {
  state = {
    message: null,
    story: {},
    stories: [],
    creatorId: null,
    creator: ""
  };

  openPanel() {
    this.setState({
      show: true
    });
  }

  filterNextStories = stories => {
    let showNextStories = stories.filter(story => {
      return story.idOfLastPage === this.props.match.params.id;
    });
    console.log(showNextStories);
    return showNextStories;
  };
  showNextStories = () => {
    return this.state.stories.map(story => {
      return (
        //HERE
        <li>
          <Link to={`${story._id}`}>{story.teaser}</Link>
        </li>
      );
    });
  };

  componentDidMount() {
    Axios.get(`${SERVER_URL}/getPage/${this.props.match.params.id}`).then(
      specificStoryFromServer => {
        this.setState({
          story: specificStoryFromServer.data.storyToClient,
          creatorId: specificStoryFromServer.data.storyToClient.creatorId
        });
      }
    );
    Axios.get(`${SERVER_URL}/getStories`).then(storiesFromServer => {
      this.setState({
        stories: this.filterNextStories(storiesFromServer.data.stories)
      });
    });
  }

  componentDidUpdate() {
    Axios.get(`${SERVER_URL}/getPage/${this.props.match.params.id}`).then(
      specificStoryFromServer => {
        this.setState({
          story: specificStoryFromServer.data.storyToClient,
          creatorId: specificStoryFromServer.data.storyToClient.creatorId
        });
      }
    );
    Axios.get(`${SERVER_URL}/getStories`).then(storiesFromServer => {
      this.setState({
        stories: this.filterNextStories(storiesFromServer.data.stories)
      });
    });
  }

  render() {
    return (
      <div className="storyPage">
        <button onClick={this.props.history.goBack}>Back</button>
        <h5>
          Created by{" "}
          <Link to={`/view-profile/${this.state.story.creatorName}`}>
            {this.state.story.creatorName}
          </Link>
        </h5>

        <h2>Page {this.state.story.pageNumber}</h2>

        <div className="pageBorder">
          <h1>{this.state.story.title}</h1>
          <p>
            {this.state.story.content}
            <br />
          </p>
        </div>
        <h3>What will you do next?</h3>

        <h2>{this.showNextStories()}</h2>

        {!this.state.show && (
          <button onClick={e => this.openPanel()}>Create a new Page!</button>
        )}
        {this.state.show && (
          <CreateStory {...this.props} {...this.state.story} />
        )}
      </div>
    );
  }
}
