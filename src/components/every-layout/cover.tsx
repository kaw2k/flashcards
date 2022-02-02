import * as React from 'react'
import cx from 'clsx'
import { adjustedSpace, Space } from './every-layout-types'

interface CoverProps {
  component?: string
  space?: Space
  centered?: string
  minHeight?: string
}

export const Cover: React.SFC<CoverProps> = ({
  component = 'div',
  children,
  space = '--s2',
  centered = '.cover-primary',
  minHeight = '100vh',
}) => {
  const Component = component as any
  const adjusted = adjustedSpace(space)

  return (
    <Component className={cx('cover', {})}>
      {children}

      <style jsx>{`
        .cover {
          display: flex;
          flex-direction: column;
          min-height: ${minHeight};
          padding-left: ${adjusted};
          padding-right: ${adjusted};
          padding-top: max(${adjusted}, env(safe-area-inset-top));
          padding-bottom: max(
            ${adjusted},
            calc(${adjusted} + env(safe-area-inset-bottom))
          );
        }

        .cover > :global(*) {
          margin-top: ${adjusted};
          margin-bottom: ${adjusted};
        }

        .cover > :global(:first-child:not(${centered})) {
          margin-top: 0;
        }

        .cover > :global(:last-child:not(${centered})) {
          margin-bottom: 0;
        }

        .cover > :global(${centered}) {
          margin-top: auto;
          margin-bottom: auto;
        }
      `}</style>
    </Component>
  )
}

export const CoverPrimary: React.SFC = ({ children }) => (
  <div className="cover-primary">{children}</div>
)
