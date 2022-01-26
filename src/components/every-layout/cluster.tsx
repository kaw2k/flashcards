import * as React from 'react'
import cx from 'clsx'
import { Space } from './every-layout-types'

interface ClusterProps {
  className?: string
  /** The component the box renders as, defaults to div */
  component?: string
  /** The space between each component, defaults to 1rem, all units in rem */
  space?: Space
  /** The align-items css property, defaults to 'center' */
  align?: 'center' | 'flex-start' | 'flex-end' | 'stretch'
  /** The justify-content css property, defaults to 'flex-start' */
  justify?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-around'
    | 'space-between'
}

/** Renders a cluster layout */
export const Cluster: React.SFC<ClusterProps> = ({
  component = 'div',
  children,
  space = '--s0',
  align = 'center',
  justify = 'flex-start',
  className,
}) => {
  const Component = component as any
  return (
    <Component className={cx('cluster', className)}>
      {children}

      <style jsx>{`
        .cluster {
          display: flex;
          flex-wrap: wrap;
          gap: var(${space}, 1rem);
          justify-content: ${justify};
          align-items: ${align};
        }
      `}</style>
    </Component>
  )
}
