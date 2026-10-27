export type TaskPriority = 'Basse' | 'Moyenne' | 'Haute';
export type TaskStatus = 'En attente' | 'En cours' | 'Terminé';

/** Filtre d'affichage des tâches. */
export type TaskFilter = 'Toutes' | 'En cours' | 'Terminé';

export interface Task {
  id: number;
  title: string;
  priority: TaskPriority;
  status: TaskStatus;
  assigneeId?: number;
  dueDate?: string;
  description?: string;
}

/** Émis par TaskList : quelle tâche, quel nouveau statut. */
export interface TaskStatusChange {
  taskId: number;
  status: TaskStatus;
}

/** Émis par ProjectCard : on ajoute le projet concerné. */
export interface ProjectTaskStatusChange extends TaskStatusChange {
  projectId: number;
}

/** Émis par ProjectCard pour une suppression : projet et tâche concernés. */
export interface ProjectTaskDelete {
  projectId: number;
  taskId: number;
}
