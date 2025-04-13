/**
 * Language handling for admin pages
 * This file ensures consistent language functionality across all admin pages
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get the current language from localStorage
    const currentLang = localStorage.getItem('selectedLanguage') || 'uz';
    
    // Add language links to the admin UI
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

// Function to add language selector to the admin pages
function addLanguageSelector() {
    // Create a small language switcher
    const languageSwitcher = document.createElement('div');
    languageSwitcher.className = 'admin-language-switcher';
    languageSwitcher.innerHTML = `
        <a href="#" onclick="changeAdminLanguage('uz'); return false;">UZ</a> |
        <a href="#" onclick="changeAdminLanguage('ru'); return false;">RU</a> |
        <a href="#" onclick="changeAdminLanguage('en'); return false;">EN</a>
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

// Function to change language in admin pages
function changeAdminLanguage(lang) {
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
        
        // Handle specific pages with dynamic content
        // For announcements page
        if (window.location.href.includes('/admin/announcements.html')) {
            if (typeof window.renderAnnouncements === 'function') {
                window.renderAnnouncements();
            }
            
            // Update the language indicators on forms
            if (typeof window.updateLanguageIndicators === 'function') {
                window.updateLanguageIndicators();
            }
        }
        
        // For students page
        if (window.location.href.includes('/admin/students.html')) {
            if (typeof window.renderStudentsList === 'function') {
                window.renderStudentsList();
            }
        }
        
        // For teachers page
        if (window.location.href.includes('/admin/teachers.html')) {
            if (typeof window.renderTeachersList === 'function') {
                window.renderTeachersList();
            }
        }
        
        // For subjects page
        if (window.location.href.includes('/admin/subjects.html')) {
            if (typeof window.renderSubjectsList === 'function') {
                window.renderSubjectsList();
            }
        }
        
        // For attendance page
        if (window.location.href.includes('/admin/attendance.html')) {
            if (typeof window.renderAttendanceList === 'function') {
                window.renderAttendanceList();
            }
        }
        
        // For reports page
        if (window.location.href.includes('/admin/reports.html')) {
            if (typeof window.renderReports === 'function') {
                window.renderReports();
            }
        }
        
        // For index page (dashboard)
        if (window.location.href.includes('/admin/index.html')) {
            // Refresh recent announcements if function exists
            if (typeof window.loadRecentAnnouncements === 'function') {
                window.loadRecentAnnouncements();
            }
        }
        
        // Always refresh all dynamic content for any admin page
        refreshDynamicContent();
        
        // Update the document title based on the selected language
        updatePageTitle(lang);
        
        console.log(`Admin language switched to: ${lang}`);
    }
}

// Function to apply additional translations for UI elements
function applyAdditionalTranslations(lang) {
    const translations = {
        'uz': {
            'teacher': "O'qituvchi",
            'systemTitle': 'Edu Smart System',
            'adminPanel': 'Administrator paneli',
            'home': 'Bosh sahifa',
            'students': 'O\'quvchilar',
            'teachers': 'O\'qituvchilar',
            'subjects': 'Fanlar',
            'attendance': 'Davomat',
            'announcements': 'E\'lonlar',
            'reports': 'Hisobotlar',
            'logout': 'Chiqish',
            'studentCount': 'O\'quvchilar soni',
            'teacherCount': 'O\'qituvchilar soni',
            'subjectCount': 'Fanlar soni',
            'recentAnnouncements': 'So\'nggi e\'lonlar',
            'attendanceStats': 'Davomat statistikasi',
            'present': 'Kelgan',
            'late': 'Kechikkan',
            'absent': 'Kelmagan',
            'detailedInfo': 'Batafsil ma\'lumot',
            'viewAllAnnouncements': 'Barcha e\'lonlarni ko\'rish',
            'studentTab': 'O\'quvchi',
            'adminTab': 'Administrator'
        },
        'ru': {
            'teacher': 'Учитель',
            'systemTitle': 'Школьная Система',
            'adminPanel': 'Панель администратора',
            'home': 'Главная',
            'students': 'Ученики',
            'teachers': 'Учителя',
            'subjects': 'Предметы',
            'attendance': 'Посещаемость',
            'announcements': 'Объявления',
            'reports': 'Отчеты',
            'logout': 'Выход',
            'studentCount': 'Количество учеников',
            'teacherCount': 'Количество учителей',
            'subjectCount': 'Количество предметов',
            'recentAnnouncements': 'Последние объявления',
            'attendanceStats': 'Статистика посещаемости',
            'present': 'Присутствовал',
            'late': 'Опоздал',
            'absent': 'Отсутствовал',
            'detailedInfo': 'Подробная информация',
            'viewAllAnnouncements': 'Просмотреть все объявления',
            'studentTab': 'Ученик',
            'adminTab': 'Администратор'
        },
        'en': {
            'teacher': 'Teacher',
            'systemTitle': 'School System',
            'adminPanel': 'Administrator Panel',
            'home': 'Home',
            'students': 'Students',
            'teachers': 'Teachers',
            'subjects': 'Subjects',
            'attendance': 'Attendance',
            'announcements': 'Announcements',
            'reports': 'Reports',
            'logout': 'Logout',
            'studentCount': 'Student Count',
            'teacherCount': 'Teacher Count',
            'subjectCount': 'Subject Count',
            'recentAnnouncements': 'Recent Announcements',
            'attendanceStats': 'Attendance Statistics',
            'present': 'Present',
            'late': 'Late',
            'absent': 'Absent',
            'detailedInfo': 'Detailed Information',
            'viewAllAnnouncements': 'View All Announcements',
            'studentTab': 'Student',
            'adminTab': 'Administrator'
        }
    };

    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

// Function to refresh dynamic content after language change
function refreshDynamicContent() {
    // This function will handle refreshing any dynamic content that might need
    // to be translated after a language change
    
    // Get current language
    const currentLang = localStorage.getItem('selectedLanguage') || 'uz';
    
    // Re-apply translations to any elements that might have been missed
    applyAdditionalTranslations(currentLang);
    
    // If there are specific dynamic elements on admin pages, refresh them here
    document.querySelectorAll('[data-dynamic-translate]').forEach(element => {
        const key = element.getAttribute('data-dynamic-translate');
        const translations = {
            uz: {
                grade: 'Baho',
                attendance: 'Davomat',
                present: 'Keldi',
                absent: 'Kelmadi',
                late: 'Kechikdi',
                view: 'Ko\'rish',
                edit: 'Tahrirlash',
                delete: 'O\'chirish',
                total: 'Jami',
                count: 'Soni',
                studentCount: 'O\'quvchilar soni',
                teacherCount: 'O\'qituvchilar soni',
                subjectCount: 'Fanlar soni',
                save: 'Saqlash',
                cancel: 'Bekor qilish'
            },
            ru: {
                grade: 'Оценка',
                attendance: 'Посещаемость',
                present: 'Присутствовал',
                absent: 'Отсутствовал',
                late: 'Опоздал',
                view: 'Посмотреть',
                edit: 'Редактировать',
                delete: 'Удалить',
                total: 'Всего',
                count: 'Количество',
                studentCount: 'Количество учеников',
                teacherCount: 'Количество учителей',
                subjectCount: 'Количество предметов',
                save: 'Сохранить',
                cancel: 'Отмена'
            },
            en: {
                grade: 'Grade',
                attendance: 'Attendance',
                present: 'Present',
                absent: 'Absent',
                late: 'Late',
                view: 'View',
                edit: 'Edit',
                delete: 'Delete',
                total: 'Total',
                count: 'Count',
                studentCount: 'Student Count',
                teacherCount: 'Teacher Count',
                subjectCount: 'Subject Count',
                save: 'Save',
                cancel: 'Cancel'
            }
        };
        
        if (translations[currentLang] && translations[currentLang][key]) {
            element.textContent = translations[currentLang][key];
        }
    });
    
    // Update the page title based on current language
    updatePageTitle(currentLang);
}

// Function to update the page title with proper translation
function updatePageTitle(lang) {
    // Title translations for admin pages
    const titleTranslations = {
        uz: {
            'index.html': 'Bosh sahifa | Admin Panel',
            'students.html': 'O\'quvchilar | Admin Panel',
            'teachers.html': 'O\'qituvchilar | Admin Panel',
            'subjects.html': 'Fanlar | Admin Panel',
            'attendance.html': 'Davomat | Admin Panel',
            'announcements.html': 'E\'lonlar | Admin Panel',
            'reports.html': 'Hisobotlar | Admin Panel'
        },
        ru: {
            'index.html': 'Главная | Панель администратора',
            'students.html': 'Ученики | Панель администратора',
            'teachers.html': 'Учителя | Панель администратора',
            'subjects.html': 'Предметы | Панель администратора',
            'attendance.html': 'Посещаемость | Панель администратора',
            'announcements.html': 'Объявления | Панель администратора',
            'reports.html': 'Отчеты | Панель администратора'
        },
        en: {
            'index.html': 'Home | Admin Panel',
            'students.html': 'Students | Admin Panel',
            'teachers.html': 'Teachers | Admin Panel',
            'subjects.html': 'Subjects | Admin Panel',
            'attendance.html': 'Attendance | Admin Panel',
            'announcements.html': 'Announcements | Admin Panel',
            'reports.html': 'Reports | Admin Panel'
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
window.changeAdminLanguage = changeAdminLanguage; 