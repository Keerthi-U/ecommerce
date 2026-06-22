import React, { useState, useEffect } from "react";
import { useCart } from "../Store/CartContext";
import { useAuth } from "../Store/AuthContext";
import sendEmailToUser from "../utils/sendEmailToUser";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const { user, isLoggedIn } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // const totalAmount = cartItems.reduce(
  //   (acc, item) => acc + item.price * item.quantity,
  //   0
  // );

  const deliveryCharge = 60;
const subTotal = cartItems.reduce(
  (acc, item) => acc + item.price * item.quantity,
  0
);
const totalAmount = subTotal + deliveryCharge;
  

  // Automatically fill in the email from logged-in user
  useEffect(() => {
    if (user && user.email) {
      setFormData((prevData) => ({
        ...prevData,
        email: user.email,
      }));
    }
  }, [user]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

const orderDetails = {
  userEmail: formData.email,
  customerInfo: {
    name: formData.name,
    address: formData.address,
  },
  totalAmount: totalAmount,
  cartItems: cartItems,
  deliveryCharge: deliveryCharge, // optional: if you want to show separately
};

    sendEmailToUser(orderDetails); // ✅ Send the email

    toast.success("Order placed successfully!", {
  position: "top-right",
  autoClose: 3000,
});

setTimeout(() => {
    navigate("/thankyou");
  }, 2000);
    console.log("Order Info:", formData, cartItems);
  };

  return (
    <div className="mt-10 px-6 py-10  min-h-screen">
      <ToastContainer />
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Checkout
        </h2>

        <div className=" p-8 rounded-lg flex flex-col lg:flex-row gap-10 shadow-sm">
          {/* Personal Details */}
          <form
            onSubmit={handleSubmit}
            className="bg-white w-full lg:w-1/2 p-6 rounded-lg shadow-md space-y-5"
          >
            <h3 className="text-2xl font-semibold mb-4 text-gray-700">
              Personal Details
            </h3>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <textarea
              name="address"
              placeholder="Shipping Address"
              required
              value={formData.address}
              onChange={handleChange}
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="w-full  py-3 rounded-md pro"
            >
              Place Order
            </button>
          </form>

          {/* Cart Summary */}
          <div className="bg-white w-full lg:w-1/2 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-6 text-gray-700">
              Order Summary
            </h3>

            <div className="space-y-4 border-b pb-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="clrss flex items-center justify-between gap-4 border-b pb-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md border"
                    />
                    <div>
                      <p className="text-gray-700 font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-800 font-semibold">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>

          <div className="mt-6 space-y-2 text-right text-gray-900">
  <p className="text-lg">Subtotal: ₹{subTotal}</p>
  <p className="text-lg">Delivery Charge: ₹{deliveryCharge}</p>
  <p className="text-xl font-bold">Total: ₹{totalAmount}</p>
</div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
