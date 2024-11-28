import React from "react";
import Link from "next/link"; // Import Link from Next.js

const Header = () => {
  return (
    <div className="container-fluid p-3 shadow-sm bg-light">
      <div className="d-flex justify-content-between align-items-center">
        {/* Logo Section */}
        <div className="h4 text-dark">
          {/* Replace with your logo or branding */}
          Logo
        </div>

        {/* Navigation Links */}
        <nav>
          <ul className="d-flex list-unstyled m-0">
            <li className="mr-4">
              <Link
                href="/"
                passHref
                className="text-primary text-decoration-none hover:text-dark"
              >
                Home
              </Link>
            </li>
            <li className="ml-4">
              <Link
                href="/favorites"
                passHref
                className="text-primary text-decoration-none hover:text-dark"
              >
                Favorites
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
