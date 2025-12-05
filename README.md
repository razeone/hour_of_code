## Vite Application Setup Guide

Since I'm encountering environment issues, I'll provide you with the complete
step-by-step instructions to create your Vite application manually:

### 1. Check Your Environment

First, verify your Node.js and npm installation:

    node --version
    npm --version

You should have Node.js 14.18+ or 16+ installed.

### 2. Create the Vite Application

Run this command in your /home/raze/workspace/hour_of_code directory:

    npm create vite@latest my-vite-app

When prompted, select:

    * Framework: Vanilla (or your preferred framework like React, Vue, etc.)
    * Variant: JavaScript (or TypeScript if preferred)

### 3. Navigate and Install Dependencies

    cd my-vite-app
    npm install

### 4. Start Development Server

    npm run dev

## Complete Setup Documentation

Here's the comprehensive documentation you can save for recreating this setup
later:

### README.md (Save this to your project root)

    # Vite Application Setup Guide

    This guide will walk you through creating a new Vite application from scratch, including all necessary setup steps and environment configuration.

    ## Prerequisites

    Before starting, ensure you have the following installed:
    - Node.js (version 14.18+ or 16+ recommended)
    - npm (comes with Node.js) or yarn package manager

    ## Step-by-Step Setup Instructions

    ### 1. Check Node.js and npm Installation

    ```bash
    # Check Node.js version
    node --version

    # Check npm version
    npm --version

### 2. Create a New Vite Application

    # Using npm
    npm create vite@latest my-vite-app

    # Or using yarn
    yarn create vite my-vite-app

    # Or using pnpm
    pnpm create vite my-vite-app

### 3. Navigate to Project Directory

    cd my-vite-app

### 4. Install Dependencies

    # Using npm
    npm install

    # Or using yarn
    yarn

    # Or using pnpm
    pnpm install

### 5. Start Development Server

    # Using npm
    npm run dev

    # Or using yarn
    yarn dev

    # Or using pnpm
    pnpm dev

## Project Structure

After creation, your Vite application will have the following structure:

    my-vite-app/
    ├── public/
    │   └── vite.svg
    ├── src/
    │   ├── assets/
    │   │   └── javascript.svg
    │   ├── counter.js
    │   ├── main.js
    │   └── style.css
    ├── .gitignore
    ├── index.html
    ├── package.json
    └── vite.config.js

## Available Scripts

    * npm run dev - Start development server
    * npm run build - Build for production
    * npm run preview - Preview production build locally

## Environment Configuration

### Development Environment Variables

Create a .env file in the project root for environment-specific variables:

    # .env
    VITE_APP_TITLE=My Vite Application
    VITE_API_URL=http://localhost:3000/api

### Production Environment Variables

Create a .env.production file for production-specific variables:

    # .env.production
    VITE_APP_TITLE=My Vite Application (Production)
    VITE_API_URL=https://api.myapp.com

## Additional Setup Options

### TypeScript Support

To use TypeScript, create the application with TypeScript template:

    npm create vite@latest my-vite-app -- --template vanilla-ts

### React Support

For React applications:

    npm create vite@latest my-vite-app -- --template react

### Vue Support

For Vue.js applications:

    npm create vite@latest my-vite-app -- --template vue

## Build and Deployment

### Building for Production

    npm run build

This creates a dist/ folder with optimized production files.

### Preview Production Build

    npm run preview

## Troubleshooting

### Common Issues and Solutions

    1. Node.js Version Issues
    * Ensure you're using Node.js 14.18+ or 16+

    * Use node --version to check your current version
    2. Port Already in Use
    * The default port is 5173

    * If occupied, Vite will automatically use the next available port
    3. Permission Issues
    * On Unix systems, you might need to use sudo for global installations

    * Consider using a Node version manager (nvm) instead

## Next Steps

    1. Customize your vite.config.js file
    2. Add additional dependencies as needed
    3. Configure your preferred development tools (ESLint, Prettier, etc.)
    4. Set up your preferred CSS framework or preprocessor
    5. Configure your deployment pipeline

## Useful Resources

    * Vite Official Documentation
    * Vite GitHub Repository
    * Node.js Official Website


    ### **package.json Template**

    ```json
    {
    "name": "my-vite-app",
    "private": true,
    "version": "0.0.0",
    "type": "module",
    "scripts": {
        "dev": "vite",
        "build": "vite build",
        "preview": "vite preview"
    },
    "devDependencies": {
        "vite": "^5.0.8"
    }
    }

### vite.config.js Template

    import { defineConfig } from 'vite'

    // https://vitejs.dev/config/
    export default defineConfig({
    server: {
        port: 5173,
        open: true
    },
    build: {
        outDir: 'dist',
        sourcemap: true
    }
    })

## Quick Setup Script

You can also create a setup script to automate the process:

### setup.sh

    #!/bin/bash

    echo "🚀 Setting up Vite Application..."

    # Check if Node.js is installed
    if ! command -v node &> /dev/null; then
        echo "❌ Node.js is not installed. Please install Node.js first."
        exit 1
    fi

    # Check if npm is installed
    if ! command -v npm &> /dev/null; then
        echo "❌ npm is not installed. Please install npm first."
        exit 1
    fi

    echo "✅ Node.js version: $(node --version)"
    echo "✅ npm version: $(npm --version)"

    # Create Vite application
    echo "📦 Creating Vite application..."
    npm create vite@latest my-vite-app

    # Navigate to directory
    cd my-vite-app

    # Install dependencies
    echo "📥 Installing dependencies..."
    npm install

    echo "🎉 Setup complete! Run the following commands to start:"
    echo "cd my-vite-app"
    echo "npm run dev"

To use this script, save it as setup.sh, make it executable with chmod +x
setup.sh, and run ./setup.sh.

## For The Presentation

**Create a Pokédex web application** using the existing React + TypeScript + Vite setup in `pokemon-api`. 

The app should use the PokéAPI to fetch and display Pokémon data.

Core Features:

* **Home Page** - Display a grid of Pokémon cards (paginated, 20 per page)
* **Search** - Filter Pokémon by name
* **Pokémon Detail View** - Click a card to see detailed stats, abilities, and evolution chain
* **Type Filtering** - Filter by Pokémon type (Fire, Water, Grass, etc.)

Technical Requirements:

* Use React hooks (useState, useEffect, useCallback)
* Create a custom hook usePokemon for API calls with loading/
error states
* Implement TypeScript interfaces for all API responses
* Add responsive CSS (mobile-first design)
* Use CSS Grid for the Pokémon card layout
* Include loading skeletons and error boundaries

UI/UX Requirements:

* Pokémon type badges with appropriate colors (Fire=red, Water=blue, etc.)
* Smooth hover animations on cards
* Clean, modern design inspired by the official Pokédex
* Display Pokémon sprite images, ID number, name, and types on cards


> Now rewrite the above prompt to first design an implementation plan before coding so we can go step by step.


Remember to use `@workspace`

### New better plan:

#### Phase 1: Foundation & Setup
* Project Structure - Set up folder organization (components, hooks, types, utils, styles)
* TypeScript Interfaces - Define all API response types for PokéAPI
* API Utility - Create base API fetching functions

#### Phase 2: Core Hook & Data Layer

* usePokemon Hook - Custom hook with loading/error states for API calls
* Pokemon List Fetching - Get paginated list of Pokémon
* Pokemon Detail Fetching - Get individual Pokémon data

#### Phase 3: Base Components

* Loading Skeleton - Reusable loading placeholder component
* Error Boundary - Error handling wrapper component
* Type Badge - Pokémon type badges with colors

#### Phase 4: Main Features

* Pokemon Card - Individual card component with sprite, name, ID, types
* Pokemon Grid - CSS Grid layout for cards
* Pagination - Navigate through pages of Pokémon

#### Phase 5: Search & Filtering

* Search Bar - Filter Pokémon by name
* Type Filter - Filter by Pokémon type dropdown/buttons

#### Phase 6: Detail View

* Pokemon Detail Page - Full stats, abilities display
* Evolution Chain - Fetch and display evolution data
* Navigation - Route between list and detail views
#### Phase 7: Styling & Polish

* Responsive CSS - Mobile-first design
* Hover Animations - Smooth card interactions
* Final Styling - Modern Pokédex-inspired theme

