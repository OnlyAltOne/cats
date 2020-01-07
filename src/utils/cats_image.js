const request = require('request')
const random = require('random')


//function to find a random cats image, returns cats id and image url
const cat_random = (callback) =>{
    
    const url = "https://api.thecatapi.com/v1/images/search?limit=1&page=" + random.int(min = 1, max = 100) + "&order=disc"
    const headers = {
        "x-api-key": "a9a141d2-4ea9-4c66-9e1a-5a3a532f6567"
    }
    request({url, json:true, headers} , (error, {body}) => {
        if (error){
            callback('Unable to connect cats services', undefined)
        } else if(!body[0]){
            callback('Unable to find some cats', undefined)
        }else{
            callback(undefined, {
            id: body[0].id,
            image_url: body[0].url
        
            })
        }
    })
}
  

//find cats description specifed by breed, return description and id of a breed
const cat_by_breed = (breed, callback) => {
    const url = "https://api.thecatapi.com/v1/breeds/search?q=" + breed

    request({url, json:true}, (error, {body}) => {
        if(error){
            callback('Unable to connect cats services', undefined)
        } else if(!body[0]){
            callback('Unable to find ' + breed + '. Try another request', undefined)
        } else{
            callback(undefined, {
                description: body[0].description,
                temperament: body[0].temperament,
                breeds_id: body[0].id
            })
        }


    })
}


//find image of a cat specifed by breed
const image_by_breed = (breeds_id, callback) => {
    const url = "https://api.thecatapi.com/v1/images/search?breed_ids=" + breeds_id

    request({url, json:true}, (error, {body}) => {
        if(error){
            callback('Unable to connect cats services', undefined)
        } else if(!body[0]){
            callback('Unable to find image', undefined)
        }else 
            callback(undefined, {
                image_url: body[0].url
            })
    })
}




module.exports = {cat_random, cat_by_breed, image_by_breed}