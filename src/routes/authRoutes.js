const router = require('express').Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const { register, login } = require('../controllers/authController')

require('../config/passport')

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173'

router.post('/register', register)
router.post('/login', login)

router.get('/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        session: false
    })
)

router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: `${FRONTEND_URL}/login`,
        session: false
    }),
    (req, res) => {
        const token = jwt.sign(
            { id: req.user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )
        res.redirect(`${FRONTEND_URL}/auth/google/success?token=${token}`)
    }
)

module.exports = router