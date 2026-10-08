import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, QrCode } from 'lucide-react';

export const BookingsHistoryPage: React.FC = () => {
  const bookings = [
    {
      id: 'CINE-MY-9942',
      title: 'The Batman',
      type: 'Movie',
      theatre: 'IMAX Pavilion Elite KL, Hall 1',
      date: 'Tomorrow, Oct 8',
      time: '06:30 PM',
      seats: ['E7', 'E8'],
      format: 'IMAX 2D',
      total: 'RM 76.00',
      status: 'Confirmed',
      poster: '/images/movies/the-batman.jpg',
    },
    {
      id: 'CINE-EV-4410',
      title: 'Global Music Fest',
      type: 'Event',
      theatre: 'Axiata Arena Bukit Jalil',
      date: 'Friday, Oct 10',
      time: '07:00 PM',
      seats: ['VIP-12', 'VIP-13'],
      format: 'LIVE HD VIP',
      total: 'RM 380.00',
      status: 'Confirmed',
      poster: '/images/events/global-music-fest.jpg',
    },
    {
      id: 'CINE-MY-1029',
      title: 'Dune: Part Two',
      type: 'Movie',
      theatre: 'GSC Mid Valley Megamall',
      date: 'Sep 24, 2024',
      time: '09:00 PM',
      seats: ['F10', 'F11'],
      format: 'IMAX 3D',
      total: 'RM 72.00',
      status: 'Completed',
      poster: '/images/movies/dune.jpg',
    },
  ];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-10 max-w-[1000px] mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-medium text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
        <span className="text-xs text-[#f5a623] font-semibold">MY BOOKING HISTORY</span>
      </div>

      <div className="space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-white">
            My Tickets & Reservations
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Present your e-ticket or QR code at cinema turnstiles or event admission gates.
          </p>
        </div>

        <div className="space-y-4">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="p-5 sm:p-6 rounded-2xl bg-[#11131c] border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-white/20 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-22 rounded-xl overflow-hidden bg-neutral-800 border border-white/10 shrink-0">
                  <img src={b.poster} alt={b.title} className="w-full h-full object-cover" />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        b.status === 'Confirmed'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-white/10 text-neutral-400 border border-white/10'
                      }`}
                    >
                      {b.status.toUpperCase()}
                    </span>
                    <span className="text-xs font-mono text-neutral-500">{b.id}</span>
                  </div>

                  <h3 className="text-lg font-heading font-bold text-white">
                    {b.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-neutral-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#f5a623]" />
                      {b.theatre}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                      {b.date} @ {b.time}
                    </span>
                  </div>

                  <div className="mt-2 text-xs">
                    <span className="text-neutral-500">Seats: </span>
                    <span className="text-[#f5a623] font-mono font-bold">
                      {b.seats.join(', ')}
                    </span>
                    <span className="text-neutral-500 ml-3">Paid: </span>
                    <span className="text-white font-medium">{b.total}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto justify-end border-t md:border-t-0 border-white/10 pt-3 md:pt-0">
                <button
                  onClick={() => alert(`Showing QR code for booking ${b.id}`)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <QrCode className="w-4 h-4 text-[#f5a623]" />
                  <span>Show QR</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
