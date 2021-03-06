const Joi = require('joi')
const ValidationError = require('../errors/validation-error')
const { BookValidationSchema } = require('../models/book')

const validators = {
  Book: {
    scopes: {
      default: BookValidationSchema
      //   login: UserLoginValidationSchema

    }
  }
}

function scopeExists (validator, scope) {
  return !Object.keys(validator.scopes).find(key => key === scope)
}

function getSchema (model, scope) {
  const validator = validators[model]
  if (!validator) {
    throw new Error('Validator does not exist')
  }

  // check if the caller has passed a value for 'scope'
  if (scope) {
    if (scopeExists(validator, scope)) return validator.scopes[scope]
    throw new Error(`Scope ${scope} does not exist in ${model} validator`)
  } else {
    return validator.scopes.default
  }
}

function validate (model, object, scope) {
  return Joi.validate(object, getSchema(model, scope), {
    allowUnknown: false
  })
}

// Actual middleware factory
module.exports = {
  validator: function ValidationMiddleware (model, scope) {
    return (req, res, next) => {
      const validationResult = validate(model, req.body, scope)
      if (validationResult.error) {
        throw new ValidationError(validationResult.error.details[0].message, model)
      } else {
        next()
      }
    }
  },
  validate
}
