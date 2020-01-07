require('./db/mongoose')
const cats = require('./utils/cats_image.js')
const express = require('express')
const hbs = require('hbs')
const app = express()
const path = require('path')
const Post = require('./models/post')
const User = require('./models/user')



const viewsPath = path.join(__dirname, '../templates/views')
const port = process.env.PORT || 3000


app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(express.json())
app.use(express.static(path.join(__dirname, '../public')))
//core page
app.get('', (req, res) => {
    res.render('index', {
        title: 'kitten app',
        name: 'V.V'
    })
})

//get image, info about a cat
app.get('/image', (req, res) => {
    if(!req.query.breed){
        cats.cat_random((error, {id, image_url} = {}) =>{
            if(error){
                return res.send({ error })
            }
            return res.send ({id , image_url})
        })
     }
    else{
         cats.cat_by_breed(req.query.breed, (error ,{description, temperament, breeds_id}) =>{
            if(error){
                return res.send({error})
            }

            cats.image_by_breed(breeds_id, (error, {image_url}) => {
                if (error){
                    return res.send({error})
                }
                return res.send({description, temperament, image_url})
            })
        
        
        })
     }
})
/* 
    CR blog
*/
app.post('/blogs', async(req, res) =>{
    const newPost = new Post(req.body)

    try {
        await newPost.save()
        res.status(201).send(newPost)
    } catch (e) {
        res.status(400).send(e)
    }
})

 

//find a blog by its titel
app.get('/blogs/:titel', async(req, res) =>{
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
app.get('/blogs', async(req, res) =>{
    try {
        const blogs = await Post.find({}).sort({'date':-1}).limit(5)
        res.send(blogs)
    } catch (e) {
        res.status(400).send(e)
    }
})




/*  end  */
app.listen(port, () =>{
    console.log('Server is up on port ' + port + '.')
})