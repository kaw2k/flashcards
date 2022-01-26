import React from 'react'

export const Sanskrit: React.FC = ({ children }) => {
  return (
    <div className="root">
      {children}
      <style jsx>{`
        .root {
          white-space: pre-line;
          font-style: italic;
        }
      `}</style>
    </div>
  )
}
