const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users_controller')
const passport = require('passport')
var multer = require("multer");
var upload = multer();

router.get('/profile/:id', passport.checkAuthentication ,usersController.profile)
router.post('/update/:id', passport.checkAuthentication ,usersController.update)


router.get('/sign-up',usersController.signUp)

router.get('/sign-in',usersController.signIn)

router.post('/create',usersController.create)


//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
  'local',
  {failureRedirect: '/users/sign-in'}
), usersController.createSession)

router.get('/sign-out', usersController.signOut)

// {failureRedirect: '/users/sign-in'}


//scope is the info we are looking to fetch
router.get('/auth/google', passport.authenticate('google', {scope:  ['profile', 'email']}))

router.get('/auth/google/callback', passport.authenticate('google',{failureRedirect: '/users/sign-in'}), usersController.createSession)



console.log('router working')


module.exports = router