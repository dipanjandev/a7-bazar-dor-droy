"use client";

import { updateUser, useSession } from "@/lib/auth-client";
import { Button, FieldError, Input, Label, TextField } from "@heroui/react";
import React from "react";

const ProfilePage = () => {
  const { data: session } = useSession();
  const userInfo = session?.user;

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fromData = new FormData(e.currentTarget);
    const updateUserInfo = Object.fromEntries(fromData.entries()) as {
      name: string;
    };
    await updateUser({
      ...updateUserInfo,
    });
  };

  // নামের প্রথম অক্ষর (যেমন: Dipanjan Roy -> D)
  const firstLetter = userInfo?.name
    ? userInfo.name.trim().charAt(0).toUpperCase()
    : "U";

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl space-y-6">
      {/* হেডার টেক্সট */}
      <div className="space-y-1">
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
          আমার প্রোফাইল
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </div>

      {/* ১. প্রোফাইল ইনফো কার্ড */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* সবুজ রাউন্ডেড ব্যাজ */}
          <div className="w-12 h-12 rounded-xl bg-[#0A7B3E] text-white flex items-center justify-center font-bold text-lg shadow-sm">
            {firstLetter}
          </div>

          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
              {userInfo?.name || "লোড হচ্ছে..."}
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
              {userInfo?.email || "লোড হচ্ছে..."}
            </p>
          </div>
        </div>
      </div>

      {/* ২. নাম হালনাগাদ করার কার্ড */}
      <div className="bg-white p-6 sm:p-7 rounded-2xl border border-gray-100 shadow-sm space-y-5">
        <h3 className="text-base font-bold text-gray-900">নাম হালনাগাদ করুন</h3>

        <form onSubmit={handleUpdateProfile} className="space-y-5">
          <TextField
            isRequired
            name="name"
            type="text"
            defaultValue={userInfo?.name || ""}
            className="flex flex-col gap-1.5 text-left"
            validate={(value) => {
              if (value.trim().length < 2) {
                return "নতুন নাম লিখুন";
              }
              return null;
            }}
          >
            <Label className="text-xs font-semibold text-gray-700">নাম</Label>
            <Input
              placeholder="আপনার নাম লিখুন"
              className="w-full bg-white border border-gray-200 focus:border-emerald-600 rounded-lg px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none transition"
            />
            <FieldError className="text-[11px] text-rose-500 mt-0.5" />
          </TextField>

          <div>
            <Button
              type="submit"
              className="bg-[#0A7B3E] hover:bg-[#086834] text-white font-medium py-2 px-5 rounded-lg transition-colors duration-200 text-xs sm:text-sm shadow-sm"
            >
              নাম হালনাগাদ করুন
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
