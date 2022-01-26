import * as React from 'react'
import cx from 'clsx'

interface Props {
  className?: string
  /** The component the box renders as, defaults to div */
  component?: string
  /** The ratio of the frame, in the form of Height:Width */
  ratio: string
}

export const Frame: React.SFC<Props> = ({
  children,
  component = 'div',
  className,
  ratio,
}) => {
  const Component = component as any
  const [h, w] = ratio.split(':')

  return (
    <Component className={cx('frame', className)}>
      {children}
      <style jsx>{`
        .frame {
          --w: ${w};
          --h: ${h};
          padding-bottom: calc(var(--h) / var(--w) * 100%);
          position: relative;
        }

        .frame > :global(*) {
          overflow: hidden;
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .frame > :global(img),
        .frame > :global(video) {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}</style>
    </Component>
  )
}
