//import React from "react"; (change to below code due to searching get error)
import React, { useState } from "react";
import { useForm, usePage } from "@inertiajs/react";

const Topbar = () => {
  const { post } = useForm();
  const { auth } = usePage().props;
  const user = auth?.user;

  const [searchQuery, setSearchQuery] = useState(""); // Manage search input state


  const handleLogout = () => {
    post("/logout"); // Sends a POST request to log out
  };
  
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const prevPage = encodeURIComponent(window.location.href);
      window.location.href = `/search?query=${encodeURIComponent(searchQuery)}&prev=${prevPage}`;
    }
  };
  

  return (
    <div className="fixed top-0 left-0 w-full bg-gray-900 text-white p-4 shadow-lg flex items-center justify-between z-50 
      h-16 sm:h-12">
      
      <h1 className="text-lg sm:text-base font-bold">CCK</h1>

      <div className="flex items-center gap-4">

        <div className="flex items-center border border-gray-300 rounded-md bg-white">
          <form onSubmit={handleSearch} className="flex w-full">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 text-black bg-white w-48 sm:w-32 text-sm focus:outline-none"
            />
            <button
              type="submit"
              className="px-3 py-2 text-gray-600 text-sm hover:bg-gray-100"
            >
              🔍
            </button>
          </form>
        </div>


        
        {user ? (
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-sm sm:px-3 sm:py-1"
          >
            Logout
          </button>
        ) : (
          <a
            href="/login"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-sm sm:px-3 sm:py-1"
          >
            Login
          </a>
        )}
      </div>
    </div>
  );
};

export default Topbar;
