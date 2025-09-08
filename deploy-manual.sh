#!/bin/bash

# Build the app
npm run build

# Create necessary files for GitHub Pages
touch build/.nojekyll

# Copy the index.html to 404.html to handle client-side routing
cp build/index.html build/404.html

echo "Build completed. Now you need to manually deploy the build folder to GitHub Pages."
echo "Follow these steps:"
echo "1. Go to your GitHub repository"
echo "2. Go to Settings > Pages"
echo "3. Under 'Build and deployment', select 'Deploy from a branch'"
echo "4. Select the branch and folder where you'll push the build folder"
echo "5. Push the build folder to that branch"
echo ""
echo "Alternatively, you can use a service like Netlify or Vercel for easier deployment."
