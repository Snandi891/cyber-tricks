import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaYoutube,
  FaGithub,
  FaDiscord,
  FaRss,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; // For "X" (Twitter)

const Links2 = () => {
  return (
    <div className="bg-gray-900 p-4 flex justify-center gap-6">
      <a href="#" target="_blank" rel="noopener noreferrer">
        <FaFacebookF className="text-white text-2xl hover:text-blue-500" />
      </a>
      <a href="#" target="_blank" rel="noopener noreferrer">
        <FaInstagram className="text-white text-2xl hover:text-pink-500" />
      </a>
      <a href="#" target="_blank" rel="noopener noreferrer">
        <FaXTwitter className="text-white text-2xl hover:text-gray-300" />
      </a>
      <a href="#" target="_blank" rel="noopener noreferrer">
        <FaLinkedinIn className="text-white text-2xl hover:text-blue-400" />
      </a>
      <a href="#" target="_blank" rel="noopener noreferrer">
        <FaTiktok className="text-white text-2xl hover:text-gray-300" />
      </a>

      {/* ✅ YouTube Icon - Working Link */}
      <a
        href="https://www.youtube.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaYoutube className="text-white text-2xl hover:text-red-500" />
      </a>

      <a href="#" target="_blank" rel="noopener noreferrer">
        <FaGithub className="text-white text-2xl hover:text-gray-400" />
      </a>
      <a href="#" target="_blank" rel="noopener noreferrer">
        <FaDiscord className="text-white text-2xl hover:text-indigo-400" />
      </a>
      <a href="#" target="_blank" rel="noopener noreferrer">
        <FaRss className="text-white text-2xl hover:text-orange-400" />
      </a>
    </div>
  );
};

export default Links2;
