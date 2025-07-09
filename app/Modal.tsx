"use client";

import useModalStore from "@/store/modalStore";
import Image from "next/image";
import { useState } from "react";
import NextIcon from "@/public/icon-next.svg";
import PrevIcon from "@/public/icon-previous.svg";

export default function Modal() {
  const { currentProduct, closeModal } = useModalStore();
  const [selectedImage, setSelectedImage] = useState(currentProduct!.img1);
  const [imageIndex, setImageIndex] = useState(0);

  const img1 = currentProduct!.img1;
  const img2 = currentProduct!.img2;
  const img3 = currentProduct!.img3;
  const img4 = currentProduct!.img4;

  console.log(currentProduct);

  return (
    <div className="inset-0 absolute z-50">
      <div
        className="bg-black opacity-70 w-full h-full inset-0 absolute"
        onClick={() => closeModal()}
      ></div>
      <div className="w-full h-full flex flex-col items-center justify-center">
        {/*  */}
        <div className="flex relative items-center select-none mt-8">
          <div
            className="flex items-center justify-center rounded-full h-14 w-14 bg-white absolute -left-6 z-10 cursor-pointer hover:text-orange-500 transition-all duration-300"
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

          {/*  */}
          <div className="relative w-128 h-136">
            <Image
              src={selectedImage}
              fill={true}
              sizes="(max-width: 640px) 100vw, 640px"
              alt="Product Image"
              className="rounded-2xl"
            />
          </div>

          {/*  */}
          <div
            className="flex items-center justify-center rounded-full h-14 w-14 bg-white absolute -right-6 z-10 cursor-pointer hover:text-orange-500 transition-all duration-300"
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

        {/* image selector */}
        <div className="grid-cols-4 grid  h-24 items-center w-112 gap-8 mt-8">
          {[img1, img2, img3, img4].map((img: string, index: number) => {
            return (
              <div
                key={index}
                className={`relative h-24 w-24 cursor-pointer rounded-lg overflow-hidden box-content border-3 transition-all duration-300  ${
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
                    index == imageIndex
                      ? "brightness-120 opacity-30"
                      : "hover:opacity-70"
                  } transition-all duration-300`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
