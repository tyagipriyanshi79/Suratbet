import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white px-6 py-10 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo Section */}
        <div>
          <h2 className="text-2xl font-semibold">
            <span className="text-white">Surat</span>
            <span className="text-lime-400">Bet</span>
          </h2>
          <p className="text-sm mt-2 text-gray-400">FUNDAMENTAL ENTERTAINMENT</p>
          <div className="flex items-center space-x-4 mt-4">
            <FaFacebookF />
            <FaInstagram />
            <FaTiktok />
            <FaLinkedinIn />
            <FaTwitter />
            <FaYoutube />
          </div>
        </div>

        {/* Links 1 */}
        <div>
          <h3 className="font-semibold mb-3 text-lime-400">Explore</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#">Home</a></li>
            <li><a href="#">How It Works</a></li>
            <li><a href="#">Live Games</a></li>
            <li><a href="#">About Us</a></li>
          </ul>
        </div>

        {/* Links 2 */}
        <div>
          <h3 className="font-semibold mb-3 text-lime-400">Support</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Terms of Use</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-3 text-lime-400">Contact</h3>
          <p className="text-sm text-gray-300">For any queries or support:</p>
          <a
            href="mailto:team@suratbet.com"
            className="text-lime-400 text-sm hover:underline mt-2 inline-block"
          >
            team@suratbet.com
          </a>
          <button className="mt-4 bg-lime-400 text-black px-4 py-2 rounded hover:bg-lime-300 transition">
            CONTACT US
          </button>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} SuratBet. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
