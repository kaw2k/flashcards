export type Space =
  | '--s-5'
  | '--s-4'
  | '--s-3'
  | '--s-2'
  | '--s-1'
  | '--s0'
  | '--s1'
  | '--s2'
  | '--s3'
  | '--s4'
  | '--s5'
  | 0

export const adjustedSpace = (space: Space) =>
  !space ? '0px' : `var(${space})`
