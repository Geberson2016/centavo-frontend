interface AuthUser {
  id: number;
  name: string;
  email: string;
}

export function useAuth() {
  const raw = localStorage.getItem('user');
  const user: AuthUser | null = raw ? JSON.parse(raw) : null;

  return { user };
}
