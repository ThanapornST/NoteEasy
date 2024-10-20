import React from "react";

function Header({ onSortByDate, onSortByTitle, onSortByEdit }) {
  return (
    <header className="bg-blue-900 text-white p-4 fixed w-full top-0 left-0 z-50 flex justify-between items-center">
      <h1 className="font-mono font-light text-4xl">Note Easy</h1>
      <div className="flex gap-2">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={() => onSortByEdit()}>
          History Editing
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={() => onSortByDate()}>
          Sort by Date
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={() => onSortByTitle()}>
          Sort A-Z
        </button>
      </div>
    </header>
  );
}

export default Header;
