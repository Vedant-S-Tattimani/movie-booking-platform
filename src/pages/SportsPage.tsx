import React, { useState } from 'react';
import { HeroSection } from '../components/HeroSection';
import { sportsData } from '../data/sports';
import type { HeroConfig, MediaItem } from '../types';
import { BookingModal } from '../components/BookingModal';
import { Star, MapPin, Trophy } from 'lucide-react';

export const SportsPage: React.FC = () => {
  const [bookingItem, setBookingItem] = useState<MediaItem | null>(null);

  const heroConfig: HeroConfig = {
    pageType: 'sports',
    verticalAccent: 'LIVE STADIUM SCREENINGS',
    statusLabelLeft: 'Grand Prix Sunday',
    statusSubLeft: '4K Laser Broadcasts with Stadium Surround',
    genres: ['All', 'Motorsport', 'Football', 'Badminton', 'Esports'],
    statusToggle: {
      activeOption: 'Live Matches',
      secondaryOption: 'Tournament Fixtures',
    },
    items: sportsData,
  };

  return (
    <main className="w-full">
      {/* Hero Section */}
      <HeroSection config={heroConfig} onOpenBooking={setBookingItem} />

      {/* Sports Fixtures Grid */}
      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-16">
        <div className="mb-8">
          <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#f5a623]/15 text-[#f5a623] border border-[#f5a623]/30 mb-2 inline-block">
            STADIUM & ARENA PASSES
          </span>
          <h2 className="text-2xl sm:text-3xl font-heading font-black text-white tracking-tight">
            Live Matches & Championship Screenings
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Cheer with hundreds of passionate fans on gigantic cinema screens with Dolby Atmos audio and cold craft concessions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sportsData.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col rounded-2xl overflow-hidden bg-[#11131c] border border-white/10 hover:border-[#f5a623]/60 transition-all duration-300 hover:-translate-y-1 shadow-xl"
            >
              <div className="relative aspect-[2/3] w-full overflow-hidden bg-neutral-900">
                <img
                  src={item.posterImage}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-2.5 right-2.5">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-black/80 backdrop-blur-md border border-white/20 text-white">
                    {item.badgeTopRight}
                  </span>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-[11px] text-neutral-400">{item.genre}</span>
                    <div className="flex items-center gap-1 text-[#f5a623] font-semibold text-xs">
                      <Star className="w-3 h-3 fill-[#f5a623]" />
                      <span>{item.rating}</span>
                    </div>
                  </div>

                  <h3 className="font-heading font-bold text-white text-base leading-snug group-hover:text-[#f5a623] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-neutral-400 flex items-center gap-1 mt-1.5">
                    <MapPin className="w-3 h-3 text-[#f5a623]" />
                    <span>{item.venue}</span>
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-sm font-heading font-bold text-white">
                    RM {item.priceRM}
                  </span>

                  <button
                    onClick={() => setBookingItem(item)}
                    className="px-4 py-2 rounded-xl bg-[#f5a623] hover:bg-[#e09612] text-black font-semibold text-xs flex items-center gap-1.5 cursor-pointer shadow-md shadow-[#f5a623]/20"
                  >
                    <Trophy className="w-3.5 h-3.5" />
                    <span>Get Match Pass</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {bookingItem && (
        <BookingModal item={bookingItem} onClose={() => setBookingItem(null)} />
      )}
    </main>
  );
};
