/**
 * Returns an object containing predefined authentication messages.
 *
 * @function
 * @returns {Object} An object with authentication messages as properties.
 *
 * @example
 * const messages = AuthMsg();
 * console.log(messages.REGISTERED); // Output: "user registered successfully"
 */
export function AuthMsg() {
  return Object.freeze({
    REGISTERED: 'کاربر با موفقیت ایجاد شد',
    LOGGED_IN: 'شما با موفقیت وارد سیستم شدید',
    LOGGED_OUT: 'شما با موفقیت از سیستم خارج شدید',
    USER_EXIST: 'نام کاربری ، ایمیل یا شماره همراه در سیستم موجود است',
    OTP_EXPIRED: 'رمز موقت شما نامعتبر است',
    UNAUTHORIZED: 'شما به این مسیر دسترسی ندارید',
    VERIFIES_TOKEN: 'احراز هویت با موفقیت انجام شد',
    WRONG_PASSWORD: 'رمز عبور صحیح نیست',
  });
}
