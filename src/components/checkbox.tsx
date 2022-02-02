import clsx from 'clsx'
import React from 'react'
import { Cluster } from './every-layout/cluster'
import { Icon, Icons } from './icon'

type Option = { value: string; label?: string; icon?: Icons }

export const Checkbox: React.FC<{
  color?: string
  name: string
  options: Option[]
  onChange?: (options: Option[]) => void
  disabled?: boolean
  value?: Option[]
  defaultValue?: Option[]
}> = ({
  name,
  disabled,
  color = '--blue',
  options,
  onChange = () => {},
  value,
  defaultValue,
}) => {
  const [state, setState] = React.useState(value || defaultValue || [])

  function toggleState(option: Option) {
    if (state.find((o) => o.value === option.value)) {
      setState(state.filter((o) => o.value !== option.value))
    } else {
      setState(state.concat(option))
    }
  }

  React.useEffect(() => {
    onChange(state)
  }, [state])

  return (
    <Cluster space="--s-5" justify="center">
      {options.map((option) => (
        <Cluster key={`radio-${option.value}`}>
          <input
            key={`radio-${option.value}-input`}
            id={`radio-${name}-${option.value}`}
            type="checkbox"
            disabled={disabled}
            name={name}
            value={option.value}
            checked={
              value != null
                ? !!value.find((o) => o.value === option.value)
                : undefined
            }
            defaultChecked={
              defaultValue != null
                ? !!defaultValue.find((o) => o.value === option.value)
                : undefined
            }
            onChange={(e) =>
              toggleState(
                options.find((o) => o.value === e.target.value) as Option
              )
            }
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
