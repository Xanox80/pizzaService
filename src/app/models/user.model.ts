export interface User {
  id: number;
  usernameAdmin: string;
  role: 'admin' | 'user' | 'warehouse' | 'cook';
  password: string;
}
