export type UserContextType = {
  user: User | null;
};

export interface User {
  email: string;
}

export interface UserProviderProps {
  children: React.ReactNode;
}

export interface userProps {
  [propName: string]: any;
}
