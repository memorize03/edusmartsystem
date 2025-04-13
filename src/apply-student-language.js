/**
 * Script to add student-language.js to all HTML files in the student directory
 * This ensures consistent language support across the student interface
 */

const fs = require('fs');
const path = require('path');

// Path to the student directory
const studentDir = './student';

// Process all HTML files in the student directory
fs.readdir(studentDir, (err, files) => {
    if (err) {
        console.error('Error reading the student directory:', err);
        return;
    }

    // Filter out HTML files only
    const htmlFiles = files.filter(file => file.endsWith('.html'));
    console.log(`Found ${htmlFiles.length} HTML files in the student directory to process.`);

    // Process each HTML file
    htmlFiles.forEach(file => {
        const filePath = path.join(studentDir, file);
        
        // Read the file content
        fs.readFile(filePath, 'utf8', (err, content) => {
            if (err) {
                console.error(`Error reading ${file}:`, err);
                return;
            }

            // Check if student-language.js is already included
            if (content.includes('student-language.js')) {
                console.log(`${file} already includes student-language.js`);
                return;
            }

            // Look for language-selector.js to add our script after it
            const languageSelectorScript = '<script src="../language-selector.js"></script>';
            const newScript = '<script src="../student-language.js"></script>';

            if (content.includes(languageSelectorScript)) {
                // Insert our script after language-selector.js
                const newContent = content.replace(
                    languageSelectorScript,
                    `${languageSelectorScript}\n    ${newScript}`
                );

                // Write the modified content back to the file
                fs.writeFile(filePath, newContent, 'utf8', (err) => {
                    if (err) {
                        console.error(`Error writing to ${file}:`, err);
                        return;
                    }
                    console.log(`Added student-language.js to ${file}`);
                });
            } else {
                console.log(`Could not find language-selector.js in ${file}`);
            }
        });
    });
}); 