const express = require('express')
const router = express.Router()
const passport = require('passport')


const commentController = require('../controllers/comments_controller')

router.post('/create', passport.checkAuthentication , commentController.create)
router.get('/delete/:id', passport.checkAuthentication , commentController.delete)


module.exports = router