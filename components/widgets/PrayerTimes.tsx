
import React from 'react';
import { PrayerTimesData } from '../../constants';

export const PrayerTimes: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
      <h3 className="font-bold text-md mb-3">Prayer Times</h3>
      <ul className="space-y-2 text-sm">
        {PrayerTimesData.map((prayer) => (
          <li key={prayer.name} className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-300">{prayer.name}</span>
            <span className="font-semibold text-gray-800 dark:text-gray-100">{prayer.time}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 flex items-center space-x-3">
        <QiblaCompass />
        <div>
          <p className="font-semibold text-sm">Qibla Direction</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">28° NE from your location</p>
        </div>
      </div>
    </div>
  );
};

const QiblaCompass: React.FC = () => (
    <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center relative">
        <div className="absolute text-xs text-gray-400 top-0">N</div>
        <div className="absolute text-xs text-gray-400 bottom-0">S</div>
        <div className="absolute text-xs text-gray-400 left-1">W</div>
        <div className="absolute text-xs text-gray-400 right-1">E</div>
        <div 
            className="h-8 w-1 bg-blue-600 rounded-full transform origin-center" 
            style={{ transform: 'rotate(28deg)' }}
        >
             <div className="w-2 h-2 rounded-full bg-blue-600 absolute -top-1 -left-0.5"></div>
        </div>
    </div>
);