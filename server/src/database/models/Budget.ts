// import { model, Schema } from "mongoose";
import { Schema, Document } from "mongoose";
import { Mongoose } from "../connection";

export interface UserInterface extends Document {
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  msg: string;
}

const emailRegex = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;

const budget = new Mongoose.Schema(
  {
    name: { type: String, required: [true, "name required"] },
    email: {
      type: String,
      required: [true, "email required"],
      unique: true,
      validate: [(email: string) => emailRegex.test(email), "enter with email valid"],
    },
    phone: { type: String, required: [true, "phone required"] },
    whatsapp: { type: String },
    msg: { type: String, required: [true, "message required"] },
  },
  { timestamps: true }
);

export const Budget = Mongoose.model<UserInterface>("Budget", budget);
