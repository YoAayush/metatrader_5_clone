import mongoose from "mongoose";

const loginSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const registerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const tradeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Login",
    required: true,
  },
  symbol: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["buy", "sell"],
    required: true,
  },
  volume: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Login =
  mongoose.models.Login || mongoose.model("Login", loginSchema, "users");
const Register =
  mongoose.models.Register ||
  mongoose.model("Register", registerSchema, "users");
const Trade =
  mongoose.models.Trade || mongoose.model("Trade", tradeSchema, "trades");

export { Login, Register, Trade };
