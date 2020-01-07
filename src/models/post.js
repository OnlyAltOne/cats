const mongoose = require('mongoose')
const date = require('date-and-time');


const Post = mongoose.model('Post', {
    body:{
        type: String,
        required: true,
        minlength: 50,
        maxlength: 1000000,
    },
    titel:{
        type: String,
        required: true,
        maxlength: 40
    },
    date:{
        type: String,
        default:(date.format(new Date(), 'YYYY/MM/DD HH:mm'))
    }
})

module.exports = Post