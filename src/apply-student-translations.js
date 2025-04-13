const fs = require('fs');
const path = require('path');

/**
 * O'qituvchi sahifalariga update-students-translations.js skriptini qo'shish
 */
function applyStudentTranslationsToAllFiles() {
    // O'qituvchi sahifalari katalogini belgilash
    const teacherDir = './teacher';
    
    // Barcha HTML fayllarni olish
    const htmlFiles = fs.readdirSync(teacherDir)
        .filter(file => file.endsWith('.html'));
    
    console.log(`Found ${htmlFiles.length} HTML files in the teacher directory to process.`);
    
    // Har bir fayl uchun
    htmlFiles.forEach(file => {
        const filePath = path.join(teacherDir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        // update-students-translations.js skripti allaqachon qo'shilgan yoki yo'qligini tekshirish
        if (content.includes('update-students-translations.js')) {
            console.log(`${filePath}: update-students-translations.js already included.`);
            return;
        }
        
        // language-selector.js skriptidan keyin qo'shish
        if (content.includes('language-selector.js')) {
            content = content.replace(
                '<script src="../language-selector.js"></script>',
                '<script src="../language-selector.js"></script>\n    <script src="../update-students-translations.js"></script>'
            );
            
            // O'zgarishlarni saqlash
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`${filePath}: Added update-students-translations.js script.`);
        } else {
            console.log(`${filePath}: language-selector.js not found, cannot insert automatically.`);
        }
    });
}

// Skriptni ishga tushirish
applyStudentTranslationsToAllFiles(); 