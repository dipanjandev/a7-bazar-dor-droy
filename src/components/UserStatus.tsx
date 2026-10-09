"use client";

import { useSession, signOut } from "@/lib/auth-client";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";

const UserStatus = () => {
  const { data: session } = useSession();
  const userInfo = session?.user;

  // ড্রপডাউন খোলা/বন্ধ রাখার স্টেট
  const [isOpen, setIsOpen] = useState(false);

  // নামের প্রথম অক্ষর বড় হাতের করা
  const firstLetter = userInfo?.name
    ? userInfo.name.trim().charAt(0).toUpperCase()
    : "U";

  const handleSignOut = async () => {
    setIsOpen(false);
    try {
      await signOut();
      toast.success("সফলভাবে সাইন আউট হয়েছে!");
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
            className="flex items-center gap-1.5 sm:gap-2 hover:opacity-90 transition cursor-pointer select-none"
          >
            {/* নামের প্রথম অক্ষর সম্বলিত গোল অ্যাভাটার */}
            <div className="size-7 sm:size-8 rounded-full bg-[#0A7B3E] text-white flex items-center justify-center font-bold text-xs sm:text-sm shadow-sm shrink-0">
              {firstLetter}
            </div>

            {/* ইউজারের পুরো নাম (মোবাইলে বড় নাম ভাঙা রোধ করতে max-w ও truncate) */}
            <span className="font-semibold text-gray-800 text-xs sm:text-sm max-w-25 sm:max-w-none truncate">
              {userInfo.name}
            </span>

            {/* ছোট অ্যারো আইকন */}
            <span className="text-[9px] sm:text-[10px] text-gray-500">▼</span>
          </button>

          {/* ড্রপডাউন মেনু কার্ড */}
          {isOpen && (
            <>
              {/* ড্রপডাউনের বাইরে ক্লিক করলে যাতে বন্ধ হয়ে যায় */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsOpen(false)}
              />

              <div className="absolute right-0 mt-2 sm:mt-3 w-56 sm:w-64 bg-white rounded-2xl shadow-xl border border-gray-100 p-3.5 sm:p-4 z-50 space-y-3 sm:space-y-4">
                {/* ইউজার তথ্য সেকশন */}
                <div className="space-y-0.5 border-b border-gray-100 pb-2.5 sm:pb-3">
                  <h4 className="font-bold text-gray-900 text-xs sm:text-sm truncate">
                    {userInfo.name}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-gray-400 break-all leading-tight">
                    {userInfo.email}
                  </p>
                </div>

                {/* মেনু অপশনসমূহ */}
                <div className="space-y-1 sm:space-y-2 pt-0.5 text-xs sm:text-sm font-medium">
                  {/* প্রোফাইল */}
                  <Link
                    href="/profile"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 text-gray-700 hover:text-emerald-700 hover:bg-gray-50 p-1.5 rounded-lg transition"
                  >
                    <span className="text-emerald-800 text-sm sm:text-base">
                      👤
                    </span>
                    <span>আমার প্রোফাইল</span>
                  </Link>

                  {/* সাইন আউট বাটন */}
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2 text-rose-600 hover:text-rose-700 hover:bg-rose-50/50 p-1.5 rounded-lg transition cursor-pointer text-left"
                  >
                    <span className="text-sm sm:text-base">↩</span>
                    <span>সাইন আউট</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        /* সাইন ইন / সাইন আপ বাটন (মোবাইলে মাপসই ও কমপ্যাক্ট) */
        <div>
          <div className="flex items-center gap-1.5 sm:gap-3">
            <Link href={"/sign-in"}>
              <button className="px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-gray-700 hover:text-green-700 hover:bg-gray-50 rounded-lg transition">
                সাইন ইন
              </button>
            </Link>
            <Link href={"/sign-up"}>
              <button className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg bg-green-700 hover:bg-green-800 text-white shadow-sm transition">
                সাইন আপ
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserStatus;
