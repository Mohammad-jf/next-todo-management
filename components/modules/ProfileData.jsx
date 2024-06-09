import React from "react";

const ProfileData = ({ user }) => {
  return (
    <div className="profile-data">
      <div>
        <span>name: </span>
        <p>{user.name}</p>
      </div>
      <div>
        <span>LastName: </span>
        <p>{user.lastName}</p>
      </div>
      <div>
        <span>email: </span>
        <p>{user.email}</p>
      </div>
    </div>
  );
};

export default ProfileData;
