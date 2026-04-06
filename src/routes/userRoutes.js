const router = require('express').Router()

router.get('/:id', (req, res) => {
    res.json({ message: 'Профиль пользователя работает!' })
})

module.exports = router