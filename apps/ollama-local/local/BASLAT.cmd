@echo off
chcp 65001 >nul
title Local Ollama - Bu pencere acik kalsin
cd /d "%~dp0"
where py >nul 2>nul
if not errorlevel 1 (
  py -3 bridge.py
  goto :done
)
where python >nul 2>nul
if not errorlevel 1 (
  python bridge.py
  goto :done
)
echo Python 3 bulunamadi. Python 3.10 veya yenisini kurup yeniden deneyin.
echo https://www.python.org/downloads/windows/
:done
pause
