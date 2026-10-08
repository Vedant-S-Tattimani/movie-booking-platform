import React, { useState } from 'react';
import { HeroSection } from '../components/HeroSection';
import { moviesData } from '../data/movies';
import type { HeroConfig, MediaItem } from '../types';
import { BookingModal } from '../components/BookingModal';
import { TrailerModal } from '../components/TrailerModal';
import { NowShowingGrid } from '../components/NowShowingGrid';
import { ExperienceBanners } from '../components/ExperienceBanners';
import { TheatresSection } from '../components/TheatresSection';
import { OffersSection } from '../components/OffersSection';

export const HomePage: React.FC = () => {
  const [bookingItem, setBookingItem] = useState<MediaItem | null>(null);
  const [trailerItem, setTrailerItem] = useState<MediaItem | null>(null);

  // Exact Figma Hero Reference configuration
  const heroConfig: HeroConfig = {
    pageType: 'movies',
    statusLabelLeft: 'Tomorrow',
    statusSubLeft: 'Session schedule',
    genres: ['Action', 'Drama', 'Sci-Fi'],
    statusToggle: {
      activeOption: 'Now Showing',
      secondaryOption: 'Coming Soon',
    },
    items: moviesData.slice(0, 4),
  };

  return (
    <main className="w-full">
      {/* 1. PRIMARY FIGMA REFERENCE HERO SECTION */}
      <HeroSection config={heroConfig} onOpenBooking={setBookingItem} />

      {/* 2. NOW SHOWING CATALOG GRID */}
      <NowShowingGrid
        items={moviesData}
        onBook={setBookingItem}
        onWatchTrailer={setTrailerItem}
        title="Now Showing in Cinemas"
        subtitle="Reserve tickets for the biggest blockbusters showing in IMAX, 3D, and Dolby Atmos."
      />

      {/* 3. PREMIUM AUDITORIUM FORMATS */}
      <ExperienceBanners />

      {/* 4. THEATRES & SHOWTIMES NEAR YOU */}
      <TheatresSection
        onSelectTime={(_theatre, _time) => {
          setBookingItem(moviesData[0]);
        }}
      />

      {/* 5. CINEMA OFFERS & PROMOTIONS */}
      <OffersSection />

      {/* Interactive Cinema Seat Booking Modal */}
      {bookingItem && (
        <BookingModal item={bookingItem} onClose={() => setBookingItem(null)} />
      )}

      {/* Cinematic Trailer Modal */}
      {trailerItem && (
        <TrailerModal
          item={trailerItem}
          isOpen={!!trailerItem}
          onClose={() => setTrailerItem(null)}
          onOpenBooking={(item) => {
            setTrailerItem(null);
            setBookingItem(item);
          }}
        />
      )}
    </main>
  );
};
