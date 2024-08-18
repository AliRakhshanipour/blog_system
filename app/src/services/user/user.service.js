import { request, response } from 'express';
import { models } from '../../models/index.js';
import { BaseService } from '../base.service.js';

export const UserService = (() => {
  class UserService extends BaseService {
    #model = models.UserModel;

    // TODO change password method

    async changePassword(req = request, res = response, next) {
      try {
        const { id: userId } = req.params;
      } catch (error) {
        next(error);
      }
    }

    // TODO set profile image method
    // TODO active or deactive user
  }
})();
