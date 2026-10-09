import CategoryList from "./CategoryList";
import { Suspense } from "react";
import Marquee from "./Marquee";
import Link from "next/link";
import DateNav from "./DateNav";
import UserStatus from "./UserStatus";

const NavBar = () => {
  return (
    <>
      {/* স্টিকি, ব্লার ব্যাকগ্রাউন্ডসহ মূল হেডার (সার্ভার কম্পোনেন্ট) */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        {/* ১. টপ বার: লোগো ও ইউজার বাটন */}
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex justify-between items-center py-2 sm:py-2.5">
            <Link href={"/"}>
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="grid size-9 sm:size-10 place-items-center rounded-xl bg-green-700 text-base sm:text-lg text-white shadow-sm shrink-0">
                  🛒
                </span>

                <div>
                  <h1 className="font-bold text-lg sm:text-2xl text-gray-900 leading-tight">
                    বাজার দর
                  </h1>
                  <DateNav />
                </div>
              </div>
            </Link>

            {/* ইউজার স্ট্যাটাস (সাইন ইন / সাইন আপ বা প্রোফাইল) */}
            <div className="shrink-0 scale-90 sm:scale-100 origin-right">
              <UserStatus />
            </div>
          </div>
        </div>

        {/* 👉 দাগটি এখন container-এর বাইরে, তাই পুরো স্ক্রিনের শুরু থেকে শেষ পর্যন্ত পাবে */}
        <div className="w-full border-t border-gray-100" />

        {/* ২. ক্যাটাগরি লিস্ট */}
        <div className="container mx-auto px-3 sm:px-4 py-1">
          <Suspense
            fallback={
              <div className="grid place-items-center w-full h-10">
                <span className="loading loading-spinner loading-sm text-green-700"></span>
              </div>
            }
          >
            <CategoryList />
          </Suspense>
        </div>
      </header>

      {/* মারকিউরি (হেডারের বাইরে থাকায় নিচে স্ক্রল করলে নিজে থেকেই হাইড হয়ে যাবে) */}
      <div className="w-full bg-white border-b border-gray-100 overflow-hidden">
        <Suspense
          fallback={<div className="h-9 w-full bg-gray-50 animate-pulse"></div>}
        >
          <Marquee />
        </Suspense>
      </div>
    </>
  );
};

export default NavBar;
