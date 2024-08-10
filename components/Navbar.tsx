"use client";
import Link from "next/link";
import React, { useState } from "react";

function Navbar() {
  const [isActive, setActive] = useState(1);
  const navItems = [
    {
      id: 1,
      label: "Hide message",
      link: "/",
    },
    {
      id: 2,
      label: "Hide image",
      link: "/encrypt-image",
    },
    {
      id: 3,
      label: "Emoji",
      link: "/encrypt-emoji",
    },
  ];

  return (
    <div className="sticky top-0 shadow-md flex justify-between px-[300px] py-4 bg-white z-50">
      <p className="text-xl text-coral-red font-semibold">Steganography</p>
      <div className="flex gap-5">
        {navItems.map((item, index) => (
          <Link
            href={item.link}
            onClick={() => setActive(item.id)}
            className={`cursor-pointer hover:text-coral-red ${
              isActive === item.id ? "text-coral-red " : ""
            }`}
            key={index}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Navbar;
