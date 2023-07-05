const express = require("express");
const {
  createWorkout,
  getAllWorkouts,
  getWorkoutById,
  deleteWorkoutById,
  updateWorkOutById,
} = require("../controller/workoutController");

const router = express.Router();

router.get("/workouts", getAllWorkouts);

router.get("/workouts/:id", getWorkoutById);

router.post("/workouts", createWorkout);

// DELETE a workout

router.delete("/workouts/:id", deleteWorkoutById);

router.patch("/workouts/:id", updateWorkOutById);

router.get("/", (req, res) => {
  res.json({
    msg: "Welcome to the world of api",
  });
});
module.exports = router;
