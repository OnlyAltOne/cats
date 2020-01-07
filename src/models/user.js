const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User',{
    login:{
        type:String,
        required:true,
        minlength: 4,
        validate(input){
            if(!validator.isAscii(input)){
                throw new Error ('Please enter only valid characters')
            }

        },
        trim: true
    },
    password:{
        type:String,
        required: true,
        minlength:6,
        validate(input){
            if(!input.toLowerCase().includes('password')){
                throw new Error('Password cant contain a word \"password\"')
            }
        },
        trim:true
    },
    email:{
        type:String,
        required:false,
        validate(input){
            if(!validator.isEmail(input)){
                throw new Error('Enter a valid e-mail address')
            }
        },
        trim: true
    }
})

module.exports = User