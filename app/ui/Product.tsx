"use client";

import { useState } from "react";
import Image from "next/image";
import PlusIcon from "@/public/icon-plus.svg";
import MinusIcon from "@/public/icon-minus.svg";
import PrevIcon from "@/public/icon-previous.svg";
import NextIcon from "@/public/icon-next.svg";

import CartIcon from "@/public/icon-cart.svg";
import { CartItem } from "../types";
import useCartStore from "@/store/cartStore";
import useModalStore from "@/store/modalStore";

export default function Product({
  img1,
  img2,
  img3,
  img4,
  name,
  company,
  description,
  sale,
  price,
}: CartItem) {
  const [selectedImage, setSelectedImage] = useState(img1);
  const [imageIndex, setImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const { openModal } = useModalStore();

  const { addToCart } = useCartStore();

  return (
    <div className="h-148 w-7/10 mobile:mx-auto mobile:mt-18 flex mobile:grid-cols-2 gap-8 flex-col mobile:grid">
      <div className="w-full">
        {/* Product Images */}
        <div className="flex flex-col items-center gap-8 w-screen mobile:w-full h-full relative ">
          {/*change on mobile*/}
          <div className="mobile:hidden absolute z-1 top-1/2 w-full flex justify-between">
            <div
              className="bg-white h-16 w-16 rounded-full flex items-center justify-center"
              onClick={() => {
                if (imageIndex > 0) {
                  setImageIndex(imageIndex - 1);
                  setSelectedImage([img1, img2, img3, img4][imageIndex - 1]);
                } else {
                  setImageIndex(3);
                  setSelectedImage(img4);
                }
              }}
            >
              <PrevIcon />
            </div>

            <div
              className="bg-white h-16 w-16 rounded-full flex items-center justify-center"
              onClick={() => {
                if (imageIndex < 3) {
                  setImageIndex(imageIndex + 1);
                  setSelectedImage([img1, img2, img3, img4][imageIndex + 1]);
                } else {
                  setImageIndex(0);
                  setSelectedImage(img1);
                }
              }}
            >
              <NextIcon />
            </div>
          </div>

          {/*  */}
          <button
            className="relative h-150 w-screen mobile:h-full mobile:w-full mobile:rounded-2xl overflow-hidden cursor-pointer hover:brightness-70 transition-all duration-300 focus:outline-none focus:brightness-70"
            onClick={() => {
              openModal({
                img1,
                img2,
                img3,
                img4,
                name,
                company,
                description,
                sale,
                price,
              });
            }}
          >
            <Image
              src={selectedImage || img1}
              alt="Product Image"
              fill={true}
              sizes="(max-width: 640px) 100vw, 640px"
            />
          </button>

          {/* image selector */}
          <div className="grid-cols-4 h-24 items-center w-full gap-12 hidden mobile:grid">
            {[img1, img2, img3, img4].map((img: string, index: number) => {
              return (
                <button
                  key={index}
                  className={`relative h-22 w-22 cursor-pointer rounded-lg overflow-hidden box-content border-3 transition-all duration-300  ${
                    index == imageIndex
                      ? " border-orange-500"
                      : "border-transparent "
                  }`}
                  onClick={() => {
                    setSelectedImage(img);
                    setImageIndex(index);
                  }}
                >
                  <Image
                    src={img}
                    alt={`Product Image ${index + 1}`}
                    fill={true}
                    sizes="(max-width: 640px) 100vw, 640px"
                    className={`${
                      index == imageIndex ? "opacity-30" : "hover:opacity-70"
                    } transition-all duration-300`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
      {/*  */}

      {/* Product Details */}
      <div className="h-full w-screen px-12 py-4 mobile:p-4 text-2xl  mobile:h-full mobile:w-full">
        <div className="h-full w-full flex flex-col gap-4">
          <div className="text-secondary font-bold tracking-[0.15rem] mobile:text-sm text-2xl">
            {company.toUpperCase()}
          </div>

          <div className="text-black text-5xl font-bold">{name}</div>

          <div className="text-secondary tracking-wider mt-4 mobile:mt-0 font-base">
            {description}
          </div>

          {sale ? (
            <div className="mt-2 flex justify-between items-center mobile:flex-col mobile:items-start text-3xl">
              <div className="flex items-center gap-4 relative">
                <div className="text-5xl mobile:text-4xl font-semibold text-black">
                  ${((price * (100 - sale)) / 100).toFixed(2)}
                </div>

                <div className="w-24 py-1 bg-black text-white rounded-lg text-center font-semibold">
                  {sale}%
                </div>
              </div>

              <div className="text-secondary font-semibold mt-4 line-through">
                ${price.toFixed(2)}
              </div>
            </div>
          ) : (
            <div className="text-3xl font-semibold text-black">
              ${price.toFixed(2)}
            </div>
          )}

          {/* add to cart button. */}
          <div className="mobile:grid grid-cols-8 items-center gap-4 font-bold  w-full px-2 flex flex-col">
            <div className="flex  items-center gap-12 h-full col-span-3 select-none w-screen mobile:w-full px-24 mt-8 mobile:px-0 mobile:mt-0">
              <button
                className="cursor-pointer w-6 h-full items-center justify-center flex hover:opacity-70 text-orange-500 focus:outline-none focus:text-orange-900 transition-all duration-300"
                onClick={() => {
                  quantity > 0 && setQuantity(quantity - 1);
                }}
              >
                <MinusIcon />
              </button>
              <div className="w-full text-center ">{quantity}</div>
              <button
                className="cursor-pointer w-6 h-full items-center justify-center flex hover:opacity-70 text-orange-500 focus:outline-none focus:text-orange-900 transition-all duration-300"
                onClick={() => {
                  setQuantity(quantity + 1);
                }}
              >
                <PlusIcon />
              </button>
            </div>

            <button
              className="h-48 mobile:h-14 w-full items-center justify-center flex gap-4 bg-orange-500 font-bold text-3xl mobile:text-base rounded-2xl text-black cursor-pointer hover:opacity-70 transition-all duration-300 col-span-5 select-none focus:opacity-70"
              onClick={() => {
                if (quantity) {
                  const item: CartItem = {
                    name,
                    company,
                    price,
                    description,
                    sale,
                    quantity,
                    img1,
                    img2,
                    img3,
                    img4,
                  };

                  addToCart(item);

                  setQuantity(0); // Reset quantity after adding to cart
                }
              }}
            >
              <CartIcon />
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
