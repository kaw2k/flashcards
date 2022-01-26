import * as React from 'react'
import cx from 'clsx'

interface Props {
  /** The component the box renders as, defaults to div */
  component?: string
  className?: string
  /** If true the any text of this component will be centered as well */
  andText?: boolean
  /** The left and right padding of the component, defaults to 0 */
  gutters?: number
  /** Aligns the content of the element true to the center with flex column and align items */
  intrinsic?: boolean
  trueCenter?: boolean
}

export const Center: React.SFC<Props> = ({
  component = 'div',
  children,
  className,
  andText = false,
  gutters = 0,
  intrinsic = false,
  trueCenter = false,
}) => {
  const Component = component as any
  return (
    <Component
      className={cx('center', className, {
        'center--and-text': andText,
        'center--intrinsic': intrinsic,
        'center--true': trueCenter,
      })}>
      {children}
      <style jsx>{`
        .center {
          box-sizing: content-box;
          margin-left: auto;
          margin-right: auto;
          max-width: var(--measure);
          padding-left: ${gutters}rem;
          padding-right: ${gutters}rem;
        }
        .center--and-text {
          text-align: center;
        }
        .center--intrinsic {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .center--true {
          justify-content: center;
        }
      `}</style>
    </Component>
  )
}
