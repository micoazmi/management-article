"use client";

import { useEffect, useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon, User } from "lucide-react";
import { LogOut } from "lucide-react";

export default function Navbar2({ user, setUser }) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    document.body.style.overflow = showLogoutModal ? "hidden" : "auto";
  }, [showLogoutModal]);

  return (
    <div className="relative z-20 flex justify-between items-center px-6 py-4 border-b border-gray-300">
      <img src="/Frame.png" alt="Logo" />
      <div className="flex items-center gap-2">
        {user ? (
          <Menu as="div" className="relative inline-block text-left">
            <MenuButton className="flex items-center gap-2 text-black px-3 py-2 rounded hover:bg-white/10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50">
              <User className="w-8 h-8 rounded-full bg-gray-200 p-1 text-gray-600" />
              <span className="font-medium text-sm">{user.username}</span>
              <ChevronDownIcon className="w-4 h-4 text-white" />
            </MenuButton>

            <MenuItems className="absolute right-0 mt-2 w-40 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black/5 focus:outline-none z-50">
              <div className="py-1">
                <MenuItem>
                  {({ active }) => (
                    <a
                      href="/profile"
                      className={`block px-4 py-2 text-sm ${
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                      }`}
                    >
                      My Account
                    </a>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ active }) => (
                    <button
                      onClick={() => setShowLogoutModal(true)}
                      className={`w-full text-left block px-4 py-2 text-sm ${
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                      }`}
                    >
                      <div className="flex items-center gap-2 text-red-600">
                        <LogOut className="w-4 h-4 text-red-600" />
                        Logout
                      </div>
                    </button>
                  )}
                </MenuItem>
              </div>
            </MenuItems>

            {/* Logout Modal */}
            {showLogoutModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6">
                  <h2 className="text-lg font-semibold mb-2">Logout</h2>
                  <p className="text-sm text-gray-600 mb-4">
                    Are you sure you want to logout?
                  </p>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setShowLogoutModal(false)}
                      className="px-4 py-2 text-sm rounded bg-gray-100 hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        localStorage.removeItem("auth");
                        setUser(null);
                        setShowLogoutModal(false);
                      }}
                      className="px-4 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Menu>
        ) : (
          <a
            href="/auth/login"
            className="bg-white text-blue-600 font-semibold px-4 py-2 rounded hover:bg-blue-100 text-sm"
          >
            Login
          </a>
        )}
      </div>
    </div>
  );
}
