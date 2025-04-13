# Language Selector Installation Guide

This guide explains how to add a language selector to all pages of your Maktab Boshqaruv Tizimi (School Management System).

## Overview

The language selector system allows users to switch between three languages:
- Uzbek (uz)
- Russian (ru) 
- English (en)

The system automatically adds a language selector dropdown in the top-right corner of every page and applies translations to all texts.

## Files Included

- `language-selector.js` - The main script that adds the language selector to any page
- `add-language-selector.js` - A Node.js script to automatically add the language selector to all HTML pages
- `README-language-selector.md` - This documentation file

## Automatic Installation (Easiest Method)

To automatically add the language selector to all pages:

1. Make sure Node.js is installed on your system.
2. Open a terminal and navigate to your project directory.
3. Run the installation script:
   ```
   node add-language-selector.js
   ```
4. The script will automatically add the language selector to all HTML files in your project.

## Manual Installation

If you prefer to add the language selector manually to specific pages:

1. Add the language-selector.js script to your HTML files just after the data.js script:
   ```html
   <script src="../data.js"></script>
   <script src="../language-selector.js"></script>
   ```

2. Add the `data-translate` attribute to all text elements that need to be translated:
   ```html
   <h1 data-translate="welcome">Xush kelibsiz</h1>
   ```

3. Add new translations to the `allTranslations` object in `data.js` if needed.

## Adding New Translations

To add new translations for a page:

1. Identify all text elements that need translation.
2. Add the `data-translate` attribute with a unique key to each element:
   ```html
   <h2 data-translate="studentList">O'quvchilar ro'yxati</h2>
   ```

3. Add the translation keys to the `allTranslations` object in `data.js` or directly in your page's script:
   ```javascript
   // Add these translations to the global allTranslations object
   const additionalTranslations = {
       uz: {
           studentList: "O'quvchilar ro'yxati"
       },
       ru: {
           studentList: "Список учеников"
       },
       en: {
           studentList: "Student List"
       }
   };
   
   // Add these translations to the global translations
   for (let lang in additionalTranslations) {
       for (let key in additionalTranslations[lang]) {
           if (!allTranslations[lang][key]) {
               allTranslations[lang][key] = additionalTranslations[lang][key];
           }
       }
   }
   ```

## Translating Dynamic Content

For dynamically generated content, you can use the `getTranslation()` function:

```javascript
const message = getTranslation('noStudents') || 'O\'quvchilar mavjud emas';
container.innerHTML = `<div class="no-data">${message}</div>`;
```

## Best Practices

1. Use consistent translation keys across your application.
2. Group related translations together (e.g., "student-" prefix for all student-related texts).
3. Add translations for all three languages whenever you add new texts.
4. Use the `data-translate` attribute for static HTML content.
5. Use the `getTranslation()` function for dynamic JavaScript-generated content.

## Support

If you need help with the language selector system, please refer to the full documentation in `README-til-tarjima.md`. 