import React from "react";
import { container, display } from "../common/utils/sharedStyle";
import { Global } from "iconsax-react";

function Footer() {
  return (
    <footer className="bg-[#0a1620] pb-9 pt-14 text-sm text-[#9fb2be]">
      <div className={container}>
        <div className="flex flex-wrap justify-between gap-6">
          <div
            className={`${display} flex max-w-[22ch] items-start gap-3 text-[22px] font-bold leading-tight text-white`}
          >
            <Global
              size={30}
              variant="Bulk"
              color="#5fd0c5"
              className="mt-0.5 flex-none"
            />
            Climate information for every Egyptian community.
          </div>
          <div className="max-w-sm">
            <div className="text-white">About this site</div>
            <p className="mt-1.5">
              Brings climate information for Egypt into one place so residents,
              farmers, planners, and students can understand local risks.
            </p>
          </div>
        </div>
        <p className="mt-9 border-t border-white/10 pt-5 text-[13px]">
          Demo page. Ratings and chart values are illustrative. Add official
          data sources and partner logos before publishing.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
