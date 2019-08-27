const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User');
const Story = require('../models/Story');
const { isLoggedIn } = require('../middlewares');

// Bcrypt to encrypt passwords
const bcrypt = require('bcrypt');
const bcryptSalt = 10;

router.post('/signup', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ message: 'Indicate username and password' });
    return;
  }
  User.findOne({ username })
    .then(userDoc => {
      if (userDoc !== null) {
        res.status(409).json({ message: 'The username already exists' });
        return;
      }
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);
      const newUser = new User({ username, password: hashPass });
      return newUser.save();
    })
    .then(userSaved => {
      // LOG IN THIS USER
      // "req.logIn()" is a Passport method that calls "serializeUser()"
      // (that saves the USER ID in the session)
      req.logIn(userSaved, () => {
        // hide "encryptedPassword" before sending the JSON (it's a security risk)
        userSaved.password = undefined;
        res.json(userSaved);
      });
    })
    .catch(err => next(err));
});

router.post('/login', (req, res, next) => {
  const { username, password } = req.body;

  // first check to see if there's a document with that username
  User.findOne({ username })
    .then(userDoc => {
      // "userDoc" will be empty if the username is wrong (no document in database)
      if (!userDoc) {
        // create an error object to send to our error handler with "next()"
        next(new Error('Incorrect username '));
        return;
      }

      // second check the password
      // "compareSync()" will return false if the "password" is wrong
      if (!bcrypt.compareSync(password, userDoc.password)) {
        // create an error object to send to our error handler with "next()"
        next(new Error('Password is wrong'));
        return;
      }

      // LOG IN THIS USER
      // "req.logIn()" is a Passport method that calls "serializeUser()"
      // (that saves the USER ID in the session)
      req.logIn(userDoc, () => {
        // hide "encryptedPassword" before sending the JSON (it's a security risk)
        userDoc.password = undefined;
        res.json(userDoc);
      });
    })
    .catch(err => next(err));
});

router.post('/login-with-passport-local-strategy', (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
    if (err) {
      res.status(500).json({ message: 'Something went wrong' });
      return;
    }

    if (!theUser) {
      res.status(401).json(failureDetails);
      return;
    }

    req.login(theUser, err => {
      if (err) {
        res.status(500).json({ message: 'Something went wrong' });
        return;
      }

      // We are now logged in (notice req.user)
      res.json(req.user);
    });
  })(req, res, next);
});

//LOGOUT

router.get('/logout', (req, res) => {
  req.logout();
  res.json({ message: 'You are out!' });
});

//CREATE NEW STORY
router.post('/createstory', isLoggedIn, (req, res, next) => {
  const creatorId = req.user._id;
  const creatorName = req.user.username;
  const pageNumber = req.body.pageNumber + 1;
  const { title, content, idOfLastPage, teaser } = req.body;
  if (!title || !content || !teaser) {
    res.status(400).json({ message: 'Please fill out ALL text boxes' });
    return;
  }
  Story.create()
    .then(storyDoc => {
      const newStory = new Story({
        title,
        content,
        creatorId,
        creatorName,
        idOfLastPage,
        teaser,
        pageNumber
      });
      newStory.save((err, doc) => {
        return res.json(doc);
      });
    })
    .catch(err => next(err));
});

//SEE YOUR PROFILE
router.get('/getUser', isLoggedIn, (req, res, next) => {
  res.json({ user: req.user });
});

//SEE OTHERS' PROFILES
router.get('/view-profile/:id', isLoggedIn, (req, res, next) => {
  User.find().then(userPulled => {
    res.json({ viewProfile: userPulled });
  });
});

router.get('/getStories', isLoggedIn, (req, res, next) => {
  Story.find().then(allStoriesFromDb => {
    res.json({ stories: allStoriesFromDb });
  });
});

router.get('/getPage/:id', isLoggedIn, (req, res, next) => {
  Story.findById(req.params.id).then(storyFromDb => {
    res.json({ storyToClient: storyFromDb });
  });
});

//DELETE USER
router.post('/deleteUser', isLoggedIn, (req, res, next) => {
  req.user.delete(); //if this causes issues than do User.deleteById(req.user._id)
  res.end();
});

//UPDATE USER
router.post('/updateUser', isLoggedIn, (req, res, next) => {
  console.log('ATTEMPTING TO UPDATE', req.body);
  const { update } = req.body;
  User.findById(req.user._id).then(user => {
    user.about = update;
    user.save((err, doc) => {
      res.json({ saved: doc });
    });
  });
});

module.exports = router;
