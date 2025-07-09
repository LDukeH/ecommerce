"use client";

import Navbar from "./Navbar";
import Product from "./Product";
import Modal from "./Modal";

import useModalStore from "@/store/modalStore";

export default function Home() {
  const { currentProduct } = useModalStore();

  return (
    <div>
      {currentProduct && <Modal />}
      <Navbar />

      <div>
        <Product
          img1="/image-product-1.jpg"
          img2="/image-product-2.jpg"
          img3="/image-product-3.jpg"
          img4="/image-product-4.jpg"
          name="Fall Limited Edition Sneakers"
          company="Sneaker Company"
          price={250.0}
          description="These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer."
          sale={50}
        />
      </div>
    </div>
  );
}
