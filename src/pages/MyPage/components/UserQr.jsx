import React from 'react';
import './UserQr.scss';

const UserQR = () => {
  return (
    <div className="userQr">
      <p className="userTitle">QR 코드</p>
      <img
        src="https://cdn.pixabay.com/photo/2015/03/21/09/34/qr-683354_1280.png"
        alt="orderQrCode"
        className="qrImage"
      />
      <span>좌석 : R석 35번</span>
    </div>
  );
};

export default UserQR;
