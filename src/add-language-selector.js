/**
 * Script to add language selector to all HTML pages in the project
 * Run using: node add-language-selector.js
 */

const fs = require('fs');
const path = require('path');

// List of directories to process
const directories = [
    '.',
    './admin',
    './teacher',
    './student'
];

// Get all HTML files
function getAllHtmlFiles(directories) {
    let htmlFiles = [];
    
    directories.forEach(dir => {
        if (fs.existsSync(dir)) {
            const files = fs.readdirSync(dir);
            files.forEach(file => {
                if (file.endsWith('.html')) {
                    htmlFiles.push(path.join(dir, file));
                }
            });
        }
    });
    
    return htmlFiles;
}

// Check if language selector script is already included
function hasLanguageSelector(content) {
    return content.includes('language-selector.js');
}

// Check if data.js is included
function hasDataJs(content) {
    return content.includes('data.js');
}

// Add language selector script to a file
function addLanguageSelectorToFile(filePath) {
    console.log(`Processing ${filePath}...`);
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    if (hasLanguageSelector(content)) {
        console.log(`  - Language selector already added to ${filePath}`);
        return;
    }
    
    // First check if data.js is included
    if (!hasDataJs(content)) {
        console.log(`  - Warning: data.js is not included in ${filePath}. Adding both scripts...`);
        
        // Add both data.js and language-selector.js before </head>
        const headEndRegex = /<\/head>/i;
        if (headEndRegex.test(content)) {
            const relativePath = getRelativePath(filePath);
            content = content.replace(
                headEndRegex,
                `    <script src="${relativePath}data.js"></script>\n    <script src="${relativePath}language-selector.js"></script>\n</head>`
            );
            
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`  - Successfully added data.js and language selector to ${filePath}`);
            return;
        } else {
            console.log(`  - Error: Could not find </head> tag in ${filePath}`);
            return;
        }
    }
    
    // Add the script reference after data.js
    const dataJsRegex = /<script src="[.\/]*data\.js"><\/script>/;
    if (dataJsRegex.test(content)) {
        content = content.replace(
            dataJsRegex, 
            match => `${match}\n    <script src="${getRelativePath(filePath)}language-selector.js"></script>`
        );
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`  - Successfully added language selector to ${filePath}`);
    } else {
        console.log(`  - Warning: Could not find data.js script tag in ${filePath}`);
    }
}

// Get relative path to root
function getRelativePath(filePath) {
    const depth = filePath.split(path.sep).length - 1;
    if (depth <= 1) return './';
    return '../'.repeat(depth - 1);
}

// Main function
function main() {
    // Check if language-selector.js exists
    if (!fs.existsSync('./language-selector.js')) {
        console.error('Error: language-selector.js does not exist in the root directory!');
        return;
    }
    
    const htmlFiles = getAllHtmlFiles(directories);
    console.log(`Found ${htmlFiles.length} HTML files to process`);
    
    htmlFiles.forEach(file => {
        addLanguageSelectorToFile(file);
    });
    
    console.log('\nDone! The language selector has been added to all HTML files.');
    console.log('Next steps:');
    console.log('1. Add data-translate attributes to text elements in your HTML files');
    console.log('2. Update allTranslations in data.js with any new translations needed');
}

// Run the script
main(); 