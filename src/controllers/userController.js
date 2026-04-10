const User = require('../models/userModel')


const getProfile = async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')

    if (!user) {
        return res.status(404).json({ message: 'Пользователь не найден' })
    }

    res.json(user)
}


const updateProfile = async (req, res) => {
    const user = await User.findById(req.user.id)

    if (!user) {
        return res.status(404).json({ message: 'Пользователь не найден' })
    }

    const { username, fullName, bio } = req.body

    if (username) user.username = username
    if (fullName) user.fullName = fullName
    if (bio) user.bio = bio


    if (req.file) {
        user.profile_image = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`
    }

    await user.save()

    res.json({
        id: user._id,
        username: user.username,
        fullName: user.fullName,
        bio: user.bio,
        profile_image: user.profile_image
    })
}


const getMe = async (req, res) => {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
}

module.exports = { getProfile, updateProfile, getMe }