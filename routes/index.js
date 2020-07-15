const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home_controller')
const usersController = require('../controllers/users_controller')


router.get('/',homeController.home)

router.use('/users',require('./users'))




console.log('router working')




module.exports = router