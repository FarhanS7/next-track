import { Search, Settings } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-black">
      {/* Search Bar */}
      <div className="flex items-center gap-8">
        <div className="relative flex h-min w-[300px]">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400 dark:text-gray-500" />
          <input
            type="search"
            placeholder="Search tasks, projects..."
            className="w-full rounded-lg border border-gray-200 bg-white p-2.5 pl-10 text-sm placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-400"
          />
        </div>
      </div>

      {/* icons */}
      <div className="flex items-center gap-2">
        <Link
          href="/settings"
          className="rounded-lg p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <Settings className="h-5 w-5 text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
