import React from "react";

const ProfileForm = ({ formData, setFormData, submitHandler }) => {
  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="profile-form__input">
      <div>
        <label htmlFor="name">Name </label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={changeHandler}
        />
      </div>

      <div>
        <label htmlFor="lastName">LastName </label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          value={formData.lastName}
          onChange={changeHandler}
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={changeHandler}
        />
      </div>

      <button onClick={submitHandler}>Submit</button>
    </div>
  );
};

export default ProfileForm;
