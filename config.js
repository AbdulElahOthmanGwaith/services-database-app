// إعدادات التطبيق
const AppConfig = {
    // إعدادات عامة
    app: {
        name: "قاعدة البيانات",
        description: "منصة شاملة لجميع الخدمات المتاحة",
        version: "1.0.0",
        author: "MiniMax Agent",
        language: "ar",
        direction: "rtl"
    },

    // إعدادات العرض
    display: {
        servicesPerPage: 9,
        maxSearchResults: 50,
        animationDuration: 300,
        loadingTimeout: 5000
    },

    // إعدادات الألوان والثيم
    theme: {
        colors: {
            primary: "#2c3e50",
            secondary: "#3498db",
            accent: "#e74c3c",
            success: "#27ae60",
            warning: "#f39c12",
            light: "#ecf0f1",
            dark: "#34495e"
        },
        defaultTheme: "light", // light أو dark
        enableThemeToggle: true
    },

    // إعدادات البحث
    search: {
        minSearchLength: 2,
        enableAutocomplete: true,
        searchDelay: 300, // milliseconds
        highlightResults: true
    },

    // إعدادات الفئات
    categories: {
        icons: {
            "تقنية": "fas fa-laptop-code",
            "صحة": "fas fa-heartbeat",
            "تعليم": "fas fa-graduation-cap",
            "خدمات مالية": "fas fa-coins",
            "نقل": "fas fa-car",
            "تجارة إلكترونية": "fas fa-shopping-cart",
            "إبداع": "fas fa-palette",
            "default": "fas fa-cog"
        },
        defaultCategory: "أخرى"
    },

    // إعدادات النماذج
    forms: {
        validation: {
            enableRealTime: true,
            showErrorMessages: true,
            requiredFieldIndicator: "*"
        },
        autoSave: false,
        resetAfterSubmit: true
    },

    // إعدادات API
    api: {
        dataFile: "services.json",
        enableCaching: true,
        cacheExpiry: 3600000, // 1 hour in milliseconds
        retryAttempts: 3,
        retryDelay: 1000
    },

    // إعدادات التخزين المحلي
    storage: {
        enableLocalStorage: true,
        keys: {
            theme: "app_theme",
            preferences: "user_preferences",
            favorites: "user_favorites",
            recentSearches: "recent_searches"
        },
        maxRecentSearches: 10
    },

    // إعدادات المشاركة
    sharing: {
        enableWebShare: true,
        enableCopyLink: true,
        shareText: "تحقق من هذه الخدمة المميزة:",
        socialMedia: {
            facebook: true,
            twitter: true,
            linkedin: true,
            whatsapp: true
        }
    },

    // إعدادات الاتصال
    contact: {
        defaultEmail: "info@database.com",
        defaultPhone: "+966123456789",
        supportEmail: "support@database.com",
        businessHours: "الأحد - الخميس، 9:00 ص - 6:00 م"
    },

    // إعدادات التطوير
    development: {
        enableDebugMode: false,
        showConsoleErrors: true,
        enablePerformanceMonitoring: false
    },

    // نصوص قابلة للتخصيص
    texts: {
        noResults: "لا توجد نتائج",
        loading: "جاري التحميل...",
        error: "حدث خطأ",
        success: "تم بنجاح",
        loadMore: "عرض المزيد",
        searchPlaceholder: "ابحث عن الخدمة التي تحتاجها...",
        allCategories: "جميع الفئات",
        featured: "مميز",
        newService: "خدمة جديدة",
        contactProvider: "تواصل مع المقدم",
        shareService: "مشاركة",
        addService: "إضافة خدمة",
        close: "إغلاق"
    },

    // إعدادات SEO
    seo: {
        enableMeta: true,
        defaultDescription: "اكتشف جميع الخدمات المتاحة في مكان واحد",
        defaultKeywords: "خدمات، قاعدة بيانات، السعودية، تقنية، صحة، تعليم",
        ogImage: "images/og-image.png"
    },

    // إعدادات الأداء
    performance: {
        enableLazyLoading: true,
        enableImageOptimization: true,
        enableGzipCompression: true,
        minifyAssets: false // في الإنتاج
    },

    // إعدادات التتبع والتحليل
    analytics: {
        enableGoogleAnalytics: false,
        googleAnalyticsId: "",
        enableEventTracking: false,
        trackSearchQueries: false,
        trackServiceViews: false
    }
};

// تصدير الإعدادات للاستخدام في ملفات أخرى
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AppConfig;
}

// جعل الإعدادات متاحة عالمياً في المتصفح
if (typeof window !== 'undefined') {
    window.AppConfig = AppConfig;
}