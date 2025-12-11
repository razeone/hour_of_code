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
