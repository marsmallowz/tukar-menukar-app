"use client";

import React, { useRef, useTransition } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function FormLogin() {
  const formRef = useRef<any>(null);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  async function handleLogin(formData: any) {
    const email = formData.get("email");
    const password = formData.get("password");
    startTransition(async () => {
      signIn("credentials", {
        email,
        password,
        redirect: false,
      }).then((callback) => {
        if (callback?.ok) {
          router.refresh();
        }
        if (callback?.error) {
          throw new Error("Wrong Credentials");
        }
      });
      await formRef.current.reset();
      router.push("/");
    });
  }

  return (
    <div className="flex flex-col justify-center items-center gap-2 h-[60vh] max-w-md mx-auto">
      <div className="text-2xl font-bold self-start text-gray-600">
        Silahkan Masuk
      </div>
      <form
        action={handleLogin}
        ref={formRef}
        className="flex flex-col justify-center gap-2 w-full"
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
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
          className="text-white font-medium bg-gray-500 p-3 hover:bg-slate-600"
        >
          {isPending ? "Loading..." : "Masuk"}
        </button>
      </form>
    </div>
  );
}
