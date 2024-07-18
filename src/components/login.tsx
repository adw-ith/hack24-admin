"use client";

import { useState, useEffect } from "react";
import React from "react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { signedIn, setSignedIn } = useAuth();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");
    const user = process.env.NEXT_PUBLIC_USERNAME;
    const pass = process.env.NEXT_PUBLIC_PASSWORD;

    if (storedUsername === user && storedPassword === pass) {
      setSignedIn(true);
    }
  }, [setSignedIn]);

  const FormSubmit = (e: any) => {
    e.preventDefault();
    const user = process.env.NEXT_PUBLIC_USERNAME;
    const pass = process.env.NEXT_PUBLIC_PASSWORD;

    if (username === user && password === pass) {
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      setSignedIn(true);
    } else {
      alert("invalid login credentials");
    }
  };

  return (
    <div className="flex place-content-center place-items-center h-svh w-dvw">
      <div className="bg-gray-800 p-8 rounded min-w-[360px] w-1/3">
        <div className="text-2xl text-white">login</div>
        <form onSubmit={FormSubmit} className="">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="username"
            className="outline-none w-full mt-4 p-2 py-4 bg-transparent hover:bg-slate-900 text-white rounded-md duration-300 border-b-2 hover:border-white"
            type="text"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="password"
            className="outline-none w-full mt-4 p-2 py-4 bg-transparent hover:bg-slate-900 text-white rounded-md duration-300 border-b-2 hover:border-white"
            type="password"
          />
          <button className="mt-8 bg-slate-700 hover:bg-slate-900 text-slate-100 p-2 px-3 rounded-md">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
