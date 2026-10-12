import { Task } from './task.model';

export interface Project {
  id: number;
  name: string;
  description: string;
  status: 'En attente' | 'En cours' | 'Terminé';
  startDate: string;   // 'YYYY-MM-DD'
  budget: number;      // en TND
  tasks: Task[];
}
