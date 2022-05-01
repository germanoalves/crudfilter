import React, { useEffect, useState } from "react";
import imagemlogo from "../imgs/logofinanceiro.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.css";



export const Header = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const location = useLocation();
  const [search, setSearch] = useState("");

  const navegate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") {
      setActiveTab("Home");
    } else if (location.pathname === "/add") {
      setActiveTab("AddContact");
    } else if (location.pathname === "/help") {
      setActiveTab("Help");
    }
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    navegate(`/search?name=${search}`);
    setSearch("");
  };
  return (
    /*     <div className="overflow-hidden border-b-2 border-green-300 container flex flex-wrap justify-between items-center mx-auto">
            <Link to="/">
                <img src={imagemlogo} className="p-2 float-left" width={300}/>
            </Link>
            <div className="float-right pt-1">
                <form onSubmit={handleSubmit} className="inline">
                    <input
                        type="text"
                        className=" max-w-2xl p-1 mt-4 mr-28 border-none text-sm" 
                        placeholder="Procurar por nome..." 
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                    >

                    </input>
                </form>
                <Link to="/">
                    <p className={`${activeTab === "Home"? "active" : "" }`}
                    onClick={()=> setActiveTab("Home")}>
                        Home
                    </p>
                </Link>
                <Link to="/add">
                    <p className={`${activeTab === "AddContat" ? "active" : ""}`}
                    onClick={()=> setActiveTab("Add")}>
                        Add  Fatura
                    </p>
                </Link>
                <Link to="/about">
                    <p className={`${activeTab === "About" ? "active" : ""}`}
                    onClick={()=> setActiveTab("About")}>
                        Sobre
                    </p>
                </Link>
            </div>
            
    </div>*/

    <nav className=" border-gray-200 px-2 sm:px-4 py-2.5">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link to="/">
          <img src={imagemlogo} className="flex p-2 float-left" width={300} />
        </Link>
        <button
          data-collapse-toggle="mobile-menu"
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="mobile-menu-2"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
          <svg
            className="hidden w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="mobile-menu">
          <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            <Link to="/home">
              <li
                className="block py-2 pr-4 pl-3 text-white bg-green-700 rounded   md:bg-transparent md:text-green-700 md:p-0 dark:text-white"
                aria-current="page"
                onClick={() => setActiveTab("Home")}
              >
                Home
              </li>
            </Link>
            <Link to="/add">
              <li
                className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-green-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                aria-current="page"
                onClick={() => setActiveTab("Add")}
              >
                Add Fatura
              </li>
            </Link>
            <Link to="/help">
              <li
                className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                aria-current="page"
                onClick={() => setActiveTab("Help")}
              >
                Ajuda
              </li>
            </Link> 
            <li>
            
            </li>           
          </ul>
        </div>
      </div>
    </nav>
  );
};
