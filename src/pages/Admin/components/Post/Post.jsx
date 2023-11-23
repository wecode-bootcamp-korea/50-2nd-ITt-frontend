import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../../../components/Button/Button';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import axios from 'axios';
import {
  GET_ADMIN_SELECTITEMLIST_API,
  GET_ADMIN_INSERTITENLIST_API,
  GET_ADMIN_UPDATITEMLIST_API,
  GET_ADMIN_SELECTCATEGORYLIST_API,
} from '../../../../config';
import 'react-datepicker/dist/react-datepicker.css';
import './Post.scss';

const Post = () => {
  const adminToken = localStorage.getItem('adminToken');
  const navigate = useNavigate();
  const [selectedDates, setSelectedDates] = useState({
    startDate: new Date(),
    endDate: null,
  });
  const { startDate, endDate } = selectedDates;
  const onChange = dates => {
    const [start, end] = dates;
    setSelectedDates({
      startDate: start || new Date(),
      endDate: end || null,
    });
  };
  const { itemId } = useParams();
  const [update, setUpdate] = useState({});
  const [updateData, setUpdateData] = useState({
    title: '',
    image: '',
    runningTime: Number,
    viewerAge: '',
    price: Number,
    itemNotice: '',
    categoryName: '',
    locationName: '',
    actorName: '',
    eventDate: '',
    eventTime: '',
  });
  const [files, setFiles] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState([]);
  const [location, setLocation] = useState([]);
  const [actor, setActor] = useState([]);
  const [date, setDate] = useState([{}]);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [hour, setHour] = useState('1');
  const [minute, setMinute] = useState('00');

  useEffect(() => {
    if (itemId) {
      axios
        .get(`${GET_ADMIN_SELECTITEMLIST_API}/${itemId}`, {
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: adminToken,
          },
        })
        .then(res => {
          setUpdate(res.data.data);
          setUpdateData(res.data.data.itemInfo[0]);
          setCategory(res.data.data.categoryInfo);
          setLocation(res.data.data.locationInfo);
          setActor(res.data.data.actorInfo);
          setDate(res.data.data.itemOption);
        });
    } else {
      axios
        .get(`${GET_ADMIN_SELECTCATEGORYLIST_API}`, {
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: adminToken,
          },
        })
        .then(res => {
          setCategory(res.data.data.categoryInfo);
          setLocation(res.data.data.locationInfo);
        });
    }
  }, [itemId]);

  const updateObject = Object.keys(update).length > 0;
  if (updateObject.length) setUpdateData(update.itemInfo[0]);

  const handleFileUpload = e => {
    e.preventDefault();

    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = data => {
      const imageUrlFromFile = data.target.result;
      setImageUrl(imageUrlFromFile);
      setFiles(file);
    };
  };

  const actorAddClick = () => {
    const updatedActorList = [...actor, { actorName: updateData.actorName }];
    setActor(updatedActorList);
    setUpdateData({ ...updateData, actorName: '' });
  };

  const eventTimes = date.map(option => option.eventTime);
  const flattenedEventTimes = eventTimes.flat();
  const uniqueEventTimes = [...new Set(flattenedEventTimes)];

  const handleTimeClick = () => {
    const timeToAdd = `${hour}:${minute}`;

    const updatedTimes = [...selectedTimes, timeToAdd];
    setSelectedTimes(updatedTimes);

    setHour('1');
    setMinute('00');
  };

  const handlePostClick = () => {
    const dateArray = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dateArray.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    const formData = new FormData();
    formData.append('title', updateData.title);
    formData.append('itemImage', files || updateData.image);
    formData.append('runningTime', updateData.runningTime);
    formData.append('viewerAge', updateData.viewerAge);
    formData.append('price', updateData.price);
    formData.append('itemNotice', updateData.itemNotice);
    formData.append('categoryName', updateData.categoryName);
    formData.append('locationName', updateData.locationName);
    actor.forEach(actorItem => {
      formData.append('actorName[]', actorItem.actorName);
    });
    if (itemId) {
      formData.append('itemId', itemId);
    } else {
      dateArray.forEach(date => {
        formData.append('eventDate[]', date.toISOString().split('T')[0]);
      });
      selectedTimes.forEach(time => {
        formData.append('eventTime[]', time);
      });
    }

    if (itemId) {
      axios
        .put(`${GET_ADMIN_UPDATITEMLIST_API}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: adminToken,
          },
        })
        .then(() => {
          navigate('/admin');
        });
    } else {
      axios
        .post(`${GET_ADMIN_INSERTITENLIST_API}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: adminToken,
          },
        })
        .then(() => {
          navigate('/admin');
        });
    }
  };

  const handleCloseClick = () => {
    navigate(`/admin`);
  };

  return (
    <div className="post">
      <h3 className="postTitle">이벤트 등록</h3>
      <div className="postArea">
        <form className="formArea">
          <div className="formInput">
            <label htmlFor="formTitle" className="formLabel">
              공연제목
            </label>
            <input
              type="text"
              id="formTitle"
              className="formControl"
              value={updateData.title}
              onChange={event =>
                setUpdateData({ ...updateData, title: event.target.value })
              }
            />
          </div>
          <div className="formInput">
            <label htmlFor="formImg" className="formLabel">
              이미지 업로드
            </label>
            <input
              type="file"
              id="formImg"
              accept="image/*"
              className="formControl img"
              onChange={handleFileUpload}
            />
            <img src={imageUrl || updateData.image} alt={updateData.title} />
          </div>
          <div className="formInput">
            <label htmlFor="formTime" className="formLabel">
              상영시간
            </label>
            <input
              type="text"
              id="formTime"
              className="formControl"
              value={updateData.runningTime}
              onChange={event =>
                setUpdateData({
                  ...updateData,
                  runningTime: event.target.value,
                })
              }
            />
          </div>
          <div className="formInput">
            <label htmlFor="formAge" className="formLabel">
              등급안내
            </label>
            <input
              type="text"
              id="formAge"
              className="formControl"
              value={updateData.viewerAge}
              onChange={event =>
                setUpdateData({ ...updateData, viewerAge: event.target.value })
              }
            />
          </div>
          <div className="formInput">
            <label htmlFor="formPrice" className="formLabel">
              가격
            </label>
            <input
              type="text"
              id="formPrice"
              className="formControl"
              value={updateData.price}
              onChange={event =>
                setUpdateData({ ...updateData, price: event.target.value })
              }
            />
          </div>
          <div className="formInput">
            <label htmlFor="formDate" className="formLabel">
              공연시간 안내
            </label>
            <input
              type="text"
              id="formDate"
              className="formControl"
              value={updateData.itemNotice}
              onChange={event =>
                setUpdateData({ ...updateData, itemNotice: event.target.value })
              }
            />
          </div>
          <div className="formInput">
            <label htmlFor="formCategory" className="formLabel">
              카테고리
            </label>
            <select
              name="category"
              id="formCategory"
              className="formControl"
              value={updateData.categoryName}
              onChange={event =>
                setUpdateData({
                  ...updateData,
                  categoryName: event.target.value,
                })
              }
            >
              {category.map(category => (
                <option key={category.categoryId}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>
          <div className="formInput">
            <label htmlFor="formLocation" className="formLabel">
              장소
            </label>
            <select
              name="category"
              id="formLocation"
              className="formControl"
              value={updateData.locationName}
              onChange={event =>
                setUpdateData({
                  ...updateData,
                  locationName: event.target.value,
                })
              }
            >
              {location.map(location => (
                <option key={location.locationId}>
                  {location.locationName}
                </option>
              ))}
            </select>
          </div>
          <div className="formInput actor">
            <div className="formInput">
              <label htmlFor="formActor" className="formLabel">
                출연진
              </label>
              <input
                type="text"
                id="formActor"
                className="formControl"
                value={updateData.actorName}
                onChange={event =>
                  setUpdateData({
                    ...updateData,
                    actorName: event.target.value,
                  })
                }
              />
            </div>
            <div className="actorInfo">
              <Button width="120px" height="40px" onClick={actorAddClick}>
                출연진 추가
              </Button>
              <div className="actorText">
                출연진 :
                {actor.map((actor, index) => (
                  <span key={index}>{actor.actorName} </span>
                ))}
              </div>
            </div>
          </div>
          <div className="formInput date">
            <div className="formInput">
              <label htmlFor="formDatePicker" className="formLabel">
                날짜
              </label>
              <DatePicker
                selected={startDate}
                startDate={startDate}
                endDate={endDate}
                onChange={onChange}
                dateFormat="yyyy년 MM월 dd일"
                locale={ko}
                inline
                selectsRange
              />
            </div>
            <span className="dateText">
              현재 지정 날짜 : {date[0].eventDate} ~{' '}
              {date[date.length - 1].eventDate}
            </span>
          </div>
          <div className="formInput time">
            <div className="formInput">
              <label htmlFor="formTime" className="formLabel">
                시간 선택
              </label>
              <div className="timeArea">
                <select
                  name="time"
                  id="formTime"
                  className="formControl"
                  value={hour}
                  onChange={event => setHour(event.target.value)}
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                  <option>11</option>
                  <option>12</option>
                  <option>13</option>
                  <option>14</option>
                  <option>15</option>
                  <option>16</option>
                  <option>17</option>
                  <option>18</option>
                  <option>19</option>
                  <option>20</option>
                  <option>21</option>
                  <option>22</option>
                  <option>23</option>
                  <option>24</option>
                </select>
                <select
                  name="time"
                  id="formTime"
                  className="formControl"
                  value={minute}
                  onChange={event => setMinute(event.target.value)}
                >
                  <option>00</option>
                  <option>10</option>
                  <option>20</option>
                  <option>30</option>
                  <option>40</option>
                  <option>50</option>
                </select>
              </div>
            </div>
            <div className="timeInfo">
              <Button width="100px" height="40px" onClick={handleTimeClick}>
                시간 추가
              </Button>
              <span className="timeText">
                현재 선택 시간 :{uniqueEventTimes.join(', ')}
              </span>
              <span className="timeText">
                선택 시간 : {selectedTimes.join(', ')}
              </span>
            </div>
          </div>
        </form>
        <div className="btnArea">
          <Button width="100px" onClick={() => handlePostClick(itemId)}>
            확인
          </Button>
          <Button outline width="100px" onClick={handleCloseClick}>
            취소
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Post;
