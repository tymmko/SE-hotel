import React from 'react';
import { Select, MenuItem, SelectProps } from '@mui/material';
import { StatusTag } from '../StatusTag';

export type StatusOption = {
  value: string;
  label: string;
  tagColor: string; // e.g. 'green' or hex code
};

interface RoomStatusDropdownProps extends Omit<SelectProps, 'onChange'> {
  options: StatusOption[];
  value: string;
  onChange: (value: string) => void;
}

export const RoomStatusDropdown: React.FC<RoomStatusDropdownProps> = ({
  options,
  value,
  onChange,
  ...muiProps
}) => {
  return (
    <Select
      value={value}
      onChange={e => onChange(e.target.value as string)}
      displayEmpty
      renderValue={(selected) => {
        const opt = options.find(o => o.value === selected);
        return opt ? <StatusTag text={opt.label} hex={opt.tagColor} size="small" /> : '—';
      }}
      {...muiProps}
    >
      {options.map(opt => (
        <MenuItem key={opt.value} value={opt.value}>
          <StatusTag text={opt.label} hex={opt.tagColor} size="small" />
        </MenuItem>
      ))}
    </Select>
  );
};

export default RoomStatusDropdown;
