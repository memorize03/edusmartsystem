/**
 * Language handling for student pages
 * This file ensures consistent language functionality across all student pages
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get the current language from localStorage
    const currentLang = localStorage.getItem('selectedLanguage') || 'uz';
    
    // Add language links to the student UI
    addLanguageSelector();
    
    // Apply translations based on the stored language
    if (typeof window.applyTranslations === 'function') {
        window.applyTranslations();
    }
    
    // Apply additional translations for elements that might be missed
    applyAdditionalTranslations(currentLang);
    
    // Refresh dynamic content with the current language
    refreshDynamicContent();
});

// Function to add language selector to the student pages
function addLanguageSelector() {
    // Create a small language switcher
    const languageSwitcher = document.createElement('div');
    languageSwitcher.className = 'student-language-switcher';
    languageSwitcher.innerHTML = `
        <a href="#" onclick="changeStudentLanguage('uz'); return false;">UZ</a> |
        <a href="#" onclick="changeStudentLanguage('ru'); return false;">RU</a> |
        <a href="#" onclick="changeStudentLanguage('en'); return false;">EN</a>
    `;
    
    // Style the language switcher
    languageSwitcher.style.position = 'fixed';
    languageSwitcher.style.top = '10px';
    languageSwitcher.style.right = '10px';
    languageSwitcher.style.background = 'rgba(255, 255, 255, 0.9)';
    languageSwitcher.style.padding = '5px 10px';
    languageSwitcher.style.borderRadius = '4px';
    languageSwitcher.style.fontSize = '12px';
    languageSwitcher.style.zIndex = '9999';
    
    // Add the language switcher to the document
    document.body.appendChild(languageSwitcher);
}

// Function to change language in student pages
function changeStudentLanguage(lang) {
    if (['uz', 'ru', 'en'].includes(lang)) {
        // Save the selected language to localStorage
        localStorage.setItem('selectedLanguage', lang);
        
        // Use data.js changeLanguage function if available
        if (typeof window.changeLanguage === 'function') {
            window.changeLanguage(lang);
        }
        
        // Apply additional translations for elements that might be missed
        applyAdditionalTranslations(lang);
        
        // Update HTML lang attribute
        document.documentElement.lang = lang;
        
        // Force reload key UI elements with proper translations
        if (typeof window.applyTranslations === 'function') {
            window.applyTranslations();
        }
        
        // Update page-specific dynamic content
        // If we're on the announcements page, refresh announcements
        if (window.location.href.includes('/student/announcements.html')) {
            if (typeof window.renderAnnouncements === 'function') {
                window.renderAnnouncements();
            }
        }
        
        // If we're on the index page, refresh recent announcements
        if (window.location.href.includes('/student/index.html')) {
            if (typeof window.loadRecentAnnouncements === 'function') {
                window.loadRecentAnnouncements();
            }
        }
        
        // If we're on the grades page, refresh grades
        if (window.location.href.includes('/student/grades.html')) {
            if (typeof window.renderGrades === 'function') {
                window.renderGrades();
            }
        }
        
        // Always refresh dynamic content for any student page
        refreshDynamicContent();
        
        // Update the document title based on the selected language
        updatePageTitle(lang);
        
        console.log(`Language switched to: ${lang}`);
    }
}

// Function to apply additional translations that might be missed by the data.js system
function applyAdditionalTranslations(lang) {
    // Define translations for key UI elements
    const translations = {
        uz: {
            systemTitle: 'Edu Smart System',
            studentTab: 'O\'quvchi',
            home: 'Bosh sahifa',
            grades: 'Baholar',
            attendance: 'Davomat',
            announcements: 'E\'lonlar',
            logout: 'Chiqish',
            welcome: 'Xush kelibsiz',
            averageGrade: 'O\'rtacha baho',
            recentGrades: 'So\'nggi baholar',
            viewAllGrades: 'Barcha baholarni ko\'rish',
            noGrades: 'Baholar mavjud emas',
            noAnnouncements: 'E\'lonlar mavjud emas',
            recentAnnouncements: 'So\'nggi e\'lonlar',
            viewAllAnnouncements: 'Barcha e\'lonlarni ko\'rish'
        },
        ru: {
            systemTitle: 'Школьная Система',
            studentTab: 'Ученик',
            home: 'Главная',
            grades: 'Оценки',
            attendance: 'Посещаемость',
            announcements: 'Объявления',
            logout: 'Выход',
            welcome: 'Добро пожаловать',
            averageGrade: 'Средняя оценка',
            recentGrades: 'Последние оценки',
            viewAllGrades: 'Посмотреть все оценки',
            noGrades: 'Нет оценок',
            noAnnouncements: 'Нет объявлений',
            recentAnnouncements: 'Последние объявления',
            viewAllAnnouncements: 'Просмотреть все объявления'
        },
        en: {
            systemTitle: 'School System',
            studentTab: 'Student',
            home: 'Home',
            grades: 'Grades',
            attendance: 'Attendance',
            announcements: 'Announcements',
            logout: 'Logout',
            welcome: 'Welcome',
            averageGrade: 'Average Grade',
            recentGrades: 'Recent Grades',
            viewAllGrades: 'View All Grades',
            noGrades: 'No Grades Available',
            noAnnouncements: 'No Announcements Available',
            recentAnnouncements: 'Recent Announcements',
            viewAllAnnouncements: 'View All Announcements'
        }
    };
    
    // Apply translations to elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

// Function to refresh dynamic content after language change
function refreshDynamicContent() {
    // For example, re-apply translations to any dynamically loaded content
    // This will also be called when the page loads
    
    // Get current language
    const currentLang = localStorage.getItem('selectedLanguage') || 'uz';
    
    // Update student name if present (present in most student pages)
    const studentNameElement = document.getElementById('studentName');
    if (studentNameElement) {
        const studentId = localStorage.getItem('currentStudentId');
        if (studentId) {
            const students = getFromStorage('students') || [];
            const currentStudent = students.find(s => s.id == studentId);
            if (currentStudent) {
                studentNameElement.textContent = currentStudent.name;
            }
        }
    }
    
    // Update any page-specific content
    // For student dashboard
    if (window.location.href.includes('/student/index.html')) {
        // Refresh the student ID for the current session
        const studentId = localStorage.getItem('currentStudentId');
        if (studentId) {
            if (typeof window.loadStudentGrades === 'function') {
                window.loadStudentGrades(studentId);
            }
            if (typeof window.loadStudentAttendance === 'function') {
                window.loadStudentAttendance(studentId);
            }
        }
    }
    
    // Find and translate any elements with the "data-translate-dynamic" attribute
    document.querySelectorAll('[data-translate-dynamic]').forEach(element => {
        const key = element.getAttribute('data-translate-dynamic');
        const translations = {
            uz: {
                grade: 'Baho',
                attendance: 'Davomat',
                present: 'Keldi',
                absent: 'Kelmadi',
                late: 'Kechikdi',
                view: 'Ko\'rish',
                edit: 'Tahrirlash',
                delete: 'O\'chirish'
            },
            ru: {
                grade: 'Оценка',
                attendance: 'Посещаемость',
                present: 'Присутствовал',
                absent: 'Отсутствовал',
                late: 'Опоздал',
                view: 'Посмотреть',
                edit: 'Редактировать',
                delete: 'Удалить'
            },
            en: {
                grade: 'Grade',
                attendance: 'Attendance',
                present: 'Present',
                absent: 'Absent',
                late: 'Late',
                view: 'View',
                edit: 'Edit',
                delete: 'Delete'
            }
        };
        
        if (translations[currentLang] && translations[currentLang][key]) {
            element.textContent = translations[currentLang][key];
        }
    });
    
    // Re-apply translations to any other dynamic elements
    applyAdditionalTranslations(currentLang);
    
    // Update the page title based on current language
    updatePageTitle(currentLang);
}

// Function to update the page title with proper translation
function updatePageTitle(lang) {
    // Title translations for student pages
    const titleTranslations = {
        uz: {
            'index.html': 'Bosh sahifa | O\'quvchi Panel',
            'grades.html': 'Baholar | O\'quvchi Panel',
            'attendance.html': 'Davomat | O\'quvchi Panel',
            'announcements.html': 'E\'lonlar | O\'quvchi Panel'
        },
        ru: {
            'index.html': 'Главная | Панель ученика',
            'grades.html': 'Оценки | Панель ученика',
            'attendance.html': 'Посещаемость | Панель ученика',
            'announcements.html': 'Объявления | Панель ученика'
        },
        en: {
            'index.html': 'Home | Student Panel',
            'grades.html': 'Grades | Student Panel',
            'attendance.html': 'Attendance | Student Panel',
            'announcements.html': 'Announcements | Student Panel'
        }
    };
    
    // Get the current page filename
    const currentPage = window.location.pathname.split('/').pop();
    
    // Update the title if a translation exists
    if (titleTranslations[lang] && titleTranslations[lang][currentPage]) {
        document.title = titleTranslations[lang][currentPage];
    }
}

// Add the function to the window object
window.changeStudentLanguage = changeStudentLanguage; 