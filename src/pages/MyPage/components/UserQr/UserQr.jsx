import React from 'react';
import './UserQr.scss';

const UserQR = ({ qrcode_url }) => {
  return (
    <div className="userQr">
      <p className="userTitle">QR 코드</p>
      <img src={qrcode_url} alt="orderQrCode" className="qrImage" />
    </div>
  );
};

export default UserQR;
