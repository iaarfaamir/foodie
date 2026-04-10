import mongoose, { Schema, model, models } from 'mongoose';

const FoodSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true, enum: ['Pizza', 'Burgers', 'Pasta', 'Desserts', 'Drinks'] },
    image: { type: String, required: true },
    rating: { type: Number, default: 4.8 },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true, strict: false }
);

const Food = models.Food || model('Food', FoodSchema);
export default Food;
