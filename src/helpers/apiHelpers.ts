import React from 'react'
import { NextApiResponse } from 'next'
import { Loading } from 'src/types/loading'
import { HttpError } from './httpError'

export function useGet<T extends object>(url: string, query?: {}) {
  const [state, setState] = React.useState<Loading<{ data: T | null }>>({
    loading: true,
  })

  React.useEffect(() => {
    fetchGetJSON<T>(url, query).then(
      (res) => {
        setState({ loading: false, error: false, data: res })
      },
      (err) => {
        setState({ loading: false, error: true })
      }
    )
  }, [url, JSON.stringify(query || {})])

  return state
}

export async function fetchGetJSON<T = unknown>(
  url: string,
  query?: {}
): Promise<T | null> {
  if (query) {
    url = `${url}?${new URLSearchParams(query).toString()}`
  }

  try {
    return fetch(url).then((res) => res.json())
  } catch (err: any) {
    throw new HttpError(err.statusCode, err.message)
  }
}

export async function fetchPostJSON<T = unknown>(
  url: string,
  data?: {}
): Promise<T | null> {
  try {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data || {}),
    })
    return await response.json()
  } catch (err: any) {
    throw new HttpError(err.statusCode, err.message)
  }
}

export async function fetchDelete(url: string): Promise<void> {
  try {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'DELETE',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    })
    return await response.json()
  } catch (err: any) {
    throw new HttpError(err.statusCode, err.message)
  }
}

export function validate<T extends Record<any, any>>(
  validators: string[],
  obj: T
) {
  validators.forEach((key) => {
    const val = obj[key]
    const isMissing = !(key in obj) || val === undefined || val === null

    if (isMissing) throw new HttpError(400, `${key} is missing.`)
  })
}

export function handleHttpError(e: unknown, res: NextApiResponse) {
  if (e instanceof HttpError) {
    return res
      .status(e.statusCode)
      .json({ statusCode: e.statusCode, message: e.message })
  }
  if (e instanceof Error) {
    return res.status(500).json({ statusCode: 500, message: e.message })
  } else {
    return res
      .status(500)
      .json({ statusCode: 500, message: 'Something went wrong.' })
  }
}
