
import React from 'react';
import { PrayerTimes } from '../widgets/PrayerTimes';
import { IslamicCalendar } from '../widgets/IslamicCalendar';
import type { User } from '../../types';

interface RightSidebarProps {
    users: User[];
    handleFollowUser: (userId: string) => void;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({ users, handleFollowUser }) => {
  return (
    <div className="sticky top-20 space-y-4 max-w-sm ml-auto">
      <PrayerTimes />
      <IslamicCalendar />
       <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
        <h3 className="font-bold text-md mb-3">People You May Know</h3>
        <ul className="space-y-4">
          {users.map(user => (
            <SuggestedUser key={user.id} user={user} onFollow={() => handleFollowUser(user.id)} />
          ))}
        </ul>
      </div>
    </div>
  );
};

interface SuggestedUserProps {
    user: User;
    onFollow: () => void;
}

const SuggestedUser: React.FC<SuggestedUserProps> = ({ user, onFollow }) => (
    <li className="flex items-center space-x-3">
        <img src={user.profilePicture} alt={user.name} className="h-12 w-12 rounded-full object-cover"/>
        <div className="flex-1">
            <p className="font-semibold text-sm">{user.name}</p>
            <p className="text-xs text-gray-500">@{user.username}</p>
            <div className="flex items-center space-x-2 mt-1.5">
                <button 
                  onClick={onFollow}
                  className={`flex-1 px-4 py-1 text-xs font-semibold rounded-md transition ${user.isFollowedByCurrentUser ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                >
                    {user.isFollowedByCurrentUser ? 'Following' : 'Follow'}
                </button>
                 <button className="flex-1 bg-slate-200 dark:bg-slate-600 text-gray-800 dark:text-gray-200 px-4 py-1 text-xs font-semibold rounded-md hover:bg-slate-300 dark:hover:bg-slate-500 transition">
                    Remove
                </button>
            </div>
        </div>
    </li>
);
