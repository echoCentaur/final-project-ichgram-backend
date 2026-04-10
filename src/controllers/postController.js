const Post = require('../models/postModel')



const getAllPosts = async (req, res) => {
    const posts = await Post.find()
        .populate('author', 'username profile_image fullName')
        .sort({ createdAt: -1 })
    res.json(posts)
}



const getUserPosts = async (req, res) => {
    const posts = await Post.find({ author: req.params.userId })
        .populate('author', 'username profile_image fullName')
        .sort({ createdAt: -1 })
    res.json(posts)
}



const getPostById = async (req, res) => {
    const post = await Post.findById(req.params.id)
        .populate('author', 'username profile_image fullName')

    if (!post) {
        return res.status(404).json({ message: 'Пост не найден' })
    }

    res.json(post)
}



const createPost = async (req, res) => {
    const { text } = req.body

    let image = ''
    if (req.file) {
        image = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`
    }

    const post = await Post.create({
        text,
        image,
        author: req.user.id
    })

    const populatedPost = await Post.findById(post._id)
        .populate('author', 'username profile_image fullName')

    res.status(201).json(populatedPost)
}


const updatePost = async (req, res) => {
    const post = await Post.findById(req.params.id)

    if (!post) {
        return res.status(404).json({ message: 'Пост не найден' })
    }


    if (post.author.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Нет доступа' })
    }

    const { text } = req.body
    if (text) post.text = text

    if (req.file) {
        post.image = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`
    }

    await post.save()
    res.json(post)
}


const deletePost = async (req, res) => {
    const post = await Post.findById(req.params.id)

    if (!post) {
        return res.status(404).json({ message: 'Пост не найден' })
    }

    if (post.author.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Нет доступа' })
    }

    await post.deleteOne()
    res.json({ message: 'Пост удалён' })
}

module.exports = { getAllPosts, getUserPosts, getPostById, createPost, updatePost, deletePost }