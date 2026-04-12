const router = require('express').Router()
const authMiddleware = require('../middlewares/authMiddleware')
const { chat, generateCaption, generateHashtags } = require('../controllers/aiController')

router.post('/chat', authMiddleware, chat)
router.post('/caption', authMiddleware, generateCaption)
router.post('/hashtags', authMiddleware, generateHashtags)

module.exports = router