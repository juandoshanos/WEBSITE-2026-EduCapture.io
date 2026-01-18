#!/bin/bash
# Quick Start Script for Stakeholder Demo
# Run this tomorrow before your presentation!

set -e

echo "🎬 EduCapture - Starting Stakeholder Demo..."
echo ""
echo "================================================"
echo "  STAKEHOLDER PRESENTATION - DEMO MODE"
echo "================================================"
echo ""

# Navigate to frontend directory
cd "$(dirname "$0")"

# Check if videos exist
echo "✅ Checking demo videos..."
if [ -d "public/demo-videos" ]; then
    VIDEO_COUNT=$(ls -1 public/demo-videos/*.mp4 2>/dev/null | wc -l)
    if [ "$VIDEO_COUNT" -eq 3 ]; then
        echo "   Found 3 videos ready for demo"
    else
        echo "   ⚠️  Warning: Expected 3 videos, found $VIDEO_COUNT"
    fi
else
    echo "   ⚠️  Warning: Demo videos directory not found"
fi

echo ""
echo "✅ Checking node_modules..."
if [ ! -d "node_modules" ]; then
    echo "   Installing dependencies (first time only)..."
    npm install
else
    echo "   Dependencies already installed"
fi

echo ""
echo "================================================"
echo "  🚀 STARTING DEVELOPMENT SERVER"
echo "================================================"
echo ""
echo "📍 Demo will be available at:"
echo ""
echo "   🎯 http://localhost:8080/demo"
echo ""
echo "   (This is your PRESENTATION PAGE)"
echo ""
echo "================================================"
echo ""
echo "💡 Tips for your demo:"
echo "   • Videos will auto-play when selected"
echo "   • Use Previous/Next buttons to navigate"
echo "   • 3 highlights with AI feedback ready"
echo ""
echo "⚠️  Keep this terminal window open during demo"
echo "   Press Ctrl+C to stop the server when done"
echo ""
echo "================================================"
echo ""
echo "Starting server now..."
echo ""

# Start the dev server
npm run dev
