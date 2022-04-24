import { Schema, model } from "mongoose";

interface IUser {
  _id: string;
  email: string;
  name?: string;
}

const userSchema = new Schema<IUser>(
  {
    _id: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    name: String,
  },
  {
    //add virtual fields to json and object
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

userSchema.virtual("recipes", {
  ref: "Recipe",
  localField: "_id",
  foreignField: "author",
});

userSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "author",
});

userSchema.pre("find", function () {
  this.populate("recipes").populate("reviews");
});

const User = model<IUser>("User", userSchema);

export { User };
