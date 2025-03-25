import React, { useState } from 'react';
import { Trash2, Plus, Edit2, Check, X } from 'lucide-react';
import { Workout, Exercise, Set, MuscleGroup } from '../types';
import { ExerciseForm } from './ExerciseForm';
import { SetForm } from './SetForm';

interface WorkoutListProps {
  workouts: Workout[];
  onDeleteWorkout: (workoutId: string) => void;
  onUpdateWorkout: (workoutId: string, workout: Partial<Omit<Workout, 'id' | 'exercises'>>) => void;
  onAddExercise: (workoutId: string, exercise: Omit<Exercise, 'id' | 'sets'>) => void;
  onUpdateExercise: (workoutId: string, exerciseId: string, exercise: Partial<Omit<Exercise, 'id' | 'sets'>>) => void;
  onDeleteExercise: (workoutId: string, exerciseId: string) => void;
  onAddSet: (workoutId: string, exerciseId: string, set: Omit<Set, 'id'>) => void;
  onUpdateSet: (workoutId: string, exerciseId: string, setId: string, set: Partial<Omit<Set, 'id'>>) => void;
  onDeleteSet: (workoutId: string, exerciseId: string, setId: string) => void;
}

const muscleGroups: MuscleGroup[] = ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms'];

export function WorkoutList({
  workouts,
  onDeleteWorkout,
  onUpdateWorkout,
  onAddExercise,
  onUpdateExercise,
  onDeleteExercise,
  onAddSet,
  onUpdateSet,
  onDeleteSet,
}: WorkoutListProps) {
  const [editingWorkout, setEditingWorkout] = useState<string | null>(null);
  const [editingExercise, setEditingExercise] = useState<string | null>(null);
  const [editingSet, setEditingSet] = useState<string | null>(null);
  const [editWorkoutName, setEditWorkoutName] = useState('');
  const [editWorkoutMuscleGroup, setEditWorkoutMuscleGroup] = useState<MuscleGroup>('Chest');
  const [editExerciseName, setEditExerciseName] = useState('');
  const [editSetWeight, setEditSetWeight] = useState('');
  const [editSetReps, setEditSetReps] = useState('');

  const startEditingWorkout = (workout: Workout) => {
    setEditingWorkout(workout.id);
    setEditWorkoutName(workout.name);
    setEditWorkoutMuscleGroup(workout.muscleGroup as MuscleGroup);
  };

  const startEditingExercise = (exercise: Exercise) => {
    setEditingExercise(exercise.id);
    setEditExerciseName(exercise.name);
  };

  const startEditingSet = (set: Set) => {
    setEditingSet(set.id);
    setEditSetWeight(set.weight.toString());
    setEditSetReps(set.reps.toString());
  };

  return (
    <div className="space-y-6">
      {workouts.map((workout) => (
        <div key={workout.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            {editingWorkout === workout.id ? (
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  value={editWorkoutName}
                  onChange={(e) => setEditWorkoutName(e.target.value)}
                  className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <select
                  value={editWorkoutMuscleGroup}
                  onChange={(e) => setEditWorkoutMuscleGroup(e.target.value as MuscleGroup)}
                  className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  {muscleGroups.map((group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => {
                    onUpdateWorkout(workout.id, {
                      name: editWorkoutName,
                      muscleGroup: editWorkoutMuscleGroup,
                    });
                    setEditingWorkout(null);
                  }}
                  className="p-2 text-green-600 hover:text-green-800"
                >
                  <Check className="h-5 w-5" />
                </button>
                <button onClick={() => setEditingWorkout(null)} className="p-2 text-red-600 hover:text-red-800">
                  <X className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{workout.name}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {workout.muscleGroup} - {new Date(workout.date).toLocaleDateString()}
                </p>
              </div>
            )}
            <div className="flex space-x-2">
              {editingWorkout !== workout.id && (
                <button
                  onClick={() => startEditingWorkout(workout)}
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  <Edit2 className="h-5 w-5" />
                </button>
              )}
              <button
                onClick={() => onDeleteWorkout(workout.id)}
                className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {workout.exercises.map((exercise) => (
              <div key={exercise.id} className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex justify-between items-center mb-2">
                  {editingExercise === exercise.id ? (
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={editExerciseName}
                        onChange={(e) => setEditExerciseName(e.target.value)}
                        className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                      <button
                        onClick={() => {
                          onUpdateExercise(workout.id, exercise.id, { name: editExerciseName });
                          setEditingExercise(null);
                        }}
                        className="p-2 text-green-600 hover:text-green-800"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                      <button onClick={() => setEditingExercise(null)} className="p-2 text-red-600 hover:text-red-800">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{exercise.name}</h3>
                  )}
                  <div className="flex space-x-2">
                    {editingExercise !== exercise.id && (
                      <button
                        onClick={() => startEditingExercise(exercise)}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                    )}
                    <button
                      onClick={() => onDeleteExercise(workout.id, exercise.id)}
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  {exercise.sets.map((set, index) => (
                    <div key={set.id} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-2 rounded">
                      {editingSet === set.id ? (
                        <div className="flex items-center space-x-2">
                          <input
                            type="number"
                            value={editSetWeight}
                            onChange={(e) => setEditSetWeight(e.target.value)}
                            className="w-20 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            min="0"
                            step="0.5"
                          />
                          <span className="text-gray-700 dark:text-gray-200">kg ×</span>
                          <input
                            type="number"
                            value={editSetReps}
                            onChange={(e) => setEditSetReps(e.target.value)}
                            className="w-20 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            min="1"
                          />
                          <span className="text-gray-700 dark:text-gray-200">reps</span>
                          <button
                            onClick={() => {
                              onUpdateSet(workout.id, exercise.id, set.id, {
                                weight: parseFloat(editSetWeight),
                                reps: parseInt(editSetReps, 10),
                              });
                              setEditingSet(null);
                            }}
                            className="p-1 text-green-600 hover:text-green-800"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                          <button onClick={() => setEditingSet(null)} className="p-1 text-red-600 hover:text-red-800">
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-gray-700 dark:text-gray-200">
                          Set {index + 1}: {set.weight}kg × {set.reps} reps
                        </span>
                      )}
                      <div className="flex space-x-2">
                        {editingSet !== set.id && (
                          <button
                            onClick={() => startEditingSet(set)}
                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          onClick={() => onDeleteSet(workout.id, exercise.id, set.id)}
                          className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-2">
                  <SetForm onSubmit={(set) => onAddSet(workout.id, exercise.id, set)} />
                </div>
              </div>
            ))}

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <ExerciseForm onSubmit={(exercise) => onAddExercise(workout.id, exercise)} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}