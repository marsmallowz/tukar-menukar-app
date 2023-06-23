"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

interface InitialStateProps {
  email: string;
  password: string;
}

const initialState: InitialStateProps = {
  email: "",
  password: "",
};

export default function FormLogin() {
  const router = useRouter();
  const [state, setState] = useState(initialState);
  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    signIn("credentials", {
      ...state,
      redirect: false,
    }).then((callback) => {
      if (callback?.ok) {
        router.refresh();
      }
      if (callback?.error) {
        throw new Error("Wrong Credentials");
      }
    });
    router.push("/");
  };
  function handleChange(event: any) {
    setState({ ...state, [event.target.name]: event.target.value });
  }
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2"
    >
      <input
        type="text"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        className="border-2 p-2"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        className="border-2 p-2"
      />
      <button
        type="submit"
        className="text-white bg-slate-400 p-3 hover:bg-slate-500 "
      >
        Masuk
      </button>
    </form>
  );
}
