import { request, response } from 'express';
import { StatusCodes } from 'http-status-codes';
import _ from 'lodash';
import { Op } from 'sequelize';
import { models } from '../../models/index.js';
import { BaseHandler } from '../base.handler.js';
import { UserMsg } from './user.messages.js';

export const UserHandler = (() => {
  class UserHandler extends BaseHandler {
    #model = models.UserModel;

    async createUser(req = request, res = response, next) {
      try {
        const userDTO = _.omitBy(
          req.body,
          (value) => _.isNil(value) || value === ''
        );

        const user = await this.#model.create(userDTO);
        if (!user) {
          return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: UserMsg.NOT_CREATED,
          });
        }

        const { password, ...userData } = user.dataValues;

        res.status(StatusCodes.CREATED).json({
          success: true,
          message: UserMsg.CREATED,
          userData,
        });
      } catch (error) {
        next(error);
      }
    }

    async listUsers(req = request, res = response, next) {
      try {
        const { phone, username, email, isActive } = req.query;

        // Build the filter object
        const filters = {};
        if (phone) filters.phone = { [Op.like]: `%${phone}%` }; // Contains
        if (username) filters.username = { [Op.like]: `%${username}%` }; // Contains
        if (email) filters.email = { [Op.like]: `%${email}%` }; // Contains
        if (isActive !== undefined) filters.isActive = isActive === 'true'; // Convert to boolean

        const users = await this.#model.findAll({
          where: filters,
          attributes: {
            exclude: ['password'],
          },
        });

        res.status(StatusCodes.OK).json(users);
      } catch (error) {
        next(error);
      }
    }

    async getUser(req = request, res = response, next) {
      try {
        const userId = this.#validateAndExtractUserId(req, res);
        if (!userId) return; // If validation fails, return early

        const user = await this.#findUserById(userId, res);

        res.status(StatusCodes.OK).json({
          success: true,
          user,
        });
      } catch (error) {
        next(error);
      }
    }

    async updateUser(req = request, res = response, next) {
      try {
        const userId = this.#validateAndExtractUserId(req, res);
        if (!userId) return;

        const updateDTO = _.omitBy(
          req.body,
          (value) => _.isNil(value) || value === ''
        );

        const { password } = updateDTO;
        if (password) {
          return res.status(StatusCodes.FORBIDDEN).json({
            success: false,
            message: UserMsg.PASSWORD_FORBIDDEN,
          });
        }

        const user = await this.#findUserById(userId, res);

        await user.update(updateDTO); // Update the user with the new data

        res.status(StatusCodes.OK).json({
          success: true,
          message: UserMsg.UPDATED(userId),
          user,
        });
      } catch (error) {
        next(error);
      }
    }

    async deleteUser(req = request, res = response, next) {
      try {
        const userId = this.#validateAndExtractUserId(req, res);
        if (!userId) return;

        const user = await this.#findUserById(userId, res);
        await user.destroy();

        res.status(StatusCodes.OK).json({
          success: true,
          message: UserMsg.DELETED(userId),
        });
      } catch (error) {
        next(error);
      }
    }

    async #findUserById(userId, res) {
      const user = await this.#model.findByPk(userId, {
        attributes: {
          exclude: ['password'],
        },
      });

      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          message: UserMsg.NOT_FOUND(userId),
        });
      }

      return user; // Return the user if found
    }

    #validateAndExtractUserId(req, res) {
      const { id: userId } = req.params;

      if (!userId) {
        res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          message: UserMsg.REQUIRED_USER_ID,
        });
        return null; // Return null to indicate validation failure
      }

      return userId; // Return the valid userId
    }
  }
  return new UserHandler();
})();
