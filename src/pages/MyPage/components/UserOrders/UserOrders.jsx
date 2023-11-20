import React from 'react';
import DetailsInfo from '../../../../components/DetailsInfo/DetailsInfo';
import UserQr from '../UserQr/UserQr';
import './UserOrders.scss';

const UserOrders = ({
  date,
  time,
  locationName,
  image,
  title,
  qrcode_url,
  seatNames,
}) => {
  const USERDATA = [
    { id: 1, type: '관람일자', content: date },
    { id: 2, type: '관람시간', content: time },
    { id: 3, type: '위치', content: locationName },
    { id: 4, type: '좌석', content: seatNames.join(', ') },
  ];

  return (
    <div className="userOrders">
      <div className="imageArea">
        <img src={image} alt={title} className="ticketImage" />
      </div>
      <DetailsInfo detailsLabel={USERDATA} />
      <div className="qrArea">
        <UserQr seatName={seatNames} qrcode_url={qrcode_url} />
      </div>
    </div>
  );
};

export default UserOrders;
