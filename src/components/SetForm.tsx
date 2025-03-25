import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Set } from "../types";

interface SetFormProps {
  onSubmit: (set: Omit<Set, "id">) => void;
}

export function SetForm({ onSubmit }: SetFormProps) {
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      weight: parseFloat(weight),
      reps: parseInt(reps, 10),
    });
    setWeight("");
    setReps("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-4 items-end">
      <div>
        <label
          htmlFor="weight"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Peso (kg)
        </label>
        <input
          type="number"
          id="weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="mt-1 block w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required
          min="0"
          step="0.5"
        />
      </div>
      <div>
        <label
          htmlFor="reps"
          className="block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Repeticiones
        </label>
        <input
          type="number"
          id="reps"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          className="mt-1 block w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required
          min="1"
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <Plus className="h-5 w-5 mr-2" />
        Añadir serie
      </button>
    </form>
  );
}
