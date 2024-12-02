import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="navbar-center hidden lg:flex gap-5">
        <NavLink>Home</NavLink>
        <NavLink>Add Schedule</NavLink>
        <NavLink>All Schedule</NavLink>
        <NavLink>Sign In</NavLink>
        <NavLink>Sign UP</NavLink>
      </div>
      <div className="navbar-end">
        <a className="btn">Button</a>
      </div>
    </div>
  );
};

export default Navbar;
