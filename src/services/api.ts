/**
 * CinePass API Service Layer
 * 
 * NOTE FOR BACKEND DEVELOPER:
 * This file serves as the unified integration contract between the frontend React client
 * and your backend server (Express, FastAPI, Django, NestJS, Go, etc.).
 * 
 * When your backend is ready:
 * 1. Set `VITE_API_BASE_URL` in `.env` (e.g. VITE_API_BASE_URL=http://localhost:8000/api)
 * 2. Toggle `USE_MOCK_DATA = false` or let it dynamically fallback if backend is unreachable.
 */

import type { MediaItem, Theatre, Offer } from '../types';
import { moviesData } from '../data/movies';
import { eventsData } from '../data/events';
import { streamsData } from '../data/streams';
import { playsData } from '../data/plays';
import { sportsData } from '../data/sports';
import { activitiesData } from '../data/activities';
import { theatresData } from '../data/theatres';
import { offersData } from '../data/offers';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
const USE_MOCK_DATA = !API_BASE_URL;

export interface BookingPayload {
  mediaId: string;
  theatreName: string;
  date: string;
  time: string;
  seats: string[];
  totalAmount: number;
  customerName?: string;
  customerEmail?: string;
}

export interface BookingResponse {
  success: boolean;
  orderId: string;
  booking: BookingPayload & {
    createdAt: string;
    qrCodeData: string;
    status: 'CONFIRMED' | 'PENDING' | 'CANCELLED';
  };
}

export const api = {
  // Movies
  async getMovies(): Promise<MediaItem[]> {
    if (USE_MOCK_DATA) return moviesData;
    const res = await fetch(`${API_BASE_URL}/movies`);
    return res.json();
  },

  async getMovieById(id: string): Promise<MediaItem | undefined> {
    if (USE_MOCK_DATA) return moviesData.find((m) => m.id === id);
    const res = await fetch(`${API_BASE_URL}/movies/${id}`);
    return res.json();
  },

  // Events
  async getEvents(): Promise<MediaItem[]> {
    if (USE_MOCK_DATA) return eventsData;
    const res = await fetch(`${API_BASE_URL}/events`);
    return res.json();
  },

  // Streams
  async getStreams(): Promise<MediaItem[]> {
    if (USE_MOCK_DATA) return streamsData;
    const res = await fetch(`${API_BASE_URL}/streams`);
    return res.json();
  },

  // Plays
  async getPlays(): Promise<MediaItem[]> {
    if (USE_MOCK_DATA) return playsData;
    const res = await fetch(`${API_BASE_URL}/plays`);
    return res.json();
  },

  // Sports
  async getSports(): Promise<MediaItem[]> {
    if (USE_MOCK_DATA) return sportsData;
    const res = await fetch(`${API_BASE_URL}/sports`);
    return res.json();
  },

  // Activities
  async getActivities(): Promise<MediaItem[]> {
    if (USE_MOCK_DATA) return activitiesData;
    const res = await fetch(`${API_BASE_URL}/activities`);
    return res.json();
  },

  // Theatres
  async getTheatres(city?: string): Promise<Theatre[]> {
    if (USE_MOCK_DATA) {
      if (!city || city === 'All Cities') return theatresData;
      return theatresData.filter((t) => t.city === city);
    }
    const url = city ? `${API_BASE_URL}/theatres?city=${encodeURIComponent(city)}` : `${API_BASE_URL}/theatres`;
    const res = await fetch(url);
    return res.json();
  },

  // Offers
  async getOffers(): Promise<Offer[]> {
    if (USE_MOCK_DATA) return offersData;
    const res = await fetch(`${API_BASE_URL}/offers`);
    return res.json();
  },

  // Create Booking
  async createBooking(payload: BookingPayload): Promise<BookingResponse> {
    if (USE_MOCK_DATA) {
      // Simulate network latency
      await new Promise((r) => setTimeout(r, 400));
      const orderId = `CINE-MY-${Math.floor(1000 + Math.random() * 9000)}`;
      return {
        success: true,
        orderId,
        booking: {
          ...payload,
          createdAt: new Date().toISOString(),
          qrCodeData: `https://cinepass.my/verify/${orderId}`,
          status: 'CONFIRMED',
        },
      };
    }
    const res = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return res.json();
  },
};
