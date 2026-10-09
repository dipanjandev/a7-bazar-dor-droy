"use client";

import { signIn, signUp } from "@/lib/auth-client";
import { Button, FieldError, Input, Label, TextField } from "@heroui/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [password, setPassword] = useState("");

  const onSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();

    const fromData = new FormData(e.target);
    const user = Object.fromEntries(fromData.entries()) as {
      name: string;
      email: string;
      password: string;
    };

    const { data, error } = await signUp.email({
      ...user,
      callbackURL: "/",
    });

    if (data) {
      toast.success("Account Creation Successfully");
      redirect("/");
    } else if (error) {
      toast.error("Your Email Already Exist");
    }
  };

  const handleGoogleSignIn = async () => {
    const { data } = await signIn.social({
      provider: "google",
    });
    if (data) {
      toast.success("Select Google Account");
    }
  };

  const handleGithubSignIn = async () => {
    const { data } = await signIn.social({
      provider: "github",
    });
    if (data) {
      toast.success("Successfully Login to Github");
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#F4F6F4] flex flex-col justify-center items-center px-4 py-8 sm:py-12">
      {/* হেডার টেক্সট */}
      <div className="text-center mb-6 sm:mb-8 space-y-1.5 sm:space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight leading-tight">
          অ্যাকাউন্ট তৈরি করুন
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 max-w-sm mx-auto px-2">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>
      </div>

      {/* মূল ফর্ম কার্ড */}
      <div className="w-full max-w-md bg-white rounded-2xl border border-gray-100/90 shadow-sm p-5 sm:p-8 space-y-5 sm:space-y-6">
        <form onSubmit={onSubmit} className="space-y-3.5 sm:space-y-4">
          {/* নাম ফিল্ড */}
          <TextField
            isRequired
            name="name"
            type="text"
            className="flex flex-col gap-1.5 text-left"
            validate={(value) => {
              if (value.trim().length < 2) {
                return "আপনার পুরো নাম লিখুন";
              }
              return null;
            }}
          >
            <Label className="text-xs font-semibold text-gray-700">নাম</Label>
            <Input
              placeholder="আপনার সম্পূর্ণ নাম দিন"
              className="w-full bg-[#EBF1FA] border border-transparent focus:border-emerald-500 rounded-lg px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm text-gray-800 placeholder-gray-400 outline-none transition"
            />
            <FieldError className="text-[11px] text-rose-500 mt-0.5" />
          </TextField>

          {/* ইমেইল ফিল্ড */}
          <TextField
            isRequired
            name="email"
            type="email"
            className="flex flex-col gap-1.5 text-left"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "সঠিক ইমেইল ঠিকানা লিখুন";
              }
              return null;
            }}
          >
            <Label className="text-xs font-semibold text-gray-700">ইমেইল</Label>
            <Input
              placeholder="you@example.com"
              className="w-full bg-[#EBF1FA] border border-transparent focus:border-emerald-500 rounded-lg px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm text-gray-800 placeholder-gray-400 outline-none transition"
            />
            <FieldError className="text-[11px] text-rose-500 mt-0.5" />
          </TextField>

          {/* পাসওয়ার্ড ফিল্ড */}
          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            className="flex flex-col gap-1.5 text-left"
            onChange={(val) => setPassword(val)}
            validate={(value) => {
              if (value.length < 8) {
                return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
              }
              return null;
            }}
          >
            <Label className="text-xs font-semibold text-gray-700">
              পাসওয়ার্ড
            </Label>
            <Input
              placeholder="কমপক্ষে ৮ অক্ষর"
              className="w-full bg-[#EBF1FA] border border-transparent focus:border-emerald-500 rounded-lg px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm text-gray-800 placeholder-gray-400 outline-none transition"
            />
            <FieldError className="text-[11px] text-rose-500 mt-0.5" />
          </TextField>

          {/* পাসওয়ার্ড নিশ্চিত করুন ফিল্ড */}
          <TextField
            isRequired
            name="confirmPassword"
            type="password"
            className="flex flex-col gap-1.5 text-left"
            validate={(value) => {
              if (value !== password) {
                return "পাসওয়ার্ড মিলছে না";
              }
              return null;
            }}
          >
            <Label className="text-xs font-semibold text-gray-700">
              পাসওয়ার্ড নিশ্চিত করুন
            </Label>
            <Input
              placeholder="আবার লিখুন"
              className="w-full bg-[#EBF1FA] border border-transparent focus:border-emerald-500 rounded-lg px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm text-gray-800 placeholder-gray-400 outline-none transition"
            />
            <FieldError className="text-[11px] text-rose-500 mt-0.5" />
          </TextField>

          {/* সাবমিট বাটন */}
          <div className="pt-1.5 sm:pt-2">
            <Button
              type="submit"
              className="w-full bg-[#0A7B3E] hover:bg-[#086834] text-white font-medium py-2.5 sm:py-3 px-4 rounded-lg transition-colors duration-200 text-xs sm:text-sm shadow-sm"
            >
              অ্যাকাউন্ট তৈরি করুন
            </Button>
          </div>
        </form>

        <div className="divider my-1 sm:my-2 text-xs text-gray-400">অথবা</div>

        {/* সোশাল লগইন বাটনসমূহ: মোবাইলে একটির নিচে আরেকটি এবং ট্যাবলেট/ডেস্কটপে পাশাপাশি */}
        <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="btn btn-active flex-1 text-xs sm:text-sm py-2 sm:py-2.5 whitespace-nowrap"
          >
            Google দিয়ে চালিয়ে যান
          </button>
          <button
            type="button"
            onClick={handleGithubSignIn}
            className="btn btn-active flex-1 text-xs sm:text-sm py-2 sm:py-2.5 whitespace-nowrap"
          >
            Github দিয়ে চালিয়ে যান
          </button>
        </div>

        {/* ফুটার সাইন ইন লিঙ্ক */}
        <div className="text-center pt-1 border-t border-gray-100">
          <p className="text-xs text-gray-600 mt-2 sm:mt-3">
            অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/sign-in"
              className="text-[#0A7B3E] font-semibold hover:underline"
            >
              সাইন ইন করুন
            </Link>
          </p>
        </div>
      </div>

      {/* হোম পেজে ফিরে যাওয়ার লিংক */}
      <div className="mt-5 sm:mt-6 text-center">
        <Link
          href="/"
          className="text-xs text-gray-500 hover:text-gray-800 hover:underline transition font-medium"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
