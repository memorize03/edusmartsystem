/**
 * Script to add language support to all admin HTML pages
 * Run using: node apply-admin-language.js
 */

const fs = require('fs');
const path = require('path');

// Admin directory
const adminDir = './admin';

// Get all HTML files in admin directory
function getAllAdminHtmlFiles() {
    let htmlFiles = [];
    
    if (fs.existsSync(adminDir)) {
        const files = fs.readdirSync(adminDir);
        files.forEach(file => {
            if (file.endsWith('.html')) {
                htmlFiles.push(path.join(adminDir, file));
            }
        });
    }
    
    return htmlFiles;
}

// Check if admin-language.js script is already included
function hasAdminLanguageScript(content) {
    return content.includes('admin-language.js');
}

// Add admin-language.js script to a file
function addAdminLanguageToFile(filePath) {
    console.log(`Processing ${filePath}...`);
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    if (hasAdminLanguageScript(content)) {
        console.log(`  - Admin language script already added to ${filePath}`);
        return;
    }
    
    // Add the script reference after language-selector.js
    const languageSelectorRegex = /<script src="[.\/]*language-selector\.js"><\/script>/;
    if (languageSelectorRegex.test(content)) {
        content = content.replace(
            languageSelectorRegex, 
            match => `${match}\n    <script src="../admin-language.js"></script>`
        );
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`  - Successfully added admin-language.js to ${filePath}`);
    } else {
        console.log(`  - Warning: Could not find language-selector.js script tag in ${filePath}`);
    }
}

// Main function
function main() {
    // Check if admin-language.js exists
    if (!fs.existsSync('./admin-language.js')) {
        console.error('Error: admin-language.js does not exist in the root directory!');
        return;
    }
    
    const htmlFiles = getAllAdminHtmlFiles();
    console.log(`Found ${htmlFiles.length} HTML files in admin directory to process`);
    
    htmlFiles.forEach(file => {
        addAdminLanguageToFile(file);
    });
    
    console.log('\nDone! The admin language script has been added to all admin HTML files.');
}

// Run the script
main(); 