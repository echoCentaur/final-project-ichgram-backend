const router = require('express').Router()
const authMiddleware = require('../middlewares/authMiddleware')
const { searchUsers, explorePosts } = require('../controllers/searchController')

router.get('/users', authMiddleware, searchUsers)
router.get('/explore', authMiddleware, explorePosts)

module.exports = router