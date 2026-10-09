import CategoryList from "./CategoryList";
import { Suspense } from "react";
import Marquee from "./Marquee";
import Link from "next/link";
import DateNav from "./DateNav";
import UserStatus from "./UserStatus";

const NavBar = () => {
  return (
    <div>
      {/* Left side and right side option */}
      <div className="flex justify-between items-center container mx-auto">
        <Link href={"/"}>
          <div className="flex items-center gap-3 py-2">
            <span className="grid size-10 place-items-center rounded-xl bg-green-700 text-lg text-primary-content">
              🛒
            </span>

            <div>
              <h1 className="font-bold text-2xl">বাজার দর</h1>
              {/* Date Under the logo */}
              <DateNav />
            </div>
          </div>
        </Link>
        {/* নিচের কম্পোনেন্টে ইউজার এর জন্য লগিন বাটন এবং লগিন ‍থাকলে ইনফরমেশন বাটন রয়েছে */}
        <UserStatus />
      </div>
      <div className="border border-gray-100" />

      {/* Category List */}
      <div>
        <Suspense
          fallback={
            <div className="grid place-items-center w-full h-26">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          }
        >
          <div className="container mx-auto">
            <CategoryList />
          </div>
          <Marquee />
        </Suspense>
      </div>
    </div>
  );
};

export default NavBar;
