
import React from 'react';
import { NftData } from '../../constants';
import type { Nft } from '../../types';

export const NftGallery: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-2">Islamic Art NFT Marketplace</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        Own a piece of digital heritage. A portion of all proceeds goes to charity.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {NftData.map((nft) => (
          <NftCard key={nft.id} nft={nft} />
        ))}
      </div>
    </div>
  );
};

const NftCard: React.FC<{ nft: Nft }> = ({ nft }) => (
  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg overflow-hidden shadow-md group transition-all hover:shadow-xl hover:scale-105">
    <img src={nft.imageUrl} alt={nft.title} className="w-full h-40 object-cover" />
    <div className="p-3">
      <h4 className="font-bold text-sm truncate">{nft.title}</h4>
      <p className="text-xs text-gray-500 dark:text-gray-400">by {nft.artist}</p>
      <div className="flex justify-between items-center mt-3">
        <p className="text-sm font-semibold text-blue-600 dark:text-blue-500">{nft.price} ETH</p>
        <button className="bg-blue-600 text-white px-3 py-1 text-xs font-semibold rounded-full hover:bg-blue-700 transition opacity-0 group-hover:opacity-100">
          Buy
        </button>
      </div>
    </div>
  </div>
);