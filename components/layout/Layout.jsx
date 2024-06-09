import Link from "next/link";
import React, { useEffect } from "react";
import { VscListSelection } from "react-icons/vsc";
import { BiMessageSquareAdd } from "react-icons/bi";
import { RxDashboard } from "react-icons/rx";
import { signOut, useSession } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";
import { SignOut } from "next-auth/react";

const Layout = ({ children }) => {
  const { status } = useSession();

  const logOutHandler = async () => {
    await signOut();
  };

  return (
    <div className="container">
      <header>
        <p>Next Todo App</p>
        {status === "authenticated" ? (
          <button onClick={logOutHandler}>
            LogOut <FiLogOut />
          </button>
        ) : null}
      </header>

      <div className="container--main">
        <aside>
          <p>Wellcome 👋</p>
          <ul>
            <li>
              <VscListSelection />
              <Link href="/">Todo</Link>
            </li>
            <li>
              <BiMessageSquareAdd />
              <Link href="/add-todo">Add Todo</Link>
            </li>
            <li>
              <RxDashboard />
              <Link href="/profile">Profile</Link>
            </li>
          </ul>
        </aside>

        <section>{children}</section>
      </div>
    </div>
  );
};

export default Layout;
