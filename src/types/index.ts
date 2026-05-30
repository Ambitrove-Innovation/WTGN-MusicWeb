export type CheckoutItem = {
  id: string;
  title: string;
  price: number;
  type: 'song' | 'ticket' | 'bundle';
  img?: string;
};

export type Track = {
  id: number;
  title: string;
  genre: string;
  duration: string;
  img: string;
};

export type Event = {
  id: number;
  date: { day: string; month: string };
  title: string;
  desc: string;
  location: string;
};

export type Artist = {
  id: string;
  name: string;
  alias: string;
  origin: string;
  role: string;
  image: string;
  bio: string;
  contributions: string;
  influences: string;
};
