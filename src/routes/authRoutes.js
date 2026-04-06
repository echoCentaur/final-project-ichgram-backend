const router = require('express').Router()


router.post('/register', (req, res) => {
    res.json({ message: 'РЕГ работает!' })
})

router.post('/login', (req, res) => {
    res.json({ message: 'Логин работает!' })
})

module.exports = router