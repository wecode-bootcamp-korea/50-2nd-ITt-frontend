import React, { useState } from 'react';
import Datepicker from './components/Datepicker/Datepicker';
import Button from '../../components/Button/Button';
import './Detail.scss';

const Detail = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatSelect = seat => {
    if (seat.isBooked) return;

    if (selectedSeats.some(({ seatId }) => seatId === seat.seatId)) {
      setSelectedSeats(
        selectedSeats.filter(({ seatId }) => seatId !== seat.seatId),
      );
    } else {
      setSelectedSeats(selectedSeats.concat(seat));
    }
  };

  return (
    <div className="detail">
      <div className="detailArea">
        <div className="titleArea">
          <h2 className="title">뮤지컬</h2>
          <div className="titleInfo">
            <span className="date">2023.11.08 ~ 2023.12.25</span>
            <button type="button" className="location">
              선릉위워크
            </button>
          </div>
        </div>
        <div className="infoArea">
          <div className="infoImg">
            <img src="/images/visual_01.png" alt="삼총사" />
          </div>
          <div className="infoGroup">
            <dl className="infoList">
              <dt>등급</dt>
              <dd>만 7세 이상</dd>
            </dl>
            <dl className="infoList">
              <dt>관람시간</dt>
              <dd>150분</dd>
            </dl>
            <dl className="infoList">
              <dt>출연</dt>
              <dd>-</dd>
            </dl>
            <dl className="infoList">
              <dt>가격</dt>
              <dd>
                <div className="infoPrice">
                  {SEATS_DATA.map(({ grade, price, remainingSeats }) => (
                    <dl key={grade} className="priceList">
                      <dt>{grade}석</dt>
                      <dd>
                        <span>{price.toLocaleString()}</span> 원
                      </dd>
                      <dd>
                        <span>(잔여 : {remainingSeats}석)</span>
                      </dd>
                    </dl>
                  ))}
                </div>
              </dd>
            </dl>
            <dl className="infoList block">
              <dt>공연시간 안내</dt>
              <dd>
                평일 오후 7시 30분 / 주말 및 공휴일 오후 2시, 6시 30분 <br />
                (월요일 공연 없음, 9월 29일 공연없음)
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div className="reserveArea">
        <div className="dateArea">
          <h3 className="dateTitle">날짜/시간 선택</h3>
          <Datepicker startDate={startDate} setStartDate={setStartDate} />
        </div>
        <div className="btnArea">
          <Button width="230px">예매하기</Button>
        </div>
        <div className="seatsContainer">
          {SEATS_DATA.map(section => {
            const rowData = section.seats.reduce((acc, cur) => {
              (acc[cur.seatRow] = acc[cur.seatRow] || []).push(cur);
              return acc;
            }, {});

            const maxCol = Math.max(
              ...Object.values(rowData)
                .flatMap(seat => seat)
                .map(({ seatCol }) => seatCol),
            );

            return (
              <div key={section.grade}>
                <p>{section.grade}</p>
                <div className="seatSection">
                  <div className="row">
                    <span className="guide" />
                    {Array.from({ length: maxCol }).map((_, idx) => (
                      <span key={idx} className="guide">
                        {idx + 1}
                      </span>
                    ))}
                  </div>
                  {Object.entries(rowData).map(([row, rowSeats], idx) => (
                    <div key={idx} className="row">
                      <span className="guide">{row}</span>
                      {rowSeats.map(seat => (
                        <span
                          key={seat.seatId}
                          className={`seat${seat.isBooked ? ' booked' : ''}${
                            selectedSeats.some(
                              ({ seatId }) => seatId === seat.seatId,
                            )
                              ? ' selected'
                              : ''
                          }`}
                          onClick={() => handleSeatSelect(seat)}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Detail;

const SEATS_DATA = [
  {
    grade: 'VIP',
    price: 100000,
    remainingSeats: 60,
    seats: [
      { seatId: 1, seatRow: 'A', seatCol: 1, isBooked: false },
      { seatId: 2, seatRow: 'A', seatCol: 2, isBooked: false },
      { seatId: 3, seatRow: 'A', seatCol: 3, isBooked: true },
      { seatId: 4, seatRow: 'A', seatCol: 4, isBooked: false },
      { seatId: 5, seatRow: 'A', seatCol: 5, isBooked: false },
      { seatId: 6, seatRow: 'A', seatCol: 6, isBooked: false },
      { seatId: 7, seatRow: 'A', seatCol: 7, isBooked: true },
      { seatId: 8, seatRow: 'A', seatCol: 8, isBooked: false },
      { seatId: 9, seatRow: 'A', seatCol: 9, isBooked: false },
      { seatId: 10, seatRow: 'A', seatCol: 10, isBooked: false },
      { seatId: 11, seatRow: 'A', seatCol: 11, isBooked: true },
      { seatId: 12, seatRow: 'A', seatCol: 12, isBooked: false },
      { seatId: 13, seatRow: 'A', seatCol: 13, isBooked: false },
      { seatId: 14, seatRow: 'A', seatCol: 14, isBooked: false },
      { seatId: 15, seatRow: 'A', seatCol: 15, isBooked: true },
      { seatId: 16, seatRow: 'A', seatCol: 16, isBooked: false },
      { seatId: 17, seatRow: 'A', seatCol: 17, isBooked: false },
      { seatId: 18, seatRow: 'A', seatCol: 18, isBooked: false },
      { seatId: 19, seatRow: 'A', seatCol: 19, isBooked: true },
      { seatId: 20, seatRow: 'A', seatCol: 20, isBooked: false },
      { seatId: 21, seatRow: 'B', seatCol: 1, isBooked: true },
      { seatId: 22, seatRow: 'B', seatCol: 2, isBooked: false },
      { seatId: 23, seatRow: 'B', seatCol: 3, isBooked: false },
      { seatId: 24, seatRow: 'B', seatCol: 4, isBooked: false },
      { seatId: 25, seatRow: 'B', seatCol: 5, isBooked: false },
      { seatId: 26, seatRow: 'B', seatCol: 6, isBooked: false },
      { seatId: 27, seatRow: 'B', seatCol: 7, isBooked: true },
      { seatId: 28, seatRow: 'B', seatCol: 8, isBooked: true },
      { seatId: 29, seatRow: 'B', seatCol: 9, isBooked: true },
      { seatId: 30, seatRow: 'B', seatCol: 10, isBooked: false },
      { seatId: 31, seatRow: 'B', seatCol: 11, isBooked: true },
      { seatId: 32, seatRow: 'B', seatCol: 12, isBooked: false },
      { seatId: 33, seatRow: 'B', seatCol: 13, isBooked: false },
      { seatId: 34, seatRow: 'B', seatCol: 14, isBooked: false },
      { seatId: 35, seatRow: 'B', seatCol: 15, isBooked: true },
      { seatId: 36, seatRow: 'B', seatCol: 16, isBooked: false },
      { seatId: 37, seatRow: 'B', seatCol: 17, isBooked: false },
      { seatId: 38, seatRow: 'B', seatCol: 18, isBooked: false },
      { seatId: 39, seatRow: 'B', seatCol: 19, isBooked: true },
      { seatId: 40, seatRow: 'B', seatCol: 20, isBooked: false },
      { seatId: 41, seatRow: 'C', seatCol: 1, isBooked: false },
      { seatId: 42, seatRow: 'C', seatCol: 2, isBooked: true },
      { seatId: 43, seatRow: 'C', seatCol: 3, isBooked: true },
      { seatId: 44, seatRow: 'C', seatCol: 4, isBooked: false },
      { seatId: 45, seatRow: 'C', seatCol: 5, isBooked: false },
      { seatId: 46, seatRow: 'C', seatCol: 6, isBooked: false },
      { seatId: 47, seatRow: 'C', seatCol: 7, isBooked: false },
      { seatId: 48, seatRow: 'C', seatCol: 8, isBooked: false },
      { seatId: 49, seatRow: 'C', seatCol: 9, isBooked: false },
      { seatId: 50, seatRow: 'C', seatCol: 10, isBooked: false },
      { seatId: 51, seatRow: 'C', seatCol: 11, isBooked: true },
      { seatId: 52, seatRow: 'C', seatCol: 12, isBooked: false },
      { seatId: 53, seatRow: 'C', seatCol: 13, isBooked: false },
      { seatId: 54, seatRow: 'C', seatCol: 14, isBooked: false },
      { seatId: 55, seatRow: 'C', seatCol: 15, isBooked: true },
      { seatId: 56, seatRow: 'C', seatCol: 16, isBooked: false },
      { seatId: 57, seatRow: 'C', seatCol: 17, isBooked: false },
      { seatId: 58, seatRow: 'C', seatCol: 18, isBooked: false },
      { seatId: 59, seatRow: 'C', seatCol: 19, isBooked: true },
      { seatId: 60, seatRow: 'C', seatCol: 20, isBooked: false },
      { seatId: 602, seatRow: 'C', seatCol: 21, isBooked: false },
      { seatId: 61, seatRow: 'D', seatCol: 1, isBooked: false },
      { seatId: 62, seatRow: 'D', seatCol: 2, isBooked: false },
      { seatId: 63, seatRow: 'D', seatCol: 3, isBooked: false },
      { seatId: 64, seatRow: 'D', seatCol: 4, isBooked: false },
      { seatId: 65, seatRow: 'D', seatCol: 5, isBooked: false },
      { seatId: 66, seatRow: 'D', seatCol: 6, isBooked: false },
      { seatId: 67, seatRow: 'D', seatCol: 7, isBooked: false },
      { seatId: 68, seatRow: 'D', seatCol: 8, isBooked: false },
      { seatId: 69, seatRow: 'D', seatCol: 9, isBooked: false },
      { seatId: 70, seatRow: 'D', seatCol: 10, isBooked: false },
      { seatId: 71, seatRow: 'D', seatCol: 11, isBooked: false },
      { seatId: 72, seatRow: 'D', seatCol: 12, isBooked: false },
      { seatId: 73, seatRow: 'D', seatCol: 13, isBooked: false },
      { seatId: 74, seatRow: 'D', seatCol: 14, isBooked: true },
      { seatId: 75, seatRow: 'D', seatCol: 15, isBooked: true },
      { seatId: 76, seatRow: 'D', seatCol: 16, isBooked: true },
      { seatId: 77, seatRow: 'D', seatCol: 17, isBooked: false },
      { seatId: 78, seatRow: 'D', seatCol: 18, isBooked: false },
      { seatId: 79, seatRow: 'D', seatCol: 19, isBooked: false },
      { seatId: 80, seatRow: 'D', seatCol: 20, isBooked: false },
      { seatId: 81, seatRow: 'D', seatCol: 21, isBooked: false },
    ],
  },
  {
    grade: 'R',
    price: 50000,
    remainingSeats: 12,
    seats: [
      { seatId: 241, seatRow: 'A', seatCol: 1, isBooked: false },
      { seatId: 242, seatRow: 'A', seatCol: 2, isBooked: false },
      { seatId: 243, seatRow: 'A', seatCol: 3, isBooked: false },
      { seatId: 244, seatRow: 'A', seatCol: 4, isBooked: false },
      { seatId: 245, seatRow: 'B', seatCol: 1, isBooked: false },
      { seatId: 246, seatRow: 'B', seatCol: 2, isBooked: false },
      { seatId: 247, seatRow: 'B', seatCol: 3, isBooked: false },
      { seatId: 248, seatRow: 'B', seatCol: 4, isBooked: false },
      { seatId: 249, seatRow: 'C', seatCol: 1, isBooked: false },
      { seatId: 250, seatRow: 'C', seatCol: 2, isBooked: false },
      { seatId: 251, seatRow: 'C', seatCol: 3, isBooked: false },
      { seatId: 252, seatRow: 'C', seatCol: 4, isBooked: false },
    ],
  },
  {
    grade: 'S',
    price: 70000,
    remainingSeats: 12,
    seats: [
      { seatId: 121, seatRow: 'A', seatCol: 1, isBooked: false },
      { seatId: 122, seatRow: 'A', seatCol: 2, isBooked: false },
      { seatId: 123, seatRow: 'A', seatCol: 3, isBooked: false },
      { seatId: 124, seatRow: 'A', seatCol: 4, isBooked: false },
      { seatId: 125, seatRow: 'B', seatCol: 1, isBooked: false },
      { seatId: 126, seatRow: 'B', seatCol: 2, isBooked: false },
      { seatId: 127, seatRow: 'B', seatCol: 3, isBooked: false },
      { seatId: 128, seatRow: 'B', seatCol: 4, isBooked: false },
      { seatId: 129, seatRow: 'C', seatCol: 1, isBooked: false },
      { seatId: 130, seatRow: 'C', seatCol: 2, isBooked: false },
      { seatId: 131, seatRow: 'C', seatCol: 3, isBooked: false },
      { seatId: 132, seatRow: 'C', seatCol: 4, isBooked: false },
    ],
  },
  {
    grade: 'A',
    price: 50000,
    remainingSeats: 12,
    seats: [
      { seatId: 321, seatRow: 'A', seatCol: 1, isBooked: false },
      { seatId: 322, seatRow: 'A', seatCol: 2, isBooked: false },
      { seatId: 323, seatRow: 'A', seatCol: 3, isBooked: false },
      { seatId: 324, seatRow: 'A', seatCol: 4, isBooked: false },
      { seatId: 325, seatRow: 'B', seatCol: 1, isBooked: false },
      { seatId: 326, seatRow: 'B', seatCol: 2, isBooked: false },
      { seatId: 327, seatRow: 'B', seatCol: 3, isBooked: false },
      { seatId: 328, seatRow: 'B', seatCol: 4, isBooked: false },
      { seatId: 329, seatRow: 'C', seatCol: 1, isBooked: false },
      { seatId: 330, seatRow: 'C', seatCol: 2, isBooked: false },
      { seatId: 331, seatRow: 'C', seatCol: 3, isBooked: false },
      { seatId: 332, seatRow: 'C', seatCol: 4, isBooked: false },
    ],
  },
];
