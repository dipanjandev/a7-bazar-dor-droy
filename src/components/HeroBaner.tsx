import React from "react";
import DateNav from "./DateNav";
import Image from "next/image";

const HeroBaner = () => {
  return (
    <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center px-5 py-7 sm:p-10 bg-white mt-4 sm:mt-10 rounded-3xl sm:rounded-xl shadow-sm sm:shadow-none gap-8 lg:gap-10 border border-gray-100 sm:border-transparent">
      {/* বাম পাশ: মোবাইলে উপরে এবং ডেস্কটপে বামে */}
      <div className="w-full lg:w-1/2 text-center lg:text-left flex flex-col items-center lg:items-start">
        <span className="inline-block bg-[#05893E]/10 text-[#05893E] px-3.5 py-1.5 sm:px-3 sm:py-2 rounded-full text-xs sm:text-sm font-medium">
          <DateNav />
        </span>

        <h3 className="font-bold text-2xl sm:text-3xl lg:text-4xl mt-4 sm:mt-8 lg:mt-10 text-slate-950 leading-tight">
          আজকের বাজারের দাম এক নজরে
        </h3>

        <p className="text-sm sm:text-base lg:text-lg text-slate-600 mt-3 sm:mt-4 leading-relaxed max-w-xl">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
          বিস্তারিত, গড়,{" "}
          <span className="hidden sm:inline">
            <br />
          </span>
          সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>

        <button className="mt-5 sm:mt-8 lg:mt-10 btn bg-[#05893E] hover:bg-[#046e32] text-white px-8 sm:px-10 py-2 sm:py-2.5 rounded-xl transition-colors duration-200 shadow-sm">
          সব পণ্য দেখুন
        </button>
      </div>

      {/* ডান পাশ: মোবাইলে নিচে এবং ডেস্কটপে ডানে */}
      <div className="w-full max-w-70 sm:max-w-100 lg:max-w-none lg:w-1/2 flex justify-center">
        <Image
          src={"/bazar-hero.svg"}
          width={700}
          height={700}
          alt="Hero Photo"
          priority
          className="w-full h-auto object-contain max-h-65 sm:max-h-95"
        />
      </div>
    </div>
  );
};

export default HeroBaner;
