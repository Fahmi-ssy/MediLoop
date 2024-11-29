import { ObjectId } from "mongodb";
import { z } from "zod";
import database from "../config/mongodb";
import { hashPassword } from "../helpers/bycrypt";
import { User } from "@/types";

const UserSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" }),
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters long" }),
});

class UserModel {
  static collection() {
    return database.collection<User>("users");
  }

  static async register(newUser: User) {
    UserSchema.parse(newUser);

    const existUser = await this.collection().findOne({
      $or: [{ email: newUser.email }, { username: newUser.username }],
    });
    if (existUser)
      throw { message: "Username/Email already exists", status: 400 };

    newUser.password = hashPassword(newUser.password);

    const result = await this.collection().insertOne(newUser);
    return result;
  }

  static async findByEmail(email: string) {
    const user = await this.collection().findOne({ email });
    if (user) {
      // Convert _id to string for easier usage on the client side
      user._id = user._id.toString();
    }
    return user;
  }

  static async findById(id: string) {
    const objectId = new ObjectId(id); // Ensure id is an ObjectId
    const user = await this.collection().findOne({ _id: objectId });
    if (user) {
      user._id = user._id.toString(); // Convert _id to string
    }
    return user;
  }
}

export default UserModel;
