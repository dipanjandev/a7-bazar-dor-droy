const Loading = () => {
  return (
    <div className="min-h-screen bg-[#F4F6F4] pb-16">
      {/* ১. সেন্ট্রাল মডার্ন স্পিনার ও ব্র্যান্ড অ্যানিমেশন */}
      <div className="py-12 sm:py-16 flex flex-col items-center justify-center text-center px-4">
        <div className="relative flex items-center justify-center">
          {/* ব্যাকগ্রাউন্ড পালসিং গ্লো */}
          <div className="absolute size-20 sm:size-24 rounded-full bg-emerald-500/15 animate-ping duration-1000" />

          {/* বাইরের ঘূর্ণায়মান প্রগ্রেসিভ রিং */}
          <div className="size-16 sm:size-20 rounded-full border-3 border-emerald-100 border-t-[#05893E] animate-spin" />

          {/* ভেতরের কার্ট আইকন */}
          <div className="absolute flex items-center justify-center size-12 sm:size-14 rounded-full bg-white shadow-sm border border-gray-100 text-xl sm:text-2xl animate-bounce">
            🛒
          </div>
        </div>

        {/* টেক্সট লোডার */}
        <div className="mt-5 space-y-1">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
            বাজারের হালনাগাদ তথ্য লোড হচ্ছে...
          </h3>
          <p className="text-xs sm:text-sm text-gray-500">
            অনুগ্রহ করে কিছুক্ষণ অপেক্ষা করুন
          </p>
        </div>
      </div>

      {/* ২. হিরো ব্যানার স্কেলেটন */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-0">
        <div className="bg-white rounded-3xl sm:rounded-2xl p-6 sm:p-10 border border-gray-100 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8 animate-pulse">
          <div className="w-full lg:w-1/2 space-y-4">
            <div className="h-6 w-36 bg-emerald-50 rounded-full" />
            <div className="h-9 w-3/4 bg-gray-200 rounded-xl" />
            <div className="space-y-2 pt-2">
              <div className="h-4 w-full bg-gray-100 rounded-md" />
              <div className="h-4 w-5/6 bg-gray-100 rounded-md" />
            </div>
            <div className="h-10 w-36 bg-gray-200 rounded-xl pt-2" />
          </div>
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="size-52 sm:size-64 bg-gray-100 rounded-2xl" />
          </div>
        </div>

        {/* ৩. প্রোডাক্ট সেকশন স্কেলেটন (কার্ড গ্রিড) */}
        <div className="mt-10 sm:mt-12 space-y-6">
          {/* সেকশন হেডার স্কেলেটন */}
          <div className="flex items-center justify-between animate-pulse">
            <div className="flex items-center gap-2.5">
              <div className="size-6 bg-emerald-100 rounded-full" />
              <div className="h-6 w-36 sm:w-44 bg-gray-200 rounded-lg" />
            </div>
            <div className="h-8 w-24 bg-gray-200 rounded-lg hidden sm:block" />
          </div>

          {/* প্রোডাক্ট কার্ড গ্রিড (মোবাইলে ১টি, ট্যাবলেটে ২টি, ডেস্কটপে ৩টি) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-36 sm:h-40 animate-pulse"
              >
                {/* কার্ডের উপরের অংশ */}
                <div className="flex items-center gap-3">
                  <div className="size-11 sm:size-12 rounded-xl bg-gray-100 shrink-0" />
                  <div className="space-y-2 flex-1">
                    <div className="h-4 w-2/3 bg-gray-200 rounded" />
                    <div className="h-3 w-1/3 bg-gray-100 rounded" />
                  </div>
                </div>

                {/* কার্ডের নিচের অংশ: দাম ও ব্যাজ */}
                <div className="flex items-end justify-between pt-2">
                  <div className="space-y-1.5">
                    <div className="h-2.5 w-14 bg-gray-100 rounded" />
                    <div className="h-5 w-24 bg-gray-200 rounded-md" />
                  </div>
                  <div className="h-6 w-16 bg-gray-100 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
