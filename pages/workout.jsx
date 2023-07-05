import Link from "next/link";
import { baseUrl } from "../config";
import { WorkoutDetails } from "@/app/components/WorkoutDetails/WorkoutDetails";
import { WorkoutForm } from "@/app/components/WorkoutForm/WorkoutForm";

export default function Workout(props) {
  const { workout } = props;

  const Workout = workout.map((element, i) => (
    <WorkoutDetails key={i} element={element} />
  ));

  return (
    <div className="home">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          gap: "1rem",
        }}
      >
        <div>{Workout}</div>
        <WorkoutForm />
      </div>

      <div>
        <Link href="/profile">Go to Profile</Link>
      </div>
    </div>
  );
}

export async function getStaticProps(context) {
  try {
    const workout = await getAllWorkoutApiCall();
    return {
      props: {
        workout: workout,
      },
    };
  } catch (error) {
    console.log("error", error);
    return {
      props: {
        workout: null,
      },
    };
  }
}

async function getAllWorkoutApiCall() {
  const workout = await fetch(`${baseUrl}/workouts`);

  const workout_jsonres = await workout.json();
  console.log("workout.ok", workout.ok, "workout_jsonres", workout_jsonres);

  return workout.ok === true && workout_jsonres;
}

// async function getWorkoutById() {
//   const workout = await fetch(`${baseUrl}/workouts`);

//   const workout_jsonres = await workout.json();
//   console.log("workout.ok", workout.ok, "workout_jsonres", workout_jsonres);

//   return workout.ok === true && workout_jsonres;
// }
