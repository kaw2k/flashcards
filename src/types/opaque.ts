export type Opaque<K, T> = T & { __TYPE__: K }
export type RequiredHash<T> = { [id: string]: T }
export type OptionalHash<T> = { [id: string]: T | null }
