import './select.scss';
import type { SelectOption } from '@/types/filters';

type SelectProps = {
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  label?: string;
};

export const Select = ({ value, options, onChange, label }: SelectProps) => {
  return (
    <div className="select">
      {label && <label className="select__label">{label}</label>}
      <select
        className="select__input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <span className="select__icon">▼</span>
    </div>
  );
};
