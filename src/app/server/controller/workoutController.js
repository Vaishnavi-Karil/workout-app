const Workout = require("../model/Workout");
const mongoose = require("mongoose");

// get all workouts handler function
const getAllWorkouts = async (req, res) => {
  const workout = await Workout.find({}).sort({ createdAt: -1 });
  res.status(200).json(workout);
};

// get a single workout

const getWorkoutById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: "No such workout." });
  }
  const workout = await Workout.findById(id);

  if (!workout) {
    return res.status(400).json({ msg: "No such workout." });
  }
  res.status(200).json(workout);
};

// create a new workout

const createWorkout = async (req, res) => {
  console.log("post request object data", req.body);

  const { title, reps, load } = req.body;
  try {
    const workout = await new Workout({
      title,
      reps,
      load,
    }).save();
    res.status(201).json({
      message: "workout created successfully",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a workout

const deleteWorkoutById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      error: "Invalid Document Id of Workout",
    });
  }
  const workout = await Workout.findOneAndDelete({ _id: id });

  if (!workout) {
    return res.status(400).json({
      error: "No such workout document found!",
    });
  }
  res.status(200).json(workout);
};

// update the workout

const updateWorkOutById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      error: "No such document found.",
    });
  }

  const workout = await Workout.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!workout) {
    return res.status(400).json({
      error: "No such document found",
    });
  }
  res.status(200).json(workout);
};

module.exports = {
  createWorkout,
  getAllWorkouts,
  getWorkoutById,
  deleteWorkoutById,
  updateWorkOutById,
};
