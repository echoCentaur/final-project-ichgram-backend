const router = require('express').Router()
const authMiddleware = require('../middlewares/authMiddleware')
const { addComment, getPostComments, deleteComment } = require('../controllers/commentController')

router.post('/:postId', authMiddleware, addComment)
router.get('/:postId', authMiddleware, getPostComments)
router.delete('/:id', authMiddleware, deleteComment)

module.exports = router