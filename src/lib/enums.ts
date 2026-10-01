export const Role = {
  user: 'user',
  admin: 'admin'
} as const

export type Role = (typeof Role)[keyof typeof Role]