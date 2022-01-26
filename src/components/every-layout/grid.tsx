import * as React from 'react'
import cx from 'clsx'
import ResizeObserver from 'resize-observer-polyfill'

// TODO: This isn't right... above doesn't seem to be applied reasonably

interface Props {
  className?: string
  /** The component the box renders as, defaults to div */
  component?: string
  /** The minimum size of the content before switching to a single column, defaults to 250px */
  min?: string
  /** The space between grid items, defaults to --s0*/
  space?: string
}

export const Grid: React.SFC<Props> = ({
  children,
  component = 'div',
  className,
  min = '250px',
  space = '--s0',
}) => {
  const self = React.useRef<any>()

  React.useEffect(() => {
    if (
      'ResizeObserver' in window &&
      !CSS.supports('width', `min(${min}, 100%)`)
    ) {
      const test = document.createElement('div')
      test.classList.add('test')
      test.style.width = min
      self.current && self.current.appendChild(test)
      const br = test.offsetWidth
      self.current && self.current.removeChild(test)

      const ro = new ResizeObserver((entries: any) => {
        for (let entry of entries) {
          const cr = entry.contentRect
          const q = cr.width > br
          self.current && self.current.classList.toggle('above', q)
        }
      })

      ro.observe(self.current)
    }
  }, [])

  const Component = component as any
  return (
    <Component className={cx('grid', className)} ref={self}>
      {children}
      <style jsx>{`
        .grid {
          display: grid;
          grid-gap: var(${space});
          align-content: start;
          grid-template-columns: 100%;
        }

        .grid.above {
          grid-template-columns: repeat(auto-fit, minmax(${min}, 1fr));
        }

        @supports (width: min(${min}, 100%)) {
          .grid {
            grid-gap: ${space};
            grid-template-columns: repeat(
              auto-fill,
              minmax(min(${min}, 100%), 1fr)
            );
          }
        }
      `}</style>
    </Component>
  )
}
