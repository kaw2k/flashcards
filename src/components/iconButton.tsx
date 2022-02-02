import React from 'react'
import { Icon, Icons } from './icon'

export const IconButton: React.FC<{
  icon: Icons
  type?: 'button' | 'submit'
  onClick?: () => void
  color?: string
}> = ({ icon, color = 'var(--black)', ...props }) => {
  return (
    <button className="icon" {...props}>
      <Icon icon={icon} />

      <style jsx>{`
        .icon {
          border: 1px solid currentColor;
          border-radius: 50%;
          width: calc(3 * var(--s0));
          height: calc(3 * var(--s0));
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 2em;
          color: ${color};
        }
      `}</style>
    </button>
  )
}
