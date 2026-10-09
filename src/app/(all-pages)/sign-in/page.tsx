"use client";

import { signIn } from "@/lib/auth-client";
import { Button, FieldError, Input, Label, TextField } from "@heroui/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const SignInPage = () => {
  const onSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };
    const { data, error } = await signIn.email({
      ...user,
    });
    if (data) {
      redirect("/");
      toast.success("Login Successfully");
    }
    if (error) {
      toast.error("Wrong Email & Password");
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
          সাইন ইন
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 max-w-sm mx-auto px-2">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      {/* মূল ফর্ম কার্ড */}
      <div className="w-full max-w-md bg-white rounded-2xl border border-gray-100/90 shadow-sm p-5 sm:p-8 space-y-5 sm:space-y-6">
        <form onSubmit={onSubmit} className="space-y-4 sm:space-y-5">
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
              placeholder="user@example.com"
              className="w-full bg-[#EBF1FA] border border-transparent focus:border-emerald-500 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-gray-800 outline-none transition"
            />
            <FieldError className="text-[11px] text-rose-500 mt-0.5 sm:mt-1" />
          </TextField>

          {/* পাসওয়ার্ড ফিল্ড */}
          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            className="flex flex-col gap-1.5 text-left"
            validate={(value) => {
              if (value.length < 8) {
                return "পাসওয়ার্ড অন্তত ৮ অক্ষরের হতে হবে";
              }
              if (!/[A-Z]/.test(value)) {
                return "পাসওয়ার্ডে অন্তত একটি বড় হাতের অক্ষর (A-Z) থাকতে হবে";
              }
              if (!/[0-9]/.test(value)) {
                return "পাসওয়ার্ডে অন্তত একটি সংখ্যা (0-9) থাকতে হবে";
              }
              return null;
            }}
          >
            <Label className="text-xs font-semibold text-gray-700">
              পাসওয়ার্ড
            </Label>
            <Input
              placeholder="••••••••••••"
              className="w-full bg-[#EBF1FA] border border-transparent focus:border-emerald-500 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-gray-800 outline-none transition"
            />
            <FieldError className="text-[11px] text-rose-500 mt-0.5 sm:mt-1" />
          </TextField>

          {/* সাইন ইন বাটন */}
          <div className="pt-1 sm:pt-2">
            <Button
              type="submit"
              className="w-full bg-[#0A7B3E] hover:bg-[#086834] text-white font-medium py-2.5 sm:py-3 px-4 rounded-lg transition-colors duration-200 text-xs sm:text-sm shadow-sm"
            >
              সাইন ইন
            </Button>
          </div>
        </form>

        <div className="divider my-1 sm:my-2 text-xs text-gray-400">অথবা</div>

        {/* সোশাল লগইন বাটনসমূহ: মোবাইলে একটির নিচে আরেকটি এবং ডেস্কটপ/ট্যাবলেটে পাশাপাশি */}
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

        {/* ফুটার লিঙ্ক */}
        <div className="text-center pt-1 sm:pt-2">
          <p className="text-xs text-gray-600">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/sign-up"
              className="text-[#0A7B3E] font-semibold hover:underline"
            >
              সাইন আপ করুন
            </Link>
          </p>
        </div>
      </div>

      {/* হোম পেজে ফিরে যাওয়ার লিংক */}
      <div className="mt-5 sm:mt-6 text-center">
        <Link
          href="/"
          className="text-xs text-[#0A7B3E] hover:underline transition font-medium"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
};

export default SignInPage;
