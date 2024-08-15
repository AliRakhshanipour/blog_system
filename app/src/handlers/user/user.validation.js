// src/validations/user.validation.js

import { body, validationResult } from 'express-validator';

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
