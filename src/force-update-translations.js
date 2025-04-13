/**
 * O'quvchilar ma'lumotlariga majburiy tarjimalarni qo'shish
 * Bu skript o'quvchilar uchun tarjimalarni majburan yangilaydi
 */

// Sahifa yuklangandan so'ng ishlaydi
document.addEventListener('DOMContentLoaded', function() {
    forceUpdateStudentTranslations();
});

// O'quvchilar ma'lumotlarini majburan yangilash
function forceUpdateStudentTranslations() {
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
        6: { // Salimov
            uz: { name: "Salimov" },
            ru: { name: "Салимов" },
            en: { name: "Salimov" }
        }
    };
    
    try {
        // O'quvchilarni localStorage dan olish
        const studentsJSON = localStorage.getItem('students');
        if (!studentsJSON) {
            console.warn('O\'quvchilar ma\'lumotlari topilmadi');
            return;
        }
        
        // JSON ni obyektga aylantirish
        let students = JSON.parse(studentsJSON);
        
        // Har bir o'quvchi uchun tarjimalarni yangilash
        let updated = false;
        students = students.map(student => {
            // ID 6 uchun alohida tekshiruv
            if (student.id === 6) {
                // Agar Salimov bo'lsa, maxsus tarjimalarni qo'shish
                console.log("ID 6 o'quvchi uchun maxsus tarjimalar qo'shilmoqda:", student.name);
                updated = true;
                return {
                    ...student,
                    translations: {
                        uz: { name: student.name || "Salimov" },
                        ru: { name: "Салимов" },
                        en: { name: "Salimov" }
                    }
                };
            }
            
            // Boshqa o'quvchilar uchun
            const translations = studentTranslations[student.id];
            if (translations) {
                updated = true;
                return { ...student, translations };
            }
            return student;
        });
        
        // Agar yangilangan bo'lsa, saqlash
        if (updated) {
            localStorage.setItem('students', JSON.stringify(students));
            console.log('O\'quvchilar tarjimalari majburan yangilandi');
            
            // O'quvchilar ro'yxatini ham yangilash agar renderStudents funksiyasi mavjud bo'lsa
            if (typeof renderStudents === 'function') {
                setTimeout(() => {
                    renderStudents();
                    console.log('O\'quvchilar ro\'yxati yangilandi');
                }, 100);
            }
        }
    } catch (error) {
        console.error('Xatolik yuz berdi:', error);
    }
}

// Til o'zgarganda ham tarjimalarni yangilash
function setupForceUpdateOnLanguageChange() {
    // Til linklar uchun event listener qo'shish
    document.querySelectorAll('.language-switcher a').forEach(link => {
        link.addEventListener('click', function() {
            // Til o'zgargandan so'ng o'quvchilar ro'yxatini yangilash
            setTimeout(function() {
                if (typeof renderStudents === 'function') {
                    renderStudents();
                    console.log('Til o\'zgarganda o\'quvchilar ro\'yxati yangilandi');
                }
            }, 200);
        });
    });
}

// Setup function ni ishlashiga harakat qilish
setTimeout(setupForceUpdateOnLanguageChange, 500); 