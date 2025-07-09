"use client";

import Image from "next/image";
import { useState } from "react";
import useCartStore from "@/store/cartStore";
import DeleteIcon from "@/public/icon-delete.svg";
import SideMenu from "./SideMenu";
import MenuIcon from "@/public/icon-menu.svg";
import useModalStore from "@/store/modalStore";
import { AnimatePresence } from "motion/react";
import { motion } from "framer-motion";

function Cart() {
  const { cart, deleteFromCart, clearCart } = useCartStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: -200 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -200 }}
      transition={{ duration: 0.3, ease: "easeInOut", type: "keyframes" }}
      key="cart"
      className="rounded-lg w-92  absolute top-20 bg-white z-10 border-gray-300 shadow-xl"
    >
      <div className="font-bold p-4">Cart</div>
      <div className="w-full h-2 border-b-2 border-gray-300"></div>

      <div className="min-h-96 mobile:min-h-48 text-xl mobile:text-base">
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
    </motion.div>
  );
}

export default function Navbar() {
  const [openCart, setOpenCart] = useState(false);
  const { cart } = useCartStore();
  const { isSideMenuOpen, openSideMenu } = useModalStore();

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity! || 0,
    0
  );

  return (
    <div>
      <AnimatePresence>{isSideMenuOpen && <SideMenu />}</AnimatePresence>
      <div className="w-full mobile:w-3/4 gap-6 pl-8 h-24 border-b-gray-100 border-b-2 flex items-center mx-auto ">
        <div className="mobile:hidden" onClick={openSideMenu}>
          <MenuIcon />
        </div>
        <div className="relative h-8 w-108 mobile:w-48 mr-18 cursor-pointer">
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
        <div className="flex items-center gap-8 w-full justify-end">
          <AnimatePresence> {openCart && <Cart />}</AnimatePresence>
          <button
            className="relative mobile:h-6 mobile:w-6 h-10 w-10 transition-all duration-300 cursor-pointer hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-full"
            onClick={() => setOpenCart(!openCart)}
          >
            {cartCount > 0 && (
              <div className="absolute bg-orange-500 mobile:-right-1 -right-5 mobile:-top-1 -top-1.5 z-10 text-white text-lg font-bold mobile:h-1/2 h-3/4 w-9 mobile:w-4.5 mobile:text-xs flex items-center justify-center rounded-3xl">
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

          <div className="relative mobile:h-12 mobile:w-12 h-14 w-14 rounded-full mr-12 border-2 border-transparent hover:border-orange-500 cursor-pointer overflow-hidden transition-all duration-300">
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
