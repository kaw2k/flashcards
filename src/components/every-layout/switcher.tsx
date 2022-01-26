import * as React from 'react'
import cx from 'clsx'
import { Space, adjustedSpace } from './every-layout-types'

interface Props {
  className?: string
  /** The component the box renders as, defaults to div */
  component?: string
  threshold?: string
  space?: Space
  limit?: number
}

export const Switcher: React.SFC<Props> = ({
  children,
  component = 'div',
  className,
  limit = 4,
  threshold = '30ch',
  space = '--s1',
}) => {
  const Component = component as any

  return (
    <Component className={cx('switcher', className)}>
      {children}

      <style jsx>{`
        .switcher {
          display: flex;
          flex-wrap: wrap;
          gap: var(${space});
        }

        .switcher > :global(*) {
          flex-grow: 1;
          flex-basis: calc(
            (${threshold} - (100% - ${adjustedSpace(space)})) * 999
          );
        }

        .switcher > :gloabl(*) > :global(:nth-last-child(n + ${limit})),
        .switcher
          > :global(*)
          > :global(:nth-last-child(n + ${limit}))
          ~ :global(*) {
          flex-basis: 100%;
        }
      `}</style>
    </Component>
  )
}
