import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import ApplicationLogo from "@/Components/ApplicationLogo";

const AdminLogin = () => {
  const { data, setData, post, errors } = useForm({
    name: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("admin.login"));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div className="bg-white rounded-xl shadow-lg px-8 py-10 w-full max-w-md">
    

    <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">Admin Panel Login</h2>

    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
          <FontAwesomeIcon icon={faUser} className="text-gray-400 mr-3" />
          <input
            type="text"
            placeholder="Enter username"
            className="w-full border-none focus:ring-0 focus:outline-none text-gray-800"
            value={data.name}
            onChange={(e) => setData("name", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
          <FontAwesomeIcon icon={faLock} className="text-gray-400 mr-3" />
          <input
            type="password"
            placeholder="Enter password"
            className="w-full border-none focus:ring-0 focus:outline-none text-gray-800"
            value={data.password}
            onChange={(e) => setData("password", e.target.value)}
            required
          />
        </div>
      </div>

      {errors.error && (
        <p className="text-red-500 text-sm mb-4">{errors.error}</p>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition shadow"
      >
        Login
      </button>
    </form>
  </div>
</div>



  );
};

export default AdminLogin;

