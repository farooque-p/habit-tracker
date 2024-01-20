import mongoose from "mongoose";

const habitSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required!"],
  },
  color: {
    type: String,
    required: [true, "Color is required!"],
  },
  repeatMode: {
    type: String,
    enum: ["daily", "weekly"],
    default: "daily",
  },
  reminder: {
    type: Boolean,
    default: false,
  },
  completed: {
    type: Object,
    default: {},
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Habit = mongoose.model("Habit", habitSchema);
