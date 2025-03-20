import React from "react";
import { useForm } from "@inertiajs/react";

const Topbar = () => {
  const { post } = useForm();

  const handleLogout = () => {
    post("/logout"); // Sends a POST request to log out
  };

  

  return (
    <div className="fixed top-0 left-0 w-full bg-gray-900 text-white p-4 shadow-lg flex items-center justify-between z-50 
      h-16 sm:h-12">
      
      <h1 className="text-lg sm:text-base font-bold">CCK</h1>

      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search..."
          className="p-2 text-black rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 
          w-48 sm:w-32 text-sm"
        />
        
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-sm sm:px-3 sm:py-1"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Topbar;
