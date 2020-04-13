const express = require('express')
const authCheck = require('../config/auth-check')
const Game = require('../models/Game')
const cors = require('cors')
const corsObj = {origin: 'http://localhost:4200', credentials: true};

const router = new express.Router()

function validateGameCreateForm(payload) {
  const errors = {}
  let isFormValid = true
  let message = ''

  payload.price = parseFloat(payload.price)

  if (!payload || typeof payload.title !== 'string' || payload.title.length < 3) {
    isFormValid = false
    errors.name = 'Game name must be at least 3 symbols.'
  }

  if (!payload || typeof payload.description !== 'string' || payload.description.length < 10 || payload.description.length > 500) {
    isFormValid = false
    errors.description = 'Description must be at least 10 symbols and less than 500 symbols.'
  }

  if (!payload || !payload.price || payload.price < 0) {
    isFormValid = false
    errors.price = 'Price must be a positive number.'
  }

  if (!payload || typeof payload.image !== 'string' || !(payload.image.startsWith('https://') || payload.image.startsWith('http://')) || payload.image.length < 14) {
    isFormValid = false
    errors.image = 'Please enter valid Image URL. Image URL must be at least 14 symbols.'
  }

  if (!isFormValid) {
    message = 'Check the form for errors.'
  }

  return {
    success: isFormValid,
    message,
    errors
  }
}

router.post('/create', cors(corsObj), authCheck, (req, res) => {
  const GameObj = req.body;
  if (req.user.roles.indexOf('Admin') > -1) {
    const validationResult = validateGameCreateForm(GameObj)
    if (!validationResult.success) {
      return res.status(200).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      })
    }
    GameObj.author = req.user.username;

    Game
      .create(GameObj)
      .then((createdGame) => {
        res.status(200).json({
          success: true,
          message: 'Game added successfully.',
          data: createdGame
        })
      })
      .catch((err) => {
        console.log(err)
        let message = 'Something went wrong :( Check the form for errors.'
        if (err.code === 11000) {
          message = 'Game with the given name already exists.'
        }
        return res.status(200).json({
          success: false,
          message: message
        })
      })
  } else {
    return res.status(200).json({
      success: false,
      message: 'Invalid credentials!'
    })
  }
})

router.patch('/edit/:id', cors(corsObj), authCheck, (req, res) => {
  if (req.user.roles.indexOf('Admin') > -1) {
    const GameId = req.params.id
    const GameObj = req.body
    const validationResult = validateGameCreateForm(GameObj)
    if (!validationResult.success) {
      return res.status(200).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      })
    }

    Game
      .findById(GameId)
      .then(existingGame => {
        existingGame.title = GameObj.title
        existingGame.genres = GameObj.genres
        existingGame.description = GameObj.description
        existingGame.price = GameObj.price
        existingGame.image = GameObj.image

        existingGame
          .save()
          .then(editedGame => {
            res.status(200).json({
              success: true,
              message: 'Game edited successfully.',
              data: editedGame
            })
          })
          .catch((err) => {
            console.log(err)
            let message = 'Something went wrong :( Check the form for errors.'
            if (err.code === 11000) {
              message = 'Game with the given name already exists.'
            }
            return res.status(200).json({
              success: false,
              message: message
            })
          })
      })
      .catch((err) => {
        console.log(err)
        const message = 'Something went wrong :( Check the form for errors.'
        return res.status(200).json({
          success: false,
          message: message
        })
      })
  } else {
    return res.status(200).json({
      success: false,
      message: 'Invalid credentials!'
    })
  }
})

router.get('/all', (req, res) => {
  Game
    .find()
    .then(Games => {
      res.status(200).json(Games)
    })
})

router.get('/latest', (req,res) => {
  Game
    .find()
    .skip(Game.count() - 5)
    .then(Games => {
      res.status(200).json(Games)
    })
})

router.get('/:id', (req,res) => {
  const id = req.params.id;
  Game
    .findById(id)
    .then(Game => {
      if (!Game) {
        return res.status(200).json({
          success: false,
          message: 'Product not found.'
        })
      }
      return res.status(200).json({
        success: true,
        product: Game,
      })
    })
    .catch((err) => {
      console.log(err)
      const message = 'Something went wrong :( Check the form for errors.'
      return res.status(200).json({
        success: false,
        message: message
      })
    })
})

router.post('/review/:id', cors(corsObj), authCheck, (req, res) => {
  const id = req.params.id
  const review = req.body.review
  const username = req.user.username

  if (review.length < 4) {
    const message = 'Review must be at least 4 characters long.'
    return res.status(200).json({
      success: false,
      message: message
    })
  }

  Game
    .findById(id)
    .then(Game => {
      if (!Game) {
        return res.status(200).json({
          success: false,
          message: 'Product not found.'
        })
      }

      let reviewObj = {
        review,
        createdBy: username
      }

      let reviews = Game.reviews
      reviews.push(reviewObj)
      Game.reviews = reviews
      Game
        .save()
        .then((Game) => {
          res.status(200).json({
            success: true,
            message: 'Review added successfully.',
            data: Game
          })
        })
        .catch((err) => {
          console.log(err)
          const message = 'Something went wrong :( Check the form for errors.'
          return res.status(200).json({
            success: false,
            message: message
          })
        })
    })
    .catch((err) => {
      console.log(err)
      const message = 'Something went wrong :( Check the form for errors.'
      return res.status(200).json({
        success: false,
        message: message
      })
    })
})

router.post('/like/:id', cors(corsObj), authCheck, (req, res) => {
  const id = req.params.id
  const username = req.user.username
  Game
    .findById(id)
    .then(Game => {
      if (!Game) {
        const message = 'Product not found.'
        return res.status(200).json({
          success: false,
          message: message
        })
      }

      let likes = Game.likes
      if (!likes.includes(username)) {
        likes.push(username)
      }
      Game.likes = likes
      Game
        .save()
        .then((Game) => {
          res.status(200).json({
            success: true,
            message: 'Game liked successfully.',
            data: Game
          })
        })
        .catch((err) => {
          console.log(err)
          const message = 'Something went wrong :('
          return res.status(200).json({
            success: false,
            message: message
          })
        })
    })
    .catch((err) => {
      console.log(err)
      const message = 'Something went wrong :('
      return res.status(200).json({
        success: false,
        message: message
      })
    })
})

router.post('/unlike/:id', cors(corsObj), authCheck, (req, res) => {
  const id = req.params.id
  const username = req.user.username
  Game
    .findById(id)
    .then(Game => {
      if (!Game) {
        let message = 'Product not found.'
        return res.status(200).json({
          success: false,
          message: message
        })
      }

      let likes = Game.likes
      if (likes.includes(username)) {
        const index = likes.indexOf(username)
        likes.splice(index, 1)
      }

      Game.likes = likes
      Game
        .save()
        .then((Game) => {
          res.status(200).json({
            success: true,
            message: 'Product unliked successfully.',
            data: Game
          })
        })
        .catch((err) => {
          console.log(err)
          const message = 'Something went wrong :('
          return res.status(200).json({
            success: false,
            message: message
          })
        })
    })
    .catch((err) => {
      console.log(err)
      const message = 'Something went wrong :('
      return res.status(200).json({
        success: false,
        message: message
      })
    })
})

router.delete('/delete/:id', cors(corsObj), authCheck, (req, res) => {
  const id = req.params.id
  if (req.user.roles.indexOf('Admin') > -1) {
    Game
      .findByIdAndDelete(id)
      .then(() => {
        return res.status(200).json({
          success: true,
          message: 'Game deleted successfully!'
        })
      })      
      .catch(() => {
        return res.status(200).json({
          success: false,
          message: 'Entry does not exist!'
        })
      })
  } else {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials!'
    })
  }
})

module.exports = router
