import { request, response } from 'express';
import { StatusCodes } from 'http-status-codes';
import _ from 'lodash';
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

        res.status(StatusCodes.CREATED).json({
          success: true,
          message: UserMsg.CREATED,
          user,
        });
      } catch (error) {
        next(error);
      }
    }

    // FIXME--> add filtering for listUsers method
    async listUsers(req = request, res = response, next) {
      try {
        const users = await this.#model.findAll({});
        res.status(StatusCodes.OK).json(users);
      } catch (error) {
        next(error);
      }
    }

    async;
  }
  return new UserHandler();
})();
