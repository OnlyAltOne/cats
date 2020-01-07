/* 
    get an input from main page field and find a page either a random cat or by its breed
*/
const express = require('express')
const router = new express.Router()
const cats = require('../utils/cats_image.js')
const path = require('path')
router.use(express.static(path.join(__dirname, '../../public')))

router.get('/image', (req, res) => {
    if(!req.query.breed){
        cats.cat_random((error, {id, image_url} = {}) =>{
            if(error){
                return res.send({ error })
            }
            return res.send ({id , image_url})
        })
     }
    else{
         cats.cat_by_breed(req.query.breed, (error ,{description, temperament, breeds_id} = {}) =>{
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
module.exports = router 