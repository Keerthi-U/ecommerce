import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logok from "../assets/images/logok.png";
import { useProducts } from "../Store/ProductContext";
import { BsFillMoonFill, BsFillSunFill, BsCart3 } from "react-icons/bs";
import { useCart } from "../Store/CartContext";
import { FaChevronDown } from "react-icons/fa";
import { useAuth } from "../Store/AuthContext";

const Navbar = () => {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const { cartItems } = useCart();
  const { darkMode, toggledarkMode } = useProducts();

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const handleLogout = () => {
    setShowDropdown(false);
    logout();
    navigate("/login");
  };

  // ✅ Move this function above usage
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const initials = user?.name ? getInitials(user.name) : "NA";

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const links = [
    { id: 1, url: "/", text: "home" },
    { id: 2, url: "/about", text: "about" },
    { id: 3, url: "/product", text: "product" },
    { id: 4, url: "/cart", text: "cart" },
    { id: 5, url: "/checkout", text: "checkout" },
  ];

  return (
    <nav className="bg-base-200">
      <div className="navbar align-element flex justify-between items-center">
        <div className="img-logf">
          <img src={logok} alt="Logo" />
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal">
            {links.map(({ id, url, text }) => (
              <li key={id}>
                <NavLink
                  to={url}
                  className={({ isActive }) =>
                    isActive ? "capitalize active" : "capitalize"
                  }
                >
                  {text}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-6">
          <button className="dark-toggle" onClick={toggledarkMode}>
            {darkMode ? (
              <BsFillMoonFill className="toggle-icon" />
            ) : (
              <BsFillSunFill className="toggle-icon" />
            )}
          </button>

          <Link to="/cart" className="relative">
            <BsCart3 size={28} className="text-white cursor-pointer" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>

          {/* ✅ Profile section with initials + name + dropdown */}
          {isLoggedIn && (
            <div className="relative inline-block text-left">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={toggleDropdown}
              >
                {/* Circle with initials */}
                <div className="w-10 h-10 bgpr text-white rounded-full flex items-center justify-center font-bold uppercase">
                  {initials}
                </div>

                {/* User name */}
                {/* <span className="text-white font-semibold">{user?.name}</span> */}

                {/* Down arrow */}
                <FaChevronDown className="text-white" />
              </div>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-lg z-10">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {!isLoggedIn && (
            <Link to="/login" className="text-green-600 font-semibold">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
