import { Task, TaskDTO } from "../types/task";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/tasks";

export const getTasks = async (): Promise<Task[]> => {
  const response = await fetch(API_URL);
  return response.json();
};

export const createTask = async (task: TaskDTO): Promise<Task> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return response.json();
};

export const updateTask = async (id: number, task: TaskDTO): Promise<Task> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return response.json();
};

export const deleteTask = async (id: number): Promise<void> => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};