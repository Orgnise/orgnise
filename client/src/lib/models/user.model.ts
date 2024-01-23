// // import Mongoose from "mongoose";

export interface User {
  name: string;
  email: string;
  password: string;
  role: string;
  token: string;
  picture: string;
  authProvider: string;
  userWithoutPassword: () => User;
  userBasicInfo: () => User;
}
// const UserSchema = new Mongoose.Schema<User>(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//       minlength: 3,
//       validate: {
//         validator: function (v: any) {
//           return /^[a-zA-Z0-9 ]{3,30}$/.test(v);
//         },
//         message: (props) => `${props.value} is not a valid name!`,
//       },
//     },
//     password: {
//       type: String,
//       required: false,
//       trim: true,
//       minlength: 3,
//     },
//     email: {
//       type: String,
//       unique: true,
//       required: true,
//       trim: true,
//       minlength: 3,
//     },
//     role: {
//       type: String,
//       required: false,
//       trim: true,
//       minlength: 3,
//       default: "user",
//     },
//     token: {
//       type: String,
//       required: false,
//     },
//     picture: {
//       type: String,
//       required: false,
//     },
//     authProvider: {
//       type: String,
//       required: false,
//       default: "default",
//     },
//   },
//   {
//     timestamps: true,
//     toJSON: {
//       transform: (obj, ret) => {
//         delete ret.__v;
//         ret.id = ret._id;
//         delete ret._id;
//         return ret;
//       },
//     },
//     toObject: {
//       transform: (obj, ret) => {
//         delete ret.__v;
//         ret.id = ret._id;
//         delete ret._id;
//         return ret;
//       },
//     },
//   }
// );

// // Method to return user object without password
// UserSchema.methods.userWithoutPassword = function () {
//   const user = this.toObject();
//   delete user.password;
//   return user;
// };

// // Method to return user basic info
// UserSchema.methods.userBasicInfo = function () {
//   const user = this.toObject();
//   delete user.password;
//   delete user.token;
//   delete user.role;
//   delete user.updatedAt;
//   delete user.authProvider;
//   return user;
// };

// export default Mongoose.models.User || Mongoose.model<User>('User', UserSchema)