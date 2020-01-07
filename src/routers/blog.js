/* 
    CR blog
*/
const express = require('express')
const Post = require('../models/post')
const router = new express.Router()


//create a blog
router.post('/blogs', async(req, res) =>{
    const newPost = new Post(req.body)

    try {
        await newPost.save()
        res.status(201).send(newPost)
    } catch (e) {
        res.status(400).send(e)
    }
})

 

//find a blog by its titel
router.get('/blogs/:titel', async(req, res) =>{
    const titel = req.params.titel
    try {
        const blog = await Post.find({ titel })
        if (!blogs){
            res.status(404).send()
        }

        res.status(201).send(blog)
    } catch (e) {
        res.status(500).send(e)
    }
})

//find last 5 published blogs
router.get('/blogs', async(req, res) =>{
    try {
        const blogs = await Post.find({}).sort({_id:-1}).limit(5)
        res.send(blogs)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router