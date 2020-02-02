const mongoose = require('mongoose')

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

let gameSchema = new mongoose.Schema({
  title: {type: mongoose.Schema.Types.String, required: REQUIRED_VALIDATION_MESSAGE, unique: [true, 'game already exists.']},
  genres: [{type: mongoose.Schema.Types.String}],
  author: {type: mongoose.Schema.Types.String, required: REQUIRED_VALIDATION_MESSAGE},
  description: {type: mongoose.Schema.Types.String},
  price: {type: mongoose.Schema.Types.Number, required: REQUIRED_VALIDATION_MESSAGE},
  image: {type: mongoose.Schema.Types.String, required: REQUIRED_VALIDATION_MESSAGE},
  likes: [{type: mongoose.Schema.Types.String}],
  reviews: []
})

let game = mongoose.model('game', gameSchema)

module.exports = game