// Application State
let services = [];
let currentFilter = 'all';
let currentPage = 1;
const servicesPerPage = 9;
let searchTerm = '';
let selectedCategory = '';

// DOM Elements
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const servicesGrid = document.getElementById('servicesGrid');
const categoriesGrid = document.getElementById('categoriesGrid');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const addServiceForm = document.getElementById('addServiceForm');
const serviceModal = document.getElementById('serviceModal');
const closeModal = document.getElementById('closeModal');
const modalBody = document.getElementById('modalBody');
const themeToggle = document.getElementById('themeToggle');

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeServices();
    setupEventListeners();
    loadCategories();
    updateStatistics();
    setupTheme();
    setupNavigation();
});

// Sample Services Data
function initializeServices() {
    services = [
        {
            id: 1,
            name: "خدمات الحوسبة السحابية",
            category: "تقنية",
            description: "خدمات الحوسبة السحابية المتقدمة للشركات والأفراد",
            provider: "تقنية السحاب",
            price: "يبدأ من 100 ريال شهرياً",
            website: "https://cloud-tech.sa",
            featured: true,
            rating: 4.8,
            reviews: 245
        },
        {
            id: 2,
            name: "استشارات طبية عن بعد",
            category: "صحة",
            description: "استشارات طبية متخصصة عبر الإنترنت مع أفضل الأطباء",
            provider: "مستشفى الرعاية",
            price: "150 ريال للجلسة",
            website: "https://telemedicine.sa",
            featured: true,
            rating: 4.9,
            reviews: 892
        },
        {
            id: 3,
            name: "دورات البرمجة المتقدمة",
            category: "تعليم",
            description: "تعلم البرمجة من الصفر حتى الاحتراف مع مدربين معتمدين",
            provider: "أكاديمية الكود",
            price: "500 ريال للدورة",
            website: "https://code-academy.sa",
            featured: false,
            rating: 4.7,
            reviews: 156
        },
        {
            id: 4,
            name: "خدمات البنك الرقمي",
            category: "خدمات مالية",
            description: "حلول مصرفية رقمية متكاملة للأفراد والشركات",
            provider: "البنك الرقمي",
            price: "مجاني",
            website: "https://digital-bank.sa",
            featured: true,
            rating: 4.6,
            reviews: 1205
        },
        {
            id: 5,
            name: "تطبيق توصيل الطعام",
            category: "نقل",
            description: "اطلب طعامك المفضل من أفضل المطاعم مع توصيل سريع",
            provider: "توصيل سريع",
            price: "عمولة 15%",
            website: "https://food-delivery.sa",
            featured: false,
            rating: 4.5,
            reviews: 2341
        },
        {
            id: 6,
            name: "خدمات الأمن السيبراني",
            category: "تقنية",
            description: "حماية شاملة للشركات من التهديدات السيبرانية",
            provider: "أمان تك",
            price: "حسب الحجم",
            website: "https://cybersec.sa",
            featured: true,
            rating: 4.9,
            reviews: 78
        },
        {
            id: 7,
            name: "تطبيق اللياقة البدنية",
            category: "صحة",
            description: "برامج تدريب شخصية ومتابعة صحية مع مدربين محترفين",
            provider: "فيت لايف",
            price: "99 ريال شهرياً",
            website: "https://fitlife.sa",
            featured: false,
            rating: 4.4,
            reviews: 567
        },
        {
            id: 8,
            name: "منصة التعليم الإلكتروني",
            category: "تعليم",
            description: "منصة تعليمية شاملة تضم آلاف الدورات في مختلف المجالات",
            provider: "تعلم أونلاين",
            price: "يبدأ من 50 ريال",
            website: "https://learn-online.sa",
            featured: true,
            rating: 4.8,
            reviews: 3452
        },
        {
            id: 9,
            name: "خدمات الاستثمار الذكي",
            category: "خدمات مالية",
            description: "استثمر أموالك بذكاء مع نصائح خبراء الاستثمار",
            provider: "استثمار ذكي",
            price: "عمولة 2%",
            website: "https://smart-invest.sa",
            featured: false,
            rating: 4.6,
            reviews: 234
        },
        {
            id: 10,
            name: "تطبيق سيارات الأجرة",
            category: "نقل",
            description: "احجز سيارة أجرة بسهولة مع سائقين موثوقين",
            provider: "تاكسي بلس",
            price: "حسب المسافة",
            website: "https://taxi-plus.sa",
            featured: false,
            rating: 4.3,
            reviews: 1876
        },
        {
            id: 11,
            name: "خدمات التسوق الإلكتروني",
            category: "تجارة إلكترونية",
            description: "متجر إلكتروني شامل لجميع احتياجاتك اليومية",
            provider: "سوق الكتروني",
            price: "مجاني + توصيل",
            website: "https://e-souk.sa",
            featured: true,
            rating: 4.7,
            reviews: 5643
        },
        {
            id: 12,
            name: "خدمات التصميم الجرافيكي",
            category: "إبداع",
            description: "تصميمات احترافية للشعارات والهوية البصرية",
            provider: "كريتف ديزاين",
            price: "يبدأ من 200 ريال",
            website: "https://creative-design.sa",
            featured: false,
            rating: 4.8,
            reviews: 432
        }
    ];
    
    renderServices();
}

// Setup Event Listeners
function setupEventListeners() {
    // Search functionality
    searchInput.addEventListener('input', handleSearch);
    categoryFilter.addEventListener('change', handleCategoryFilter);
    
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', handleFilterClick);
    });
    
    // Load more button
    loadMoreBtn.addEventListener('click', loadMoreServices);
    
    // Add service form
    addServiceForm.addEventListener('submit', handleAddService);
    
    // Modal functionality
    closeModal.addEventListener('click', closeServiceModal);
    window.addEventListener('click', function(event) {
        if (event.target === serviceModal) {
            closeServiceModal();
        }
    });
    
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
}

// Search functionality
function handleSearch(event) {
    searchTerm = event.target.value.toLowerCase();
    currentPage = 1;
    renderServices();
}

// Category filter
function handleCategoryFilter(event) {
    selectedCategory = event.target.value;
    currentPage = 1;
    renderServices();
}

// Filter buttons
function handleFilterClick(event) {
    // Remove active class from all buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to clicked button
    event.target.classList.add('active');
    
    // Set current filter
    currentFilter = event.target.dataset.filter;
    currentPage = 1;
    
    renderServices();
}

// Render services
function renderServices() {
    const filteredServices = getFilteredServices();
    const paginatedServices = getPaginatedServices(filteredServices);
    
    if (currentPage === 1) {
        servicesGrid.innerHTML = '';
    }
    
    if (paginatedServices.length === 0 && currentPage === 1) {
        servicesGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>لا توجد نتائج</h3>
                <p>لم نجد أي خدمات تطابق بحثك</p>
            </div>
        `;
        loadMoreBtn.style.display = 'none';
        return;
    }
    
    paginatedServices.forEach(service => {
        const serviceCard = createServiceCard(service);
        servicesGrid.appendChild(serviceCard);
    });
    
    // Show/hide load more button
    const hasMoreServices = filteredServices.length > currentPage * servicesPerPage;
    loadMoreBtn.style.display = hasMoreServices ? 'block' : 'none';
}

// Get filtered services
function getFilteredServices() {
    let filtered = services;
    
    // Filter by category
    if (currentFilter !== 'all') {
        filtered = filtered.filter(service => service.category === currentFilter);
    }
    
    // Filter by selected category from dropdown
    if (selectedCategory) {
        filtered = filtered.filter(service => service.category === selectedCategory);
    }
    
    // Filter by search term
    if (searchTerm) {
        filtered = filtered.filter(service => 
            service.name.toLowerCase().includes(searchTerm) ||
            service.description.toLowerCase().includes(searchTerm) ||
            service.category.toLowerCase().includes(searchTerm) ||
            service.provider.toLowerCase().includes(searchTerm)
        );
    }
    
    return filtered;
}

// Get paginated services
function getPaginatedServices(filteredServices) {
    const startIndex = (currentPage - 1) * servicesPerPage;
    const endIndex = startIndex + servicesPerPage;
    return filteredServices.slice(startIndex, endIndex);
}

// Create service card
function createServiceCard(service) {
    const card = document.createElement('div');
    card.className = 'service-card fade-in';
    card.innerHTML = `
        <div class="service-card-header">
            <h3>${service.name}</h3>
            <span class="service-category">${service.category}</span>
        </div>
        <div class="service-card-body">
            <p class="service-description">${service.description}</p>
            <div class="service-meta">
                <span class="service-provider">
                    <i class="fas fa-building"></i> ${service.provider}
                </span>
                <span class="service-price">${service.price}</span>
            </div>
            ${service.rating ? `
                <div class="service-rating">
                    <div class="stars">
                        ${generateStars(service.rating)}
                    </div>
                    <span class="rating-text">${service.rating} (${service.reviews} تقييم)</span>
                </div>
            ` : ''}
        </div>
    `;
    
    card.addEventListener('click', () => openServiceModal(service));
    return card;
}

// Generate stars for rating
function generateStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// Load more services
function loadMoreServices() {
    currentPage++;
    renderServices();
}

// Open service modal
function openServiceModal(service) {
    modalBody.innerHTML = `
        <div class="service-details">
            <div class="service-header">
                <h2>${service.name}</h2>
                <span class="service-category">${service.category}</span>
            </div>
            
            <div class="service-info">
                <div class="info-section">
                    <h4><i class="fas fa-info-circle"></i> الوصف</h4>
                    <p>${service.description}</p>
                </div>
                
                <div class="info-section">
                    <h4><i class="fas fa-building"></i> مقدم الخدمة</h4>
                    <p>${service.provider}</p>
                </div>
                
                <div class="info-section">
                    <h4><i class="fas fa-money-bill-wave"></i> السعر</h4>
                    <p class="service-price">${service.price}</p>
                </div>
                
                ${service.rating ? `
                    <div class="info-section">
                        <h4><i class="fas fa-star"></i> التقييم</h4>
                        <div class="rating-display">
                            <div class="stars">${generateStars(service.rating)}</div>
                            <span>${service.rating} من 5 (${service.reviews} تقييم)</span>
                        </div>
                    </div>
                ` : ''}
                
                ${service.website ? `
                    <div class="info-section">
                        <h4><i class="fas fa-globe"></i> الموقع الإلكتروني</h4>
                        <a href="${service.website}" target="_blank" class="btn btn-secondary">
                            زيارة الموقع <i class="fas fa-external-link-alt"></i>
                        </a>
                    </div>
                ` : ''}
            </div>
            
            <div class="service-actions">
                <button class="btn btn-primary" onclick="contactService(${service.id})">
                    <i class="fas fa-phone"></i> تواصل مع المقدم
                </button>
                <button class="btn btn-secondary" onclick="shareService(${service.id})">
                    <i class="fas fa-share"></i> مشاركة
                </button>
            </div>
        </div>
    `;
    
    serviceModal.style.display = 'block';
}

// Close service modal
function closeServiceModal() {
    serviceModal.style.display = 'none';
}

// Contact service provider
function contactService(serviceId) {
    const service = services.find(s => s.id === serviceId);
    if (service) {
        alert(`سيتم توجيهك للتواصل مع ${service.provider}`);
        // Here you would typically open a contact form or redirect to contact page
    }
}

// Share service
function shareService(serviceId) {
    const service = services.find(s => s.id === serviceId);
    if (service && navigator.share) {
        navigator.share({
            title: service.name,
            text: service.description,
            url: window.location.href
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            alert('تم نسخ الرابط إلى الحافظة');
        });
    }
}

// Load categories
function loadCategories() {
    const categories = [...new Set(services.map(service => service.category))];
    
    // Populate category filter dropdown
    categoryFilter.innerHTML = '<option value="">جميع الفئات</option>';
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
    
    // Render categories grid
    const categoryIcons = {
        'تقنية': 'fas fa-laptop-code',
        'صحة': 'fas fa-heartbeat',
        'تعليم': 'fas fa-graduation-cap',
        'خدمات مالية': 'fas fa-coins',
        'نقل': 'fas fa-car',
        'تجارة إلكترونية': 'fas fa-shopping-cart',
        'إبداع': 'fas fa-palette'
    };
    
    categoriesGrid.innerHTML = '';
    categories.forEach(category => {
        const serviceCount = services.filter(service => service.category === category).length;
        const categoryCard = document.createElement('div');
        categoryCard.className = 'category-card fade-in';
        categoryCard.innerHTML = `
            <div class="category-icon">
                <i class="${categoryIcons[category] || 'fas fa-cog'}"></i>
            </div>
            <h3>${category}</h3>
            <p class="category-count">${serviceCount} خدمة</p>
        `;
        
        categoryCard.addEventListener('click', () => {
            // Filter by this category
            selectedCategory = category;
            categoryFilter.value = category;
            currentPage = 1;
            renderServices();
            
            // Scroll to services section
            document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
        });
        
        categoriesGrid.appendChild(categoryCard);
    });
}

// Update statistics
function updateStatistics() {
    const totalServices = services.length;
    const totalCategories = [...new Set(services.map(service => service.category))].length;
    const featuredServices = services.filter(service => service.featured).length;
    
    document.getElementById('totalServices').textContent = totalServices;
    document.getElementById('totalCategories').textContent = totalCategories;
    document.getElementById('featuredServices').textContent = featuredServices;
    
    // Animate counters
    animateCounters();
}

// Animate counters
function animateCounters() {
    const counters = document.querySelectorAll('.stat-card h3');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        if (!isNaN(target)) {
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target.toLocaleString();
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current).toLocaleString();
                }
            }, 30);
        }
    });
}

// Handle add service form
function handleAddService(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const newService = {
        id: Date.now(),
        name: document.getElementById('serviceName').value,
        category: document.getElementById('serviceCategory').value,
        description: document.getElementById('serviceDescription').value,
        provider: document.getElementById('serviceProvider').value,
        price: document.getElementById('servicePrice').value || 'حسب الطلب',
        website: document.getElementById('serviceWebsite').value,
        featured: false,
        rating: null,
        reviews: 0
    };
    
    // Add service to array
    services.unshift(newService);
    
    // Update UI
    loadCategories();
    updateStatistics();
    renderServices();
    
    // Show success message
    showAlert('تم إضافة الخدمة بنجاح!', 'success');
    
    // Reset form
    event.target.reset();
    
    // Scroll to services section
    document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
}

// Show alert messages
function showAlert(message, type) {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    
    const form = document.querySelector('.add-service-form');
    form.insertBefore(alert, form.firstChild);
    
    setTimeout(() => {
        alert.remove();
    }, 5000);
}

// Theme functionality
function setupTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Navigation functionality
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Scroll to section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active nav on scroll
    window.addEventListener('scroll', updateActiveNav);
}

function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const headerHeight = document.querySelector('.header').offsetHeight;
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Smooth scrolling for anchor links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
});

// Loading animation
function showLoading() {
    servicesGrid.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
        </div>
    `;
}

// Export functions for global access
window.contactService = contactService;
window.shareService = shareService;