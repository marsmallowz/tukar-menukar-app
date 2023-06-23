"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

interface InitialStateProps {
  username: string;
  email: string;
  password: string;
}

const initialState: InitialStateProps = {
  username: "",
  email: "",
  password: "",
};

export default function FormRegister() {
  const router = useRouter();
  const [state, setState] = useState(initialState);
  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    // axios
    //   .post("/api/register", state)
    //   .then(() => {
    //     router.refresh();
    //   })
    //   .then(() => {
    //     setTimeout(() => {
    //       router.push("/login");
    //     }, 2500);
    //   })
    //   .catch((err: any) => {})
    //   .finally(() => {});

    // axios
    //   .patch("/api/skills", state)
    //   .then(() => {
    //     router.refresh();
    //   })
    //   .catch((err: any) => {
    //     console.log(err);
    //   })
    //   .finally(() => {});

    // axios
    //   .post("/api/offerskills", state)
    //   .then(() => {
    //     router.refresh();
    //   })
    //   .catch((err: any) => {
    //     console.log(err);
    //   })
    //   .finally(() => {});

    axios
      .get("/api/offerskills")
      .then(() => {
        router.refresh();
      })
      .catch((err: any) => {
        console.log(err);
      })
      .finally(() => {});
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
        type="text"
        name="username"
        placeholder="Username"
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
        className="text-white bg-slate-400 p-3 hover:bg-slate-500"
      >
        Daftar
      </button>
    </form>
  );
}
