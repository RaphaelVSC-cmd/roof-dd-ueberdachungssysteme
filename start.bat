@echo off
echo Starte lokalen Server fuer Roof D&D Ueberdachungssysteme...
start http://localhost:8000
python -m http.server 8000
