
import React from 'react';
import type { User, Page } from '../../types';
import { HomeIcon, UserCircleIcon, WalletIcon, HeartIcon, BuildingStorefrontIcon, UsersIcon, Cog6ToothIcon } from '../ui/Icons';

interface LeftSidebarProps {
  user: User;
  activePage: Page;
  setActivePage: (page: Page) => void;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({ user, activePage, setActivePage }) => {
  return (
    <div className="sticky top-20 space-y-4 max-w-sm">
      <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
        <div className="flex flex-col items-center text-center">
          <img src={user.profilePicture} alt={user.name} className="h-16 w-16 rounded-full object-cover border-2 border-blue-600" />
          <h3 className="font-bold mt-2 text-md">{user.name}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">@{user.username}</p>
        </div>
        <div className="flex justify-around mt-4 text-center text-sm">
          <div>
            <p className="font-bold">{user.followers}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Followers</p>
          </div>
          <div>
            <p className="font-bold">{user.following}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Following</p>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-slate-800 p-2 rounded-lg shadow">
        <nav className="space-y-1">
          <NavItem icon={<HomeIcon />} label="Feed" isActive={activePage === 'feed'} onClick={() => setActivePage('feed')} />
          <NavItem icon={<UserCircleIcon />} label="Profile" isActive={activePage === 'profile'} onClick={() => setActivePage('profile')} />
          <NavItem icon={<WalletIcon />} label="Wallet" isActive={activePage === 'wallet'} onClick={() => setActivePage('wallet')} />
          <NavItem icon={<HeartIcon />} label="Charity" isActive={activePage === 'charity'} onClick={() => setActivePage('charity')} />
          <NavItem icon={<BuildingStorefrontIcon />} label="NFTs" isActive={activePage === 'nfts'} onClick={() => setActivePage('nfts')} />
          <NavItem icon={<UsersIcon />} label="Groups" isActive={activePage === 'groups'} onClick={() => alert('Groups page not implemented.')} />
          <NavItem icon={<Cog6ToothIcon />} label="Settings" isActive={false} onClick={() => alert('Settings not implemented.')} />
        </nav>
      </div>
    </div>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive, onClick }) => (
  <a
    href="#"
    onClick={(e) => { e.preventDefault(); onClick(); }}
    className={`flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-500 font-semibold'
        : 'text-gray-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-700'
    }`}
  >
    <div className={isActive ? 'text-blue-600 dark:text-blue-500' : 'text-gray-500'}>{icon}</div>
    <span>{label}</span>
  </a>
);
