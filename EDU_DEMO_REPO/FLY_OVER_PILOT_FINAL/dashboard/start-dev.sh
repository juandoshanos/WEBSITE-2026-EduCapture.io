#!/bin/bash
# Development startup script for EduCapture Lesson Replay Drive
# This script starts the Vite development server with proper configuration

set -e

echo "🚀 Starting EduCapture Lesson Replay Drive Development Server"
echo "================================================"

# Check if .env.local exists, if not copy from .env.example
if [ ! -f ".env.local" ]; then
    echo "⚠️  .env.local not found. Creating from .env.example..."
    cp .env.example .env.local
    echo "✅ Created .env.local - you can edit this file to configure your API URL"
fi

# Display current configuration
echo "📋 Current Configuration:"
if [ -f ".env.local" ]; then
    echo "   API Base URL: $(grep VITE_API_BASE_URL .env.local | cut -d '=' -f2)"
fi
echo "   Frontend URL: http://localhost:8080"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

echo "🌟 Starting Vite development server..."
echo "   Press Ctrl+C to stop"
echo "   Open http://localhost:8080 in your browser"
echo ""

# Start the development server
npm run dev