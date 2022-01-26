import { Opaque } from './opaque'

export type Email = Opaque<'email', string>
export const Email = (email: string) => email as Email
