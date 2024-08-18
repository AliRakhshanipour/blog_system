import { request, response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { models } from '../../models/index.js';
import { BaseService } from '../base.service.js';
import { UserServiceMsg } from './user.messages.js';

export const UserService = (() => {
  class UserService extends BaseService {
    #model = models.UserModel;

    // Method to change the user's password
    async changePassword(req = request, res = response, next) {
      try {
        const username = req?.user?.username;
        const user = await this.#model.findOne({ where: { username } });

        const { oldPassword, newPassword, confirmNewPassword } = req.body;

        // Check if user is found
        if (!user) {
          return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: UserServiceMsg.NOT_FOUND,
          });
        }

        // Verify the old password
        const isOldPasswordValid = await this.#model.verifyPassword(
          oldPassword,
          user.password
        );
        if (!isOldPasswordValid) {
          return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: UserServiceMsg.WRONG_OLD_PASSWORD,
          });
        }

        // Check if new password and confirm password match
        if (newPassword !== confirmNewPassword) {
          return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: UserServiceMsg.PASSWORD_NOT_MATCH,
          });
        }

        // Update the user's password
        user.password = newPassword; // Assuming you have a method to hash the password before saving
        await user.save(); // Save the updated user model

        return res.status(StatusCodes.OK).json({
          success: true,
          message: UserServiceMsg.PASSWORD_CHANGED_SUCCESSFULLY,
        });
      } catch (error) {
        next(error);
      }
    }

    async getProfile(req = request, res = response, next) {
      try {
        const user = req?.user; // The authenticated user
        const { id: userId } = req.params; // The user ID from the request parameters

        // Check if the user is authenticated
        if (!user) {
          return res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
            message: UserServiceMsg.UNAUTHORIZED,
          });
        }

        // Check if the authenticated user is trying to access their own profile
        if (user.id != userId) {
          return res.status(StatusCodes.FORBIDDEN).json({
            success: false,
            message: UserServiceMsg.FORBIDDEN,
          });
        }

        // If the user is authorized, return the user profile
        return res.status(StatusCodes.OK).json({
          success: true,
          user,
        });
      } catch (error) {
        next(error);
      }
    }

    // TODO: set profile image method
    // TODO: activate or deactivate user
  }

  return new UserService(); // Return an instance of UserService
})();
