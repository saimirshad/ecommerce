"use client";
import Logo from "@/app/assets/Logo.webp";
import React, { useState, useCallback } from "react";
import Image from "next/image";
import Wrapper from "@/app/components/shared/Wrapper";
import Search from "@/app/components/widget/Search";
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import Link from "next/link";

const Header = async () => {
  const [cartCount, setCartCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <header>
      <Wrapper>
        <div className="flex flex-row items-center justify-evenly max-lg:justify-between">
          <div className="max-lg:mx-8">
            {/* add Logo Here */}
            <Link href={"/"}>
              <Image src={Logo} alt="Dine Market Logo" />
            </Link>
          </div>
          {/* navbar here */}
          <nav className="max-lg:hidden">
            <ul className="flex flex-row justify-between gap-12 text-lg font-medium">
              <li className="cursor-pointer hover:text-orange-300">
                <a href="/Female">Female</a>
              </li>
              <li className="cursor-pointer hover:text-orange-300">
                <Link href="/Male">Male</Link>
              </li>
              <li className="cursor-pointer hover:text-orange-300">
                <a href="/Kids">Kids</a>
              </li>
              <li className="cursor-pointer hover:text-orange-300">
                <a href="/AllProducts">All Products</a>
              </li>
            </ul>
          </nav>
          <div className="max-lg:hidden">
            <Search name="search" placeholder="What Are You Looking For...." />
          </div>
          <div className="flex flex-row space-x-6 max-lg:hidden">
            <div className="relative cursor-pointer ">
              <AiOutlineShoppingCart size={28} />
              <span className="absolute top-0 right-[-2px] flex items-center justify-center w-4 h-4 text-xs text-white bg-red-500 rounded-full">
                {cartCount}
              </span>
            </div>

            <div className="cursor-pointer">
              <AiOutlineUser size={28} />
            </div>
          </div>
          <button className="lg:hidden max-lg:mx-8" onClick={toggle}>
            {!isOpen ? <RxHamburgerMenu size={24} /> : <RxCross1 size={24} />}
          </button>
          {isOpen && (
            <div className="absolute left-0 right-0 z-10 overflow-hidden transition-all duration-300 bg-white h-72 top-16">
              <ul className="flex flex-col items-center py-6 text-lg gap-y-6">
                <div className="flex flex-row gap-4">
                  <div className="relative cursor-pointer ">
                    <AiOutlineShoppingCart size={28} />
                    <span className="absolute top-0 right-[-2px] flex items-center justify-center w-4 h-4 text-xs text-white bg-red-500 rounded-full">
                      {cartCount}
                    </span>
                  </div>
                  <div className="cursor-pointer">
                    <AiOutlineUser size={28} />
                  </div>
                </div>
                <li>
                  <a>Female</a>
                </li>
                <li>
                  <a>Male</a>
                </li>
                <li>
                  <a>Kids</a>
                </li>
                <li>
                  <a>All Products</a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
