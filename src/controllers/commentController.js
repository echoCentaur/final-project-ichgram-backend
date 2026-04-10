const Comment = require('../models/commentModel')


const addComment = async (req, res) => {
    const { text } = req.body
    const { postId } = req.params

    if (!text) {
        return res.status(400).json({ message: 'Текст комментария обязателен' })
    }

    const comment = await Comment.create({
        text,
        user: req.user.id,
        post: postId
    })

    const populatedComment = await Comment.findById(comment._id)
        .populate('user', 'username profile_image')

    res.status(201).json(populatedComment)
}


const getPostComments = async (req, res) => {
    const comments = await Comment.find({ post: req.params.postId })
        .populate('user', 'username profile_image')
        .sort({ createdAt: -1 })
    res.json(comments)
}


const deleteComment = async (req, res) => {
    const comment = await Comment.findById(req.params.id)

    if (!comment) {
        return res.status(404).json({ message: 'Комментарий не найден' })
    }

    if (comment.user.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Нет доступа' })
    }

    await comment.deleteOne()
    res.json({ message: 'Комментарий удалён' })
}

module.exports = { addComment, getPostComments, deleteComment }