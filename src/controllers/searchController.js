const User = require('../models/userModel')
const Post = require('../models/postModel')


const searchUsers = async (req, res) => {
    const { q } = req.query

    if (!q) {
        return res.status(400).json({ message: 'Введите поисковый запрос' })
    }

    const users = await User.find({
        $or: [
            { username: { $regex: q, $options: 'i' } },
            { fullName: { $regex: q, $options: 'i' } }
        ]
    }).select('-password')

    res.json(users)
}


const explorePosts = async (req, res) => {
    const posts = await Post.aggregate([
        { $sample: { size: 20 } }
    ])

    await Post.populate(posts, {
        path: 'author',
        select: 'username profile_image fullName'
    })

    res.json(posts)
}

module.exports = { searchUsers, explorePosts }