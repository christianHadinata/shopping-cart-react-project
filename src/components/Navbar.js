import React from "react";
import { Link } from "react-router-dom";
import Contact from "../pages/Contact";

const Navbar = () => {
  return (
    <header className="h-16 bg-blue-600 flex items-center top-0 fixed w-full">
      <div className="w-full flex justify-between px-5 items-center">
        <div className="text-2xl text-white font-semibold text-transparent p-4">
          CH Store
        </div>
        <ul className="flex gap-5">
          <Link className="text-white" to="/shoppingCart">
            <img
              src="shoppingCart.png"
              alt="shopping cart"
              className="w-10 h-10"
            />
          </Link>
          <Link className="text-white text-xl pt-1" to="/contact">
            Contact Us
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
