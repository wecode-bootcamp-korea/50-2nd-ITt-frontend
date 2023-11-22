import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GET_SEAT_API } from '../../../../config';
import './Seat.scss';

const Seat = ({ itemInfo, setCheckedItems, checkedItems }) => {
  const [seats, setSeats] = useState([]);
  const rows = [...new Set(seats.map(seat => seat.seatRow))];

  useEffect(() => {
    axios
      .post(
        GET_SEAT_API,
        {
          locationId: itemInfo.locationId,
          itemId: itemInfo.itemId,
        },
        {
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
        },
      )
      .then(res => {
        setSeats(res.data.data.seatInfo);
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
            <span className="seatRow">{row}</span>
            {seats
              .filter(seat => seat.seatRow === row)
              .map(seat => {
                const { id, isBooked } = seat;
                return (
                  <div className="formInput" key={id}>
                    <input
                      type="checkbox"
                      id={`seat${id}`}
                      className="formCheck"
                      onChange={() => seatOnChange(seat)}
                      checked={checkedItems.some(item => item.id === id)}
                      disabled={Boolean(isBooked)}
                    />
                    <label htmlFor={`seat${id}`} className="formLabel">
                      <span>{id}</span>
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
