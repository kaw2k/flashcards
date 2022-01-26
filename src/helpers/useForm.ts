import { useState } from 'react'

export function useForm<S extends object, K extends keyof S>(initialState: S) {
  const [state, setState] = useState(initialState)

  function update(name: K, e?: any) {
    if (e && e.target && e.target.value) {
      setState({ ...state, [name]: e.target.value })
    } else if (typeof e !== 'undefined') {
      setState({ ...state, [name]: e })
    } else {
      return function (e: any) {
        if (e && e.target) {
          setState({ ...state, [name]: e.target.value || '' })
        } else {
          setState({ ...state, [name]: e })
        }
      }
    }
  }

  return [state, update, setState] as const
}
