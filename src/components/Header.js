import React, { useEffect, useState } from "react";
import imagemlogo from "../imgs/logofinanceiro.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.css";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

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

  const handleMenuOpen = () => {
    let btnOpenMenu = document.getElementById("mobile-menu");
    btnOpenMenu.classList.remove("hidden");

    let btnOpen = document.getElementById("open");
    btnOpen.classList.add("hidden");

    let btnClose = document.getElementById("close");
    btnClose.classList.remove("hidden");
  };

  const handleMenuClose = () => {
    let btnClose = document.getElementById("mobile-menu");
    btnClose.classList.add("hidden");

    let btnCloseIcon = document.getElementById("close");
    btnCloseIcon.classList.add("hidden");

    let btnOpenIcon = document.getElementById("open");
    btnOpenIcon.classList.remove("hidden");
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
      <div className="  sm:flex sm:flex-wrap sm:items-center sm:mx-auto sm:justify-between md:container">
        <Link to="/">
          <img src={imagemlogo} className="flex float-left w-72 md:w-80" />
        </Link>
        <div className="mt-6 pt-6">
        <button
          id="open"
          data-collapse-toggle="mobile-menu"
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="mobile-menu-2"
          aria-expanded="false"
          onClick={handleMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <MenuIcon></MenuIcon>
        </button>
        <button
          id="close"
          data-collapse-toggle="mobile-menu-hidden"
          type="button"
          className="hidden items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="mobile-menu-2"
          aria-expanded="false"
          onClick={handleMenuClose}
        >
          <span className="sr-only">Open main menu</span>
          <CloseIcon></CloseIcon>
        </button>
        </div>
        <div className="hidden w-full md:block md:w-auto" id="mobile-menu">
          <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            <Link to="/home">
              <li
                className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-green-50 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                aria-current="page"
                onClick={() => setActiveTab("Home")}
              >
                Home
              </li>
            </Link>
            <Link to="/add">
              <li
                className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-green-50 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                aria-current="page"
                onClick={() => setActiveTab("Add")}
              >
                Add Fatura
              </li>
            </Link>
            <Link to="/help">
              <li
                className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-green-50 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                aria-current="page"
                onClick={() => setActiveTab("Help")}
              >
                Ajuda
              </li>
            </Link>
            <li></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
