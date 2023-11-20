import React from 'react';
import { POST_CANCEL_API } from '../../../../config';
import axios from 'axios';
import DetailsInfo from '../../../../components/DetailsInfo/DetailsInfo';
import UserQr from '../UserQr/UserQr';
import Button from '../../../../components/Button/Button';
import './UserOrders.scss';

const UserOrders = ({
  date,
  timeData,
  locationName,
  image,
  title,
  qrcode_url,
  seatNames,
  amount,
  reservationId,
}) => {
  const seatData = seatNames ? seatNames.join(', ') : '';
  const totalAmount = amount * seatNames.length;
  const USERDATA = [
    { id: 1, type: '관람일자', content: date },
    { id: 2, type: '관람시간', content: timeData },
    { id: 3, type: '위치', content: locationName },
    { id: 4, type: '좌석', content: seatData },
    {
      id: 5,
      type: '가격',
      content: `${Number(totalAmount).toLocaleString()}원`,
    },
  ];

  // 결제취소 api
  const handleCancelOrder = () => {
    const body = { reservationIds: reservationId };

    if (window.confirm('예매 취소하시겠습니까?')) {
      axios
        .post(POST_CANCEL_API, body)
        .then(res => {
          if (res.data.message === 'cancel_success') {
            alert('결제취소완료');
          } else {
            alert('결제취소실패');
          }
        })
        .catch(error => console.error(error));
    }
  };

  return (
    <div className="userOrders">
      <div className="infoArea">
        <div className="imageArea">
          <img src={image} alt={title} className="ticketImage" />
        </div>
        <DetailsInfo detailsLabel={USERDATA} />
        <div className="qrArea">
          <UserQr seatName={seatNames} qrcode_url={qrcode_url} />
        </div>
      </div>
      <div className="cancelBtn">
        <Button onClick={handleCancelOrder}>결제취소</Button>
      </div>
    </div>
  );
};

export default UserOrders;
