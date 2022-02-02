import React from 'react'

export const Sanskrit: React.FC<{ component?: string }> = ({
  children,
  component = 'div',
}) => {
  const Component = component as any

  return (
    <Component className="root">
      {children}
      <style jsx>{`
        .root {
          white-space: pre-line;
          font-style: italic;
        }
      `}</style>
    </Component>
  )
}
