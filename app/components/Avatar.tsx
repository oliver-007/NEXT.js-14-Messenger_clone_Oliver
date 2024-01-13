"use client";
import { User } from "@prisma/client";
import Image from "next/image";
import React from "react";
import placeholder from "@/public/images/placeholder.png";
import useActiveList from "../hooks/useActiveList";

interface AvatarProps {
  user: User;
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {
  const { members } = useActiveList();
  // for checking existance, indexOf() is more preferable than find()
  const isActive = members.indexOf(user?.email!) !== -1;

  return (
    <div className="relative">
      <div
        className="
        relative 
        inline-block 
        rounded-full 
        overflow-hidden
        h-9 
        w-9 
        md:h-11 
        md:w-11
      "
      >
        <Image fill src={user?.image || placeholder} alt="Avatar" />
      </div>
      {isActive ? (
        <span
          className="
            absolute 
            block 
            rounded-full 
            bg-green-500 
            ring-2 
            ring-white 
            top-0 
            right-0
            h-2 
            w-2 
            md:h-3 
            md:w-3
          "
        />
      ) : null}
    </div>
  );
};

export default Avatar;
