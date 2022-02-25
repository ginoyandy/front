import React, { HTMLAttributes } from 'react';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import './date-picker.css';

interface Props {
  isClearable?: boolean;
  onChange: (date: Date) => unknown;
  selectedDate: Date | undefined;
  showPopperArrow?: boolean;
}

const days: Record<number, string> = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'];
const months = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

const locale: any = {
  localize: {
    day: (n: number) => days[n],
    month: (n: number) => months[n],
  },
  formatLong: {
    date: () => 'dd/mm/yyyy',
  },
};

const DatePicker = ({
  selectedDate,
  onChange,
  isClearable = false,
  showPopperArrow = false,
  ...props
}: Props & ReactDatePickerProps & HTMLAttributes<HTMLElement>) => {
  return (
    <ReactDatePicker
      locale={locale}
      onChangeRaw={(e: React.FocusEvent<HTMLInputElement, Element>) =>
        e.preventDefault()
      }
      dateFormat="dd/MM/yyyy"
      selected={selectedDate}
      onChange={onChange}
      isClearable={isClearable}
      showPopperArrow={showPopperArrow}
      {...props}
    />
  );
};

export default DatePicker;
