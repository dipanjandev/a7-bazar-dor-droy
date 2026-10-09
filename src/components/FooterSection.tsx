import React from "react";

const FooterSection = () => {
  return (
    <footer className="border-gray-300 mt-12 bg-white/50">
      <div className="container mx-auto px-4 py-6 sm:py-7 flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 font-normal">
        <p className="leading-relaxed">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>
        <p className="leading-relaxed text-gray-400 md:text-gray-500">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
