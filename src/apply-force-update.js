const fs = require('fs');
const path = require('path');

/**
 * O'qituvchi sahifalariga force-update-translations.js skriptini qo'shish
 */
function applyForceUpdateToAllFiles() {
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
        
        // force-update-translations.js skripti allaqachon qo'shilgan yoki yo'qligini tekshirish
        if (content.includes('force-update-translations.js')) {
            console.log(`${filePath}: force-update-translations.js already included.`);
            return;
        }
        
        // Oxirgi </body> dan oldin qo'shish
        if (content.includes('</body>')) {
            content = content.replace(
                '</body>',
                '    <script src="../force-update-translations.js"></script>\n</body>'
            );
            
            // O'zgarishlarni saqlash
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`${filePath}: Added force-update-translations.js script.`);
        } else {
            console.log(`${filePath}: </body> tag not found, cannot insert automatically.`);
        }
    });
}

// Skriptni ishga tushirish
applyForceUpdateToAllFiles(); 