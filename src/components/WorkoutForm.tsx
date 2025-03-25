import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { MuscleGroup, Workout } from '../types';

interface WorkoutFormProps {
  onSubmit: (workout: Omit<Workout, 'id' | 'exercises'>) => void;
}

const muscleGroups: MuscleGroup[] = ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms'];

export function WorkoutForm({ onSubmit }: WorkoutFormProps) {
  const [name, setName] = useState('');
  const [muscleGroup, setMuscleGroup] = useState<MuscleGroup>('Chest');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      muscleGroup,
      date: new Date().toISOString(),
    });
    setName('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <div>
        <label htmlFor="workoutName" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Workout Name
        </label>
        <input
          type="text"
          id="workoutName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required
        />
      </div>
      <div>
        <label htmlFor="muscleGroup" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Muscle Group
        </label>
        <select
          id="muscleGroup"
          value={muscleGroup}
          onChange={(e) => setMuscleGroup(e.target.value as MuscleGroup)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          {muscleGroups.map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <Plus className="h-5 w-5 mr-2" />
        Add Workout
      </button>
    </form>
  );
}