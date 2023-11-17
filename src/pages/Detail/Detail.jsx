import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Datepicker from './components/Datepicker/Datepicker';
import Button from '../../components/Button/Button';
import Seat from './components/Seat/Seat';
import { GET_DETAIL_API, GET_SEAT_API } from '../../config';
import './Detail.scss';

const Detail = () => {
  const { detailId } = useParams();

  const [startDate, setStartDate] = useState(new Date());
  const [itemInfo, setItemInfo] = useState([]);
  const [actorInfo, setActorInfo] = useState([]);
  const [date, setDate] = useState([{}]);
  const [isAdvanceClicked, setIsAdvanceClicked] = useState(false);
  const [isTimeClicked, setIsTimeClicked] = useState(false);

  const year = startDate.getFullYear();
  const month = startDate.getMonth() + 1;
  const day =
    startDate.getDate() > 10 ? startDate.getDate() : `0${startDate.getDate()}`;
  const selectDate = `${year}-${month}-${day}`;

  useEffect(() => {
    fetch(`${GET_DETAIL_API}/${detailId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
      .then(res => res.json())
      .then(data => {
        setItemInfo(data.data.itemInfo[0]);
        setActorInfo(data.data.actorsInfoByitemId);
        setDate(data.data.calenderTime);
      });
  }, [detailId]);

  const {
    title,
    image,
    itemNotice,
    locationName,
    price,
    runningTime,
    viewerAge,
  } = itemInfo;

  // const test = () => {
  //   axios
  //     .post(
  //       GET_SEAT_API,
  //       {
  //         locationId: detail.location_id,
  //       },
  //       {
  //         headers: {
  //           'Content-Type': 'application/json;charset=utf-8',
  //         },
  //       },
  //     )
  //     .then(res => {
  //       setSeat(res.data.data.seatInfo);
  //     });
  // };

  return (
    <div className="detail">
      <div className="detailArea">
        <div className="titleArea">
          <h2 className="title">{title}</h2>
          <div className="titleInfo">
            <span className="date">
              {date[0].eventDate} ~ {date[date.length - 1].eventDate}
            </span>
            <button type="button" className="location">
              {locationName}
            </button>
          </div>
        </div>
        <div className="infoArea">
          <div className="infoImg">
            <img src={image} alt={title} />
          </div>
          <div className="infoGroup">
            <dl className="infoList">
              <dt>등급</dt>
              <dd>{viewerAge}</dd>
            </dl>
            <dl className="infoList">
              <dt>관람시간</dt>
              <dd>{runningTime}분</dd>
            </dl>
            <dl className="infoList">
              <dt>출연</dt>
              {actorInfo.map((actor, i) => (
                <dd key={i}>{actor.name}</dd>
              ))}
            </dl>
            <dl className="infoList">
              <dt>가격</dt>
              <dd>
                <span>{price}</span>원
              </dd>
            </dl>
            <dl className="infoList block">
              <dt>공연시간 안내</dt>
              <dd>{itemNotice}</dd>
            </dl>
          </div>
        </div>
      </div>
      <div className="reserveArea">
        <div className="dateArea">
          <h3 className="dateTitle">날짜/시간 선택</h3>
          <div className="dateGroup">
            <Datepicker
              startDate={startDate}
              setStartDate={setStartDate}
              minDate={date[0].eventDate}
              maxDate={date[date.length - 1].eventDate}
              onChange={() => setIsTimeClicked(true)}
            />
            <div className="timePicker">
              <span className="timeTitle">시간</span>
              <div className="titleList">
                {isTimeClicked &&
                  date
                    .filter(el => el.eventDate === selectDate)
                    .map(dateTime => (
                      <div className="formInput" key={dateTime.id}>
                        <input
                          type="radio"
                          id={`timePicker${dateTime.id}`}
                          className="formRadio"
                          name="timePicker"
                        />
                        <label
                          htmlFor={`timePicker${dateTime.id}`}
                          className="formLabel"
                        >
                          {dateTime.eventTime}
                        </label>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>
        <div className="btnArea">
          <Button width="230px" onClick={() => setIsAdvanceClicked(true)}>
            예매하기
          </Button>
        </div>
      </div>
      {isAdvanceClicked && (
        <div className="seatsArea">
          <Seat />
        </div>
      )}
    </div>
  );
};

export default Detail;

export const TIMEDATA = [
  { id: 1, time: '14:00' },
  { id: 2, time: '16:00' },
  { id: 3, time: '18:00' },
  { id: 4, time: '20:00' },
  { id: 5, time: '22:00' },
];
