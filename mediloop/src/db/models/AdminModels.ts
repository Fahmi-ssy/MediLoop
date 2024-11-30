import { z } from "zod";
import database from "../config/mongodb";
import { comparePassword, hashPassword } from "../helpers/bycrypt";
import { ObjectId } from "mongodb";

const AdminSchema = z.object({
  _id: z.instanceof(ObjectId).optional(),
  email: z.string().email({ message: "Invalid email format" }),
  password: z.string().min(5, { message: "Password must be at least 5 characters" }),
  role: z.literal("admin"),
});

type Admin = z.infer<typeof AdminSchema> & { _id: ObjectId | string };

class AdminModel {
  static collection() {
    return database.collection("admins");
  }

  static async register(data: Omit<Admin, '_id'>) {
    // Validate the input data
    AdminSchema.parse(data);

    // Check if admin with email already exists
    const existingAdmin = await this.findByEmail(data.email);
    if (existingAdmin) {
      throw { message: "Email already registered", status: 400 };
    }

    // Hash the password before storing
    const hashedPassword = hashPassword(data.password);

    // Create new admin object with hashed password
    const newAdmin = {
      ...data,
      password: hashedPassword,
      role: "admin" as const
    };

    // Insert into database
    const result = await this.collection().insertOne(newAdmin);
    return result;
  }

  static async findByEmail(email: string): Promise<Admin | null> {
    const admin = await this.collection().findOne({ email });
    if (admin) {
      const validated = AdminSchema.parse(admin);
      return { ...validated, _id: admin._id };
    }
    return null;
  }

  static async validateAdmin(email: string, password: string) {
    const admin = await this.findByEmail(email);
    
    if (!admin) {
      throw { message: "Invalid admin credentials", status: 401 };
    }

    const isValid = comparePassword(password, admin.password);
    if (!isValid) {
      throw { message: "Invalid admin credentials", status: 401 };
    }

    return admin;
  }
}

export default AdminModel;