
import React from 'react';
import { ArrowDownIcon, ArrowUpIcon, BanknotesIcon } from '../ui/Icons';

export const Wallet: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-2">My Wallet</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Your decentralized identity and assets on UmmahConnect.</p>
      
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6 rounded-xl shadow-lg">
        <p className="text-sm opacity-80">Total Balance</p>
        <p className="text-4xl font-bold mt-1">1.25 ETH</p>
        <p className="text-lg opacity-90 mt-1">≈ $4,250.75 USD</p>
        <div className="mt-4 text-xs font-mono opacity-70 break-all">
          Wallet Address: 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <button className="flex flex-col items-center justify-center p-4 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition">
          <ArrowUpIcon className="text-red-500" />
          <span className="mt-1 text-sm font-semibold">Send</span>
        </button>
        <button className="flex flex-col items-center justify-center p-4 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition">
          <ArrowDownIcon className="text-green-500" />
          <span className="mt-1 text-sm font-semibold">Receive</span>
        </button>
        <button className="flex flex-col items-center justify-center p-4 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition">
          <BanknotesIcon className="text-blue-600" />
          <span className="mt-1 text-sm font-semibold">Buy/Sell</span>
        </button>
      </div>

      <div className="mt-8">
        <h3 className="font-bold">Recent Activity</h3>
        <ul className="mt-3 space-y-2">
            <li className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-md">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-red-100 dark:bg-red-500/10 rounded-full"><ArrowUpIcon className="text-red-500" /></div>
                    <div>
                        <p className="font-semibold text-sm">Donation to Masjid Fund</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">July 28, 2024</p>
                    </div>
                </div>
                <p className="font-semibold text-sm text-red-600">-0.05 ETH</p>
            </li>
             <li className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-md">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 dark:bg-green-500/10 rounded-full"><ArrowDownIcon className="text-green-500"/></div>
                    <div>
                        <p className="font-semibold text-sm">Received from @fatima_z</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">July 27, 2024</p>
                    </div>
                </div>
                <p className="font-semibold text-sm text-green-600">+0.1 ETH</p>
            </li>
        </ul>
      </div>
    </div>
  );
};