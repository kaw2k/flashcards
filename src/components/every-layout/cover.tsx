import * as React from 'react'
import cx from 'clsx'

interface CoverProps {
  component?: string
  space?: number
  centered?: string
  minHeight?: string
}

export const Cover: React.SFC<CoverProps> = ({
  component = 'div',
  children,
  space = 1,
  centered = '.cover-primary',
  minHeight = '100vh',
}) => {
  const Component = component as any
  return (
    <Component className={cx('cover', {})}>
      {children}

      <style jsx>{`
        .cover {
          display: flex;
          flex-direction: column;
          min-height: ${minHeight};
          padding-left: ${space}rem;
          padding-right: ${space}rem;
          padding-top: max(${space}rem, env(safe-area-inset-top));
          padding-bottom: max(
            ${space}rem,
            calc(2rem + env(safe-area-inset-bottom))
          );
        }

        .cover > :global(*) {
          margin-top: ${space}rem;
          margin-bottom: ${space}rem;
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
