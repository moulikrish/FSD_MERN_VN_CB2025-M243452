import React from "react";

const Footer = () => {
  return (
    <footer className="bg-green-900 text-green-100 py-6">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
        <p className="text-sm">© 2025 PosBooks. All rights reserved.</p>

        <div className="flex gap-4 mt-3 sm:mt-0">
          <a
            href="#"
            className="hover:text-green-50 transition-colors duration-300"
          >
            Privacy
          </a>
          <a
            href="#"
            className="hover:text-green-50 transition-colors duration-300"
          >
            Terms
          </a>
          <a
            href="#"
            className="hover:text-green-50 transition-colors duration-300"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
