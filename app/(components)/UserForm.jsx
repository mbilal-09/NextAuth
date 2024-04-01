"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const UserForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [submitValue, setSubmitValue] = useState("Create User");

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitValue("loading...")
    setErrorMessage("");

    const res = await fetch("/api/Users", {
      method: "POST",
      body: JSON.stringify({ formData }),
      "content-type": "application/json",
    });

    if (!res.ok) {
      const response = await res.json();
      setSubmitValue("Create User")
      setErrorMessage(response.message);
    } else {
      router.refresh();
      router.push("/");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        method="post"
        className="flex flex-col gap-4 w-1/2 text-white bg-neutral-900 m-4 p-4 rounded-lg"
      >
        <h1 className="text-2xl font-bold">Create User</h1>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          onChange={handleChange}
          value={formData.name}
          className="bg-neutral-800 rounded-lg p-3 outline-none"
        />
        <label>Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={handleChange}
          value={formData.email}
          className="bg-neutral-800 rounded-lg p-3 outline-none"
        />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
          value={formData.password}
          className="bg-neutral-800 rounded-lg p-3 outline-none"
        />
        <input
          type="submit"
          value={submitValue}
          className="bg-neutral-800 w-fit rounded-md p-3 self-end mt-4 cursor-pointer hover:bg-[--primary] duration-300"
        />
      </form>
      {errorMessage ? (
        <p className="text-center text-red-400 text-lg">
          Error: {errorMessage}
        </p>
      ) : (
        ""
      )}
    </>
  );
};

export default UserForm;
