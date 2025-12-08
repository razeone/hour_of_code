# 🎮 Hour of Code - Pokédex App

A modern Pokédex web application built with **React**, **TypeScript**, and **Vite**. This project was created as part of an Hour of Code workshop to demonstrate building a real-world application using modern web technologies.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.0-646CFF?logo=vite)

## 🌟 Features

- 📋 **Pokémon Grid** - Browse Pokémon in a responsive card grid (20 per page)
- 🔍 **Global Search** - Search across all 1000+ Pokémon by name
- 📄 **Pagination** - Navigate through pages of Pokémon
- 🏷️ **Type Badges** - Color-coded type badges (Fire=🔴, Water=🔵, Grass=🟢, etc.)
- ⏳ **Loading Skeletons** - Smooth loading states with shimmer animation
- ⚠️ **Error Handling** - Graceful error boundaries with retry options

## 🚀 Quick Start

### Prerequisites

Make sure you have the following installed:

| Tool | Version | Download |
|------|---------|----------|
| **Node.js** | 18+ (LTS recommended) | [nodejs.org](https://nodejs.org/) |
| **npm** | 9+ (comes with Node.js) | Included with Node.js |
| **Git** | Latest | [git-scm.com](https://git-scm.com/) |

#### Check your installation:

```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check Git version
git --version
```

### Installation

#### 🐧 Linux / 🍎 macOS

```bash
# Clone the repository
git clone https://github.com/razeone/hour_of_code.git

# Navigate to the project
cd hour_of_code/pokedex-app

# Install dependencies
npm install

# Start development server
npm run dev
```

#### 🪟 Windows (PowerShell or CMD)

```powershell
# Clone the repository
git clone https://github.com/razeone/hour_of_code.git

# Navigate to the project
cd hour_of_code\pokedex-app

# Install dependencies
npm install

# Start development server
npm run dev
```

Open your browser at **http://localhost:5173** 🎉

## 📁 Project Structure

```
hour_of_code/
├── README.md                      # This file
├── REACT_POKEDEX_WORKSHOP.md      # Original workshop planning notes
└── pokedex-app/                   # Main React application
    ├── src/
    │   ├── components/       # React components
    │   │   ├── ErrorBoundary.tsx
    │   │   ├── Pagination.tsx
    │   │   ├── PokemonCard.tsx
    │   │   ├── PokemonGrid.tsx
    │   │   ├── SearchBar.tsx
    │   │   ├── Skeleton.tsx
    │   │   └── TypeBadge.tsx
    │   ├── hooks/            # Custom React hooks
    │   │   └── usePokemon.ts
    │   ├── types/            # TypeScript interfaces
    │   │   └── pokemon.ts
    │   ├── utils/            # Utility functions & API
    │   │   └── api.ts
    │   ├── App.tsx           # Main app component
    │   ├── App.css           # App styles
    │   └── main.tsx          # Entry point
    ├── package.json
    ├── tsconfig.json
    └── vite.config.ts
```

## 🛠️ Tech Stack

| Technology | Purpose | Documentation |
|------------|---------|---------------|
| [React 19](https://react.dev/) | UI Library | [Docs](https://react.dev/learn) |
| [TypeScript 5](https://www.typescriptlang.org/) | Type Safety | [Docs](https://www.typescriptlang.org/docs/) |
| [Vite](https://vitejs.dev/) | Build Tool | [Docs](https://vitejs.dev/guide/) |
| [PokéAPI](https://pokeapi.co/) | Pokémon Data | [Docs](https://pokeapi.co/docs/v2) |

## 📜 Available Scripts

Run these commands from the `pokedex-app` directory:

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint
npm run lint
```

## 🎯 Workshop Phases

This project was built step-by-step following these phases:

| Phase | Description | Status |
|-------|-------------|--------|
| **1. Foundation** | Project structure, TypeScript interfaces, API utilities | ✅ Complete |
| **2. Data Layer** | Custom `usePokemon` hook with loading/error states | ✅ Complete |
| **3. Components** | Skeleton, ErrorBoundary, TypeBadge components | ✅ Complete |
| **4. Main Features** | PokemonCard, PokemonGrid, Pagination | ✅ Complete |
| **5. Search** | Global search across all Pokémon | ✅ Complete |
| **6. Detail View** | Pokémon detail page with stats & evolution | 🔄 In Progress |
| **7. Polish** | Responsive CSS, animations, final styling | 🔄 In Progress |

## 🔗 Useful Resources

### Learning Resources
- [React Documentation](https://react.dev/learn) - Official React tutorial
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/) - TypeScript guide
- [Vite Guide](https://vitejs.dev/guide/) - Vite documentation
- [PokéAPI Documentation](https://pokeapi.co/docs/v2) - API reference

### Tools Used
- [VS Code](https://code.visualstudio.com/) - Code editor
- [GitHub Copilot](https://github.com/features/copilot) - AI pair programming
- [Node.js](https://nodejs.org/) - JavaScript runtime

## 📝 Original Workshop Prompt

The original prompt used to build this application:

> **Create a Pokédex web application** using React + TypeScript + Vite.
> 
> The app should use the PokéAPI to fetch and display Pokémon data.
> 
> **Core Features:**
> - Home Page - Display a grid of Pokémon cards (paginated, 20 per page)
> - Search - Filter Pokémon by name
> - Pokémon Detail View - Click a card to see detailed stats, abilities, and evolution chain
> - Type Filtering - Filter by Pokémon type (Fire, Water, Grass, etc.)
> 
> **Technical Requirements:**
> - Use React hooks (useState, useEffect, useCallback)
> - Create a custom hook usePokemon for API calls with loading/error states
> - Implement TypeScript interfaces for all API responses
> - Add responsive CSS (mobile-first design)
> - Use CSS Grid for the Pokémon card layout
> - Include loading skeletons and error boundaries
> 
> **UI/UX Requirements:**
> - Pokémon type badges with appropriate colors
> - Smooth hover animations on cards
> - Clean, modern design inspired by the official Pokédex
> - Display Pokémon sprite images, ID number, name, and types on cards

See [REACT_POKEDEX_WORKSHOP.md](REACT_POKEDEX_WORKSHOP.md) for the complete implementation plan and notes.

## 📄 License

This project is open source and available for educational purposes.

---

Made with ❤️ during Hour of Code 2024

