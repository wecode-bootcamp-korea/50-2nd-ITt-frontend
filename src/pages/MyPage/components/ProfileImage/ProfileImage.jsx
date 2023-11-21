import React from 'react';
import './ProfileImage.scss';

const ProfileImage = ({ src, alt }) => {
  return (
    <div className="profileImage">
      {src ? (
        <img src={src} alt={alt} className="userImage" />
      ) : (
        <div className="basicImage" />
      )}
    </div>
  );
};

export default ProfileImage;
