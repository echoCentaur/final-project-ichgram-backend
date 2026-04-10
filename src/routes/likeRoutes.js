const router = require('express').Router()
const authMiddleware = require('../middlewares/authMiddleware')
const { toggleLike, getPostLikes } = require('../controllers/likeController')

router.post('/:postId', authMiddleware, toggleLike)
router.get('/:postId', authMiddleware, getPostLikes)

module.exports = router