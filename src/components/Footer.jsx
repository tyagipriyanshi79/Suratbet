import React from "react";
import { FaDiscord, FaYoutube, FaMedium } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-blue-50 text-white-50 px-8 py-10">
      <div className="max-w-screen-xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-10 text-sm">
        {/* Logo */}
        <div className="col-span-1 flex flex-col items-start">
          <img src="/img/logo.png" alt="logo" className="w-10" />
        </div>

        {/* Explore */}
        <div>
          <h4 className="text-xs font-semibold mb-2 tracking-wider">E-MAIL</h4>
          <ul className="space-y-2">
            <li>destek@suratbet.com</li>
            <li>finans@suratbet.com</li>
            <li>bonus@suratbet.com</li>
          </ul>
        </div>

        {/* Products */}
        <div>
          <h4 className="text-xs font-semibold mb-2 tracking-wider">Ortaklık Programı</h4>
          <ul className="space-y-2">
            <li>Radiant</li>
            <li className="flex items-center gap-1">
              Nexus{" "}
              <span className="text-sm">
                ↗
              </span>
            </li>
            <li>Zigma</li>
            <li>Azul</li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h4 className="text-xs font-semibold mb-2 tracking-wider">FOLLOW US</h4>
          <ul className="space-y-2">
            <li className="flex items-center gap-2"><FaDiscord /> Discord</li>
            <li className="flex items-center gap-2"><FaXTwitter /> X</li>
            <li className="flex items-center gap-2"><FaYoutube /> Youtube</li>
            <li className="flex items-center gap-2"><FaMedium /> Medium</li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-xs font-semibold mb-2 tracking-wider">RESOURCES</h4>
          <ul className="space-y-2">
            <li>Media Kit</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-screen-xl mx-auto mt-10 flex justify-between items-center text-xs text-black">
        <p>©ZENTRY 2024. ALL RIGHTS RESERVED</p>
        <p className="text-right">PRIVACY POLICY</p>
      </div>
    </footer>
  );
};

export default Footer;
