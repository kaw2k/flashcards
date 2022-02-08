import clsx from 'clsx'
import React from 'react'
import { Cluster } from './every-layout/cluster'
import { Icon, Icons } from './icon'

type Option = { value: string; label?: string; icon?: Icons }

export const Radio: React.FC<{
  color?: string
  name: string
  options: Option[]
  onChange?: (value: string) => void
  disabled?: boolean
  value?: string
  defaultValue?: string
}> = ({
  name,
  disabled,
  color = '--blue',
  options,
  onChange = () => {},
  value,
  defaultValue,
}) => {
  const variables: any = {
    '--color-primary': `var(${color})`,
  }

  return (
    <Cluster justify="center">
      {options.map((option) => (
        <Cluster key={`radio-${option.value}`}>
          <input
            key={`radio-${option.value}-input`}
            id={`radio-${name}-${option.value}`}
            type="radio"
            disabled={disabled}
            name={name}
            value={option.value}
            checked={value != null ? value === option.value : undefined}
            defaultChecked={
              defaultValue != null ? defaultValue === option.value : undefined
            }
            onChange={(e) => onChange(option.value)}
            onClick={(e) => !disabled && onChange(option.value)}
          />
          <label
            key={`radio-${option.value}-label`}
            htmlFor={`radio-${name}-${option.value}`}>
            {'icon' in option && <Icon icon={option.icon} />}
            <span className="text">{option.label || option.value}</span>
          </label>
        </Cluster>
      ))}

      <style jsx>{`
        input {
          display: inline-block;
          width: auto;
          display: none;
        }

        label {
          display: inline-flex;
          flex-flow: column;
          justify-content: center;
          align-items: center;
          text-align: center;

          border: 1px solid var(--grayLight);
          border-radius: 50%;
          width: 2em;
          height: 2em;

          color: var(--grayLight);
          user-select: none;

          font-size: 3em;
        }

        .text {
          text-transform: uppercase;
          font-size: 0.2em;
          word-spacing: 5em;
        }

        input:checked + label {
          background-color: var(--black);
          border-color: var(--black);
          color: var(--white);
        }
      `}</style>
    </Cluster>
  )
}
