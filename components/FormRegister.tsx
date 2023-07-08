"use client";

import React, { useRef, useState, useTransition } from "react";
import register from "../app/actions/authActions";

export default function FormRegister() {
  const formRef = useRef<any>(null);
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState("");

  async function handleRegister(formData: any) {
    const email = formData.get("email");
    const username = formData.get("username");
    const password = formData.get("password");
    startTransition(async () => {
      const user = await register({
        email,
        username,
        password,
      });
      if (user?.id) {
        setStatus("success");
      } else {
        setStatus("failed");
      }
      await formRef.current.reset();
    });
  }

  return (
    <div className="flex flex-col justify-center items-center gap-2 h-[90vh] max-w-md mx-auto">
      <div className="text-2xl font-bold self-start text-gray-600">
        Register
      </div>
      <form
        action={handleRegister}
        ref={formRef}
        className="flex flex-col justify-center gap-2 w-full"
      >
        <input
          type="text"
          name="email"
          placeholder="Email"
          required
          className="border-2 p-2"
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          required
          className="border-2 p-2"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="border-2 p-2"
        />
        <button
          type="submit"
          className="text-white bg-slate-400 p-3 hover:bg-slate-500"
        >
          {isPending ? "Loading..." : "Daftar"}
        </button>
      </form>
      <div>
        {status === "success"
          ? "Successful Registration"
          : status === "failed"
          ? "Registration Failed"
          : ""}
      </div>
    </div>
  );
}
