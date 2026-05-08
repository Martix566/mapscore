import React from 'react';
import { Trophy, Users, Heart, Flag } from 'lucide-react';

interface SidebarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Sidebar: React.FC<SidebarProps> = ({ onNavigate, currentPage }) => {
  const menuItems = [
    { id: 'matches', label: 'Matches', icon: Trophy },
    { id: 'standings', label: 'Standings', icon: Trophy },
    { id: 'favorites', label: 'Favorite Countries', icon: Heart },
    { id: 'teams', label: 'National Teams', icon: Users },
  ];

  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <div className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded transition ${
                currentPage === item.id
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-700 text-gray-300'
              }`}
            >
              <Icon size={20} />
              <span className="font-semibold">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
