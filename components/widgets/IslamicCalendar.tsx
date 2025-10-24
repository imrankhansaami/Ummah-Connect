
import React from 'react';
import { IslamicEventsData } from '../../constants';
import { CalendarDaysIcon } from '../ui/Icons';

export const IslamicCalendar: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-md">Islamic Calendar</h3>
        <p className="text-sm font-semibold text-blue-600 dark:text-blue-500">1 Dhul-Hijjah 1445</p>
      </div>
      <h4 className="font-semibold text-sm mb-2 text-gray-600 dark:text-gray-300">Upcoming Events</h4>
      <ul className="space-y-2 text-sm">
        {IslamicEventsData.map((event) => (
          <li key={event.name} className="flex items-center space-x-2">
            <CalendarDaysIcon className="text-blue-600 dark:text-blue-500"/>
            <div>
                <p className="text-gray-800 dark:text-gray-200 font-medium">{event.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{event.date}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};