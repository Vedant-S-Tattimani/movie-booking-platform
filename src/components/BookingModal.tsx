import React, { useState } from 'react';
import { X, Calendar, MapPin, Clock, Ticket, Check, ChevronRight } from 'lucide-react';
import type { MediaItem } from '../types';

interface BookingModalProps {
  item: MediaItem | null;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ item, onClose }) => {
  const [selectedTheatre, setSelectedTheatre] = useState('IMAX Pavilion Elite KL');
  const [selectedDate, setSelectedDate] = useState('Tomorrow, Oct 8');
  const [selectedTime, setSelectedTime] = useState('06:30 PM');
  const [selectedSeats, setSelectedSeats] = useState<string[]>(['E7', 'E8']);
  const [step, setStep] = useState<'seats' | 'confirmed'>('seats');

  if (!item) return null;

  const dates = [
    { label: 'Today', date: 'Oct 7' },
    { label: 'Tomorrow', date: 'Oct 8' },
    { label: 'Thursday', date: 'Oct 9' },
    { label: 'Friday', date: 'Oct 10' },
  ];

  const theatres = [
    'IMAX Pavilion Elite KL',
    'GSC Mid Valley Megamall',
    'TGV Sunway Pyramid',
  ];

  const showtimes = ['11:30 AM', '02:45 PM', '06:30 PM', '09:45 PM'];

  // 6 rows x 10 cols seat matrix
  const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
  const cols = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const occupiedSeats = ['B4', 'B5', 'C6', 'C7', 'D3', 'D4', 'E4'];

  const toggleSeat = (seatId: string) => {
    if (occupiedSeats.includes(seatId)) return;
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const ticketPrice = 38.0; // RM per ticket
  const totalAmount = selectedSeats.length * ticketPrice;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0f1118] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[95vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-lg bg-[#f5a623]/10 text-[#f5a623]">
              <Ticket className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-heading font-bold text-white">
                {step === 'seats' ? `Book Tickets — ${item.title}` : 'Booking Confirmed!'}
              </h3>
              <p className="text-xs text-neutral-400">
                {item.formats.join(' • ')} • {item.genre}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'seats' ? (
          <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
            {/* Theatre & Date Selectors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#f5a623]" />
                  Select Theatre
                </label>
                <select
                  value={selectedTheatre}
                  onChange={(e) => setSelectedTheatre(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white outline-none focus:border-[#f5a623]"
                >
                  {theatres.map((t) => (
                    <option key={t} value={t} className="bg-[#0f1118] text-white">
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#f5a623]" />
                  Select Date
                </label>
                <div className="flex gap-2">
                  {dates.map((d) => {
                    const isSelected = selectedDate === `${d.label}, ${d.date}`;
                    return (
                      <button
                        key={d.date}
                        onClick={() => setSelectedDate(`${d.label}, ${d.date}`)}
                        className={`flex-1 py-1.5 px-2 rounded-xl text-center border transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#f5a623] bg-[#f5a623]/15 text-white font-semibold'
                            : 'border-white/10 bg-white/5 text-neutral-400 hover:border-white/20'
                        }`}
                      >
                        <div className="text-[10px] text-neutral-400">{d.label}</div>
                        <div className="text-xs sm:text-sm font-bold text-white">{d.date}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Showtime Selection */}
            <div>
              <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#f5a623]" />
                Select Showtime
              </label>
              <div className="flex flex-wrap gap-2.5">
                {showtimes.map((time) => {
                  const isSelected = selectedTime === time;
                  return (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#f5a623] bg-[#f5a623] text-black shadow-md shadow-[#f5a623]/20'
                          : 'border-white/15 bg-white/5 text-neutral-300 hover:border-white/30'
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Screen & Seat Map */}
            <div className="pt-2">
              <div className="w-3/4 mx-auto mb-6 text-center">
                <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-[#f5a623] to-transparent rounded-full shadow-[0_0_12px_#f5a623]" />
                <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-500 mt-1 block">
                  CINEMA SCREEN
                </span>
              </div>

              <div className="flex flex-col items-center gap-2 max-w-full overflow-x-auto pb-2">
                {rows.map((row) => (
                  <div key={row} className="flex items-center gap-1.5 sm:gap-2">
                    <span className="w-4 text-xs font-mono text-neutral-500 text-center font-bold">
                      {row}
                    </span>
                    <div className="flex gap-1.5 sm:gap-2">
                      {cols.map((col) => {
                        const seatId = `${row}${col}`;
                        const isOccupied = occupiedSeats.includes(seatId);
                        const isSelected = selectedSeats.includes(seatId);

                        return (
                          <button
                            key={seatId}
                            disabled={isOccupied}
                            onClick={() => toggleSeat(seatId)}
                            title={`Seat ${seatId}`}
                            className={`w-6 h-6 sm:w-7 sm:h-7 rounded-md text-[10px] font-bold flex items-center justify-center transition-all ${
                              isOccupied
                                ? 'bg-neutral-800 text-neutral-600 cursor-not-allowed border border-white/5'
                                : isSelected
                                ? 'bg-[#f5a623] text-black shadow-[0_0_8px_#f5a623] cursor-pointer'
                                : 'bg-white/10 hover:bg-white/25 text-neutral-300 border border-white/10 cursor-pointer'
                            }`}
                          >
                            {col}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex items-center justify-center gap-6 mt-4 text-xs text-neutral-400">
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded bg-white/10 border border-white/15" />
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded bg-[#f5a623]" />
                  <span className="text-white font-medium">Selected</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded bg-neutral-800 border border-white/5" />
                  <span>Reserved</span>
                </div>
              </div>
            </div>

            {/* Booking Summary Footer Bar */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-xs text-neutral-400">
                  Seats: <span className="text-white font-semibold">{selectedSeats.join(', ') || 'None selected'}</span>
                </div>
                <div className="text-lg font-heading font-extrabold text-[#f5a623]">
                  RM {totalAmount.toFixed(2)}
                  <span className="text-xs text-neutral-400 font-normal ml-2">
                    ({selectedSeats.length} x RM {ticketPrice.toFixed(2)})
                  </span>
                </div>
              </div>

              <button
                disabled={selectedSeats.length === 0}
                onClick={() => setStep('confirmed')}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#f5a623] hover:bg-[#e09612] text-black font-semibold text-sm transition-all duration-200 shadow-lg shadow-[#f5a623]/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>Proceed to Confirmation</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 sm:p-10 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <Check className="w-8 h-8 stroke-[2.5]" />
            </div>

            <div>
              <h4 className="text-2xl font-heading font-bold text-white">
                Tickets Booked Successfully!
              </h4>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                Booking Reference: <span className="text-[#f5a623] font-mono font-bold">CINE-8941-KL</span>
              </p>
            </div>

            <div className="max-w-md mx-auto p-5 rounded-2xl bg-[#141722] border border-white/10 text-left space-y-3">
              <div className="flex justify-between items-start border-b border-white/10 pb-3">
                <div>
                  <h5 className="font-heading font-bold text-white text-base">{item.title}</h5>
                  <p className="text-xs text-neutral-400">{selectedTheatre}</p>
                </div>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#f5a623]/20 text-[#f5a623] border border-[#f5a623]/30">
                  CONFIRMED
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-neutral-500 block">Date</span>
                  <span className="text-white font-medium">{selectedDate}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Time</span>
                  <span className="text-white font-medium">{selectedTime}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Seats</span>
                  <span className="text-[#f5a623] font-mono font-bold text-sm">
                    {selectedSeats.join(', ')}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Total Paid</span>
                  <span className="text-white font-medium">RM {totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-[#f5a623] text-black font-semibold text-sm hover:bg-[#e09612] cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
