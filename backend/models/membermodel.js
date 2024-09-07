const mongoose = require('mongoose')

const Schema = mongoose.Schema

const memberSchema = new Schema({
    memberName: {
        type: String,
        required: true
    },

    branch: {
        type: String,
        required: true
    },

    rollNum: {
        type: Number,
        required: true
    },

    year: {
        type: Number,
        required: true
    },

    birthday: {
        type: Date,
        required: true
    },

    image: {
        type: String
    }

})

module.exports = mongoose.model('Member', memberSchema)