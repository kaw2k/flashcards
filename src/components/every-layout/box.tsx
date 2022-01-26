import * as React from 'react'
import cx from 'clsx'
import { Space, adjustedSpace } from './every-layout-types'

interface Props {
  padding?: Space
  /** The unit is px */
  borderWidth?: number
  className?: string
  /** The component the box renders as, defaults to div */
  component?: string
  backgroundColor?: string
}

export const Box: React.SFC<Props> = ({
  children,
  component = 'div',
  className,
  padding = '--s0',
  borderWidth = 0,
  backgroundColor,
}) => {
  const Component = component as any
  return (
    <Component className={cx('box', className)}>
      {children}
      <style jsx>{`
        .box {
          display: block;
          padding: ${adjustedSpace(padding)};
          border: ${borderWidth}px solid;
          ${backgroundColor && `background-color: ${backgroundColor};`}
        }
      `}</style>
    </Component>
  )
}
