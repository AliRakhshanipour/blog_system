export const UserMsg = Object.freeze({
  NOT_CREATED: () => `ایجاد کاربر جدید ناموفق بود`,
  CREATED: () => `کاربر با موفقیت ایجاد شد`,
  NOT_FOUND: (userId) => `کاربر با شناسه ${userId} وجود ندارد`,
});
