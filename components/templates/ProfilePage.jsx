import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import ProfileForm from "../modules/ProfileForm";
import ProfileData from "../modules/ProfileData";

const ProfilePage = () => {
  const router = useRouter();
  const { status } = useSession();

  // states
  const [userData, setUserData] = useState({});
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    password: "",
  });

  //get user Data
  const getUser = async () => {
    const res = await fetch("/api/profile");
    const data = await res.json();
    if (
      data.status === "success" &&
      data.data.name &&
      data.data.lastName &&
      data.data.email
    ) {
      setUserData({ ...data.data });
    }
  };

  useEffect(() => {
    if (status !== "authenticated") {
      router.push("/signin");
    }
    getUser();
  }, [status]);

  // submit form data
  const submitHandler = async () => {
    const res = await fetch("/api/profile", {
      method: "POST",
      body: JSON.stringify({ ...formData }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (data.status === "success") {
      setFormData({
        name: "",
        lastName: "",
        password: "",
      });
      getUser();
      setEditing(false);
    }
  };

  // update form data for edit
  const editHandler = (isValid) => {
    if (isValid) {
      setFormData({
        name: userData.name,
        lastName: userData.lastName,
        password: "",
      });
    } else {
      setFormData({
        name: "",
        lastName: "",
        password: "",
      });
    }
  };

  return (
    <div className="profile-form">
      <h2>
        <CgProfile />
        Profile
      </h2>

      {userData.name ? (
        <>
          <ProfileData user={userData} />
          {editing && (
            <ProfileForm
              formData={formData}
              setFormData={setFormData}
              submitHandler={submitHandler}
            />
          )}
          {editing ? (
            <button
              style={{ marginTop: "10px" }}
              onClick={() => (setEditing(false), editHandler(false))}
            >
              Cancel
            </button>
          ) : (
            <button
              style={{ marginTop: "10px" }}
              onClick={() => (setEditing(true), editHandler(true))}
            >
              Edit
            </button>
          )}
        </>
      ) : (
        <ProfileForm
          formData={formData}
          setFormData={setFormData}
          submitHandler={submitHandler}
        />
      )}
    </div>
  );
};

export default ProfilePage;
