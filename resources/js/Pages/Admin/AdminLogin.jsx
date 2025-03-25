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
    <div className="flex items-center justify-center h-screen bg-gray-400">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <div className="bg-yellow-600 text-white text-center py-4 rounded-t-lg">
          <h2 className="pt-4 pb-2 text-xl font-bold">Admin Panel Login</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 pt-4">
            <label className="block text-sm font-medium mb-1">Name</label>
              <div className="flex items-center border border-gray-500 rounded-lg overflow-hidden">
                <div className=" px-3 py-2 ">
                  <FontAwesomeIcon icon={faUser} />
                </div>
                <input
                  type="text"
                  className="w-full p-2 outline-none"
                  value={data.name}
                  onChange={(e) => setData("name", e.target.value)}
                  required
                />
              </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="flex items-center border border-gray-500 rounded-lg overflow-hidden">
              <div className=" px-3 py-2 ">
                <FontAwesomeIcon icon={faLock} />
              </div>
              <input
                type="password"
                className="w-full p-2 border rounded"
                value={data.password}
                onChange={(e) => setData("password", e.target.value)}
                required
              />
              </div>
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
