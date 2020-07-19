const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home_controller')



router.get('/',homeController.home)

// router.get('/create-post' , postsController.create)

router.use('/users', require('./users'))

router.use('/posts', require('./posts'))

router.use('/comments', require('./comments'))





console.log('router working')




module.exports = router