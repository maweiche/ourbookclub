// src/lib/api/endpoints.ts
import { User, Group, Book } from '@/lib/types'
import { apiClient } from './client'

export const api = {
  // User endpoints
  // auth: {
  //   login: (email: string, password: string) => 
  //     apiClient<User>('/auth/login', {
  //       method: 'POST',
  //       body: JSON.stringify({ email, password }),
  //     }),
  //   logout: () => 
  //     apiClient('/auth/logout', { method: 'POST' }),
  // },

  // Dummy Data for now
  auth: {
    login: () => apiClient<User>('/users', { 
      method: 'GET',
      params: { id: 'u1' }
    }),
    logout: () => apiClient('/auth/logout', { method: 'POST' }),
  },
  // Group endpoints
  // groups: {
  //   list: (userId: string) => 
  //     apiClient<Group[]>(`/groups?userId=${userId}`),
  //   get: (groupId: string) => 
  //     apiClient<Group>(`/groups/${groupId}`),
  //   create: (data: Partial<Group>) => 
  //     apiClient<Group>('/groups', {
  //       method: 'POST',
  //       body: JSON.stringify(data),
  //     }),
  //   update: (groupId: string, data: Partial<Group>) => 
  //     apiClient<Group>(`/groups/${groupId}`, {
  //       method: 'PATCH',
  //       body: JSON.stringify(data),
  //     }),
  // },

  // Dummy Data for now
  groups: {
    list: (groupIds: string[]) => 
      apiClient<Group[]>('/groups', { 
        method: 'GET',
        params: { ids: groupIds.join(',') }
      }),
    get: (groupId: string) => apiClient<Group>(`/groups/${groupId}`, { method: 'GET' }),
    create: (data: Partial<Group>) => apiClient<Group>('/groups', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    update: (groupId: string, data: Partial<Group>) => apiClient<Group>(`/groups/${groupId}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
  },

  // Book endpoints
  books: {
    list: (groupId: string) => 
      apiClient<Book[]>(`/books?groupId=${groupId}`),
    get: (bookId: string) => 
      apiClient<Book>(`/books/${bookId}`),
    vote: (bookId: string, userId: string, value: number) => 
      apiClient(`/books/${bookId}/vote`, {
        method: 'POST',
        body: JSON.stringify({ userId, value }),
      }),
  },
}