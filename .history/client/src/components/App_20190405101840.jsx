import React, { Component } from 'react';
import { Route, Link, NavLink, Switch } from 'react-router-dom';
import Home from './pages/Home';
import CreateStory from './pages/CreateStory';
import Login from './pages/Login';
import Signup from './pages/Signup';
import api from '../api';
import ReadStory from './pages/ReadStory';
import StoryPage from './pages/StoryPage';
import Profile from './pages/Profile';
import About from './pages/About';
import ViewProfile from './pages/View-Profile';
const logoBlue =require('../images/Ironquest-blue.png')
const logoBlack =require('../images/Ironquest-Black.png')
const logoWhite =require('../images/Ironquest-White.png')


export default class App extends Component {
  state = {
    user: {},
  }

  componentDidMount() {
    this.setUser()
  }

  setUser = () => {
    if (api.isLoggedIn()) {
      this.setState({ user: api.getLocalStorageUser() })
    } else {
      this.setState({ user: {} })

    }
  }

  handleLogoutClick(e) {
    api.logout()
    //this.setState({user:null})
    this.setUser()

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        <NavLink to="/" exact> <img src={logoWhite} alt="Thanks Haley!" height="130" width="auto" /> </NavLink> 
          {api.isLoggedIn() && <p>Hello, {this.state.user.username}!</p>}
          {!api.isLoggedIn() && <h3>You are not logged in</h3>}
          <NavLink to="/" exact>Home</NavLink>
          <NavLink to='/about'>About</NavLink>
          {!api.isLoggedIn() && <NavLink to="/signup">Signup</NavLink>}
          {!api.isLoggedIn() && <NavLink to="/login">Login</NavLink>}
          {api.isLoggedIn() && <NavLink to="/profile">Profile</NavLink>}
          {api.isLoggedIn() && <Link to="/" onClick={(e) => this.handleLogoutClick(e)}>Logout</Link>}
        </header>
        <Switch>


        <Route
            exact
            path='/'
            render={(props) => <Home {...props}  setUser={this.setUser} />}
          />
          <Route
            path='/signup'
            render={(props) => <Signup {...props} setUser={this.setUser} />}
          />
          <Route
            path='/login'
            render={(props) => <Login {...props} setUser={this.setUser}/>}
          />
          <Route
            path='/createstory'
            render={(props) => <CreateStory {...props} setUser={this.setUser}/>}
          />
          <Route
            path='/readstory'
            render={(props) => <ReadStory {...props} setUser={this.setUser}/>}
          />    
          <Route
            path='/profile'
            render={(props) => <Profile {...props} setUser={this.setUser}/>}
          />  
          <Route
            path='/story/:id'
            render={(props) => <StoryPage {...props} setUser={this.setUser}/>}
          />           
          <Route
            path='/about'
            render={(props) => <About {...props} setUser={this.setUser}/>}
          />     
          <Route
            path='/view-profile'
            render={(props) => <ViewProfile {...props} setUser={this.setUser}/>}
          />  
          <Route render={() => <h2>404</h2>} />


        </Switch>
      </div>
    );
  }
}
