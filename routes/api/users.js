const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Users = mongoose.model('Users');

//POST new user route (optional, everyone has access)
router.post('/', auth.optional, (req, res, next) => {
  console.log(req.body);
  const user = req.body;

  if(!user.username) {
    return res.status(422).json({
      errors: {
        username: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  if(!user.classification) {
    return res.status(422).json({
      errors: {
        classification: 'is required',
      },
    });
  }

  if(!user.genreId) {
    return res.status(422).json({
      errors: {
        genreId: 'is required',
      },
    });
  }

  //creating a new user based off of Users model
  const finalUser = new Users(user);

  //use the entered password to create hash
  finalUser.setPassword(user.password);

  //save it in MongoDB
  return finalUser.save()
    .then(() => res.json({ user: finalUser.toAuthJSON() }));
});

//POST login route (optional, everyone has access)
router.post('/login', auth.optional, (req, res, next) => {
  const user = req.body;

  if(!user.username) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if(err) {
      return next(err);
    }

    if(passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();
      return res.json({ user: user.toAuthJSON() });
    }

    return status(400).info;
  })(req, res, next);
});

//GET current route (required, only authenticated users have access)
router.get('/current', auth.required, (req, res, next) => {
  const id = req.body;

  return Users.findById(id)
    .then((user) => {
      if(!user) {
        return res.sendStatus(400);
      }

      return res.json({ user: user.toAuthJSON() });
    });
});

//GET events route (required, only authenticated users have access)
router.get('/events', auth.required, (req, res, next) => {
  console.log(req.body);
  const id = req.body;

  return Users.findById(id)
    .then((user) => {
      if(!user) {
        return res.sendStatus(400);
      }

      return $.ajax
      ({
        type: "GET",
        url: "https://yv1x0ke9cl.execute-api.us-east-1.amazonaws.com/prod/events?" 
        + 'classification=' + user.classification 
        + '&'
        + 'genreId=' + user.genreId,
        dataType: 'json',
        username: 'stitapplicant',
        password: 'zvaaDsZHLNLFdUVZ_3cQKns',
        success: function (){
          alert('successful call to AWS URI!'); 
        }
      });
      
    });
});

module.exports = router;