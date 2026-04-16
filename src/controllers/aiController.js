const LLAMA_URL = process.env.OLLAMA_URL || 'http://192.168.178.59:8080'

const callLlama = async (messages) => {
    const response = await fetch(`${LLAMA_URL}/v1/chat/completions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            messages,
            temperature: 0.7,
            max_tokens: 512,
            stream: false
        })
    })
    const data = await response.json()
    return data.choices[0].message.content
}

const chat = async (req, res) => {
    const { message, history } = req.body
    if (!message) return res.status(400).json({ message: 'Message is required' })

    const messages = [
        {
            role: 'system',
            content: 'You are ICHgram AI assistant. Help users write captions, hashtags, and social media posts. Be friendly, creative and concise.'
        },
        ...(history || []),
        { role: 'user', content: message }
    ]

    const reply = await callLlama(messages)
    res.json({ reply })
}

const generateCaption = async (req, res) => {
    const { prompt } = req.body
    if (!prompt) return res.status(400).json({ message: 'Prompt is required' })

    const messages = [
        {
            role: 'system',
            content: 'Write a short creative Instagram caption with 1-2 emojis. Output only the caption, nothing else.'
        },
        { role: 'user', content: `Caption for: ${prompt}` }
    ]

    const caption = await callLlama(messages)
    res.json({ caption })
}

const generateHashtags = async (req, res) => {
    const { text } = req.body
    if (!text) return res.status(400).json({ message: 'Text is required' })

    const messages = [
        {
            role: 'system',
            content: 'Generate 8-10 relevant Instagram hashtags. Output only hashtags separated by spaces, no explanations.'
        },
        { role: 'user', content: `Hashtags for: ${text}` }
    ]

    const hashtags = await callLlama(messages)
    res.json({ hashtags })
}

module.exports = { chat, generateCaption, generateHashtags }