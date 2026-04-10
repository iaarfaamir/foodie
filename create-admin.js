const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

// Define the schema inline
const { Schema, model } = mongoose;

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

const User = mongoose.models.User || model('User', UserSchema);

async function createAdmin() {
  try {
    if (!process.env.MONGODB_URI) {
      console.error('❌ MONGODB_URI not defined in .env.local');
      console.log('Please add: MONGODB_URI=mongodb://localhost:27017/foodie');
      process.exit(1);
    }

    console.log('📡 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Check existing users
    const userCount = await User.countDocuments({});
    console.log(`📊 Total users in database: ${userCount}`);

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@foodie.com' });
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists');
      console.log(`   Email: ${existingAdmin.email}`);
      console.log(`   Role: ${existingAdmin.role}`);
      return;
    }

    const hashedPassword = await bcrypt.hash('admin123', 12);
    const admin = new User({
      name: 'Admin',
      email: 'admin@foodie.com',
      password: hashedPassword,
      role: 'admin'
    });

    await admin.save();
    console.log('✅ Admin user created successfully!');
    console.log('------------------------------------');
    console.log('📧 Email: admin@foodie.com');
    console.log('🔑 Password: admin123');
    console.log('------------------------------------');
  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('📴 Disconnected from MongoDB');
  }
}

createAdmin();