import React from 'react';
import { MoreVertical } from 'lucide-react';

interface NavbarProps {
  username: string;
  isAdmin: boolean;
  onAdminClick: () => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  username,
  isAdmin,
  onAdminClick,
  onLogout,
}) => {
  const [showMenu, setShowMenu] = React.useState(false);

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold">MAPSCORE</h1>
            <span className="text-sm text-gray-400">Welcome, {username}</span>
          </div>

          <div className="flex items-center gap-4">
            {isAdmin && (
              <button
                onClick={onAdminClick}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-semibold transition"
              >
                ADMIN
              </button>
            )}

            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 hover:bg-gray-800 rounded"
              >
                <MoreVertical size={20} />
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded shadow-lg">
                  <button
                    onClick={onLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-700 rounded"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
