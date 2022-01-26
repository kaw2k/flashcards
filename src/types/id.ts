import { Opaque } from './opaque'

export type Id = Opaque<'id', string>
export const Id = <Type extends Id = Id>(id?: string) =>
  (id || `${rand()}-${rand()}-${rand()}`) as Type

function rand() {
  return Math.random().toString().slice(4, 10)
}
