import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="w-full min-h-[100vh] bg-black pt-6 md:pt-20 flex gap-8 flex-col justify-center items-center">
        <p className="text-6xl text-amber-500 font-bold">Profile</p>
      <div className="container flex flex-col gap-10 w-[50%] py-20 items-center rounded-3xl justify-center bg-stone-900">
        <div className="name flex gap-10 items-center">
          <p className="text-amber-500 text-2xl">Name:</p>
          <p className="text-white text-5xl">{user.user.fullName}</p>
        </div>
        <div className="name flex gap-10 items-center">
          <p className="text-amber-500 text-2xl">Username:</p>
          <p className="text-white text-5xl">{user.user.username}</p>
        </div>
        <div className="name flex gap-10 items-center">
          <p className="text-amber-500 text-2xl">Email:</p>
          <p className="text-white text-5xl">{user.user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
