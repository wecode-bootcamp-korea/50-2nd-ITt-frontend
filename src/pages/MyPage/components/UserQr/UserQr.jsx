import React from 'react';
import './UserQr.scss';

const UserQR = ({ seatClass, seatNumber }) => {
  return (
    <div className="userQr">
      <p className="userTitle">QR 코드</p>
      <img
        src="https://cdn.pixabay.com/photo/2015/03/21/09/34/qr-683354_1280.png"
        alt="orderQrCode"
        className="qrImage"
      />
      <span>
        {seatClass} {seatNumber}번
      </span>
    </div>
  );
};

export default UserQR;
