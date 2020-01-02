const cats = require('./utils/cats_image.js')
const express = require('express')
const hbs = require('hbs')
const app = express()
const path = require('path')

const viewsPath = path.join(__dirname, '../templates/views')
const port = process.env.PORT || 3000


app.set('view engine', 'hbs')
app.set('views', viewsPath)

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

  
app.listen(port, () =>{
    console.log('Server is up on port ' + port + '.')
})