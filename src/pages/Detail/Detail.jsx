import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Button from '../../components/Button/Button';
import Datepicker from './components/Datepicker/Datepicker';
import Location from './components/Location/Location';
import Seat from './components/Seat/Seat';
import { GET_DETAIL_API, GET_ADVANCE_API } from '../../config';
import './Detail.scss';

const Detail = () => {
  const { detailId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [startDate, setStartDate] = useState(new Date());
  const [itemInfo, setItemInfo] = useState({});
  const [actorInfo, setActorInfo] = useState([]);
  const [date, setDate] = useState([{}]);
  const [isAdvanceClicked, setIsAdvanceClicked] = useState(false);
  const [isTimeClicked, setIsTimeClicked] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [timeOnChange, setTimeOnChange] = useState({});

  const year = startDate.getFullYear();
  const month = startDate.getMonth() + 1;
  const day =
    startDate.getDate() > 10 ? startDate.getDate() : `0${startDate.getDate()}`;
  const selectDate = `${year}-${month}-${day}`;

  useEffect(() => {
    axios
      .get(`${GET_DETAIL_API}/${detailId}`, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      })
      .then(res => {
        setItemInfo(res.data.data.itemInfo[0]);
        setActorInfo(res.data.data.actorsInfoByitemId);
        setDate(res.data.data.calenderTime);
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
    lat,
    lng,
  } = itemInfo;

  const advanceClick = () => {
    if (token && startDate && timeOnChange.id) {
      setIsAdvanceClicked(true);
    } else if (token) {
      return alert('로그인을 해주세요.');
    } else if (startDate) {
      return alert('날짜를 선택해주세요.');
    } else return alert('시간을 선택해주세요.');
  };

  const payClick = () => {
    axios
      .post(
        `${GET_ADVANCE_API}/${detailId}`,
        {
          itemOptionsId: timeOnChange.id,
          seatIds: checkedItems.map(item => {
            return item.id;
          }),
          price: itemInfo.price,
        },
        {
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
        },
      )
      .then(res => {
        if (res.data.message === 'success') {
          navigate('/payment');
        }
      });
  };

  return (
    <div className="detail">
      <div className="detailArea">
        <div className="titleArea">
          <h2 className="title">{title}</h2>
          <div className="titleInfo">
            <span className="date">
              {date[0].eventDate} ~ {date[date.length - 1].eventDate}
            </span>
            <button type="button" className="locationName">
              {locationName}
            </button>
          </div>
        </div>
        <div className="infoArea">
          <div className="infoImg">
            <img src={image} alt={title} />
          </div>
          <div className="infoGroup">
            <div className="listArea">
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
                                onChange={() => setTimeOnChange(dateTime)}
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
                <Button onClick={advanceClick}>예매하기</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isAdvanceClicked && (
        <div className="seatsArea">
          <div className="seatsGroup">
            <h3 className="seatTitle">좌석 선택</h3>
            <Seat
              itemInfo={itemInfo}
              setCheckedItems={setCheckedItems}
              checkedItems={checkedItems}
            />
          </div>
          <Button width="230px" onClick={payClick}>
            결제하기
          </Button>
        </div>
      )}
      <div className="productArea">
        <Location lat={lat} lng={lng} />
      </div>
    </div>
  );
};

export default Detail;
