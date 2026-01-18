#!/bin/bash
# Package Frontend for Developer
# This script creates a clean zip file of the frontend code to share

echo "📦 Packaging EduCapture Frontend for Developer..."
echo ""

# Navigate to project root
cd "$(dirname "$0")/.."

# Set output filename with timestamp
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
OUTPUT_FILE="educapture-frontend_${TIMESTAMP}.zip"

echo "Creating archive: ${OUTPUT_FILE}"
echo ""

# Create zip excluding unnecessary files
zip -r "${OUTPUT_FILE}" frontend/ \
  -x "frontend/node_modules/*" \
  -x "frontend/dist/*" \
  -x "frontend/.DS_Store" \
  -x "frontend/.env.local" \
  -x "frontend/bun.lockb" \
  -x "*/.git/*" \
  -q

if [ $? -eq 0 ]; then
    # Get file size
    SIZE=$(du -h "${OUTPUT_FILE}" | cut -f1)
    
    echo "✅ Success! Package created:"
    echo ""
    echo "   📁 File: ${OUTPUT_FILE}"
    echo "   📏 Size: ${SIZE}"
    echo ""
    echo "📋 What's included:"
    echo "   ✓ All source code (src/)"
    echo "   ✓ Configuration files"
    echo "   ✓ package.json & dependencies list"
    echo "   ✓ Documentation"
    echo ""
    echo "📋 What's excluded (will be generated):"
    echo "   ✗ node_modules/ (too large)"
    echo "   ✗ dist/ (build output)"
    echo "   ✗ .env.local (local config)"
    echo ""
    echo "🚀 Next steps:"
    echo "   1. Share ${OUTPUT_FILE} with your developer"
    echo "   2. Developer extracts and runs: npm install"
    echo "   3. Developer reads: DEVELOPER_GUIDE.md"
    echo ""
    echo "📄 Location: $(pwd)/${OUTPUT_FILE}"
else
    echo "❌ Error creating package"
    exit 1
fi
