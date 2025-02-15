"use client";

import Link from "next/link";
import React, { useState } from "react";
import data from "@/data/header-data.json";
import { Menu, X, Settings, User, ChevronRight } from "lucide-react";

const Header: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen((prev) => !prev);

    return (
        <header className="w-full shadow-md">
            <div className="w-full bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto   sm:px-6 lg:px-2">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo and brand name */}
                        <div className="flex items-center">
                            <span className="text-2xl font-bold text-black">
                                State <span className="text-orange-400">3</span><span className="text-gray-400">
                                    6</span><span className="text-green-500">0</span>
                            </span>
                        </div>

                        {/* Right-side navigation items */}
                        <div className="flex items-center space-x-4">
                            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                                <Settings className="h-5 w-5 text-gray-600" />
                            </button>

                            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                                <User className="h-5 w-5 text-gray-600" />
                            </button>

                            <button className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-700 transition-colors">
                                <Link
                                    href= "/mapdata"
                                    className="text-sm lg:text-lg font-extrabold"
                                    aria-label={`Navigate to Map Data`}
                                >
                                    Explore
                                </Link>
                                <ChevronRight className="ml-2 h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative w-full py-2 shadow-lg bg-indigo-900 text-white">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: "url('/image/navbar_bg.png')",
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                        opacity: 0.1,
                    }}
                />
                <div className="relative z-10 max-w-7xl mx-auto px-4">
                    <nav className="hidden md:flex justify-evenly space-x-4 lg:space-x-8 py-3">
                        {data.navLinks.map((link, index) => (
                            <Link
                                key={index}
                                href={link.href}
                                className="text-sm lg:text-lg font-extrabold hover:text-indigo-200 transition-colors"
                                aria-label={`Navigate to ${link.label}`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Mobile Menu */}
                    <div className="md:hidden flex items-center justify-between">
                        <button
                            onClick={toggleMenu}
                            className="text-white focus:outline-none"
                            aria-label={menuOpen ? "Close menu" : "Open menu"}
                        >
                            {menuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                        <div className="sm:hidden w-full flex items-center justify-evenly space-x-2">
                            {data.images.map((image, idx) => (
                                <Link
                                    key={idx}
                                    href={image.link}
                                    target="_blank"
                                    className="w-8 h-8 overflow-hidden rounded-full"
                                    aria-label={`Visit ${image.alt}`}
                                >
                                    <img
                                        src={image.src}
                                        alt={image.alt}
                                        className="w-full h-full object-cover"
                                    />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {menuOpen && (
                        <nav className="md:hidden flex flex-col space-y-2 py-2">
                            {data.navLinks.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.href}
                                    className="px-4 py-2 text-white hover:bg-indigo-800 transition-colors"
                                    onClick={() => setMenuOpen(false)}
                                    aria-label={`Navigate to ${link.label}`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
