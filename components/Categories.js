import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Categories = () => {
  const router = useRouter();
  return (
    <div className="bg-transparent p-4 rounded-full flex justify-center flex-wrap gap-4">
      {/* Camera */}
      <Link href="/products">
        <div className="w-24 cursor-pointer rounded-2xl p-2 text-center    backdrop-blur-md text-white font-bold   hover:scale-105 transition transform duration-300 hover:shadow-[0_0_20px_rgba(99,102,241,1)] z-10 ">
          <img
            src="/images/camera.png"
            alt="iPhone"
            className="w-16 h-16 rounded-2xl mx-auto"
          />
          <p className="text-sm mt-1">camera</p>
        </div>
      </Link>

      {/* iPhone */}
      <Link href="/products">
        <div
          onClick={() => alert("iPhone clicked")}
          className="w-24 cursor-pointer rounded-2xl p-2 text-center   backdrop-blur-md text-white font-bold   hover:scale-105 transition transform duration-300 hover:shadow-[0_0_20px_rgba(99,102,241,1)] z-10 "
        >
          <img
            src="/images/laptop.png"
            alt="iPhone"
            className="w-16 h-16 rounded-2xl mx-auto"
          />
          <p className="text-sm mt-1">iPhone</p>
        </div>
      </Link>

      {/* iPad Pro */}
      <Link href="/components/phoneproducts">
        <div className="w-24 cursor-pointer rounded-2xl p-2 text-center     backdrop-blur-md text-white font-bold   hover:scale-105 transition transform duration-300 hover:shadow-[0_0_20px_rgba(99,102,241,1)] z-10 ">
          <img
            src="/images/phone.png"
            alt="iPad Pro"
            className="w-16 h-16 rounded-2xl mx-auto"
          />
          <p className="text-sm mt-1">iPad Pro</p>
        </div>
      </Link>

      {/* PC & Laptop */}
      <Link href="/products">
        <div
          onClick={() => alert("PC & Laptop clicked")}
          className="w-24 cursor-pointer rounded-2xl p-2 text-center    backdrop-blur-md text-white font-bold   hover:scale-105 transition transform duration-300 hover:shadow-[0_0_20px_rgba(99,102,241,1)] z-10 "
        >
          <img
            src="/images/laptop.png"
            alt="PC & Laptop"
            className="w-16 h-16 rounded-2xl mx-auto"
          />
          <p className="text-sm mt-1">PC </p>
        </div>
      </Link>

      {/* Hoodie */}
      <Link href="/products">
        <div
          onClick={() => alert("PC & Laptop clicked")}
          className="w-24 cursor-pointer rounded-2xl p-2 text-center    backdrop-blur-md text-white font-bold   hover:scale-105 transition transform duration-300 hover:shadow-[0_0_20px_rgba(99,102,241,1)] z-10 "
        >
          <img
            src="/images/shoes.png"
            alt="PC & Laptop"
            className="w-16 h-16 rounded-2xl mx-auto"
          />
          <p className="text-sm mt-1">shoes</p>
        </div>
      </Link>
      {/* Add more items similarly... */}
    </div>
  );
};

export default Categories;
