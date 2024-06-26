import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const SignInPage = () => {
  const { status } = useSession();
  const router = useRouter();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [status]);

  const changeHandler = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const signInHandler = async () => {
    const res = await signIn("credentials", { ...userData, redirect: false });
    console.log(res);
    setUserData({
      email: "",
      password: "",
    });
    if (!res.error) {
      router.replace("/");
    }
  };

  return (
    <div className="signin-form">
      <h3>SignIn Form</h3>

      <input
        type="text"
        name="email"
        placeholder="Email"
        value={userData.email}
        onChange={changeHandler}
      />
      <input
        type="password"
        name="password"
        placeholder="password"
        value={userData.password}
        onChange={changeHandler}
      />

      <button onClick={signInHandler}>Sign In</button>
      <p style={{ marginTop: "10px" }}>
        Dont Have an Account? <Link href="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default SignInPage;
