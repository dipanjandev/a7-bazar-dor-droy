import Image from "next/image";
import CategoryList from "./CategoryList";
import { Suspense } from "react";

const NavBar = () => {
  return (
    <div>
      {/* Left side and right side option */}
      <div className="flex justify-between items-center container mx-auto">
        <div className="flex items-center gap-3 py-2">
          <div className="h-auto w-auto bg-green-700 p-2 rounded-lg">
            <Image
              src={"/logo-icon.png"}
              width={30}
              height={30}
              alt="Header Logo"
            />
          </div>
          <div>
            <h1 className="font-bold text-2xl">বাজার দর</h1>
            <h4 className="font-normal text-sm">এখানে ডেট এবং টাইম হবে</h4>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="btn">সাইন ইন</button>
          <button className="btn bg-green-700 text-white">সাইন আপ</button>
        </div>
      </div>
      <div className="border border-gray-100" />

      {/* Category List */}
      <div className="container mx-auto">
        <Suspense
          fallback={
            <div className="grid place-items-center w-full">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          }
        >
          <CategoryList />
        </Suspense>
      </div>
    </div>
  );
};

export default NavBar;
