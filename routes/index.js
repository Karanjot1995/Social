const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home_controller')
const usersController = require('../controllers/users_controller')
const postsController = require('../controllers/posts_controller')


router.get('/',homeController.home)

// router.get('/create-post' , postsController.create)

router.use('/users', require('./users'))

router.use('/posts', require('./posts'))





console.log('router working')




module.exports = router