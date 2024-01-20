import { Habit } from "../models/habit.model.js";

// Create Habit
export const createHabit = async (req, res) => {
  try {
    const { title, color, repeatMode, reminder } = req.body;
    if (!title || !color) {
      return res.status(400).json({
        success: false,
        message: "Title and Color fields are required!",
      });
    }
    const habit = new Habit({
      title,
      color,
      repeatMode,
      reminder,
    });
    await habit.save();
    res.status(200).json({
      success: false,
      message: "Habit created successfully!",
      habit,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error whilte creating habit!",
    });
  }
};

// Get All Habits
export const getAllHabits = async (req, res) => {
  try {
    const allHabits = await Habit.find({});
    res.status(200).json(allHabits);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while getting habits!",
    });
  }
};

// Marks Habit as Completed
export const markHabitCompleted = async (req, res) => {
  const habitId = req.params.habitId;
  const updatedCompletion = req.body.completed;
  try {
    const updatedHabit = await Habit.findByIdAndUpdate(
      habitId,
      {
        completed: updatedCompletion,
      },
      { new: true }
    );

    if (!updatedHabit) {
      return res.status(400).json({
        success: false,
        message: "Habit not found!",
      });
    }
    return res.status(200).json(updatedHabit);
  } catch (error) {
    console.log("Error whilte marking habit as completed!", error);
    res.status(500).json({
      success: false,
      message: "Error whilte marking habit as completed!",
    });
  }
};

// Delete Habit
export const deleteHabit = async (req, res) => {
  try {
    const { habitId } = req.params;

    await Habit.findByIdAndDelete(habitId);

    res.status(200).json({
      success: true,
      message: "Habit deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while deleting habit.",
    });
  }
};
