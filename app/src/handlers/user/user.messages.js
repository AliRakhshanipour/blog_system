export const UserMsg = Object.freeze({
  NOT_CREATED: () => `ایجاد کاربر جدید ناموفق بود`,
  CREATED: () => `کاربر با موفقیت ایجاد شد`,
  UPDATED: (userId) => `کاربر${userId} با موفقیت به روزرسانی شد`,
  NOT_FOUND: (userId) => `کاربر با شناسه ${userId} وجود ندارد`,
  REQUIRED_USER_ID: (userId) => `وارد کردن شناسه الزامی است`,
  PASSWORD_FORBIDDEN: () => `شما نمیتوانید در این مرحله رمز عبور را تغییر دهید`,
  DELETED: (userId) => `کاربر ${userId} با موفقیت حذف شد`,
});
