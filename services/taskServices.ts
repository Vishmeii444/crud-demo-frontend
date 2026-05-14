import api from "./api";
import { Task, TaskDTO } from "../types/task";

export const getTasks = async (): Promise<Task[]> => {
  const response = await api.get<Task[]>(""); 
  return response.data; // axios puts the response body in the .data property
};

export const createTask = async (task: TaskDTO): Promise<Task> => {
  const response = await api.post<Task>("", task);
  return response.data;
};

export const updateTask = async (id: number, task: TaskDTO): Promise<Task> => {
  const response = await api.put<Task>(`/${id}`, task);
  return response.data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await api.delete(`/${id}`);
};