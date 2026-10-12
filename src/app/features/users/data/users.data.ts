import { User } from '../models/user.model';

export const USERS: User[] = [
  {
    id: 1,
    name: 'Amira Ben Salah',
    email: 'amira@taskflow.tn',
    role: 'Développeur',
    active: true
  },
  {
    id: 2,
    name: 'Karim Trabelsi',
    email: 'karim@taskflow.tn',
    role: 'Chef de projet',
    active: true
  },
  {
    id: 3,
    name: 'Sarra Mansour',
    email: 'sarra@taskflow.tn',
    role: 'Designer',
    active: false
  },
  {
    id: 4,
    name: 'Yassine Ben Ali',
    email: 'yassine@taskflow.tn',
    role: 'Testeur',
    active: true
  }
];
