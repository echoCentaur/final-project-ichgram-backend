const Like = require('../models/likeModel')


const toggleLike = async (req, res) => {
    const { postId } = req.params
    const userId = req.user.id


    const existingLike = await Like.findOne({ user: userId, post: postId })

    if (existingLike) {
        await existingLike.deleteOne()
        return res.json({ message: 'Лайк убран', liked: false })
    }


    await Like.create({ user: userId, post: postId })
    res.json({ message: 'Лайк поставлен', liked: true })
}


const getPostLikes = async (req, res) => {
    const likes = await Like.find({ post: req.params.postId })
        .populate('user', 'username profile_image')
    res.json(likes)
}

module.exports = { toggleLike, getPostLikes }