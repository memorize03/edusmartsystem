/**
 * O'quvchilar ma'lumotlariga tarjimalarni qo'shish
 * Bu skript o'quvchilar ismlarini turli tillarda ko'rsatish uchun tarjimalarni qo'shadi
 */

// O'quvchilar ma'lumotlarini olish va saqlash uchun funksiyalar
function getFromStorage(key) {
    const data = localStorage.getItem(key);
    if (!data) return null;
    return JSON.parse(data);
}

function saveToStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// O'quvchilar ma'lumotlariga tarjimalarni qo'shish
function addStudentTranslations() {
    // O'quvchilar uchun tarjimalar
    const studentTranslations = {
        1: { // Salimov Ozodbek
            uz: { name: "Salimov Ozodbek" },
            ru: { name: "Салимов Озодбек" },
            en: { name: "Ozodbek Salimov" }
        },
        2: { // Karimova Nigora
            uz: { name: "Karimova Nigora" },
            ru: { name: "Каримова Нигора" },
            en: { name: "Nigora Karimova" }
        },
        3: { // Rahimov Jahongir
            uz: { name: "Rahimov Jahongir" },
            ru: { name: "Рахимов Джахонгир" },
            en: { name: "Jahongir Rahimov" }
        },
        4: { // Usmonova Maftuna
            uz: { name: "Usmonova Maftuna" },
            ru: { name: "Усмонова Мафтуна" },
            en: { name: "Maftuna Usmonova" }
        },
        5: { // Aliyev Rustam
            uz: { name: "Aliyev Rustam" },
            ru: { name: "Алиев Рустам" },
            en: { name: "Rustam Aliyev" }
        },
        6: { // Salimov (shown in image)
            uz: { name: "Salimov" },
            ru: { name: "Салимов" },
            en: { name: "Salimov" }
        }
    };
    
    // Brauzerdagi muhitda ishlashni tekshirish
    if (typeof window !== 'undefined' && window.localStorage) {
        // Brauzer muhitida localStorage ga kirishni yaratish
        const students = getFromStorage('students');
        
        if (students && Array.isArray(students)) {
            // Har bir o'quvchi uchun tarjimalarni qo'shish
            const updatedStudents = students.map(student => {
                const translations = studentTranslations[student.id];
                if (translations) {
                    return { ...student, translations };
                }
                return student;
            });
            
            // Yangilangan ma'lumotlarni saqlash
            saveToStorage('students', updatedStudents);
            console.log('O\'quvchilar uchun tarjimalar qo\'shildi.');
        } else {
            console.log('O\'quvchilar ma\'lumotlari topilmadi.');
        }
    } else {
        // Node.js muhitida ishlashni tekshirish
        try {
            // fs modulini kiritish
            const fs = require('fs');
            
            // Fayldan ma'lumotlarni olish
            const data = JSON.parse(localStorage.getItem('students') || '[]');
            
            // Har bir o'quvchi uchun tarjimalarni qo'shish
            const updatedData = data.map(student => {
                const translations = studentTranslations[student.id];
                if (translations) {
                    return { ...student, translations };
                }
                return student;
            });
            
            // Yangilangan ma'lumotlarni saqlash
            localStorage.setItem('students', JSON.stringify(updatedData));
            console.log('O\'quvchilar uchun tarjimalar qo\'shildi.');
        } catch (error) {
            console.error('Xato yuz berdi:', error);
        }
    }
}

// Skriptni ishga tushirish
if (typeof window !== 'undefined') {
    // Agar bu brauzerda ishlatilayotgan bo'lsa, DOM yuklangandan so'ng ishga tushirish
    window.addEventListener('DOMContentLoaded', addStudentTranslations);
} else {
    // Agar Node.js da ishlatilayotgan bo'lsa, to'g'ridan-to'g'ri ishga tushirish
    addStudentTranslations();
} 