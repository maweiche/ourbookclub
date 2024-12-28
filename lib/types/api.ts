// src/lib/api/types.ts
export type ApiResponse<T> = {
  data: T | null
  error: string | null
}

export type ApiError = {
  message: string
  status: number
}
