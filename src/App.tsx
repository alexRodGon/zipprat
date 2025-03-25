import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { WorkoutForm } from './components/WorkoutForm';
import { WorkoutList } from './components/WorkoutList';
import { useLocalStorage } from './hooks/useLocalStorage';
import { AppState, Workout, Exercise, Set } from './types';

function App() {
  const [state, setState] = useLocalStorage<AppState>('zipprat-gym-tracker', {
    workouts: [],
    darkMode: false,
  });

  React.useEffect(() => {
    if (state.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.darkMode]);

  const toggleDarkMode = () => {
    setState((prev) => ({ ...prev, darkMode: !prev.darkMode }));
  };

  const addWorkout = (workoutData: Omit<Workout, 'id' | 'exercises'>) => {
    setState((prev) => ({
      ...prev,
      workouts: [
        {
          ...workoutData,
          id: crypto.randomUUID(),
          exercises: [],
        },
        ...prev.workouts,
      ],
    }));
  };

  const updateWorkout = (workoutId: string, workoutData: Partial<Omit<Workout, 'id' | 'exercises'>>) => {
    setState((prev) => ({
      ...prev,
      workouts: prev.workouts.map((workout) =>
        workout.id === workoutId
          ? {
              ...workout,
              ...workoutData,
            }
          : workout
      ),
    }));
  };

  const deleteWorkout = (workoutId: string) => {
    setState((prev) => ({
      ...prev,
      workouts: prev.workouts.filter((w) => w.id !== workoutId),
    }));
  };

  const addExercise = (workoutId: string, exerciseData: Omit<Exercise, 'id' | 'sets'>) => {
    setState((prev) => ({
      ...prev,
      workouts: prev.workouts.map((workout) =>
        workout.id === workoutId
          ? {
              ...workout,
              exercises: [
                ...workout.exercises,
                {
                  ...exerciseData,
                  id: crypto.randomUUID(),
                  sets: [],
                },
              ],
            }
          : workout
      ),
    }));
  };

  const updateExercise = (workoutId: string, exerciseId: string, exerciseData: Partial<Omit<Exercise, 'id' | 'sets'>>) => {
    setState((prev) => ({
      ...prev,
      workouts: prev.workouts.map((workout) =>
        workout.id === workoutId
          ? {
              ...workout,
              exercises: workout.exercises.map((exercise) =>
                exercise.id === exerciseId
                  ? {
                      ...exercise,
                      ...exerciseData,
                    }
                  : exercise
              ),
            }
          : workout
      ),
    }));
  };

  const deleteExercise = (workoutId: string, exerciseId: string) => {
    setState((prev) => ({
      ...prev,
      workouts: prev.workouts.map((workout) =>
        workout.id === workoutId
          ? {
              ...workout,
              exercises: workout.exercises.filter((e) => e.id !== exerciseId),
            }
          : workout
      ),
    }));
  };

  const addSet = (workoutId: string, exerciseId: string, setData: Omit<Set, 'id'>) => {
    setState((prev) => ({
      ...prev,
      workouts: prev.workouts.map((workout) =>
        workout.id === workoutId
          ? {
              ...workout,
              exercises: workout.exercises.map((exercise) =>
                exercise.id === exerciseId
                  ? {
                      ...exercise,
                      sets: [...exercise.sets, { ...setData, id: crypto.randomUUID() }],
                    }
                  : exercise
              ),
            }
          : workout
      ),
    }));
  };

  const updateSet = (workoutId: string, exerciseId: string, setId: string, setData: Partial<Omit<Set, 'id'>>) => {
    setState((prev) => ({
      ...prev,
      workouts: prev.workouts.map((workout) =>
        workout.id === workoutId
          ? {
              ...workout,
              exercises: workout.exercises.map((exercise) =>
                exercise.id === exerciseId
                  ? {
                      ...exercise,
                      sets: exercise.sets.map((set) =>
                        set.id === setId
                          ? {
                              ...set,
                              ...setData,
                            }
                          : set
                      ),
                    }
                  : exercise
              ),
            }
          : workout
      ),
    }));
  };

  const deleteSet = (workoutId: string, exerciseId: string, setId: string) => {
    setState((prev) => ({
      ...prev,
      workouts: prev.workouts.map((workout) =>
        workout.id === workoutId
          ? {
              ...workout,
              exercises: workout.exercises.map((exercise) =>
                exercise.id === exerciseId
                  ? {
                      ...exercise,
                      sets: exercise.sets.filter((s) => s.id !== setId),
                    }
                  : exercise
              ),
            }
          : workout
      ),
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Zipprat</h1>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            {state.darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>

        <div className="space-y-8">
          <WorkoutForm onSubmit={addWorkout} />
          <WorkoutList
            workouts={state.workouts}
            onDeleteWorkout={deleteWorkout}
            onUpdateWorkout={updateWorkout}
            onAddExercise={addExercise}
            onUpdateExercise={updateExercise}
            onDeleteExercise={deleteExercise}
            onAddSet={addSet}
            onUpdateSet={updateSet}
            onDeleteSet={deleteSet}
          />
        </div>
      </div>
    </div>
  );
}

export default App;