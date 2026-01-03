"use client";
import React from "react";
import Image from "next/image";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

function Header() {
  const { user } = useUser();
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex gap-2 items-center">
        <Image src={"/logo.png"} alt="logo" width={50} height={50} />
        <h2 className="text-xl font-semibold">Tangent</h2>
      </div>

      <ul style={{ width: "fit-content", display: "flex", gap: "1.25rem" }}>
        <li style={{ cursor: "pointer" }}>Home</li>
        <li style={{ cursor: "pointer" }}>Pricing</li>
      </ul>

      {!user ? 
      <SignInButton mode="modal">
        <Button>Get started</Button>
      </SignInButton> : <UserButton />}
    </div>
  );
}

export default Header;
