
import React from 'react';
import type { User, Page } from '../../types';
import { HomeIcon, WalletIcon, HeartIcon, BuildingStorefrontIcon, BellIcon, ChatBubbleLeftRightIcon } from '../ui/Icons';

interface HeaderProps {
  user: User;
  setActivePage: (page: Page) => void;
  activePage: Page;
}

export const Header: React.FC<HeaderProps> = ({ user, setActivePage, activePage }) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-slate-800 shadow-md z-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Side */}
          <div className="flex items-center space-x-2">
            <a href="#" onClick={() => setActivePage('feed')} className="flex items-center">
              <span className="text-2xl font-bold bg-blue-600 text-white rounded-full h-10 w-10 flex items-center justify-center">uc</span>
            </a>
            <div className="hidden sm:flex items-center bg-slate-100 dark:bg-slate-700 rounded-full px-3 py-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input type="text" placeholder="Search UmmahConnect" className="bg-transparent focus:outline-none ml-2 text-sm w-48" />
            </div>
          </div>

          {/* Center Nav */}
          <nav className="hidden md:flex flex-grow justify-center items-center space-x-2 lg:space-x-4">
             <HeaderIcon onClick={() => setActivePage('feed')} tooltip="Home" isActive={activePage === 'feed'}>
                <HomeIcon className="h-7 w-7" />
            </HeaderIcon>
             <HeaderIcon onClick={() => setActivePage('wallet')} tooltip="Wallet" isActive={activePage === 'wallet'}>
                <WalletIcon className="h-7 w-7" />
            </HeaderIcon>
            <HeaderIcon onClick={() => setActivePage('charity')} tooltip="Charity" isActive={activePage === 'charity'}>
                <HeartIcon className="h-7 w-7" />
            </HeaderIcon>
             <HeaderIcon onClick={() => setActivePage('nfts')} tooltip="Marketplace" isActive={activePage === 'nfts'}>
                <BuildingStorefrontIcon className="h-7 w-7" />
            </HeaderIcon>
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-2">
             <HeaderActionIcon tooltip="Messages">
                <ChatBubbleLeftRightIcon />
             </HeaderActionIcon>
             <HeaderActionIcon tooltip="Notifications">
                <BellIcon />
             </HeaderActionIcon>
            <button onClick={() => setActivePage('profile')} className="flex items-center space-x-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full p-1 pr-3 transition">
              <img src={user.profilePicture} alt={user.name} className="h-8 w-8 rounded-full object-cover" />
              <span className="hidden sm:block font-semibold text-sm">{user.name.split(' ')[0]}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

interface HeaderIconProps {
    children: React.ReactNode;
    tooltip: string;
    onClick: () => void;
    isActive: boolean;
}

const HeaderIcon: React.FC<HeaderIconProps> = ({ children, tooltip, onClick, isActive }) => (
    <div className="relative group flex-grow max-w-28">
        <button 
            onClick={onClick} 
            className={`w-full h-14 px-4 lg:px-8 rounded-lg flex items-center justify-center transition-colors relative ${isActive ? 'text-blue-600 dark:text-blue-500' : 'text-gray-500 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
        >
           {children}
           {isActive && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 dark:bg-blue-500 rounded-t-sm"></div>}
        </button>
        <div className="absolute top-full mt-2 whitespace-nowrap text-xs bg-gray-800 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {tooltip}
        </div>
    </div>
);

interface HeaderActionIconProps {
    children: React.ReactNode;
    tooltip: string;
}

const HeaderActionIcon: React.FC<HeaderActionIconProps> = ({ children, tooltip }) => (
    <div className="relative group">
        <button className="h-10 w-10 flex items-center justify-center bg-slate-200 dark:bg-slate-700 rounded-full text-gray-700 dark:text-gray-200 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">
           {children}
        </button>
        <div className="absolute top-full mt-2 right-0 whitespace-nowrap text-xs bg-gray-800 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {tooltip}
        </div>
    </div>
);
