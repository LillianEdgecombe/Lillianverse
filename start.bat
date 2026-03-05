@echo off
echo Starting Lillianverse local server...
echo.

:: Try Python 3 first
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo Opening http://localhost:8000
    start http://localhost:8000
    python -m http.server 8000
    goto :end
)

:: Try py launcher
py --version >nul 2>&1
if %errorlevel% == 0 (
    echo Opening http://localhost:8000
    start http://localhost:8000
    py -m http.server 8000
    goto :end
)

:: Try Python 2
python2 --version >nul 2>&1
if %errorlevel% == 0 (
    echo Opening http://localhost:8000
    start http://localhost:8000
    python2 -m SimpleHTTPServer 8000
    goto :end
)

echo ERROR: Python not found.
echo.
echo Please install Python from https://www.python.org/downloads/
echo Or open the site using VS Code with the Live Server extension.
echo.
pause

:end
