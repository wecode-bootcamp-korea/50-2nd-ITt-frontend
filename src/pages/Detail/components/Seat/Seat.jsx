import React, { useEffect, useState } from 'react';
import { GET_JIYOUNG_API } from '../../../../config.js';
import './Seat.scss';

const Seat = () => {
  const [seats, setSeats] = useState([]);
  const rows = [...new Set(seats.map(seat => seat.seatRow))];

  useEffect(() => {
    fetch(`${GET_JIYOUNG_API}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
      .then(res => res.json())
      .then(data => {
        setSeats(data.seats);
      });
  }, []);

  return (
    <div className="seat">
      <div className="seatArea">
        {rows.map(row => (
          <div key={row} className="seatGroup">
            {seats
              .filter(seat => seat.seatRow === row)
              .map(seat => {
                return (
                  <div className="formInput" key={`${seat.seatId}`}>
                    <input
                      type="checkbox"
                      id={`seat${seat.seatId}`}
                      className="formCheck"
                    />
                    <label htmlFor={`seat${seat.seatId}`} className="formLabel">
                      <span>{`seat${seat.seatId}`}</span>
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