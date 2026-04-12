const chat = async (req, res) => {
    const { message, history } = req.body

    if (!message) {
        return res.status(400).json({ message: 'Введите сообщение' })
    }

    const messages = [
        {
            role: 'system',
            content: 'Ты помощник ICHgram — Instagram-подобной платформы. Помогаешь пользователям писать красивые посты, придумываешь хештеги, отвечаешь на вопросы о платформе. Отвечай коротко и дружелюбно.'
        },
        ...(history || []),
        {
            role: 'user',
            content: message
        }
    ]

    const response = await fetch('http://localhost:11434/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            model: 'llama3',
            messages,
            stream: false
        })
    })

    const data = await response.json()
    res.json({ reply: data.message.content })
}


const generateCaption = async (req, res) => {
    const { prompt } = req.body

    if (!prompt) {
        return res.status(400).json({ message: 'Введите описание' })
    }

    const response = await fetch('http://localhost:11434/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            model: 'llama3',
            messages: [
                {
                    role: 'system',
                    content: 'Напиши красивую подпись для Instagram поста. Коротко, 1-2 предложения с эмодзи. Только текст подписи без объяснений.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            stream: false
        })
    })

    const data = await response.json()
    res.json({ caption: data.message.content })
}


const generateHashtags = async (req, res) => {
    const { text } = req.body

    if (!text) {
        return res.status(400).json({ message: 'Введите текст поста' })
    }

    const response = await fetch('http://localhost:11434/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            model: 'llama3',
            messages: [
                {
                    role: 'system',
                    content: 'Сгенерируй 5-10 релевантных хештегов для Instagram поста. Только хештеги через пробел, без объяснений.'
                },
                {
                    role: 'user',
                    content: text
                }
            ],
            stream: false
        })
    })

    const data = await response.json()
    res.json({ hashtags: data.message.content })
}

module.exports = { chat, generateCaption, generateHashtags }