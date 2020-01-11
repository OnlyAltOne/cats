const mongoose = require('mongoose')
const date = require('date-and-time');


const Blog = mongoose.model('Blog', {
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
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

module.exports = Blog