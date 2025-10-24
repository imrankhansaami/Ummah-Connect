
import React from 'react';
import { CharityTransactionData } from '../../constants';
import { DocumentCheckIcon, CubeTransparentIcon } from '../ui/Icons';

export const CharityTracker: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-2">Transparent Charity Tracker</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        Follow your donations on the blockchain from your wallet to the final project.
      </p>

      <div className="flow-root">
        <ul className="-mb-8">
          {CharityTransactionData.map((tx, txIdx) => (
            <li key={tx.id}>
              <div className="relative pb-8">
                {txIdx !== CharityTransactionData.length - 1 ? (
                  <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-slate-200 dark:bg-slate-700" aria-hidden="true" />
                ) : null}
                <div className="relative flex space-x-3">
                  <div>
                    <span className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center ring-8 ring-white dark:ring-slate-800">
                      <DocumentCheckIcon className="h-5 w-5 text-white" />
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                    <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{tx.project}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            To <span className="font-mono">{tx.to}</span>
                        </p>
                    </div>
                    <div className="text-right text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                        <p className="font-bold text-gray-800 dark:text-gray-200">{tx.amount} ETH</p>
                        <time dateTime={tx.timestamp}>{tx.timestamp}</time>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
            <a href="#" className="flex items-center justify-center space-x-2 text-sm text-blue-600 dark:text-blue-500 font-semibold hover:underline">
                <CubeTransparentIcon />
                <span>View all transactions on Etherscan</span>
            </a>
        </div>
    </div>
  );
};