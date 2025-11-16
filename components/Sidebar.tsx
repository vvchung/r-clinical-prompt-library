import React from 'react';
import { NAV_ITEMS } from '../constants';
import { CodeBracketIcon } from './icons';

interface SidebarProps {
  activeNav: string;
  setActiveNav: (name: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeNav, setActiveNav }) => {
  return (
    <aside className="w-64 bg-slate-800 text-white flex flex-col hidden md:flex">
      <div className="p-6 flex items-center gap-3 border-b border-slate-700">
        <CodeBracketIcon className="h-8 w-8 text-blue-400" />
        <div>
            <h1 className="text-xl font-bold">臨床統計 AI</h1>
            <span className="text-xs text-slate-400">R Language</span>
        </div>
      </div>
      <nav className="flex-1 px-4 py-6">
        <ul>
          {NAV_ITEMS.map(item => (
            <li key={item.name}>
              <button
                onClick={() => setActiveNav(item.name)}
                className={`w-full text-left flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  activeNav === item.name
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-slate-700">
        <p className="text-xs text-slate-400">&copy; 2025 VIVI Studio.</p>
      </div>
    </aside>
  );
};

export default Sidebar;