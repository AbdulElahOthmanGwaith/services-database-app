@echo off
echo 🚀 بدء تشغيل تطبيق قاعدة البيانات...

REM فحص توفر Python
python --version >nul 2>&1
if %errorlevel% == 0 (
    set PYTHON_CMD=python
    goto :start_python
)

python3 --version >nul 2>&1
if %errorlevel% == 0 (
    set PYTHON_CMD=python3
    goto :start_python
)

echo ❌ Python غير مثبت على النظام
echo يرجى تثبيت Python من https://python.org
pause
exit /b 1

:start_python
echo 🐍 استخدام Python HTTP Server...
echo 📍 العنوان: http://localhost:8000
echo ⏹️  للإيقاف: اضغط Ctrl+C
echo.
%PYTHON_CMD% -m http.server 8000