import React from 'react';
import './ProfileImage.scss';

const ProfileImage = ({ src, name }) => {
  return (
    <div className="profileImage">
      {src ? (
        <img src={src} alt={name} className="userImage" />
      ) : (
        <div className="basicImage" />
      )}
    </div>
  );
};

export default ProfileImage;
