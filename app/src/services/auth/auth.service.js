import { request, response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Op } from 'sequelize';
import { models } from '../../models/index.js';
import { generateOTP } from '../../utils/otp-generator.js';
import { generateToken } from '../../utils/token-generator.js';
import { BaseService } from '../base.service.js';
import { AuthMsg } from './auth.messages.js';

export const AuthService = (() => {
  class AuthService extends BaseService {
    #model = models.UserModel;

    async register(req = request, res = response, next) {
      try {
        const { username, email, phone, password } = req.body;

        // Check if user already exists
        const existingUser = await this.#model.findOne({
          where: {
            [Op.or]: [{ username }, { email }, { phone }],
          },
        });

        if (existingUser) {
          return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: AuthMsg().USER_EXIST,
          });
        }

        const otp = generateOTP();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

        const user = await this.#model.create({
          username,
          email,
          phone,
          password,
          otp,
          otpExpiry,
          isActive: false, // Set user as inactive until OTP verification
        });

        // Uncomment and implement email sending
        // await sendEmail(email, 'Your OTP Code', `Your OTP code is ${otp}`);

        res.status(StatusCodes.CREATED).json({
          success: true,
          message: AuthMsg().REGISTERED,
          otp,
        });
      } catch (error) {
        next(error);
      }
    }

    async verifyOTP(req = request, res = response, next) {
      try {
        const { phone, otp } = req.body;
        const user = await this.#model.findOne({ where: { phone, otp } });

        if (!user || user.otpExpiry < new Date()) {
          return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: AuthMsg().OTP_EXPIRED,
          });
        }

        user.otp = null;
        user.otpExpiry = null;
        user.isActive = true; // Activate user after OTP verification
        await user.save();

        const token = generateToken(user);

        res.status(StatusCodes.OK).json({
          success: true,
          token,
        });
      } catch (error) {
        next(error);
      }
    }

    async login(req = request, res = response, next) {
      try {
        const { username, password } = req.body;
        const user = await this.#model.findOne({ where: { username } });

        if (
          !user ||
          !(await this.#model.verifyPassword(password, user.password))
        ) {
          return res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
            message: AuthMsg().UNAUTHORIZED,
          });
        }

        const token = generateToken(user);
        res.status(StatusCodes.OK).json({
          success: true,
          token,
        });
      } catch (error) {
        next(error);
      }
    }
  }

  return new AuthService();
})();
