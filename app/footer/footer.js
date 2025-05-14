import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#2563EBDB] text-white py-4 mt-10 border-t border-blue-700">
      <div className="container mx-auto px-4 flex items-center justify-center gap-3">
        <img src="/Logo.png" alt="Logo" className="h-6 w-auto" />
        <span className="text-sm">© 2025 Blog genzet. All rights reserved.</span>
      </div>
    </footer>
  );
}
