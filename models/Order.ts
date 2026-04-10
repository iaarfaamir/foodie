import mongoose, { Schema, model, models } from 'mongoose';

const OrderItemSchema = new Schema(
  {
    foodId: { type: Schema.Types.ObjectId, ref: 'Food', required: true },
    name: String,
    price: Number,
    image: String,
    quantity: Number,
  },
  { _id: false }
);

const OrderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [OrderItemSchema],
    totalPrice: { type: Number, required: true },
    deliveryAddress: { type: String, required: true },
    paymentMethod: { type: String, default: 'Cash on Delivery' },
    status: { type: String, enum: ['pending', 'preparing', 'delivered'], default: 'pending' },
  },
  { timestamps: true }
);

const Order = models.Order || model('Order', OrderSchema);
export default Order;
