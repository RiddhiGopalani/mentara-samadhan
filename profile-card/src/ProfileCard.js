import React from "react";
import "./ProfileCard.css"; 

function ProfileCard() {
  return (
    <div className="card">
      <img
        src="https://via.placeholder.com/150"
        alt="profile"
        className="profile-img"
      />
      <h2>Riddhi Gopalani</h2>
      <p>Beginner React Developer 🚀</p>
      <button>Connect</button>
    </div>
  );
}

export default ProfileCard;
