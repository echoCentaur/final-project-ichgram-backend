const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const register = async (req, res) => {
    const { username, email, password, fullName } = req.body

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Заполните все поля' })
    }

    const existingUser = await User.findOne({
        $or: [{ email }, { username }]
    })

    if (existingUser) {
        return res.status(400).json({ message: 'Пользователь уже существует' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
        fullName: fullName || ''
    })

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    )

    res.status(201).json({
        token,
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            fullName: user.fullName
        }
    })
}

const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: 'Заполните все поля' })
    }

    const user = await User.findOne({ email })
    if (!user) {
        return res.status(404).json({ message: 'Пользователь не найден' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        return res.status(400).json({ message: 'Неверный пароль' })
    }

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    )

    res.json({
        token,
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            fullName: user.fullName,
            profile_image: user.profile_image
        }
    })
}

module.exports = { register, login }