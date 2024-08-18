import argon2 from 'argon2';
import { DataTypes, Model } from 'sequelize';

class User extends Model {
  static associate(models) {
    User.hasOne(models.ImageModel, {
      foreignKey: 'imageableId',
      as: 'profilePicture',
      constraints: false,
    });
  }

  // Method to hash the password
  static async hashPassword(password) {
    return await argon2.hash(password);
  }

  // Method to verify the password
  static async verifyPassword(inputPassword, storedHashedPassword) {
    return await argon2.verify(storedHashedPassword, inputPassword);
  }
}

const USER_MSG_VALIDATIONS = Object.freeze({
  USERNAME_EXISTS: 'این نام کاربری قبلا ثبت شده است',
  EMAIL_EXISTS: 'این نام ایمیل قبلا ثبت شده است',
  PHONE_EXISTS: 'این نام شماره تماس قبلا ثبت شده است',
});

export const userInit = (sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: USER_MSG_VALIDATIONS.USERNAME_EXISTS,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: USER_MSG_VALIDATIONS.EMAIL_EXISTS,
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: USER_MSG_VALIDATIONS.PHONE_EXISTS,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM('مدیر', 'کاربر', 'مهمان'), // Farsi names for roles
        allowNull: false,
        defaultValue: 'کاربر', // Default role in Farsi
      },
      otp: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      otpExpiry: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true, // Default to active
      },
    },

    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      hooks: {
        beforeCreate: async (user) => {
          user.password = await User.hashPassword(user.password);
        },
        beforeUpdate: async (user) => {
          if (user.changed('password')) {
            user.password = await User.hashPassword(user.password);
          }
        },
      },
    }
  );
  return User;
};
