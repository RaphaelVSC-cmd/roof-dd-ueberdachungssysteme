#!/usr/bin/env bash
echo "Starte lokalen Server fuer Roof D&D Ueberdachungssysteme..."
if command -v xdg-open > /dev/null; then
  xdg-open http://localhost:8000 &
elif command -v open > /dev/null; then
  open http://localhost:8000 &
fi
python3 -m http.server 8000
