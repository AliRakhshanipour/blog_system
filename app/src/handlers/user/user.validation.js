import { body, param, validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';

export const validateUserCreation = async (req, res, next) => {
  // Input validation
  await body('username')
    .notEmpty()
    .withMessage('نام کاربری الزامی است')
    .run(req);

  await body('email')
    .isEmail()
    .withMessage('لطفا ایمیل معتبری را وارد کنید')
    .run(req);

  await body('phone').notEmpty().withMessage('شماره تماس الزامی است').run(req);

  await body('password')
    .isLength({ min: 6 })
    .withMessage('رمزعبور باید حداقل ۶ کاراکتر داشته باشد')
    .run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, errors: errors.array() });
  }

  next(); // Proceed to the next middleware if validation passes
};

// src/validations/user.validation.js

export const validateUserId = async (req, res, next) => {
  await param('id')
    .isInt()
    .withMessage('شناسه کاربر باید یک عدد صحیح باشد')
    .run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, errors: errors.array() });
  }

  next(); // Proceed to the next middleware if validation passes
};

export const validateUserUpdate = async (req, res, next) => {
  // Log the incoming request body for debugging
  console.log('Request Body:', req.body);

  // Input validation for PATCH method
  await body('username')
    .optional() // Allow the field to be empty or null
    .run(req);

  await body('email')
    .optional()
    .custom((value) => {
      // Allow empty string or validate as email
      if (value === '' || value === null) {
        return true; // Treat empty string as valid
      }
      return (
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
        Promise.reject('لطفا ایمیل معتبری را وارد کنید')
      );
    })
    .run(req);

  await body('phone')
    .optional() // Allow the field to be empty or null
    .run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Validation Errors:', errors.array()); // Log validation errors
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, errors: errors.array() });
  }

  next(); // Proceed to the next middleware if validation passes
};
