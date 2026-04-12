const Follow = require('../models/followModel')

const toggleFollow = async (req, res) => {
    const followerId = req.user.id
    const followingId = req.params.userId

    if (followerId === followingId) {
        return res.status(400).json({ message: 'Нельзя подписаться на себя' })
    }

    const existingFollow = await Follow.findOne({
        follower: followerId,
        following: followingId
    })

    if (existingFollow) {
        await existingFollow.deleteOne()
        return res.json({ message: 'Отписались', following: false })
    }

    await Follow.create({
        follower: followerId,
        following: followingId
    })

    res.json({ message: 'Подписались', following: true })
}


const getFollowers = async (req, res) => {
    const followers = await Follow.find({ following: req.params.userId })
        .populate('follower', 'username profile_image fullName')
    res.json(followers)
}


const getFollowing = async (req, res) => {
    const following = await Follow.find({ follower: req.params.userId })
        .populate('following', 'username profile_image fullName')
    res.json(following)
}

module.exports = { toggleFollow, getFollowers, getFollowing }