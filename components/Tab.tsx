import React from "react";
interface TabType {
  id: number;
  tab: number;
  onClick: () => void;
  children: React.ReactNode;
}

function Tab({ children, tab, id, onClick }: TabType) {
  return (
    <button
      onClick={onClick}
      className={`${
        tab === id ? "bg-coral-red text-white" : "bg-white text-black"
      }  rounded-md px-4 py-2 mt-3 flex gap-2 transition duration-200 w-fit`}
    >
      {children}
    </button>
  );
}

export default Tab;
