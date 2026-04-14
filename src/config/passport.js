const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Ищем пользователя по googleId
        let user = await User.findOne({ googleId: profile.id })

        if (!user) {
            // Проверяем есть ли пользователь с таким email
            user = await User.findOne({ email: profile.emails[0].value })

            if (user) {
                // Привязываем Google к существующему аккаунту
                user.googleId = profile.id
                await user.save()
            } else {
                // Создаём нового пользователя
                user = await User.create({
                    googleId: profile.id,
                    email: profile.emails[0].value,
                    fullName: profile.displayName,
                    username: profile.emails[0].value.split('@')[0] + '_' + Date.now(),
                    profile_image: profile.photos[0]?.value || '',
                    password: Math.random().toString(36)
                })
            }
        }

        return done(null, user)
    } catch (err) {
        return done(err, null)
    }
}))

module.exports = passport