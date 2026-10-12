export interface Task {
  id: number;
  title: string;
  priority: 'Basse' | 'Moyenne' | 'Haute';
  status: 'En attente' | 'En cours' | 'Terminé';
  assigneeId?: number;
  dueDate?: string;      // 'YYYY-MM-DD'
  description?: string;
}
