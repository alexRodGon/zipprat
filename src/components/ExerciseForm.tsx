import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Exercise } from "../types";

interface ExerciseFormProps {
  onSubmit: (exercise: Omit<Exercise, "id" | "sets">) => void;
}

export function ExerciseForm({ onSubmit }: ExerciseFormProps) {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name });
    setName("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
    >
      <div>
        <label
          htmlFor="exerciseName"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Nombre ejercicio
        </label>
        <input
          type="text"
          id="exerciseName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <Plus className="h-5 w-5 mr-2" />
        Añadir ejercicio
      </button>
    </form>
  );
}
