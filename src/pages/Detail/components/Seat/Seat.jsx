import React, { useEffect, useState } from 'react';
import './Seat.scss';

// seats
const Seat = () => {
  const [seats, setSeats] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const rows = [...new Set(seats.map(seat => seat.seat_row))];

  useEffect(() => {
    fetch('/data/seatData.json', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
      .then(res => res.json())
      .then(data => {
        setSeats(data.seatInfo);
      });
  }, []);

  const seatOnChange = seat => {
    const isChecked = checkedItems.some(item => item.id === seat.id);
    const updatedItems = isChecked
      ? checkedItems.filter(item => item.id !== seat.id)
      : [...checkedItems, seat];

    setCheckedItems(updatedItems);
  };

  return (
    <div className="seat">
      <div className="seatArea">
        {rows.map(row => (
          <div key={row} className="seatGroup">
            {row}
            {seats
              .filter(seat => seat.seat_row === row)
              .map(seat => {
                const { id } = seat;
                return (
                  <div className="formInput" key={`${id}`}>
                    <input
                      type="checkbox"
                      id={`seat${id}`}
                      className="formCheck"
                      onChange={() => seatOnChange(seat)}
                      checked={checkedItems.some(item => item.id === id)}
                    />
                    <label htmlFor={`seat${id}`} className="formLabel">
                      <span>{`${id}`}</span>
                    </label>
                  </div>
                );
              })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Seat;
