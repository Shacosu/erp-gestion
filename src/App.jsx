import React, { useEffect, useState } from "react";
import Home from "./views/Home";

function App() {

	return (
    <div className="">
      <header className="h-20 bg-slate-800 text-gray-300">
        <div className="container mx-auto flex items-center h-full">
          <h1 className="text-3xl">ERP-System</h1>
        </div>
      </header>
      <main className="container mx-auto p-4">
        <Home />
      </main>
    </div>
  );
}

export default App;