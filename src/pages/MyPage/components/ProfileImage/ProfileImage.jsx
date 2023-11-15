import React from 'react';
import './ProfileImage.scss';

const ProfileImage = ({ src, alt }) => {
  return (
    <div className="profileImage">
      <img src={src} alt={alt} className="userImage" />
    </div>
  );
};

export default ProfileImage;
