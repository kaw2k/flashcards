import clsx from 'clsx'
import React from 'react'
import { Cluster } from './every-layout/cluster'

type Option = { value: string; label: string } | { value: string }

export const Radio: React.FC<{
  vertical?: boolean
  color?: string
  name: string
  options: Option[]
  onChange?: (value: string) => void
  disabled?: boolean
  value?: string
  defaultValue?: string
}> = ({
  vertical = false,
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
    <div
      style={variables}
      className={clsx('radio', vertical && 'radio--vertical')}>
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
            {'label' in option && <span>{option.label}</span>}
          </label>
        </Cluster>
      ))}

      <style jsx>{`
        input {
          display: inline-block;
          width: auto;
        }
      `}</style>
    </div>
  )
}
