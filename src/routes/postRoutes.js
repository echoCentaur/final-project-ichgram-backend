const router = require('express').Router()

router.get('/', (req, res) => {
    res.json({ message: 'Посты работают!' })
})

module.exports = router