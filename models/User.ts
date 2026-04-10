import mongoose, { Schema, model, models } from 'mongoose';

const CartItemSchema = new Schema(
  {
    foodId: { type: Schema.Types.ObjectId, ref: 'Food', required: true },
    name: String,
    price: Number,
    image: String,
    quantity: { type: Number, default: 1 },
  },
  { _id: false }
);

const UserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    cart: [CartItemSchema],
  },
  { timestamps: true, strict: false }
);

const User = models.User || model('User', UserSchema);
export default User;
