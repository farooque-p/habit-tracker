import { Router } from "express";
import {
  createHabit,
  deleteHabit,
  getAllHabits,
  markHabitCompleted,
} from "../controllers/habit.controller.js";

const router = Router();

// Create Habit
router.route("/create").post(createHabit);

// Get All Habits
router.route("/all").get(getAllHabits);

// Mark Habit as Completed
router.route("/:habitId/completed").put(markHabitCompleted);

// Delete Habit
router.route("/:habitId").delete(deleteHabit);

export default router;
