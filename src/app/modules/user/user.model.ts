import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import { model, Schema } from 'mongoose';
import config from '../../../config';
import { USER_ROLES } from '../../../enums/user';
import AppError from '../../../errors/AppError';
import { IUser, UserModel } from './user.interface';

const userSchema = new Schema<IUser, UserModel>(
     {
          email: {
               type: String,
               required: true,
               unique: true,
               lowercase: true,
          },
          role: {
               type: String,
               enum: Object.values(USER_ROLES),
               default: USER_ROLES.ARTIST,
          },

          password: {
               type: String,
               required: true,
               select: false,
               minlength: 8,
          },
          status: {
               type: String,
               enum: ['active', 'blocked'],
               default: 'active',
          },
          verified: {
               type: Boolean,
               default: false,
          },
          isDeleted: {
               type: Boolean,
               default: false,
          },
          stripeCustomerId: {
               type: String,
               default: '',
          },
          authentication: {
               type: {
                    isResetPassword: {
                         type: Boolean,
                         default: false,
                    },
                    oneTimeCode: {
                         type: Number,
                         default: null,
                    },
                    expireAt: {
                         type: Date,
                         default: null,
                    },
               },
               select: false,
          },
     },
     { timestamps: true },
);

// Exist User Check
userSchema.statics.isExistUserById = async (id: string) => {
     return await User.findById(id);
};

userSchema.statics.isExistUserByEmail = async (email: string) => {
     return await User.findOne({ email });
};
// Password Matching
userSchema.statics.isMatchPassword = async (password: string, hashPassword: string): Promise<boolean> => {
     return await bcrypt.compare(password, hashPassword);
};

// Pre-Save Hook for Hashing Password & Checking Email Uniqueness
userSchema.pre('save', async function (next) {
     const isExist = await User.findOne({ email: this.get('email') });
     if (isExist) {
          throw new AppError(StatusCodes.BAD_REQUEST, 'Email already exists!');
     }

     this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt_rounds));
     next();
});

// Query Middleware
userSchema.pre('find', function (next) {
     this.find({ isDeleted: { $ne: true } });
     next();
});

userSchema.pre('findOne', function (next) {
     this.find({ isDeleted: { $ne: true } });
     next();
});

userSchema.pre('aggregate', function (next) {
     this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
     next();
});
export const User = model<IUser, UserModel>('User', userSchema);

// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// // ============================================
// // USER MODELS
// // ============================================

// // Base User Schema (for authentication)
// const userSchema = new Schema({
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     lowercase: true,
//     trim: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   role: {
//     type: String,
//     enum: ['artist', 'investor', 'admin'],
//     required: true
//   },
//   isEmailVerified: {
//     type: Boolean,
//     default: false
//   },
//   verificationCode: String,
//   verificationCodeExpiry: Date,
//   resetPasswordToken: String,
//   resetPasswordExpiry: Date,
//   createdAt: {
//     type: Date,
//     default: Date.now
//   },
//   lastLogin: Date
// }, { timestamps: true });

// const User = mongoose.model('User', userSchema);
