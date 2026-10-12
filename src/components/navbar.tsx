"use client";
import Link from "next/link";
import { CloseCircle, HambergerMenu, Login } from "iconsax-react";
import React, { useContext, useState } from "react";
import { btnSun, display, focus } from "../common/utils/sharedStyle";
import { Logo } from "./logo";
import { userContext } from "../context/userContext/contextCreation";

const NAV_LINKS: [string, string][] = [
  ["Climate", "/Climate"],
  ["Governments", "/government"],
  ["riskMap", "/Risk"],
];
const Logged_NAV_LINKS: [string, string][] = [
  ["Dashboard", "/Dashboard"],
  ["riskEntry", "/RiskEntry"],
];

function Navbar() {
  const [menu, setMenu] = useState(false);
  const { userData } = useContext(userContext);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-3.5 z-30">
      <div className="pointer-events-auto mx-auto flex w-[calc(100%-2rem)] max-w-6xl items-center justify-between gap-3 rounded-full border border-white/15 bg-[#0a1620]/60 py-2.5 pl-4 pr-3 text-white backdrop-blur-xl">
        <Link
          href="/"
          className={`flex items-center gap-2.5 text-base font-bold ${display} ${focus} rounded-full`}
        >
          <Logo />
          Egypt Climate Map
        </Link>

        <nav aria-label="Primary" className="hidden gap-0.5 lg:flex">
          {NAV_LINKS.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className={`rounded-full px-3.5 py-2 text-[15px] font-medium text-[#d6e3ea] transition hover:bg-white/10 hover:text-white ${focus}`}
            >
              {label}
            </a>
          ))}
          {userData != null ? (
            <>
              {Logged_NAV_LINKS.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  className={`rounded-full px-3.5 py-2 text-[15px] font-medium text-[#d6e3ea] transition hover:bg-white/10 hover:text-white ${focus}`}
                >
                  {label}
                </a>
              ))}
            </>
          ) : (
            <></>
          )}
        </nav>

        {userData == null ? (
          <a
            href="/login"
            className={`hidden lg:inline-flex items-center gap-2 ${btnSun}`}
          >
            <Login size={18} variant="Bold" color="currentColor" />
            login
          </a>
        ) : (
          <></>
        )}

        <button
          type="button"
          className={`inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[15px] font-semibold text-white lg:hidden ${focus}`}
          aria-expanded={menu}
          aria-controls="mobile-nav"
          onClick={() => setMenu(!menu)}
        >
          {menu ? (
            <CloseCircle size={20} variant="Bulk" color="currentColor" />
          ) : (
            <HambergerMenu size={20} variant="Linear" color="currentColor" />
          )}
          {menu ? "Close" : "Menu"}
        </button>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Primary mobile"
        className={`pointer-events-auto mx-4 mt-2 rounded-3xl border border-white/15 bg-[#0a1620]/95 p-2 backdrop-blur-xl lg:hidden ${menu ? "block" : "hidden"}`}
      >
        {NAV_LINKS.map(([label, href]) => (
          <a
            key={label}
            href={href}
            onClick={() => setMenu(false)}
            className="block rounded-2xl px-4 py-3.5 font-semibold text-white hover:bg-white/10"
          >
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}

export default Navbar;
