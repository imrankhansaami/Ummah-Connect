
import type { User, Post, PrayerTime, IslamicEvent, Nft, CharityTransaction, Comment } from './types';

export const Users: { [key: string]: User } = {
  user1: {
    id: 'u1',
    name: 'Yusuf Abdullah',
    username: 'yusuf_abd',
    profilePicture: 'https://picsum.photos/seed/yusuf/200',
    coverPhoto: 'https://picsum.photos/seed/cover1/1000/300',
    bio: 'Software Engineer | Seeking knowledge and striving for Ihsan | Al-ḥamdulillāh',
    followers: 1250,
    following: 320,
  },
  user2: {
    id: 'u2',
    name: 'Fatima Zahra',
    username: 'fatima_z',
    profilePicture: 'https://picsum.photos/seed/fatima/200',
    coverPhoto: 'https://picsum.photos/seed/cover2/1000/300',
    bio: 'Student of the Deen | Calligraphy artist | Spreading positivity',
    followers: 2800,
    following: 450,
  },
  user3: {
    id: 'u3',
    name: 'Omar Al-Faruq',
    username: 'omar_faruq',
    profilePicture: 'https://picsum.photos/seed/omar/200',
    coverPhoto: 'https://picsum.photos/seed/cover3/1000/300',
    bio: 'Entrepreneur | Building for the Ummah | Lover of nature',
    followers: 980,
    following: 150,
  },
};

export const CurrentUser: User = Users.user1;

const PostComments: Comment[] = [
    { id: 'c1', user: Users.user2, text: 'MashaAllah, very insightful!', timestamp: '2h ago' },
    { id: 'c2', user: Users.user3, text: 'JazakAllah Khair for sharing.', timestamp: '1h ago' },
];

export const Posts: Post[] = [
  {
    id: 'p1',
    user: Users.user2,
    content: 'Just finished a new piece of calligraphy! "And He is with you wherever you are." (Quran 57:4). May it be a reminder for us all. #islamicart #calligraphy',
    image: 'https://picsum.photos/seed/art1/600/400',
    timestamp: '3h ago',
    likes: 256,
    comments: PostComments,
    shares: 45,
  },
  {
    id: 'p2',
    user: Users.user3,
    content: "Reflecting on the beauty of the creation is a form of worship. SubhanAllah. This was from my morning hike today. Don't forget to connect with nature.",
    image: 'https://picsum.photos/seed/nature1/600/400',
    timestamp: '5h ago',
    likes: 189,
    comments: [
        { id: 'c3', user: Users.user1, text: 'SubhanAllah, beautiful view!', timestamp: '4h ago' },
    ],
    shares: 22,
  },
  {
    id: 'p3',
    user: Users.user1,
    content: 'An important reminder: "So remember Me; I will remember you. And be grateful to Me and do not deny Me." - Quran 2:152. A powerful verse to start the day with.',
    timestamp: '1d ago',
    likes: 412,
    comments: [],
    shares: 98,
  },
  {
    id: 'p4',
    user: Users.user2,
    content: 'This product is great. I love it.',
    timestamp: '2d ago',
    likes: 10,
    comments: [],
    shares: 1,
  }
];

export const PrayerTimesData: PrayerTime[] = [
  { name: 'Fajr', time: '04:35 AM' },
  { name: 'Dhuhr', time: '01:15 PM' },
  { name: 'Asr', time: '05:00 PM' },
  { name: 'Maghrib', time: '08:10 PM' },
  { name: 'Isha', time: '09:45 PM' },
];

export const IslamicEventsData: IslamicEvent[] = [
  { name: 'Eid al-Adha', date: '10 Dhul-Hijjah' },
  { name: 'Islamic New Year', date: '1 Muharram' },
  { name: 'Ashura', date: '10 Muharram' },
];

export const NftData: Nft[] = [
    { id: 'n1', title: 'Kaaba\'s Embrace', artist: 'Digital Calligrapher', imageUrl: 'https://picsum.photos/seed/nft1/300', price: 0.5 },
    { id: 'n2', title: '99 Names of Allah', artist: 'Pixel Ummah', imageUrl: 'https://picsum.photos/seed/nft2/300', price: 1.2 },
    { id: 'n3', title: 'Geometric Serenity', artist: 'Islamic Patterns', imageUrl: 'https://picsum.photos/seed/nft3/300', price: 0.8 },
    { id: 'n4', title: 'Medina Nights', artist: 'Sacred Visions', imageUrl: 'https://picsum.photos/seed/nft4/300', price: 2.1 },
];

export const CharityTransactionData: CharityTransaction[] = [
    { id: 't1', from: '0x1a2b...', to: 'Water Well Project', amount: 0.1, timestamp: '2024-07-29 10:30', project: 'Clean Water for Yemen' },
    { id: 't2', from: '0x3c4d...', to: 'Orphan Sponsorship', amount: 0.05, timestamp: '2024-07-29 11:15', project: 'Educate an Orphan' },
    { id: 't3', from: '0x5e6f...', to: 'Masjid Construction', amount: 0.2, timestamp: '2024-07-28 15:00', project: 'Build a Masjid in Ghana' },
    { id: 't4', from: '0x7g8h...', to: 'Food Distribution', amount: 0.02, timestamp: '2024-07-28 18:45', project: 'Iftar Meals Program' },
];
