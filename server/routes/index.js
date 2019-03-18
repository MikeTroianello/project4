const express = require('express');
const { isLoggedIn } = require('../middlewares')
const router = express.Router();



router.get("/whatever", (req, res, next) => {
  console.log('in whatever u can pass things back from here',req.user)
  res.json({user:req.user, whateveruwant:'hello michael'})
})


module.exports = router;
