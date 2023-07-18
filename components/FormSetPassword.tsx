"use client";

import React, { useRef, useState, useTransition } from "react";
import { setPassword } from "../app/actions/authActions";

export default function FormSetPassword({
  user,
  token,
}: {
  user: any;
  token: string;
}) {
  const formRef = useRef<any>(null);
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState("");
  const [isFormValidationError, setIsFormValidationError] = useState(false);

  async function handleSetPassword(formData: any) {
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    if (password !== confirmPassword) {
      setIsFormValidationError(true);
      return;
    } else {
      setIsFormValidationError(false);
    }
    startTransition(async () => {
      const user = await setPassword({
        token,
        password,
        confirmPassword,
      });
      if (user !== null) {
        setStatus("success");
      } else {
        setStatus("failed");
      }
      await formRef.current.reset();
    });
  }

  return (
    <div className="flex flex-col justify-center items-center gap-2 h-[80vh] max-w-md mx-auto">
      <div className="text-2xl font-bold self-start text-gray-600">
        Hello, {user.username}.
      </div>
      <form
        action={handleSetPassword}
        ref={formRef}
        className="flex flex-col justify-center gap-2 w-full"
      >
        <input
          type="password"
          name="password"
          placeholder="Password"
          minLength={9}
          required
          className="border-2 p-2"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Konfirmasi Password"
          minLength={9}
          required
          className="border-2 p-2"
        />
        <button
          type="submit"
          className="text-white font-medium bg-gray-500 p-3 hover:bg-gray-600"
        >
          {isPending ? "Loading..." : "Verifikasi"}
        </button>
        <div className="mt-2">
          {isFormValidationError ? (
            <span>
              Error: <br /> Konfirmasi password dan password tidak cocok.
            </span>
          ) : (
            ""
          )}
        </div>
      </form>
      <div>
        {status === "success"
          ? "Verifikasi Berhasil"
          : status === "failed"
          ? "Verifikasi Gagal"
          : ""}
      </div>
      <div>{status === "success" ? "Silahkan Masuk" : ""}</div>
    </div>
  );
}
