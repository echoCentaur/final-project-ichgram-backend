const router = require('express').Router()
const multer = require('multer')
const authMiddleware = require('../middlewares/authMiddleware')
const { getProfile, updateProfile, getMe } = require('../controllers/userController')

const upload = multer({ storage: multer.memoryStorage() })


router.get('/me', authMiddleware, getMe)


router.get('/:id', authMiddleware, getProfile)


router.put('/update', authMiddleware, upload.single('profile_image'), updateProfile)

module.exports = router