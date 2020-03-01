const express = require('express')
const passport = require('passport')
const validator = require('validator')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const router = new express.Router()
//cors middleware for cookies
router.use(cors({origin: 'http://localhost:4200', credentials: true}));

function validateSignupForm (payload) {
  const errors = {}
  let isFormValid = true
  let message = ''

  if (!payload || typeof payload.username !== 'string' || payload.username.trim().length < 4) {
    isFormValid = false
    errors.username = 'Username must be at least 4 characters long'
  }

  if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
    isFormValid = false
    errors.email = 'Please provide a correct email address'
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 4) {
    isFormValid = false
    errors.password = 'Password must be at least 4 characters long'
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

function validateLoginForm (payload) {
  const errors = {}
  let isFormValid = true
  let message = ''

  if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0 || !validator.isEmail(payload.email)) {
    isFormValid = false
    errors.email = 'Please provide your email address.'
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
    isFormValid = false
    errors.password = 'Please provide your password.'
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

function decode(token) {
  const decoded = jwt.decode(token);  
  return decoded === null ? decoded : decoded.sub;
}

router.post('/signup', (req, res, next) => {
  const validationResult = validateSignupForm(req.body)
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    })
  }

  return passport.authenticate('local-signup', (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err
      })
    }

    return res.status(200).json({
      success: true,
      message: 'You have successfully signed up! Now you should be able to log in.'
    })
  })(req, res, next)
})

router.post('/login', (req, res, next) => {
  const validationResult = validateLoginForm(req.body)
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    })
  }

  return passport.authenticate('local-login', (err, token, userData) => {
    if (err) {
      if (err.name === 'IncorrectCredentialsError') {
        return res.status(400).json({
          success: false,
          message: err.message
        })
      }

      return res.status(400).json({
        success: false,
        message: 'Could not process the form.'
      })
    }    

    // return res.json({
    //   success: true,
    //   message: 'You have successfully logged in!',      
    //   user: userData
    // })
    res.cookie('token', token, { expires: new Date(3600000 + Date.now()), httpOnly: true }).send({
      success: true,
        message: 'You have successfully logged in!',      
        user: userData
    })
    next()
  })(req, res, next)
})

router.post('/logout', (req, res, next) => {
  if(req.headers.cookie){    
    res.clearCookie('token');
  }
  return res.json({
    success: true,
    message: 'You have successfully logged out!'
  })
})

router.post('/auth-check', (req, res, next) => {
  if(!req.headers.cookie){    
    return res.json({})
  }
  const token = req.headers.cookie.split('=')[1];
  const id = decode(token);

  User.findById(id).then( user => {
    if(!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid request!'
      })
    }
    const isAdmin = user.roles.indexOf('Admin') > -1;
    
    return res.json({
      username: user.username,
      isAdmin
    })
  })
  
})

module.exports = router;
