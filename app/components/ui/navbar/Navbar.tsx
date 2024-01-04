"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SearchBar from "../searchbar/SearchBar";
import { CiShoppingCart } from "react-icons/ci";
import { BsChevronCompactUp } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { useSession, signOut, signIn } from "next-auth/react";

const Navbar = () => {
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [showNav, setShowNav] = useState<boolean>(false);
  const { data: session } = useSession();

  const SignOut = () => {
    if (session && session.user) {
      return (
        <ul className="py-5 px-1 text-neutral-600">
          <li className="hover:bg-gray-100 hover:text-neutral-900 px-5 py-2 cursor-pointer">
            {session.user.name}
          </li>
          <li
            onClick={() => signOut()}
            className="whitespace-nowrap hover:text-red-600 px-5 py-2 cursor-pointer"
          >
            Sign out
          </li>
          <li className="whitespace-nowrap over:bg-gray-100 hover:text-neutral-900 px-5 py-2 cursor-pointer">
            <Link href={"/add-product"}>Add product</Link>
          </li>
        </ul>
      );
    }
    return (
      <ul>
        <li
          onClick={() => signIn()}
          className="whitespace-nowrap over:bg-gray-100 hover:text-neutral-900 px-5 py-2 cursor-pointer"
        >
          Sign in
        </li>
      </ul>
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between py-4 relative">
        <div className="flex items-center md:space-x-10 lg:space-x-20">
          <div className="font-semibold text-2xl">
            <Link href={"/"}>STAT</Link>
            <nav className="max-md:hidden">
              <ul className="flex items-center lg:space-x-10 space-x-7 opacity-70 text-[15px]">
                <li>
                  <Link href={"/"} className="py-3 inline-block w-full">
                    Shop
                  </Link>
                </li>
                <li>
                  <Link href={"/filters"} className="py-3 inline-block w-full">
                    Filters
                  </Link>
                </li>
                {session?.user && (
                  <li>
                    <Link
                      href={"/my-products"}
                      className="py-3 inline-block w-full"
                    >
                      My products
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <SearchBar />
          <div
            onClick={() => setShowProfile(!showProfile)}
            className="relative cursor-pointer"
          >
            <Image
              src="/user.jpg"
              width={500}
              height={500}
              alt="user-image"
              className="w-[35px] h-[35px] rounded-full object-cover"
            />
            <div
              className={`absolute bg-white z-[2] rounded-lg shadow-lg ${
                showProfile ? "" : "hidden"
              }`}
            >
             <SignOut />
            </div>
          </div>
          <Link href={"/cart"}>
            <div className="p-2 bg-gray-100 rounded-full">
              <CiShoppingCart size={20} />
            </div>
          </Link>
          <span
            onClick={() => setShowNav(!showNav)}
            className="p-[9px] bg-gray-100 rounded-full md:hidden "
          >
            <BsChevronCompactUp
              className={`transition ease-out duration-150 ${
                showNav ? "rotate-180" : "0"
              }`}
            />
          </span>
        </div>
      </div>
      <div
        className={`md:hidden ${
          showNav ? "pb-4 px-5" : "h-0 invisible opacity-0"
        }`}
      >
        <ul className="flex flex-col text-[15px] opacity-75 px-2">
          <li>
            <Link href={"/shop"} className="py-3 inline-block w-full">
              Shop
            </Link>
          </li>
          <li>
            <Link href={"/filters"} className="py-3 inline-block w-full">
              Filters
            </Link>
          </li>
          <li>
            <Link href={"/my-products"} className="py-3 inline-block w-full">
              Products
            </Link>
          </li>
        </ul>
        <div className="flex items-center bg-gray-100 p-2 rounded-lg my-4 py-3">
          <input
            type="text"
            className="outline-none w-full bg-transparent ml-2 caret-blue-500 placeholder:font-light placeholder:text-gray-600 text-[15px]"
            placeholder="Search for products"
            autoComplete="off"
          />
          <button>
            <BiSearch size={20} className="opacity-50" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
