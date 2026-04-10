const router = require('express').Router()
const multer = require('multer')
const authMiddleware = require('../middlewares/authMiddleware')
const {
    getAllPosts,
    getUserPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
} = require('../controllers/postController')


const upload = multer({ storage: multer.memoryStorage() })


router.get('/', authMiddleware, getAllPosts)
router.get('/user/:userId', authMiddleware, getUserPosts)
router.get('/:id', authMiddleware, getPostById)
router.post('/', authMiddleware, upload.single('image'), createPost)
router.put('/:id', authMiddleware, upload.single('image'), updatePost)
router.delete('/:id', authMiddleware, deletePost)

module.exports = router