// Tizim uchun umumiy ma'lumotlar va funksiyalar

// Ma'lumotlarni localStorage'dan olish
function getFromStorage(key, defaultValue = []) {
    const data = localStorage.getItem(key);
    if (!data) {
        // Agar ma'lumotlar bo'sh bo'lsa, standart qiymatlarni qo'yish
        if (key === 'students' && defaultValue.length === 0) {
            defaultValue = createTestStudents();
            saveToStorage(key, defaultValue);
        } else if (key === 'teachers' && defaultValue.length === 0) {
            defaultValue = createTestTeachers();
            saveToStorage(key, defaultValue);
        } else if (key === 'subjects' && defaultValue.length === 0) {
            defaultValue = createTestSubjects();
            saveToStorage(key, defaultValue);
        } else if (key === 'attendance' && defaultValue.length === 0) {
            defaultValue = createTestAttendance();
            saveToStorage(key, defaultValue);
        } else if (key === 'grades' && defaultValue.length === 0) {
            defaultValue = createTestGrades();
            saveToStorage(key, defaultValue);
        } else if (key === 'announcements' && defaultValue.length === 0) {
            defaultValue = createTestAnnouncements();
            saveToStorage(key, defaultValue);
        }
        return defaultValue;
    }
    
    // E'lonlar uchun alohida logika qo'shamiz
    if (key === 'announcements') {
        const announcements = JSON.parse(data);
        
        // E'lonlarni "text" maydonidan "content" maydoniga o'zgartirish
        // va agar "translations" maydoni bo'lmasa, qo'shish
        const updatedAnnouncements = announcements.map(announcement => {
            let updatedAnnouncement = { ...announcement };
            
            // text -> content conversion
            if (announcement.hasOwnProperty('text') && !announcement.hasOwnProperty('content')) {
                updatedAnnouncement.content = announcement.text;
            }
            
            // Add translations field if not present
            if (!updatedAnnouncement.hasOwnProperty('translations')) {
                updatedAnnouncement.translations = {
                    uz: {
                        title: updatedAnnouncement.title || '',
                        content: updatedAnnouncement.content || ''
                    },
                    ru: {
                        title: updatedAnnouncement.title || '',
                        content: updatedAnnouncement.content || ''
                    },
                    en: {
                        title: updatedAnnouncement.title || '',
                        content: updatedAnnouncement.content || ''
                    }
                };
            }
            
            return updatedAnnouncement;
        });
        
        // Agar o'zgarishlar bo'lsa, yangilangan versiyani saqlash
        if (JSON.stringify(announcements) !== JSON.stringify(updatedAnnouncements)) {
            saveToStorage(key, updatedAnnouncements);
            return updatedAnnouncements;
        }
        return announcements;
    }
    
    return JSON.parse(data);
}

// Test ma'lumotlarni yaratish funksiyalari
function createTestStudents() {
    return [
        { id: 1, name: 'Salimov Ozodbek', class: '9-A', phone: '+998901234567' },
        { id: 2, name: 'Karimova Nigora', class: '9-A', phone: '+998902345678' },
        { id: 3, name: 'Rahimov Jahongir', class: '9-A', phone: '+998903456789' },
        { id: 4, name: 'Usmonova Maftuna', class: '9-B', phone: '+998904567890' },
        { id: 5, name: 'Aliyev Rustam', class: '9-B', phone: '+998905678901' }
    ];
}

function createTestTeachers() {
    return [
        { id: 1, name: "Rahimov Muhammad", subject: "Matematika" },
        { id: 2, name: "Karimova Zulfiya", subject: "Fizika" },
        { id: 3, name: "Mahmudov Botir", subject: "Biologiya" },
        { id: 4, name: "Nazarova Umida", subject: "Ona tili" },
        { id: 5, name: "Xolmatov Davron", subject: "Tarix" }
    ];
}

function createTestSubjects() {
    return [
        { id: 1, name: "Matematika", hours: 6 },
        { id: 2, name: "Fizika", hours: 4 },
        { id: 3, name: "Biologiya", hours: 3 },
        { id: 4, name: "Ona tili", hours: 5 },
        { id: 5, name: "Tarix", hours: 3 }
    ];
}

function createTestAttendance() {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    
    return [
        { id: 1, studentId: 1, studentName: "Salimov Ozodbek", class: "9-A", date: today, status: "present" },
        { id: 2, studentId: 2, studentName: "Karimova Nigora", class: "9-A", date: today, status: "absent" },
        { id: 3, studentId: 3, studentName: "Rahimov Jahongir", class: "9-A", date: today, status: "late" },
        { id: 4, studentId: 1, studentName: "Salimov Ozodbek", class: "9-A", date: yesterday, status: "present" },
        { id: 5, studentId: 2, studentName: "Karimova Nigora", class: "9-A", date: yesterday, status: "present" }
    ];
}

function createTestGrades() {
    const today = new Date().toISOString().split('T')[0];
    const lastWeek = new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0];
    
    return [
        { id: 1, studentId: 1, studentName: "Salimov Ozodbek", class: "9-A", subject: "Matematika", grade: 5, date: today },
        { id: 2, studentId: 2, studentName: "Karimova Nigora", class: "9-A", subject: "Fizika", grade: 4, date: today },
        { id: 3, studentId: 3, studentName: "Rahimov Jahongir", class: "9-A", subject: "Biologiya", grade: 3, date: lastWeek },
        { id: 4, studentId: 1, studentName: "Salimov Ozodbek", class: "9-A", subject: "Ona tili", grade: 4, date: lastWeek },
        { id: 5, studentId: 2, studentName: "Karimova Nigora", class: "9-A", subject: "Tarix", grade: 5, date: lastWeek }
    ];
}

function createTestAnnouncements() {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    const lastWeek = new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0];
    
    return [
        { 
            id: 1, 
            title: "Ota-onalar yig'ilishi", 
            content: "Ertaga soat 15:00 da maktabda ota-onalar yig'ilishi bo'lib o'tadi", 
            date: today, 
            target: "parents", 
            author: "Admin",
            translations: {
                uz: {
                    title: "Ota-onalar yig'ilishi",
                    content: "Ertaga soat 15:00 da maktabda ota-onalar yig'ilishi bo'lib o'tadi"
                },
                ru: {
                    title: "Родительское собрание",
                    content: "Завтра в 15:00 в школе состоится родительское собрание"
                },
                en: {
                    title: "Parents' Meeting",
                    content: "Tomorrow at 3:00 PM there will be a parents' meeting at school"
                }
            }
        },
        { 
            id: 2, 
            title: "Sport musobaqasi", 
            content: "Kelasi haftada maktablar o'rtasida sport musobaqasi o'tkaziladi", 
            date: yesterday, 
            target: "students", 
            author: "Admin",
            translations: {
                uz: {
                    title: "Sport musobaqasi",
                    content: "Kelasi haftada maktablar o'rtasida sport musobaqasi o'tkaziladi"
                },
                ru: {
                    title: "Спортивные соревнования",
                    content: "На следующей неделе состоятся спортивные соревнования между школами"
                },
                en: {
                    title: "Sports Competition",
                    content: "Next week there will be a sports competition between schools"
                }
            }
        },
        { 
            id: 3, 
            title: "Imtihon jadvali", 
            content: "Yakuniy imtihonlar jadvali e'lon qilindi", 
            date: today, 
            target: "all", 
            author: "Admin",
            translations: {
                uz: {
                    title: "Imtihon jadvali",
                    content: "Yakuniy imtihonlar jadvali e'lon qilindi"
                },
                ru: {
                    title: "Расписание экзаменов",
                    content: "Объявлено расписание итоговых экзаменов"
                },
                en: {
                    title: "Exam Schedule",
                    content: "The final exam schedule has been announced"
                }
            }
        },
        { 
            id: 4, 
            title: "Kutubxona yangiliklari", 
            content: "Kutubxonamizga yangi kitoblar keldi", 
            date: yesterday, 
            target: "students", 
            author: "O'qituvchi",
            translations: {
                uz: {
                    title: "Kutubxona yangiliklari",
                    content: "Kutubxonamizga yangi kitoblar keldi"
                },
                ru: {
                    title: "Новости библиотеки",
                    content: "В нашу библиотеку поступили новые книги"
                },
                en: {
                    title: "Library News",
                    content: "New books have arrived in our library"
                }
            }
        },
        { 
            id: 5, 
            title: "Malaka oshirish kurslari", 
            content: "Barcha o'qituvchilar uchun malaka oshirish kurslari", 
            date: lastWeek, 
            target: "teachers", 
            author: "Admin",
            translations: {
                uz: {
                    title: "Malaka oshirish kurslari",
                    content: "Barcha o'qituvchilar uchun malaka oshirish kurslari"
                },
                ru: {
                    title: "Курсы повышения квалификации",
                    content: "Курсы повышения квалификации для всех учителей"
                },
                en: {
                    title: "Professional Development Courses",
                    content: "Professional development courses for all teachers"
                }
            }
        }
    ];
}

// Ma'lumotlarni localStorage'ga saqlash
function saveToStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// O'quvchilar bilan ishlash funksiyalari
function addStudent(student) {
    const students = getFromStorage('students');
    // Yangi ID yaratish
    const newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
    student.id = newId;
    
    // Ro'yxatga qo'shish
    students.push(student);
    saveToStorage('students', students);
    return student;
}

function updateStudent(id, updatedData) {
    const students = getFromStorage('students');
    const index = students.findIndex(s => s.id === id);
    if (index !== -1) {
        students[index] = { ...students[index], ...updatedData };
        saveToStorage('students', students);
        return students[index];
    }
    return null;
}

function deleteStudent(id) {
    let students = getFromStorage('students');
    students = students.filter(s => s.id !== id);
    saveToStorage('students', students);
}

// O'qituvchilar bilan ishlash funksiyalari
function addTeacher(teacher) {
    const teachers = getFromStorage('teachers');
    const newId = teachers.length > 0 ? Math.max(...teachers.map(t => t.id)) + 1 : 1;
    teacher.id = newId;
    
    teachers.push(teacher);
    saveToStorage('teachers', teachers);
    return teacher;
}

function updateTeacher(id, updatedData) {
    const teachers = getFromStorage('teachers');
    const index = teachers.findIndex(t => t.id === id);
    if (index !== -1) {
        teachers[index] = { ...teachers[index], ...updatedData };
        saveToStorage('teachers', teachers);
        return teachers[index];
    }
    return null;
}

function deleteTeacher(id) {
    let teachers = getFromStorage('teachers');
    teachers = teachers.filter(t => t.id !== id);
    saveToStorage('teachers', teachers);
}

// Fanlar bilan ishlash funksiyalari
function addSubject(subject) {
    const subjects = getFromStorage('subjects');
    const newId = subjects.length > 0 ? Math.max(...subjects.map(s => s.id)) + 1 : 1;
    subject.id = newId;
    
    subjects.push(subject);
    saveToStorage('subjects', subjects);
    return subject;
}

function updateSubject(id, updatedData) {
    const subjects = getFromStorage('subjects');
    const index = subjects.findIndex(s => s.id === id);
    if (index !== -1) {
        subjects[index] = { ...subjects[index], ...updatedData };
        saveToStorage('subjects', subjects);
        return subjects[index];
    }
    return null;
}

function deleteSubject(id) {
    let subjects = getFromStorage('subjects');
    subjects = subjects.filter(s => s.id !== id);
    saveToStorage('subjects', subjects);
}

// Davomat bilan ishlash funksiyalari
function addAttendance(record) {
    const attendance = getFromStorage('attendance');
    const newId = attendance.length > 0 ? Math.max(...attendance.map(a => a.id)) + 1 : 1;
    record.id = newId;
    
    attendance.push(record);
    saveToStorage('attendance', attendance);
    return record;
}

function updateAttendance(id, updatedData) {
    const attendance = getFromStorage('attendance');
    const index = attendance.findIndex(a => a.id === id);
    if (index !== -1) {
        attendance[index] = { ...attendance[index], ...updatedData };
        saveToStorage('attendance', attendance);
        return attendance[index];
    }
    return null;
}

function deleteAttendance(id) {
    let attendance = getFromStorage('attendance');
    attendance = attendance.filter(a => a.id !== id);
    saveToStorage('attendance', attendance);
}

// Baholar bilan ishlash funksiyalari
function addGrade(grade) {
    const grades = getFromStorage('grades');
    const newId = grades.length > 0 ? Math.max(...grades.map(g => g.id)) + 1 : 1;
    grade.id = newId;
    
    grades.push(grade);
    saveToStorage('grades', grades);
    return grade;
}

function updateGrade(id, updatedData) {
    const grades = getFromStorage('grades');
    const index = grades.findIndex(g => g.id === id);
    if (index !== -1) {
        grades[index] = { ...grades[index], ...updatedData };
        saveToStorage('grades', grades);
        return grades[index];
    }
    return null;
}

function deleteGrade(id) {
    let grades = getFromStorage('grades');
    grades = grades.filter(g => g.id !== id);
    saveToStorage('grades', grades);
}

// E'lonlar bilan ishlash funksiyalari
function addAnnouncement(announcement) {
    const announcements = getFromStorage('announcements');
    const newId = announcements.length > 0 ? Math.max(...announcements.map(a => a.id)) + 1 : 1;
    
    // E'lon obyektiga content maydonini qo'shamiz (text emas)
    const newAnnouncement = {
        ...announcement,
        id: newId,
        content: announcement.content || announcement.text || ''
    };
    
    // text maydonini o'chiramiz
    if (newAnnouncement.hasOwnProperty('text')) {
        delete newAnnouncement.text;
    }
    
    // Ensure translations field is present
    if (!newAnnouncement.hasOwnProperty('translations')) {
        // Use provided translations or create default ones from title/content
        newAnnouncement.translations = announcement.translations || {
            uz: {
                title: newAnnouncement.title || '',
                content: newAnnouncement.content || ''
            },
            ru: {
                title: newAnnouncement.title || '',
                content: newAnnouncement.content || ''
            },
            en: {
                title: newAnnouncement.title || '',
                content: newAnnouncement.content || ''
            }
        };
        
        // If translations are added for a specific language only, ensure other languages have defaults
        const langs = ['uz', 'ru', 'en'];
        langs.forEach(lang => {
            if (!newAnnouncement.translations[lang]) {
                newAnnouncement.translations[lang] = {
                    title: newAnnouncement.title || '',
                    content: newAnnouncement.content || ''
                };
            }
        });
    }
    
    announcements.push(newAnnouncement);
    saveToStorage('announcements', announcements);
    return newAnnouncement;
}

function updateAnnouncement(id, updatedData) {
    const announcements = getFromStorage('announcements');
    const index = announcements.findIndex(a => a.id === id);
    
    if (index !== -1) {
        // Yangilangan ma'lumotlar
        const updatedAnnouncement = { ...announcements[index], ...updatedData };
        
        // Agar text maydoni berilgan bo'lsa, uni content maydoniga ko'chiramiz
        if (updatedData.hasOwnProperty('text') && !updatedData.hasOwnProperty('content')) {
            updatedAnnouncement.content = updatedData.text;
        }
        
        // text maydonini o'chiramiz
        if (updatedAnnouncement.hasOwnProperty('text')) {
            delete updatedAnnouncement.text;
        }
        
        // Update translations if main content was changed but translations weren't provided
        if ((updatedData.title || updatedData.content) && !updatedData.translations) {
            // If title was updated, update it in all translations
            if (updatedData.title && updatedAnnouncement.translations) {
                for (const lang in updatedAnnouncement.translations) {
                    updatedAnnouncement.translations[lang].title = updatedData.title;
                }
            }
            
            // If content was updated, update it in all translations
            if (updatedData.content && updatedAnnouncement.translations) {
                for (const lang in updatedAnnouncement.translations) {
                    updatedAnnouncement.translations[lang].content = updatedData.content;
                }
            }
        }
        
        announcements[index] = updatedAnnouncement;
        saveToStorage('announcements', announcements);
        return announcements[index];
    }
    return null;
}

function deleteAnnouncement(id) {
    let announcements = getFromStorage('announcements');
    announcements = announcements.filter(a => a.id !== id);
    saveToStorage('announcements', announcements);
}

// Dastlabki ma'lumotlarni sahifa yuklanganda localStorage'ga saqlash
document.addEventListener('DOMContentLoaded', function() {
    // Har bir ma'lumotlar turini tekshirib, bo'sh bo'lsa, dastlabki ma'lumotlarni yuklash
    getFromStorage('students');
    getFromStorage('teachers');
    getFromStorage('subjects');
    getFromStorage('attendance');
    getFromStorage('grades');
    getFromStorage('announcements');
    
    // LocalStorage'ni tozalash uchun funksiya (tizimni qayta o'rnatish uchun foydalanilishi mumkin)
    window.resetStorage = function() {
        localStorage.clear();
        alert('Tizim ma\'lumotlari tozalandi. Sahifani yangilang.');
        location.reload();
    };
});

// Til bilan ishlovchi funksiyalar

// Tarjima ma'lumotlari
const allTranslations = {
    uz: {
        systemTitle: "Edu Smart System",
        adminTab: "Administrator",
        adminPanel: "Administrator paneli",
        students: "O'quvchilar",
        student: "O'quvchi",
        teachers: "O'qituvchilar",
        teacher: "O'qituvchi",
        subjects: "Fanlar",
        subject: "Fan",
        attendance: "Davomat", 
        announcements: "E'lonlar",
        reports: "Hisobotlar",
        logout: "Chiqish",
        home: "Bosh sahifa",
        password: "Parol",
        login: "Kirish",
        language: "Til",
        languageLabel: "Til:",
        search: "Qidiruv",
        fullName: "F.I.O",
        class: "Sinf",
        actions: "Amallar",
        addStudent: "O'quvchi qo'shish",
        editStudent: "O'quvchini tahrirlash",
        deleteStudentConfirm: "Ushbu o'quvchini o'chirishni xohlaysizmi?",
        confirmDeletion: "O'chirishni tasdiqlang",
        cancel: "Bekor qilish",
        save: "Saqlash",
        delete: "O'chirish",
        id: "ID",
        studentList: "O'quvchilar ro'yxati",
        studentId: "ID",
        addNewStudent: "Yangi o'quvchi qo'shish",
        fillAllFields: "Iltimos, barcha maydonlarni to'ldiring!",
        
        // O'qituvchilar uchun
        teacherList: "O'qituvchilar ro'yxati",
        addTeacher: "O'qituvchi qo'shish",
        teacherId: "ID",
        subject: "Fan",
        addNewTeacher: "Yangi o'qituvchi qo'shish",
        editTeacher: "O'qituvchini tahrirlash",
        deleteTeacherConfirm: "Ushbu o'qituvchini o'chirishni xohlaysizmi?",
        
        // Fanlar uchun
        subjectList: "Fanlar ro'yxati",
        addSubject: "Fan qo'shish",
        subjectId: "ID",
        subjectName: "Fan nomi",
        hours: "Soatlar",
        addNewSubject: "Yangi fan qo'shish",
        editSubject: "Fanni tahrirlash",
        deleteSubjectConfirm: "Ushbu fanni o'chirishni xohlaysizmi?",
        
        // Davomat uchun
        attendanceReport: "Davomat hisoboti",
        addAttendance: "Davomat qo'shish",
        status: "Holat",
        studentName: "O'quvchi ismi",
        addNewAttendance: "Yangi davomat qo'shish",
        editAttendance: "Davomat ma'lumotlarini tahrirlash",
        deleteAttendanceConfirm: "Ushbu davomat yozuvini o'chirishni xohlaysizmi?",
        present: "Keldi",
        absent: "Kelmadi",
        late: "Kechikdi",
        
        // E'lonlar uchun
        addAnnouncement: "Yangi e'lon",
        title: "Sarlavha",
        content: "Matn",
        date: "Sana",
        addNewAnnouncement: "Yangi e'lon qo'shish",
        editAnnouncement: "E'lon ma'lumotlarini tahrirlash",
        deleteAnnouncementConfirm: "Ushbu e'lonni o'chirishni xohlaysizmi?",
        targetAudience: "Maqsadli auditoriya",
        all: "Barcha",
        parents: "Ota-onalar",
        
        // Hisobotlar uchun
        addReport: "Yangi hisobot",
        reportName: "Hisobot nomi",
        reportType: "Hisobot turi",
        addNewReport: "Yangi hisobot qo'shish",
        editReport: "Hisobot ma'lumotlarini tahrirlash",
        deleteReportConfirm: "Ushbu hisobotni o'chirishni xohlaysizmi?",
        performance: "O'zlashtirish",
        newAnnouncements: "Yangi e'lonlar",
        myGrades: "Baholarim",
        gradesJournal: "Baholar jurnali",
        newGrade: "Yangi baho",
        addNewGrade: "Yangi baho qo'shish",
        editGrade: "Bahoni tahrirlash",
        selectStudent: "O'quvchini tanlang",
        selectSubject: "Fanni tanlang",
        allClasses: "Barcha sinflar",
        averageGrade: "O'rtacha ball",
        highestGrade: "Eng yuqori ball",
        lowestGrade: "Eng past ball",
        totalGrades: "Jami baholar",
        filterBySubject: "Fan bo'yicha",
        allSubjects: "Barcha fanlar",
        filterByPeriod: "Davr bo'yicha",
        allPeriods: "Barcha davrlar",
        lastMonth: "Oxirgi oy",
        lastQuarter: "Oxirgi chorak",
        currentYear: "Joriy yil",
        filterByGrade: "Baho bo'yicha",
        allGrades: "Barcha baholar",
        highGrades: "Yuqori (5)",
        midGrades: "O'rta (3-4)",
        lowGrades: "Past (1-2)",
        grade: "BAHO",
        notes: "IZOH",
        date: "SANA",
        
        // Dashboard elementlar
        studentCount: "O'quvchilar soni",
        teacherCount: "O'qituvchilar soni",
        subjectCount: "Fanlar soni",
        recentAnnouncements: "So'nggi e'lonlar",
        attendanceStats: "Davomat statistikasi",
        detailedInfo: "Batafsil ma'lumot",
        viewAllAnnouncements: "Barcha e'lonlarni ko'rish",
        parentContact: "Ota-ona raqami",
        address: "Manzil",
        attendanceJournal: "Davomat jurnali",
        newAttendance: "Yangi davomat",
        addNewAttendance: "Yangi davomat qo'shish",
        status: "Holat",
        present: "Keldi",
        absent: "Kelmadi",
        late: "Kechikdi",
        studentName: "O'quvchi",
        selectStudent: "O'quvchini tanlang",
        
        // E'lonlar
        addNewAnnouncement: "Yangi e'lon qo'shish",
        newAnnouncement: "Yangi e'lon",
        title: "Sarlavha",
        content: "Matn",
        targetAudience: "Maqsadli auditoriya",
        all: "Barcha",
        teachers: "O'qituvchilar",
        parents: "Ota-onalar",
        
        // Tugmalar
        viewDetails: "Ma'lumotlarni ko'rish",
        addGrade: "Baho qo'shish",
        welcome: "Xush kelibsiz"
    },
    
    ru: {
        systemTitle: "Edu Smart System",
        adminTab: "Администратор",
        adminPanel: "Панель администратора",
        students: "Ученики",
        student: "Ученик",
        teachers: "Учителя",
        teacher: "Учитель",
        subjects: "Предметы",
        subject: "Предмет",
        attendance: "Посещаемость",
        announcements: "Объявления",
        reports: "Отчеты",
        logout: "Выход",
        home: "Главная",
        password: "Пароль",
        login: "Вход",
        language: "Язык",
        languageLabel: "Язык:",
        search: "Поиск",
        fullName: "Ф.И.О",
        class: "Класс",
        actions: "Действия",
        addStudent: "Добавить ученика",
        editStudent: "Редактировать ученика",
        deleteStudentConfirm: "Вы хотите удалить этого ученика?",
        confirmDeletion: "Подтвердите удаление",
        cancel: "Отмена",
        save: "Сохранить",
        delete: "Удалить",
        id: "ИД",
        studentList: "Список учеников",
        studentId: "ИД",
        addNewStudent: "Добавить нового ученика",
        fillAllFields: "Пожалуйста, заполните все поля!",
        
        // Для учителей
        teacherList: "Список учителей",
        addTeacher: "Добавить учителя",
        teacherId: "ИД",
        subject: "Предмет",
        addNewTeacher: "Добавить нового учителя",
        editTeacher: "Редактировать учителя",
        deleteTeacherConfirm: "Вы хотите удалить этого учителя?",
        
        // Для предметов
        subjectList: "Список предметов",
        addSubject: "Добавить предмет",
        subjectId: "ИД",
        subjectName: "Название предмета",
        hours: "Часы",
        addNewSubject: "Добавить новый предмет",
        editSubject: "Редактировать предмет",
        deleteSubjectConfirm: "Вы хотите удалить этот предмет?",
        
        // Для посещаемости
        attendanceReport: "Отчет о посещаемости",
        addAttendance: "Добавить посещаемость",
        status: "Статус",
        studentName: "Имя ученика",
        addNewAttendance: "Добавить новую посещаемость",
        editAttendance: "Редактировать данные посещаемости",
        deleteAttendanceConfirm: "Вы хотите удалить эту запись посещаемости?",
        present: "Присутствовал",
        absent: "Отсутствовал",
        late: "Опоздал",
        
        // Для объявлений
        addAnnouncement: "Новое объявление",
        title: "Заголовок",
        content: "Содержание",
        date: "Дата",
        addNewAnnouncement: "Добавить новое объявление",
        editAnnouncement: "Редактировать объявление",
        deleteAnnouncementConfirm: "Вы хотите удалить это объявление?",
        targetAudience: "Целевая аудитория",
        all: "Все",
        parents: "Родители",
        
        // Для отчетов
        addReport: "Новый отчет",
        reportName: "Название отчета",
        reportType: "Тип отчета",
        addNewReport: "Добавить новый отчет",
        editReport: "Редактировать отчет",
        deleteReportConfirm: "Вы хотите удалить этот отчет?",
        performance: "Успеваемость",
        newAnnouncements: "Новые объявления",
        myGrades: "Мои оценки",
        gradesJournal: "Журнал оценок",
        newGrade: "Новая оценка",
        addNewGrade: "Добавить новую оценку",
        editGrade: "Редактировать оценку",
        selectStudent: "Выберите ученика",
        selectSubject: "Выберите предмет",
        allClasses: "Все классы",
        averageGrade: "Средний балл",
        highestGrade: "Наивысший балл",
        lowestGrade: "Низший балл",
        totalGrades: "Всего оценок",
        filterBySubject: "По предмету",
        allSubjects: "Все предметы",
        filterByPeriod: "По периоду",
        allPeriods: "Все периоды",
        lastMonth: "Последний месяц",
        lastQuarter: "Последняя четверть",
        currentYear: "Текущий год",
        filterByGrade: "По оценке",
        allGrades: "Все оценки",
        highGrades: "Высокие (5)",
        midGrades: "Средние (3-4)",
        lowGrades: "Низкие (1-2)",
        grade: "ОЦЕНКА",
        notes: "ПРИМЕЧАНИЕ",
        date: "ДАТА",
        
        // Dashboard элементы
        studentCount: "Количество учеников",
        teacherCount: "Количество учителей",
        subjectCount: "Количество предметов",
        recentAnnouncements: "Последние объявления",
        attendanceStats: "Статистика посещаемости",
        detailedInfo: "Подробная информация",
        viewAllAnnouncements: "Просмотреть все объявления",
        parentContact: "Контакт родителей",
        address: "Адрес",
        attendanceJournal: "Журнал посещаемости", 
        newAttendance: "Новая посещаемость",
        addNewAttendance: "Добавить новую посещаемость",
        status: "Статус",
        present: "Присутствовал",
        absent: "Отсутствовал",
        late: "Опоздал",
        studentName: "Ученик",
        selectStudent: "Выберите ученика",
        
        // E'lonlar
        addNewAnnouncement: "Добавить новое объявление",
        newAnnouncement: "Новое объявление",
        title: "Заголовок",
        content: "Текст",
        targetAudience: "Целевая аудитория",
        all: "Все",
        teachers: "Учителя",
        parents: "Родители",
        
        // Кнопки
        viewDetails: "Просмотр информации",
        addGrade: "Добавить оценку",
        welcome: "Добро пожаловать"
    },
    
    en: {
        systemTitle: "Edu Smart System",
        adminTab: "Administrator",
        adminPanel: "Administrator Panel",
        students: "Students",
        student: "Student",
        teachers: "Teachers",
        teacher: "Teacher",
        subjects: "Subjects",
        subject: "Subject",
        attendance: "Attendance",
        announcements: "Announcements",
        reports: "Reports",
        logout: "Logout",
        home: "Home",
        password: "Password",
        login: "Login",
        language: "Language",
        languageLabel: "Language:",
        search: "Search",
        fullName: "Full Name",
        class: "Class",
        actions: "Actions",
        addStudent: "Add Student",
        editStudent: "Edit Student",
        deleteStudentConfirm: "Do you want to delete this student?",
        confirmDeletion: "Confirm Deletion",
        cancel: "Cancel",
        save: "Save",
        delete: "Delete",
        id: "ID",
        studentList: "Student List",
        studentId: "ID",
        addNewStudent: "Add New Student",
        fillAllFields: "Please fill in all fields!",
        
        // For teachers
        teacherList: "Teacher List",
        addTeacher: "Add Teacher",
        teacherId: "ID",
        subject: "Subject",
        addNewTeacher: "Add New Teacher",
        editTeacher: "Edit Teacher",
        deleteTeacherConfirm: "Do you want to delete this teacher?",
        
        // For subjects
        subjectList: "Subject List",
        addSubject: "Add Subject",
        subjectId: "ID",
        subjectName: "Subject Name",
        hours: "Hours",
        addNewSubject: "Add New Subject",
        editSubject: "Edit Subject",
        deleteSubjectConfirm: "Do you want to delete this subject?",
        
        // For attendance
        attendanceReport: "Attendance Report",
        addAttendance: "Add Attendance",
        status: "Status",
        studentName: "Student Name",
        addNewAttendance: "Add New Attendance",
        editAttendance: "Edit Attendance Data",
        deleteAttendanceConfirm: "Do you want to delete this attendance record?",
        present: "Present",
        absent: "Absent",
        late: "Late",
        
        // For announcements
        addAnnouncement: "New Announcement",
        title: "Title",
        content: "Content",
        date: "Date",
        addNewAnnouncement: "Add New Announcement",
        editAnnouncement: "Edit Announcement",
        deleteAnnouncementConfirm: "Do you want to delete this announcement?",
        targetAudience: "Target Audience",
        all: "All",
        parents: "Parents",
        
        // For reports
        addReport: "New Report",
        reportName: "Report Name",
        reportType: "Report Type",
        addNewReport: "Add New Report",
        editReport: "Edit Report",
        deleteReportConfirm: "Do you want to delete this report?",
        performance: "Performance",
        newAnnouncements: "New Announcements",
        myGrades: "My Grades",
        gradesJournal: "Grades Journal",
        newGrade: "New Grade",
        addNewGrade: "Add New Grade",
        editGrade: "Edit Grade",
        selectStudent: "Select Student",
        selectSubject: "Select Subject",
        allClasses: "All Classes",
        averageGrade: "Average Score",
        highestGrade: "Highest Score",
        lowestGrade: "Lowest Score",
        totalGrades: "Total Grades",
        filterBySubject: "Filter by Subject",
        allSubjects: "All Subjects",
        filterByPeriod: "Filter by Period",
        allPeriods: "All Periods",
        lastMonth: "Last Month",
        lastQuarter: "Last Quarter",
        currentYear: "Current Year",
        filterByGrade: "Filter by Grade",
        allGrades: "All Grades",
        highGrades: "High (5)",
        midGrades: "Medium (3-4)",
        lowGrades: "Low (1-2)",
        grade: "GRADE",
        notes: "NOTES",
        date: "DATE",
        
        // Dashboard elements
        studentCount: "Student Count",
        teacherCount: "Teacher Count",
        subjectCount: "Subject Count",
        recentAnnouncements: "Recent Announcements",
        attendanceStats: "Attendance Statistics",
        detailedInfo: "Detailed Information",
        viewAllAnnouncements: "View All Announcements",
        parentContact: "Parent Contact",
        address: "Address",
        attendanceJournal: "Attendance Journal",
        newAttendance: "New Attendance",
        addNewAttendance: "Add New Attendance",
        status: "Status",
        present: "Present",
        absent: "Absent",
        late: "Late",
        studentName: "Student",
        selectStudent: "Select Student",
        
        // E'lonlar
        addNewAnnouncement: "Add New Announcement",
        newAnnouncement: "New Announcement",
        title: "Title",
        content: "Content",
        targetAudience: "Target Audience",
        all: "All",
        teachers: "Teachers",
        parents: "Parents",
        
        // Buttons
        viewDetails: "View Details",
        addGrade: "Add Grade",
        welcome: "Welcome"
    }
};

// Joriy tilni olish
function getCurrentLanguage() {
    return localStorage.getItem('selectedLanguage') || 'uz';
}

// Tilni o'zgartirish
function changeLanguage(lang) {
    localStorage.setItem('selectedLanguage', lang);
    
    // Direct translation of sidebar teacher element - most reliable approach
    const sidebarTeacherElement = document.querySelector('.sidebar .logo p[data-translate="teacherTab"]');
    if (sidebarTeacherElement) {
        // Hard-coded translations for maximum reliability
        const translations = {
            uz: 'O\'qituvchi',
            ru: 'Учитель',
            en: 'Teacher'
        };
        
        const translation = translations[lang];
        if (translation) {
            console.log(`[changeLanguage] Setting sidebar teacher text to: ${translation}`);
            sidebarTeacherElement.textContent = translation;
        }
    }
    
    // Apply translations after direct element update
    applyTranslations();
}

// Tarjimalarni qo'llash
function applyTranslations() {
    const currentLanguage = getCurrentLanguage();
    
    // data-translate atributi bor elementlarni olish
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (allTranslations[currentLanguage] && allTranslations[currentLanguage][key]) {
            element.textContent = allTranslations[currentLanguage][key];
            
            // Add data-forced-text attribute for CSS solution
            if (key === 'teacherTab' || key === 'teacher') {
                element.setAttribute('data-forced-text', allTranslations[currentLanguage][key]);
                console.log(`[data.js] Set data-forced-text for ${key} to: ${allTranslations[currentLanguage][key]}`);
            }
        }
    });
    
    // Placeholder tarjimalari
    document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        if (allTranslations[currentLanguage] && allTranslations[currentLanguage][key]) {
            element.placeholder = allTranslations[currentLanguage][key];
        }
    });
    
    // Select elementlar uchun tarjima
    document.querySelectorAll('select[data-translate-options]').forEach(select => {
        const optionsKey = select.getAttribute('data-translate-options');
        if (allTranslations[currentLanguage] && allTranslations[currentLanguage][optionsKey]) {
            const options = allTranslations[currentLanguage][optionsKey];
            Array.from(select.options).forEach((option, index) => {
                if (options[index]) {
                    option.textContent = options[index];
                }
            });
        }
    });
    
    // Tanlangan tilni select element-da ko'rsatish
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        languageSelect.value = currentLanguage;
    }
    
    // HTML lang atributini o'zgartirish
    document.documentElement.lang = currentLanguage;
    
    // Specifically ensure welcome message is translated
    const welcomeElement = document.querySelector('[data-translate="welcome"]');
    if (welcomeElement && allTranslations[currentLanguage] && allTranslations[currentLanguage].welcome) {
        welcomeElement.textContent = allTranslations[currentLanguage].welcome;
    }
    
    // Ensure teacher elements are translated (all of them)
    const teacherElements = document.querySelectorAll('[data-translate="teacher"]');
    if (allTranslations[currentLanguage] && allTranslations[currentLanguage].teacher) {
        teacherElements.forEach(element => {
            element.textContent = allTranslations[currentLanguage].teacher;
        });
        
        // Also specifically check for the teacherName element by ID
        const teacherNameElement = document.getElementById('teacherName');
        if (teacherNameElement) {
            teacherNameElement.textContent = allTranslations[currentLanguage].teacher;
        }
        
        // Handle the teacherTab elements in the sidebar with special care - most aggressive approach
        const teacherTabElements = document.querySelectorAll('[data-translate="teacherTab"]');
        const teacherTranslation = allTranslations[currentLanguage].teacher;
        
        if (teacherTabElements.length > 0) {
            console.log(`[data.js] Found ${teacherTabElements.length} teacherTab elements to aggressively translate to "${teacherTranslation}"`);
            
            teacherTabElements.forEach((element, index) => {
                // Apply every possible method to set the text
                element.textContent = teacherTranslation;
                element.innerHTML = teacherTranslation;
                element.innerText = teacherTranslation;
                element.setAttribute('data-forced-text', teacherTranslation);
                element.setAttribute('data-original-text', 'O\'qituvchi');
                element.setAttribute('data-current-language', currentLanguage);
                
                // Force reflow multiple times
                const display = element.style.display;
                element.style.display = 'none';
                element.offsetHeight; // Force reflow
                element.style.display = display;
                
                console.log(`[data.js] Aggressively set teacherTab ${index} to: ${teacherTranslation}`);
            });
            
            // Modified: Remove the CSS override that makes the text transparent
            try {
                let styleEl = document.getElementById('teacher-translation-fix');
                if (!styleEl) {
                    styleEl = document.createElement('style');
                    styleEl.id = 'teacher-translation-fix';
                    document.head.appendChild(styleEl);
                }
                
                // Simplified CSS without making text transparent
                styleEl.textContent = `
                    .sidebar .logo p[data-translate="teacherTab"] {
                        position: relative !important;
                    }
                    
                    /* No pseudo-elements that replace the text */
                `;
                
                console.log('[data.js] Added simplified CSS for teacherTab translation');
            } catch (e) {
                console.error('[data.js] Error setting CSS override:', e);
            }
        }
    }
}

// Sahifa yuklanganda tarjimalarni qo'llash
document.addEventListener('DOMContentLoaded', function() {
    applyTranslations();
});

// Tarjimani olish funksiyasi
function getTranslation(key) {
    const currentLanguage = getCurrentLanguage();
    if (allTranslations[currentLanguage] && allTranslations[currentLanguage][key]) {
        return allTranslations[currentLanguage][key];
    }
    return key; // Tarjima topilmasa, key qaytariladi
} 