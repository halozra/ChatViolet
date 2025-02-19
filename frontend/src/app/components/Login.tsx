"use client";

import axios from "axios";
import React, { useState } from "react";

interface LoginProps {
  setIsLogin: (value: boolean) => void;
}

export default function Login({ setIsLogin }: LoginProps) {
  interface Credentials {
    username: string;
    password: string;
  }

  const [formData, setFormData] = useState<Credentials>({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const respon = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );
      const token = respon.data.token;
      localStorage.setItem("token", token);
      alert("Login successful!");
      console.log("token:", token);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        alert(error.response.data.message);
      } else {
        alert("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="bg-gray-600 rounded-xl w-80 h-80 flex justify-center items-center shadow-lg shadow-black p-6">
      <form
        onSubmit={handleSubmit}
        method="post"
        className="flex flex-col justify-center items-center gap-4 w-full"
      >
        <p className="mb-2 text-xl font-semibold">Login Page</p>
        <input
          type="text"
          name="username"
          value={formData.username}
          placeholder="Username"
          onChange={handleChange}
          autoComplete="off"
          className="w-full px-3 py-2 text-center rounded-md shadow-sm shadow-black focus:outline-none focus:ring-2 focus:ring-gray-300"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="off"
          className="w-full px-3 py-2 text-center rounded-md shadow-sm shadow-black focus:outline-none focus:ring-2 focus:ring-gray-300"
        />
        <button
          type="submit"
          className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all duration-200"
        >
          Login
        </button>

        <p className="mt-4 text-sm">
          Don't have an account?
          <span
            className="text-blue-500 cursor-pointer hover:underline ml-1"
            onClick={() => setIsLogin(false)}
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
}
