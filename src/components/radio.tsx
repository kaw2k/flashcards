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
    <Cluster space="--s-5" justify="center">
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
            <Cluster align="center" space="--s-5">
              {'icon' in option && <Icon icon={option.icon} />}
              <span>{option.label || option.value}</span>
            </Cluster>
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
          padding: var(--s-5) var(--s-2);
          border: 1px solid var(--grayLight);
          border-radius: 5px;
          color: var(--grayLight);
          user-select: none;
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
