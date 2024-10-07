// 定义用户信息的类型
export interface User {
  id: number;
  userName: string;
  password?: string;
  email: string | null;
  phone: string | null;
  role: UserRole;
}

export enum UserRole {
  ADMIN,
  USER,
  VIP,
  PREMIUM,
}
