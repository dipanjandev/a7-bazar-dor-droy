import React from "react";
import DateNav from "./DateNav";
import Image from "next/image";

const HeroBaner = () => {
  return (
    <div className="container mx-auto flex justify-between items-center p-10 bg-white mt-10 rounded-xl">
      {/* Left Side div */}
      <div>
        <span className="bg-[#05893E]/10 text-[#05893E] px-3 py-2 rounded-4xl">
          <DateNav />
        </span>
        <h3 className="font-bold text-4xl mt-10 text-slate-950">
          আজকের বাজারের দাম এক নজরে
        </h3>
        <p className="text-lg text-slate-600">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
          বিস্তারিত, গড়, <br /> সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক
          জায়গায়।
        </p>
        <button className="mt-10 btn bg-[#05893E] text-white px-10">
          সব পণ্য দেখুন
        </button>
      </div>
      {/* Right side Div */}
      <div className="w-150 h-auto">
        <Image
          src={"/bazar-hero.svg"}
          width={700}
          height={700}
          alt="Hero Photo"
        />
      </div>
    </div>
  );
};

export default HeroBaner;
