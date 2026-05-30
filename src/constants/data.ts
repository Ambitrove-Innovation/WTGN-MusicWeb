import { Track, Event, Artist } from '../types';

export const tracks: Track[] = [
  { id: 1, title: 'Brotherhood', genre: 'Hip-Hop', duration: '3:42', img: '/images/WTGN-cover-album-1.jpeg' },
  { id: 2, title: 'Roots', genre: 'Afrobeats', duration: '4:10', img: '/images/WTGN_Tshepo_studio_recording-1.jpeg' },
  { id: 3, title: 'Beyond Borders', genre: 'R&B', duration: '3:55', img: '/images/WTGN_memeber-1.jpeg' },
  { id: 4, title: 'Eastern Cape', genre: 'Hip-Hop', duration: '3:28', img: '/images/WTGN_Tshepo_ceo-1.jpeg' },
  { id: 5, title: 'Johannesburg', genre: 'Afro-Fusion', duration: '4:33', img: '/images/WTGN_music_banner-1.jpeg' },
  { id: 6, title: 'Purpose', genre: 'R&B / Soul', duration: '5:01', img: '/images/WTGN_banner-1.jpeg' },
];

export const events: Event[] = [
  { id: 1, date: { day: '15', month: 'Aug' }, title: 'Summer Sounds Festival', desc: 'Hip-Hop & Afrobeats Night — Main Stage', location: 'Johannesburg, South Africa' },
  { id: 2, date: { day: '22', month: 'Aug' }, title: 'SAE Alumni Showcase', desc: 'Exclusive Industry Night — Rosebank', location: 'Rosebank, Johannesburg, South Africa' },
  { id: 3, date: { day: '07', month: 'Sep' }, title: 'W.T.G.N Live Experience', desc: 'Full Performance — New Material', location: 'Sandton, Johannesburg, South Africa' },
  { id: 4, date: { day: '19', month: 'Oct' }, title: 'Cape Town Music Summit', desc: 'Artist Showcase — Pan African Sounds', location: 'Cape Town, South Africa' },
];

export const artistData: Artist[] = [
  {
    id: 'dopeboy',
    name: 'Unam Nibe',
    alias: 'Y.T Dope Boy',
    origin: 'Eastern Cape',
    role: 'Lyricist & Vocalist',
    image: '/images/WTGN_memeber-1.jpeg',
    bio: 'Hailing from the Eastern Cape, Y.T Dope Boy is the sharp pen and energetic pulse of the movement. His background in hip-hop cyphers and local rap circuits sculpted his rapid-fire delivery and vivid storytelling.',
    contributions: 'Sharp lyricism, intricate wordplay, modern hip-hop bounce, and raw street narratives.',
    influences: 'Classic Hip-Hop, Golden Era Rap, underground African storytellers.'
  },
  {
    id: 'hopethelast',
    name: 'Tshepo Moalosi',
    alias: 'Hope The Last',
    origin: 'Free State',
    role: 'Producer & Vocalist',
    image: '/images/WTGN_Tshepo_studio_recording-1.jpeg',
    bio: 'Rooted in the Free State, Hope The Last brings structural integrity and sonic warmth to W.T.G.N. A master behind the boards, he architects the melodic landscapes and Afro-Fusion grooves that define their sound.',
    contributions: 'Melodic hooks, Afro-Fusion production, structural arrangement, and vocal harmonies.',
    influences: 'Afrobeats, Neo-Soul, R&B, and deeply rooted structural African rhythms.'
  }
];
