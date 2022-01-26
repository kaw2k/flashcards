import * as React from 'react'
import cx from 'clsx'
import { Space, adjustedSpace } from './every-layout-types'

export interface StackProps {
  space?: Space
  component?: string
  className?: string
  splitAfter?: number
}

export const Stack: React.SFC<StackProps> = ({
  component = 'div',
  className,
  space = '--s0',
  children,
  splitAfter,
}) => {
  const Component = component as any
  return (
    <Component className={cx('stack', className)}>
      {children}

      <style jsx>{`
        .stack {
          --space: ${adjustedSpace(space)};
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }

        .stack > :global(*) {
          margin-top: 0;
          margin-bottom: 0;
        }

        .stack > :global(*) + :global(*) {
          margin-top: var(--space);
        }

        .stack:only-child {
          ${splitAfter && `height: 100%;`}
        }

        .stack > :global(:nth-child(${splitAfter})) {
          ${splitAfter && `margin-bottom: auto;`}
        }
      `}</style>
    </Component>
  )
}
