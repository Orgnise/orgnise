// import Mongoose from "mongoose";
import { User } from "./user.model";
// const Schema = Mongoose.Schema;


export const Role = {
  Admin: "Admin",
  User: "User",
  Moderator: "Moderator",
};
export interface Teams {
  name: string;
  description: string;
  createdBy: String;
  members: User[],
  meta: {},
  deactivatedAt: Date;
  // deactivatedBy: typeof Mongoose.Schema.Types.ObjectId;
  deactivatedNote: string;
  reactivatedAt: Date;
  timestamps: string;
  membersCount: string;
  isDeactivated: string;
}

// const TeamSchema = new Schema<Teams>(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//       minlength: 3,
//       unique: true,
//     },
//     description: {
//       type: String,
//       trim: true,
//       default: "",
//     },
//     createdBy: {
//       type: Mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     members: [
//       {
//         user: {
//           type: Mongoose.Schema.Types.ObjectId,
//           ref: "User",
//           required: true,
//         },
//         role: {
//           type: String,
//           enum: [Role.Admin, Role.User],
//           default: "member",
//         },
//       },
//     ],
//     meta: {
//       type: Object,
//       default: {},
//       title: "",
//       description: "",
//       slug: "",
//     },
//     deactivatedAt: {
//       type: Date,
//     },
//     deactivatedBy: {
//       type: Mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//     deactivatedNote: {
//       type: String,
//       trim: true,
//       minlength: 3,
//     },
//     reactivatedAt: {
//       type: Date,
//     },
//   },
//   {
//     timestamps: true,
//     toJSON: {
//       transform: (obj, ret) => {
//         delete ret.__v;
//         ret.id = ret._id;
//         delete ret._id;
//         // ret.members.user.id = user._id;
//         // delete ret.members.user._id;

//         return ret;
//       },
//     },
//   }
// );

// TeamSchema.virtual("membersCount").get(function () {
//   return this.members.length;
// });

// TeamSchema.virtual("isDeactivated").get(function () {
//   return this.deactivatedAt !== null;
// });

// export default Mongoose.model("Team", TeamSchema);

// export default Mongoose.models.Teams || Mongoose.model<Teams>("Team", TeamSchema);