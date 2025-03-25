export interface Set {
  id: string;
  weight: number;
  reps: number;
}

export interface Exercise {
  id: string;
  name: string;
  sets: Set[];
}

export interface Workout {
  id: string;
  name: string;
  muscleGroup: string;
  date: string;
  exercises: Exercise[];
}

export type MuscleGroup =
  | "Pecho"
  | "Espalda"
  | "Piernas"
  | "Hombros"
  | "Brazos";

export interface AppState {
  workouts: Workout[];
  darkMode: boolean;
}
