/* 
    CR blog
*/
const express = require('express')
const Blog = require('../models/blog')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')

/* 
    requests for registered users
*/

router.post('/blogs', auth, async(req, res) =>{
    const blog = new Blog({
        ...req.body,
        owner: req.user._id
    })
    try {
        await blog.save()
        res.status(201).send(blog)
    } catch (e) {
        res.status(400).send(e)
    }
})
router.get('/blogs/my', auth, async(req, res)=>{
    try {
        const blogs = await Blog.find({owner: req.user._id})
        res.send(blogs)
    } catch (e) {
        res.status(500).send()
    }
    
})

router.delete('/blogs', auth, async(req, res)=>{
    try {
        const blog = await Blog.findOne({"titel": req.body.titel, "owner": req.user._id})
        if(!blog){
            res.status(404).send()
        }
        await blog.remove()
        res.send()
    } catch (e) {
        res.status(400).send()
    }
})



/* 
    public requests 
*/

//find a blog by its titel
router.get('/blogs/:titel', async(req, res) =>{
    const titel = req.params.titel
    try {
        const blog = await Blog.find({ titel })
        if (!blog){
            res.status(404).send()
        }
        await blog.populate('owner').execPopulate()
        res.status(201).send(blog)
    } catch (e) {
        res.status(500).send(e)
    }
})

//find last 5 published blogs
router.get('/blogs', async(req, res) =>{
    try {
        const blogs = await Blog.find({}).sort({_id:-1}).limit(5)
        res.send(blogs)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router