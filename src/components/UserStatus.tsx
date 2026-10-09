"use client";

import { useSession, signOut } from "@/lib/auth-client";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";

const UserStatus = () => {
  const { data: session } = useSession();
  const userInfo = session?.user;

  // ড্রপডাউন খোলা/বন্ধ রাখার স্টেট ওপেন স্টেট ডিক্লিয়ার করলাম
  const [isOpen, setIsOpen] = useState(false);

  // নামের প্রথম অক্ষর বড় হাতের করা হল ট্রিম করার মাধ্যমে
  const firstLetter = userInfo?.name
    ? userInfo.name.trim().charAt(0).toUpperCase()
    : "U";

  const handleSignOut = async () => {
    setIsOpen(false);
    try {
      await signOut();
      toast.success("সফলভাবে সাইন আউট হয়েছে!");
    } catch {}
  };
  return (
    <div>
      {userInfo ? (
        <div className="relative">
          {/* প্রোফাইল ট্রিগার বাটন */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex items-center gap-2 hover:opacity-90 transition cursor-pointer select-none"
          >
            {/* নামের প্রথম অক্ষর সম্বলিত সবুজ গোল অ্যাভাটার */}
            <div className="w-8 h-8 rounded-full bg-[#0A7B3E] text-white flex items-center justify-center font-bold text-sm shadow-sm">
              {firstLetter}
            </div>

            {/* ইউজারের পুরো নাম */}
            <span className="font-semibold text-gray-800 text-sm">
              {userInfo.name}
            </span>

            {/* ছোট অ্যারো আইকন */}
            <span className="text-[10px] text-gray-500">▼</span>
          </button>

          {/* ড্রপডাউন মেনু কার্ড */}
          {isOpen && (
            <>
              {/* ড্রপডাউনের বাইরে ক্লিক করলে যাতে বন্ধ হয়ে যায় */}
              <div
                className="fixed inset-0 z-30"
                onClick={() => setIsOpen(false)}
              />

              <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 z-40 space-y-4">
                {/* ইউজার তথ্য সেকশন */}
                <div className="space-y-0.5 border-b border-gray-100 pb-3">
                  <h4 className="font-bold text-gray-900 text-sm">
                    {userInfo.name}
                  </h4>
                  <p className="text-xs text-gray-400 break-all">
                    {userInfo.email}
                  </p>
                </div>

                {/* মেনু অপশনসমূহ */}
                <div className="space-y-2 pt-1 text-sm font-medium">
                  {/* প্রোফাইল */}
                  <Link
                    href="/profile"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2.5 text-gray-700 hover:text-emerald-700 transition"
                  >
                    <span className="text-emerald-800 text-base">👤</span>
                    <span>আমার প্রোফাইল</span>
                  </Link>

                  {/* সাইন আউট বাটন */}
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2.5 text-rose-600 hover:text-rose-700 transition pt-1 cursor-pointer"
                  >
                    <span className="text-base">↩</span>
                    <span>সাইন আউট</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        /* তোমার আগের সাইন ইন / সাইন আপ বাটন অপরিবর্তিত রাখা হয়েছে */
        <div>
          <div className="flex gap-3">
            <Link href={"/sign-in"}>
              <button className="btn">সাইন ইন</button>
            </Link>
            <Link href={"/sign-up"}>
              <button className="btn bg-green-700 text-white">সাইন আপ</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserStatus;
