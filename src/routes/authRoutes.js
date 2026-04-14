const router = require('express').Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const { register, login } = require('../controllers/authController')

require('../config/passport')

router.post('/register', register)
router.post('/login', login)

// Google OAuth маршруты
router.get('/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        session: false
    })
)

router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: 'http://localhost:5173/login',
        session: false
    }),
    (req, res) => {
        // Создаём JWT токен
        const token = jwt.sign(
            { id: req.user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )

        // Редиректим на фронт с токеном
        res.redirect(`http://localhost:5173/auth/google/success?token=${token}`)
    }
)

module.exports = router