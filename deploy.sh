#!/bin/bash

# Build the app
npm run build

# Remove the gh-pages cache
rm -rf node_modules/.cache/gh-pages

# Force deploy to gh-pages branch
npx gh-pages -d build -f
