#!/bin/bash
# Run React Native Android app with Metro. Use this when using a physical device.
# Step 1: In a separate terminal, run: npm start
# Step 2: Wait until Metro shows "Welcome to Metro", then run this script.

set -e
cd "$(dirname "$0")/.."

echo "Checking Metro bundler..."
if ! curl -s http://localhost:8081/status > /dev/null 2>&1; then
  echo ""
  echo "Metro is not running. Please:"
  echo "  1. Open a new terminal"
  echo "  2. Run: npm start"
  echo "  3. Wait until Metro is ready (you see 'Welcome to Metro')"
  echo "  4. Run this script again: npm run android:device"
  echo ""
  exit 1
fi

echo "Metro is running."
echo "Setting up port forwarding for device (adb reverse tcp:8081 tcp:8081)..."
adb reverse tcp:8081 tcp:8081

echo "Launching app on device..."
npm run android
