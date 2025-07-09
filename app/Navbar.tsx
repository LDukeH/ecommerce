"use client";

import Image from "next/image";
import { useState } from "react";
import useCartStore from "@/store/cartStore";
import DeleteIcon from "@/public/icon-delete.svg";
import { clear } from "console";

function Cart() {
  const { cart, deleteFromCart, clearCart } = useCartStore();

  return (
    <div className="rounded-lg w-92  absolute top-20 bg-white z-50 border-gray-300 shadow-xl">
      <div className="font-bold p-4">Cart</div>
      <div className="w-full h-2 border-b-2 border-gray-300"></div>

      <div className="min-h-48">
        {cart.length > 0 ? (
          <div>
            {cart.map((item, index) => (
              <div key={index} className="flex px-4 mt-4 gap-6 items-center">
                <div className="relative w-12 h-12 rounded-sm overflow-hidden">
                  <Image
                    src={item.img1}
                    alt={item.name}
                    fill={true}
                    sizes="(max-width: 640px) 100vw, 640px"
                  />
                </div>

                <div className="text-secondary font-medium">
                  <div>{item.name}</div>

                  <div>
                    ${((item.price * (item.sale || 100)) / 100).toFixed(2)} x{" "}
                    {item.quantity}
                    <span className="font-semibold text-black ml-2">
                      $
                      {(
                        (item.price * item.quantity! * (item.sale || 100)) /
                        100
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  className="cursor-pointer hover:brightness-75 focus:brightness-75 transition-all duration-300"
                  onClick={() => deleteFromCart(item)}
                >
                  <DeleteIcon />
                </button>
              </div>
            ))}

            {/*  */}
            <button
              className="bg-orange-500 font-semibold  w-7/8 mx-auto h-12 flex items-center justify-center rounded-lg mt-4 cursor-pointer hover:brightness-70 focus:outline-2 focus:brightness-70 transition-all duration-300 "
              onClick={() => {
                clearCart();
              }}
            >
              Checkout
            </button>
          </div>
        ) : (
          <div className="text-secondary font-bold text-base w-full h-48 flex items-center justify-center">
            Your cart is empty.
          </div>
        )}
      </div>
    </div>
  );
}

export default function Navbar() {
  const [openCart, setOpenCart] = useState(false);
  const { cart } = useCartStore();

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity! || 0,
    0
  );

  return (
    <div>
      <div className="w-3/4 h-24 border-b-gray-100 border-b-2 flex items-center mx-auto">
        <div className="relative h-5 w-35 mr-18 cursor-pointer">
          <Image
            src={"./logo.svg"}
            alt="Logo"
            fill={true}
            sizes="(max-width: 640px) 100vw, 640px"
          />
        </div>

        {/* sites */}
        <div className=" text-secondary font-semibold justify-between gap-8 h-full hidden mobile:flex">
          <button className="site">Collections</button>
          <button className="site">Men</button>
          <button className="site">Women</button>
          <button className="site">About</button>
          <button className="site">Contact</button>
        </div>

        {/* avatar and cart */}
        <div className="ml-auto flex items-center gap-8 w-full justify-end ">
          {openCart && <Cart />}
          <button
            className="relative h-6 w-6 transition-all duration-300 cursor-pointer hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-full"
            onClick={() => setOpenCart(!openCart)}
          >
            {cartCount > 0 && (
              <div className="absolute bg-orange-500 h-1/2 -right-1 -top-1 z-10 text-white text-xs font-bold w-4.5 flex items-center justify-center rounded-2xl">
                {cartCount}
              </div>
            )}
            <Image
              src={"/icon-cart.svg"}
              alt="Cart"
              fill={true}
              sizes="(max-width: 640px) 100vw, 640px  "
            />
          </button>

          <div className="relative h-12 w-12 rounded-full mr-12 border-2 border-transparent hover:border-orange-500 cursor-pointer overflow-hidden transition-all duration-300">
            <Image
              src={"/image-avatar.png"}
              alt="Avatar"
              fill={true}
              sizes="(max-width: 640px) 100vw, 640px"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
