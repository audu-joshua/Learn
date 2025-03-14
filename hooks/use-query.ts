"use client"

import { useState, useEffect } from "react"

interface QueryOptions<T> {
  queryFn: () => Promise<{ data: T | null; error: any | null }>
  enabled?: boolean
  onSuccess?: (data: T) => void
  onError?: (error: any) => void
}

interface QueryResult<T> {
  data: T | null
  error: any | null
  isLoading: boolean
  isError: boolean
  refetch: () => Promise<void>
}

export function useQuery<T>({ queryFn, enabled = true, onSuccess, onError }: QueryOptions<T>): QueryResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<any | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(enabled)

  const fetchData = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const { data, error } = await queryFn()

      if (error) {
        setError(error)
        onError?.(error)
      } else if (data) {
        setData(data)
        onSuccess?.(data)
      }
    } catch (err) {
      setError(err)
      onError?.(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (enabled) {
      fetchData()
    }
  }, [enabled])

  const refetch = async () => {
    await fetchData()
  }

  return {
    data,
    error,
    isLoading,
    isError: !!error,
    refetch,
  }
}

interface MutationOptions<TData, TVariables> {
  mutationFn: (variables: TVariables) => Promise<{ data: TData | null; error: any | null }>
  onSuccess?: (data: TData) => void
  onError?: (error: any) => void
}

interface MutationResult<TData, TVariables> {
  data: TData | null
  error: any | null
  isLoading: boolean
  isError: boolean
  mutate: (variables: TVariables) => Promise<{ data: TData | null; error: any | null }>
  reset: () => void
}

export function useMutation<TData, TVariables>({
  mutationFn,
  onSuccess,
  onError,
}: MutationOptions<TData, TVariables>): MutationResult<TData, TVariables> {
  const [data, setData] = useState<TData | null>(null)
  const [error, setError] = useState<any | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const mutate = async (variables: TVariables) => {
    setIsLoading(true)
    setError(null)

    try {
      const { data, error } = await mutationFn(variables)

      if (error) {
        setError(error)
        onError?.(error)
      } else if (data) {
        setData(data)
        onSuccess?.(data)
      }

      return { data, error }
    } catch (err) {
      setError(err)
      onError?.(err)
      return { data: null, error: err }
    } finally {
      setIsLoading(false)
    }
  }

  const reset = () => {
    setData(null)
    setError(null)
    setIsLoading(false)
  }

  return {
    data,
    error,
    isLoading,
    isError: !!error,
    mutate,
    reset,
  }
}

