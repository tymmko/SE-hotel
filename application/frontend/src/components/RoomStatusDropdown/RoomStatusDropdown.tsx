import React from 'react';
import { styled } from '@mui/material/styles';
import { Select, MenuItem, SelectProps } from '@mui/material';

import { StatusTag } from '../StatusTag';

export type StatusOption = {
  value: string;
  label: string;
  tagColor: string;
};

interface RoomStatusDropdownProps extends Omit<SelectProps, 'onChange'> {
  options: StatusOption[];
  value: string;
  onChange: (value: string) => void;
}

const StyledSelect = styled(Select)(({ theme }) => ({
  border: `1px dashed gray`,
  borderRadius: 999,               
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '& .MuiSelect-select': {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0.5, 1.5),
  },
  '& .MuiSvgIcon-root': {
    right: theme.spacing(1),
    fontSize: '1rem',
  },
}));

export const RoomStatusDropdown: React.FC<RoomStatusDropdownProps> = ({
  options,
  value,
  onChange,
  ...muiProps
}) => (
  <StyledSelect
    variant="outlined"
    value={value}
    onChange={e => onChange(e.target.value as string)}
    displayEmpty
    renderValue={selected => {
      const opt = options.find(o => o.value === selected);
      return opt
        ? <StatusTag className="fw-bold" text={opt.label} hex={opt.tagColor} size="extra-small" />
        : '—';
    }}
    {...muiProps}
  >
    {options.map(opt => (
      <MenuItem key={opt.value} value={opt.value}>
        <StatusTag className="font-bold" text={opt.label} hex={opt.tagColor} size="extra-small" />
      </MenuItem>
    ))}
  </StyledSelect>
);

export default RoomStatusDropdown;
