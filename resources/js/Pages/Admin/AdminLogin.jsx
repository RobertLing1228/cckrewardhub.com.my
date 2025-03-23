import React, { useState } from "react";
import { useForm } from "@inertiajs/react";

const AdminLogin = () => {
  const { data, setData, post, errors } = useForm({
    name: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("adminlogin"));
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={data.name}
              onChange={(e) => setData("name", e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded"
              value={data.password}
              onChange={(e) => setData("password", e.target.value)}
              required
            />
          </div>
          {errors.error && <p className="text-red-500">{errors.error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
