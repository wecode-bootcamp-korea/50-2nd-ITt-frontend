import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import 'react-datepicker/dist/react-datepicker.css';
import './Datepicker.scss';

const Datepicker = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className="datePicker">
      <DatePicker
        selected={startDate}
        onChange={date => setStartDate(date)}
        dateFormat="yyyy년 MM월 dd일"
        locale={ko}
        inline
        showTimeSelect
      />
    </div>
  );
};

export default Datepicker;
