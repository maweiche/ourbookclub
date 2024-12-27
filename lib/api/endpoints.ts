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
    logout: () => apiClient('/users/logout', { 
      method: 'POST',
      // No need for actual data since we're just simulating logout
      params: { action: 'logout' }
    }),
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
        // Pass the array directly instead of joining
        params: { ids: groupIds } 
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
    list: (bookIds: string[]) => 
      apiClient<Book[]>('/books', { 
        method: 'GET',
        params: { ids: bookIds }
      }),
    get: (bookId: string) => 
      apiClient<Book>(`/books/${bookId}`),
    vote: (bookId: string, userId: string, value: number) => 
      apiClient(`/books/${bookId}/vote`, {
        method: 'POST',
        body: JSON.stringify({ userId, value }),
      }),
  },
}