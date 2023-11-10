import React, { useEffect, useState } from 'react';
import { GET_JIYOUNG_API } from '../../../../config.js';
import './Seat.scss';

const Seat = () => {
  const [seats, setSeats] = useState([]);
  // const rows = Array.from(new Set(seats.map(seat => seat.seatRow)));
  // const cols = Array.from(new Set(seats.map(seat => seat.seatCol)));

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

  console.log(seats);

  return (
    <div className="seat">
      <div className="seatArea">
        {seats.map(seat => {
          const rows = [];
          for (let i = 0; i < seats.length; i += 20) {
            rows.push(seats.slice(i, i + 20));
          }
          console.log(rows);
          return (
            <div key={seat.seatId}>
              {seat.seatId}
              {rows.map((row, index) => (
                <div className="formInput" key={index}>
                  {seat.seatRow}
                  {/* <input
                    type="checkbox"
                    id={`seat${seat.seatId}`}
                    className="formCheck"
                  />
                  <label htmlFor={`seat${seat.seatId}`} className="formLabel">
                    <span>{`seat${seat.seatId}`}</span>
                  </label> */}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Seat;
