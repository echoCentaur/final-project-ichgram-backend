const router = require('express').Router()
const authMiddleware = require('../middlewares/authMiddleware')
const { toggleFollow, getFollowers, getFollowing } = require('../controllers/followController')

router.post('/:userId', authMiddleware, toggleFollow)
router.get('/:userId/followers', authMiddleware, getFollowers)
router.get('/:userId/following', authMiddleware, getFollowing)

module.exports = router