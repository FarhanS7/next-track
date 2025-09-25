import React from "react";
import Navbar from "./(components)/Navbar/page";
import Sidebar from "./(components)/Sidebar/page";

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <Sidebar />
      <main
        className={`dark:bg-dark-bg flex w-full flex-col bg-gray-50 md:pl-64`}
      >
        {/* navbar */}
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default DashboardWrapper;
