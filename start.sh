#!/bin/bash

# سكريبت تشغيل تطبيق قاعدة البيانات
echo "🚀 بدء تشغيل تطبيق قاعدة البيانات..."

# فحص توفر Python
if command -v python3 &> /dev/null; then
    PYTHON_CMD="python3"
elif command -v python &> /dev/null; then
    PYTHON_CMD="python"
else
    echo "❌ Python غير مثبت على النظام"
    echo "يرجى تثبيت Python من https://python.org"
    exit 1
fi

# فحص توفر Node.js (اختياري)
if command -v node &> /dev/null; then
    echo "✅ Node.js متوفر"
    if command -v npx &> /dev/null; then
        echo "🎯 استخدام npx serve..."
        npx serve . -s -l 3000
        exit 0
    fi
fi

# استخدام Python HTTP Server
echo "🐍 استخدام Python HTTP Server..."
echo "📍 العنوان: http://localhost:8000"
echo "⏹️  للإيقاف: اضغط Ctrl+C"
echo ""

$PYTHON_CMD -m http.server 8000