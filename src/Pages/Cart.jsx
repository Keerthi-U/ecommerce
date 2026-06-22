import React from "react";
import { useCart } from "../Store/CartContext";
import { Link } from "react-router-dom";
import { MdKeyboardArrowUp } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const CartPage = () => {
  const { cartItems, increaseQty, decreaseQty, removeItem } = useCart();
  const deliveryCharge = 60;

  const subTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const totalAmount = subTotal + deliveryCharge;

  if (cartItems.length === 0) {
    return <div className="p-6 text-center text-lg">Your cart is empty 🛒</div>;
  }

  return (
    <div className="p-6 align-element py-20 w-full hm-con">
      <div className="border-b border-base-200 pb-5">
        <h2 className="text-3xl font-medium tracking-wider capitalize">
          Shopping Cart
        </h2>
      </div>

      <div className="mt-8 grid gap-8 grid-cols-1 w-full">
        <div className="w-full flex flex-col gap-8">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-16 mb-6 flex-col lg:flex-row flex-wrap border-base-300 pb-6"
            >
              <div className="flex items-center gap-10 flex-col sm:flex-row flex-wrap">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />

                <div className="sm:ml-4 sm:w-48 text-center sm:text-left">
                  <h3 className="font-semibold">{item.name}</h3>
                </div>

                <div className="flex flex-col items-center gap-1">
                  <button onClick={() => increaseQty(item.id)}>
                    <MdKeyboardArrowUp className="text-xl cursor-pointer" />
                  </button>
                  <p>{item.quantity}</p>
                  <button
                    onClick={() => decreaseQty(item.id)}
                    disabled={item.quantity === 1}
                  >
                    <MdOutlineKeyboardArrowDown className="text-xl cursor-pointer" />
                  </button>
                </div>

                <div className="text-sm text-gray-600">
                  ₹{item.price} × {item.quantity} = ₹
                  {item.price * item.quantity}
                </div>

                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to remove this item?"
                      )
                    ) {
                      removeItem(item.id);
                    }
                  }}
                  className="text-red-600 hover:text-red-800 text-sm font-semibold"
                  aria-label="Remove item from cart"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Total Section */}
      <div className="mt-6 text-right space-y-2">
        <h3 className="text-lg">
          Subtotal ({cartItems.length} item
          {cartItems.length > 1 ? "s" : ""}): ₹{subTotal}
        </h3>
        <h3 className="text-lg">Delivery Charge: ₹{deliveryCharge}</h3>
        <h3 className="text-xl font-bold">Total: ₹{totalAmount}</h3>

        <Link
          to="/checkout"
          className="inline-block mt-4  text-white py-2 px-4 rounded pro"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default CartPage;
