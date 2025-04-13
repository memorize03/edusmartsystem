/**
 * O'qituvchi interfeysi uchun til almashtirishni boshqarish
 * Bu skriрt o'qituvchi interfeyisida til o'zgartirilganda
 * o'quvchilar ro'yxatini ham yangilaydi
 */

document.addEventListener('DOMContentLoaded', function() {
    // Joriy tilni localStorage dan olish
    const currentLang = localStorage.getItem('selectedLanguage') || 'uz';
    
    // Til almashtirgichni qo'shish
    addLanguageSelector();
    
    // Boshlang'ich tarjimalarni qo'llash
    applyInitialTranslations(currentLang);
    
    // Dastlab barcha o'quvchilar ro'yxatini yangilash
    forceUpdateStudentTranslations();
    
    // Sahifa tarkibini yangilash
    refreshCurrentPageContent();
});

/**
 * O'qituvchi interfeysi uchun til almashtirgichni qo'shish
 */
function addLanguageSelector() {
    // Til almashtirgich elementini yaratish
    const languageSwitcher = document.createElement('div');
    languageSwitcher.className = 'language-switcher';
    languageSwitcher.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        z-index: 9999;
        background: rgba(255,255,255,0.8);
        padding: 5px 10px;
        border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    `;
    
    // Til linklar qo'shish
    languageSwitcher.innerHTML = `
        <a href="#" onclick="changeTeacherLanguage('uz'); return false;" style="margin-right: 5px; text-decoration: none; color: #333; font-weight: bold;">UZ</a> |
        <a href="#" onclick="changeTeacherLanguage('ru'); return false;" style="margin: 0 5px; text-decoration: none; color: #333; font-weight: bold;">RU</a> |
        <a href="#" onclick="changeTeacherLanguage('en'); return false;" style="margin-left: 5px; text-decoration: none; color: #333; font-weight: bold;">EN</a>
    `;
    
    // Sahifaga qo'shish
    document.body.appendChild(languageSwitcher);
}

/**
 * O'qituvchi interfeysi uchun til o'zgartirish
 * @param {string} lang - Til kodi (uz, ru, en)
 */
function changeTeacherLanguage(lang) {
    if (['uz', 'ru', 'en'].includes(lang)) {
        // Tanlangan tilni localStorage ga saqlash
        localStorage.setItem('selectedLanguage', lang);
        
        // HTML lang atributini yangilash
        document.documentElement.lang = lang;
        
        // Asosiy tarjimalarni qo'llash
        if (typeof window.changeLanguage === 'function') {
            try {
                window.changeLanguage(lang);
            } catch (e) {
                console.error('Error calling data.js changeLanguage:', e);
            }
        }
        
        // O'quvchilar ma'lumotlarini majburan yangilash
        if (typeof forceUpdateStudentTranslations === 'function') {
            try {
                forceUpdateStudentTranslations();
            } catch (e) {
                console.error('Error updating student translations:', e);
            }
        }
        
        // Qo'shimcha tarjimalarni qo'llash
        applyTeacherTranslations(lang);
        
        // Joriy sahifa tarkibini yangilash
        refreshCurrentPageContent();
        
        console.log(`Language changed to ${lang}`);
        
        // Sahifani qisqa muddat ichida yangilash
        // Bu til o'zgarishlarini to'liq qo'llash uchun
        setTimeout(function() {
            if (typeof renderStudents === 'function') {
                try {
                    renderStudents();
                    console.log('Students list refreshed after language change');
                } catch (e) {
                    console.log('Could not render students list:', e);
                }
            }
            
            if (typeof renderGrades === 'function') {
                try {
                    renderGrades();
                    console.log('Grades list refreshed after language change');
                } catch (e) {
                    console.log('Could not render grades list:', e);
                }
            }
            
            if (typeof renderAttendance === 'function') {
                try {
                    renderAttendance();
                    console.log('Attendance list refreshed after language change');
                } catch (e) {
                    console.log('Could not render attendance list:', e);
                }
            }
            
            if (typeof renderAnnouncements === 'function') {
                try {
                    renderAnnouncements();
                    console.log('Announcements refreshed after language change');
                } catch (e) {
                    console.log('Could not render announcements:', e);
                }
            }
        }, 300);
    }
}

/**
 * Joriy sahifa tarkibini yangilash
 * Sahifaga qarab tegishli ma'lumotlarni yangilash
 */
function refreshCurrentPageContent() {
    // O'quvchilar ro'yxati
    if (typeof renderStudents === 'function' && document.getElementById('studentsList')) {
        try {
            renderStudents();
            console.log('Students list refreshed');
        } catch (e) {
            console.error('Error refreshing students list:', e);
        }
    }
    
    // Baholar ro'yxati
    if (typeof renderGrades === 'function' && document.getElementById('gradesList')) {
        try {
            renderGrades();
            console.log('Grades list refreshed');
        } catch (e) {
            console.error('Error refreshing grades list:', e);
        }
    }
    
    // Davomat ro'yxati
    if (typeof renderAttendance === 'function' && document.getElementById('attendanceList')) {
        try {
            renderAttendance();
            console.log('Attendance list refreshed');
        } catch (e) {
            console.error('Error refreshing attendance list:', e);
        }
    }
    
    // E'lonlar ro'yxati
    if (typeof renderAnnouncements === 'function' && document.getElementById('announcementsList')) {
        try {
            renderAnnouncements();
            console.log('Announcements list refreshed');
        } catch (e) {
            console.error('Error refreshing announcements list:', e);
        }
    }
}

/**
 * O'qituvchi interfeysi uchun qo'shimcha tarjimalarni qo'llash
 * @param {string} lang - Til kodi (uz, ru, en)
 */
function applyTeacherTranslations(lang) {
    // Tarjimalar lug'ati
    const translations = {
        uz: {
            teacherPanel: "O'qituvchi paneli",
            studentList: "O'quvchilar ro'yxati",
            actions: "Amallar",
            searchPlaceholder: "O'quvchi nomi bo'yicha qidirish...",
            noStudentsFound: "O'quvchilar topilmadi",
            viewDetails: "Batafsil ma'lumot",
            addGrade: "Baho qo'shish",
            gradesList: "Baholar ro'yxati",
            attendanceList: "Davomat ro'yxati",
            announcementsList: "E'lonlar ro'yxati"
        },
        ru: {
            teacherPanel: "Панель учителя",
            studentList: "Список учеников",
            actions: "Действия",
            searchPlaceholder: "Поиск по имени ученика...",
            noStudentsFound: "Ученики не найдены",
            viewDetails: "Подробная информация",
            addGrade: "Добавить оценку",
            gradesList: "Список оценок",
            attendanceList: "Список посещаемости",
            announcementsList: "Список объявлений"
        },
        en: {
            teacherPanel: "Teacher Panel",
            studentList: "Student List",
            actions: "Actions",
            searchPlaceholder: "Search by student name...",
            noStudentsFound: "No students found",
            viewDetails: "View details",
            addGrade: "Add grade",
            gradesList: "Grades List",
            attendanceList: "Attendance List",
            announcementsList: "Announcements List"
        }
    };
    
    // data-translate attributli elementlarni yangilash
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Sahifa sarlavhasini yangilash
    if (translations[lang] && translations[lang].teacherPanel) {
        document.title = translations[lang].teacherPanel;
    }
    
    // Qidiruv maydonining placeholder atributini yangilash
    const searchInput = document.getElementById('searchInput');
    if (searchInput && translations[lang] && translations[lang].searchPlaceholder) {
        searchInput.setAttribute('placeholder', translations[lang].searchPlaceholder);
    }
    
    // Boshqa qo'shimcha elementlarni yangilash
    // O'qituvchi matnini yangilash
    const teacherElement = document.getElementById('teacherName');
    if (teacherElement) {
        const teacherTranslation = getTranslationDirectly('teacher', lang);
        if (teacherTranslation) {
            teacherElement.textContent = teacherTranslation;
        }
    }
}

/**
 * Boshlang'ich tarjimalarni qo'llash
 * @param {string} lang - Til kodi (uz, ru, en)
 */
function applyInitialTranslations(lang) {
    // Asosiy tarjimalarni qo'llash
    if (typeof window.applyTranslations === 'function') {
        try {
            window.applyTranslations();
        } catch (e) {
            console.error('Error calling applyTranslations:', e);
        }
    }
    
    // Qo'shimcha tarjimalarni qo'llash
    applyTeacherTranslations(lang);
}

/**
 * Tarjimani to'g'ridan-to'g'ri olish
 * @param {string} key - Tarjima kaliti
 * @param {string} lang - Til kodi (uz, ru, en)
 * @returns {string} - Tarjima matni yoki null
 */
function getTranslationDirectly(key, lang) {
    const translations = {
        uz: {
            teacher: "O'qituvchi",
            student: "O'quvchi",
            class: "Sinf",
            subject: "Fan",
            grade: "Baho",
            date: "Sana",
            actions: "Amallar",
            attendance: "Davomat",
            present: "Keldi",
            absent: "Kelmadi",
            late: "Kechikdi"
        },
        ru: {
            teacher: "Учитель",
            student: "Ученик",
            class: "Класс",
            subject: "Предмет",
            grade: "Оценка",
            date: "Дата",
            actions: "Действия",
            attendance: "Посещаемость",
            present: "Присутствовал",
            absent: "Отсутствовал",
            late: "Опоздал"
        },
        en: {
            teacher: "Teacher",
            student: "Student",
            class: "Class",
            subject: "Subject",
            grade: "Grade",
            date: "Date",
            actions: "Actions",
            attendance: "Attendance",
            present: "Present",
            absent: "Absent",
            late: "Late"
        }
    };
    
    if (translations[lang] && translations[lang][key]) {
        return translations[lang][key];
    }
    
    return null;
} 