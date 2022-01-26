import * as React from 'react'
import cx from 'clsx'
import { Space } from './every-layout-types'

interface SidebarProps {
  className?: string
  component?: string
  side?: 'left' | 'right'
  sideWidth?: string
  contentMin?: string
  space?: Space
  noStretch?: boolean | 'center' | 'flex-start' | 'flex-end' | 'stretch'
}

export const Sidebar: React.SFC<SidebarProps> = ({
  component = 'div',
  children,
  side = 'left',
  sideWidth,
  contentMin = '50%',
  space = '--s0',
  noStretch = false,
  className,
}) => {
  const Component = component as any
  const alignItems = noStretch && noStretch === true ? 'flex-start' : noStretch

  return (
    <Component
      className={cx('with-sidebar', className, {
        'with-sidebar--left': side === 'left',
        'with-sidebar--right': side === 'right',
      })}>
      {children}

      <style jsx>{`
        .with-sidebar {
          display: flex;
          flex-wrap: wrap;
          gap: var(${space});
          ${noStretch ? `align-items: ${alignItems};` : ''}
        }

        .with-sidebar.with-sidebar--right > :global(:last-child),
        .with-sidebar.with-sidebar--left > :global(:first-child) {
          ${sideWidth ? `flex-basis: ${sideWidth};` : ''}
          flex-grow: 1;
        }

        .with-sidebar.with-sidebar--right > :global(:first-child),
        .with-sidebar.with-sidebar--left > :global(:last-child) {
          flex-basis: 0;
          flex-grow: 999;
          min-inline-size: ${contentMin};
        }
      `}</style>
    </Component>
  )
}
