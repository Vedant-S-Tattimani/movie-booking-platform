# 🎬 Movie Booking Platform (CineVerse)

A modern, full-featured online movie and entertainment ticketing platform built with **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS v4**. Inspired by modern ticketing experiences like BookMyShow, this application provides seamless discovery, trailer previews, theater showtimes, interactive seat selection, and booking history management.

---

## ✨ Features

- 🎟️ **Movie Discovery & Showtimes**: Browse trending movies, upcoming releases, genres, and ratings.
- 🍿 **Interactive Seat Booking**: Real-time seat selection with VIP, Premium, and Standard tier layouts.
- 🎭 **Multi-Category Entertainment**:
  - **Movies & Theatres**: Cinema location finder and timing schedule.
  - **Live Events & Plays**: Concerts, comedy shows, and theater plays.
  - **Sports & Outdoor Activities**: Match tickets and adventure booking.
  - **Online Streams**: Rent or buy digital movies and series.
- 🔍 **Instant Global Search**: Modal search across movies, genres, languages, and venues.
- 🎥 **Trailer Modal Previews**: Embedded trailer viewing experience without leaving the page.
- 🏷️ **Offers & Promo Codes**: Dedicated discount deals and promo banner integration.
- 👤 **User Profiles & Booking History**: View past orders, e-tickets, and profile details.
- 🌙 **Modern Dark UI**: Aesthetic glassmorphism and responsive design powered by Tailwind CSS v4 and Lucide icons.

---

## 🛠️ Tech Stack

- **Frontend Framework**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 8](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router DOM v7](https://reactrouter.com/)
- **Linter**: [Oxlint](https://oxc.rs/)

---

## 📁 Project Structure

```text
├── public/                 # Static assets & public images
├── src/
│   ├── assets/             # Images and local media
│   ├── components/         # Reusable UI components (Navbar, Footer, Carousel, Modals)
│   ├── data/               # Mock datasets for movies, events, and showtimes
│   ├── pages/              # Application pages (Home, Booking, Theatres, Profile, etc.)
│   ├── services/           # API integration and data handlers
│   ├── types/              # TypeScript type definitions and interfaces
│   ├── App.tsx             # Root layout and routing configuration
│   ├── main.tsx            # Entry point
│   └── index.css           # Global Tailwind CSS styles
├── package.json            # Dependencies and scripts
├── vite.config.ts          # Vite configuration
└── tsconfig.json           # TypeScript configuration
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (v18 or higher recommended).

### 1. Clone the repository

```bash
git clone https://github.com/Vedant-S-Tattimani/movie-booking-platform.git
cd movie-booking-platform
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run development server

```bash
npm run dev
```

The application will start at `http://localhost:5173`.

### 4. Build for production

```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
