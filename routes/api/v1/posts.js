const express = require('express')
const router = express.Router()
const postsApi = require('../../../controllers/api/v1/posts_api')


router.get('/', postsApi.index)

router.delete('/:id' ,postsApi.delete)

module.exports = router