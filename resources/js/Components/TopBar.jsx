//import React from "react"; (change to below code due to searching get error)
import React, { useState } from "react";
import { useForm } from "@inertiajs/react";

const Topbar = () => {
  const { post } = useForm();

  const [searchQuery, setSearchQuery] = useState(""); // Manage search input state


  const handleLogout = () => {
    post("/logout"); // Sends a POST request to log out
  };
  
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?query=${encodeURIComponent(searchQuery)}`;
    }
  };
  

  return (
    <div className="fixed top-0 left-0 w-full bg-gray-900 text-white p-4 shadow-lg flex items-center justify-between z-50 
      h-16 sm:h-12">
      
      <h1 className="text-lg sm:text-base font-bold">CCK</h1>

      <div className="flex items-center gap-4">
        <form onSubmit={handleSearch} className="flex items-center">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 text-black rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-48 sm:w-32 text-sm"
          />
          <button
            type="submit"
            className="ml-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded text-sm sm:px-3 sm:py-1"
          >
            🔍
          </button>
        </form>
        
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
