import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import ProfileForm from "../modules/ProfileForm";
import ProfileData from "../modules/ProfileData";

const ProfilePage = () => {
  const { data, status } = useSession();
  const [userData, setUserData] = useState({});
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    password: "",
  });

  useEffect(() => {
    if (status === "Unauthenticated") {
      router.push("/signin");
    }
  }, [status]);

  const getUser = async () => {
    const res = await fetch("/api/profile");
    const data = await res.json();
    if (data.status === "success") {
      setUserData({ ...data.data });
    }
  };

  useEffect(() => {
    getUser();
  }, []);

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
    }
  };

  return (
    <div className="profile-form">
      <h2>
        <CgProfile />
        Profile
      </h2>

      {userData ? (
        <ProfileData user={userData} />
      ) : (
        <ProfileForm
          formData={formData}
          setFormData={setFormData}
          email={data?.user?.email}
          submitHandler={submitHandler}
        />
      )}
    </div>
  );
};

export default ProfilePage;
