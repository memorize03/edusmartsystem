/**
 * Language selector for Maktab Boshqaruv Tizimi
 * This script adds a language selector to any page where it's included
 */

// Create and insert the language selector when document is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create the language selector container
    const languageSelector = document.createElement('div');
    languageSelector.className = 'language-selector';
    languageSelector.id = 'language-selector';
    
    // Get current language
    const currentLang = localStorage.getItem('selectedLanguage') || 'uz';
    
    // Create the label
    const label = document.createElement('span');
    label.id = 'languageLabel';
    label.setAttribute('data-translate', 'languageLabel');
    
    // Set label text based on current language
    if (currentLang === 'uz') {
        label.textContent = 'Til:';
    } else if (currentLang === 'ru') {
        label.textContent = 'Язык:';
    } else if (currentLang === 'en') {
        label.textContent = 'Language:';
    } else {
        label.textContent = getTranslation('languageLabel') || 'Til:';
    }
    
    // Create the select element
    const select = document.createElement('select');
    select.id = 'language-select';
    select.onchange = function() {
        // Store the selected language
        localStorage.setItem('selectedLanguage', this.value);
        
        console.log('Language changed to: ' + this.value); // Debug statement
        
        // Use the changeLanguage function from data.js if available
        if (typeof changeLanguage === 'function') {
            changeLanguage(this.value);
        }
        
        // Update label text based on selected language
        if (this.value === 'uz') {
            document.getElementById('languageLabel').textContent = 'Til:';
        } else if (this.value === 'ru') {
            document.getElementById('languageLabel').textContent = 'Язык:';
        } else if (this.value === 'en') {
            document.getElementById('languageLabel').textContent = 'Language:';
        }
        
        // Dispatch custom event for other scripts that might need to know about language change
        const event = new CustomEvent('languageChanged', { detail: { language: this.value } });
        document.dispatchEvent(event);
        
        // Apply translations immediately
        if (typeof applyTranslations === 'function') {
            applyTranslations();
        } else {
            // Fallback if data.js functions aren't available
            applyTranslationsLocal();
        }
        
        // Ensure table headers are translated
        ensureTableTranslations();
        
        // Force reload of student list or other dynamic content
        if (typeof renderStudents === 'function') {
            renderStudents();
        }
        
        // Directly update the welcome message and teacher text
        translateWelcomeMessage(this.value);
        translateTeacherText(this.value);
        
        // DIRECT HARD-CODED UPDATE of sidebar teacherTab element
        // Most reliable approach: use hard-coded translations directly
        const sidebarTeacherElement = document.querySelector('.sidebar .logo p[data-translate="teacherTab"]');
        if (sidebarTeacherElement) {
            const translations = {
                uz: 'O\'qituvchi',
                ru: 'Учитель',
                en: 'Teacher'
            };
            
            const translation = translations[this.value];
            console.log('Directly setting sidebar teacher translation to: ' + translation);
            
            // Set text directly without any complex mechanisms
            sidebarTeacherElement.textContent = translation;
            
            // Force a reflow to ensure visibility
            sidebarTeacherElement.style.display = 'none';
            setTimeout(function() {
                sidebarTeacherElement.style.display = '';
            }, 5);
        }
    };
    
    // Add the language options
    const languages = [
        { value: 'uz', text: 'O\'zbekcha' },
        { value: 'ru', text: 'Русский' },
        { value: 'en', text: 'English' }
    ];
    
    // Create option elements
    languages.forEach(lang => {
        const option = document.createElement('option');
        option.value = lang.value;
        option.textContent = lang.text;
        select.appendChild(option);
    });
    
    // Set the current language from localStorage
    select.value = currentLang;
    
    // Assemble the selector
    languageSelector.appendChild(label);
    languageSelector.appendChild(select);
    
    // First, check if we already have a language selector
    const existingSelector = document.getElementById('language-selector');
    if (existingSelector) {
        existingSelector.remove();
    }
    
    // Style the container to match the image
    languageSelector.style.display = 'flex';
    languageSelector.style.alignItems = 'center';
    languageSelector.style.background = '#f8f9fa';
    languageSelector.style.padding = '8px 15px';
    languageSelector.style.borderRadius = '4px';
    languageSelector.style.border = '1px solid #ddd';
    languageSelector.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    languageSelector.style.position = 'absolute';
    languageSelector.style.top = '10px';
    languageSelector.style.right = '10px';
    languageSelector.style.zIndex = '99999'; // Super high z-index to ensure visibility
    
    // Style the select element to match the image
    select.style.border = '1px solid #ccc';
    select.style.borderRadius = '4px';
    select.style.padding = '4px 8px';
    select.style.fontSize = '14px';
    select.style.backgroundColor = 'white';
    select.style.cursor = 'pointer';
    select.style.margin = '0 0 0 8px';
    select.style.minWidth = '120px';
    
    // Style the label
    label.style.color = '#333';
    label.style.fontSize = '14px';
    label.style.fontWeight = 'normal';
    
    // Try different placement strategies to ensure visibility
    
    // 1. First try to add it to the main-content div
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.style.position = 'relative'; // Ensure positioning context
        mainContent.appendChild(languageSelector);
    } 
    // 2. If no main-content, try adding to the body
    else {
        document.body.appendChild(languageSelector);
        
        // Change to fixed position for body placement
        languageSelector.style.position = 'fixed';
    }
    
    // Apply translations to the entire page
    if (typeof applyTranslations === 'function') {
        applyTranslations();
    } else {
        // Fallback if applyTranslations is not defined in data.js
        applyTranslationsLocal();
    }
    
    // Ensure table headers are also translated
    ensureTableTranslations();
    
    // Update placeholders
    updatePlaceholders();
    
    // Add a global style to ensure language selector is always visible
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        #language-selector {
            display: flex !important;
            visibility: visible !important;
            opacity: 1 !important;
        }
        
        /* Force sidebar teacher text via CSS - modified to not hide original text */
        .sidebar .logo p[data-translate="teacherTab"] {
            position: relative;
            /* Removed: color: transparent !important; */
        }
        
        /* Removed the ::before pseudo-element that was overlaying text */
    `;
    document.head.appendChild(styleElement);
    
    // Directly apply specific translations
    setTimeout(function() {
        translateWelcomeMessage(currentLang);
        translateTeacherText(currentLang);
        translateSidebarElements(currentLang);
        applyForcedTextAttributes(currentLang);
        console.log("Applied manual translations on page load");
    }, 500); // Small delay to ensure DOM is fully processed
    
    // Set up a MutationObserver to watch for changes to the teacher elements
    const targetNode = document.body;
    if (targetNode) {
        const config = { childList: true, subtree: true, characterData: true };
        const callback = function(mutationsList, observer) {
            for(const mutation of mutationsList) {
                // Skip mutations to the sidebar teacherTab element itself, as it's handled separately
                const isTeacherTabElement = mutation.target && 
                    (mutation.target.getAttribute && mutation.target.getAttribute('data-translate') === 'teacherTab') ||
                    (mutation.target.parentNode && mutation.target.parentNode.getAttribute && 
                     mutation.target.parentNode.getAttribute('data-translate') === 'teacherTab');
                
                if (isTeacherTabElement) {
                    console.log("Skipping mutation to teacherTab element");
                    continue;
                }
                
                if (mutation.type === 'characterData' || mutation.type === 'childList') {
                    // If the mutation affects the sidebar, check if we need to translate
                    let needsSidebarTranslation = false;
                    
                    if (mutation.target) {
                        // Check if the mutation is related to the sidebar
                        const sidebarRelated = mutation.target.closest('.sidebar') || 
                                            (mutation.target.className && mutation.target.className.includes('sidebar'));
                        
                        // Check if the sidebar or its children were modified
                        if (sidebarRelated) {
                            needsSidebarTranslation = true;
                        }
                        
                        // If we're updating elements that might contain teacher elements, translate them
                        if (needsSidebarTranslation) {
                            console.log("Sidebar changes detected - reapplying translations");
                            setTimeout(function() {
                                translateTeacherText(currentLang);
                                translateSidebarElements(currentLang);
                            }, 100);
                        }
                    }
                }
            }
        };
        
        const observer = new MutationObserver(callback);
        observer.observe(targetNode, config);
        console.log("Set up DOM mutation observer");
    }
    
    // Also set a recurring check for the sidebar translations
    setInterval(function() {
        const sidebarTeacherElement = document.querySelector('.sidebar [data-translate="teacherTab"]');
        if (sidebarTeacherElement) {
            const expectedTranslation = getTeacherTranslation(currentLang);
            if (sidebarTeacherElement.textContent !== expectedTranslation) {
                console.log("Sidebar teacher text reverted - fixing it");
                translateSidebarElements(currentLang);
            }
        }
    }, 1000); // Check every second
});

// Listen for language change events
document.addEventListener('languageChanged', function(e) {
    console.log('Language change event received:', e.detail.language);
    translateWelcomeMessage(e.detail.language);
    translateTeacherText(e.detail.language);
    translateSidebarElements(e.detail.language);
    applyForcedTextAttributes(e.detail.language);
    
    // Extra check for teacher element after a slight delay
    setTimeout(function() {
        verifyTeacherTranslation(e.detail.language);
    }, 300);
});

// Function to verify and enforce teacher translation
function verifyTeacherTranslation(language) {
    const teacherElements = document.querySelectorAll('[data-translate="teacher"]');
    const teacherTabElements = document.querySelectorAll('[data-translate="teacherTab"]');
    
    const teacherTranslations = {
        uz: 'O\'qituvchi',
        ru: 'Учитель',
        en: 'Teacher'
    };
    
    let expectedTranslation = teacherTranslations[language];
    
    // Get from data.js if available
    if (typeof getTranslation === 'function') {
        const dataJsTranslation = getTranslation('teacher');
        if (dataJsTranslation && dataJsTranslation !== 'teacher') {
            expectedTranslation = dataJsTranslation;
        }
    }
    
    console.log(`Verifying teacher translation: expected "${expectedTranslation}"`);
    
    // Check and force-update if needed
    teacherElements.forEach((element, index) => {
        if (element.textContent !== expectedTranslation) {
            console.log(`Teacher element ${index} has incorrect text: "${element.textContent}", forcing update`);
            element.textContent = expectedTranslation;
            
            // Try extra hard for this element by using innerHTML too
            element.innerHTML = expectedTranslation;
        }
    });
    
    // Check and force-update teacherTab elements if needed
    teacherTabElements.forEach((element, index) => {
        if (element.textContent !== expectedTranslation) {
            console.log(`TeacherTab element ${index} has incorrect text: "${element.textContent}", forcing update`);
            element.textContent = expectedTranslation;
            
            // Try extra hard for this element by using innerHTML too
            element.innerHTML = expectedTranslation;
        }
    });
    
    // Also check the special teacherName element
    const teacherNameElement = document.getElementById('teacherName');
    if (teacherNameElement && teacherNameElement.textContent !== expectedTranslation) {
        console.log(`teacherName element has incorrect text: "${teacherNameElement.textContent}", forcing update`);
        teacherNameElement.textContent = expectedTranslation;
        teacherNameElement.innerHTML = expectedTranslation;
    }
}

// Function to ensure table headers are translated properly
function ensureTableTranslations() {
    // Get current language
    const currentLang = localStorage.getItem('selectedLanguage') || 'uz';
    
    // Get all table headers with data-translate attributes
    const tableHeaders = document.querySelectorAll('th[data-translate]');
    
    tableHeaders.forEach(header => {
        const key = header.getAttribute('data-translate');
        if (typeof getTranslation === 'function' && getTranslation(key)) {
            header.textContent = getTranslation(key);
        } else if (window.allTranslations && window.allTranslations[currentLang] && window.allTranslations[currentLang][key]) {
            header.textContent = window.allTranslations[currentLang][key];
        }
    });
    
    // Force rendering any dynamically created table cells too
    const tables = document.querySelectorAll('table');
    tables.forEach(table => {
        // Trigger reflow to ensure changes are applied
        table.style.display = 'none';
        table.offsetHeight; // Force reflow
        table.style.display = '';
    });
    
    // Specifically ensure welcome message is translated
    translateWelcomeMessage(currentLang);
    
    // Also ensure teacher title is translated
    translateTeacherText(currentLang);
}

// Function to update placeholder text in input fields
function updatePlaceholders() {
    // Update search input placeholder
    const searchInputs = document.querySelectorAll('input#searchInput');
    searchInputs.forEach(input => {
        input.placeholder = getTranslation('search') || 'Qidiruv...';
    });
}

// Fallback function if data.js is not loaded
function applyTranslationsLocal() {
    const currentLang = localStorage.getItem('selectedLanguage') || 'uz';
    const elements = document.querySelectorAll('[data-translate]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        
        // Simple translations for critical UI elements if data.js is not loaded
        const basicTranslations = {
            uz: {
                languageLabel: 'Til:',
                systemTitle: 'Edu Smart System',
                adminTab: 'Administrator',
                teacherTab: 'O\'qituvchi',
                studentTab: 'O\'quvchi',
                home: 'Bosh sahifa',
                logout: 'Chiqish',
                studentId: 'ID',
                fullName: 'F.I.O',
                class: 'Sinf',
                parentContact: 'Ota-ona raqami',
                address: 'Manzil',
                actions: 'Amallar',
                welcome: 'Xush kelibsiz',
                teacher: 'O\'qituvchi'
            },
            ru: {
                languageLabel: 'Язык:',
                systemTitle: 'Edu Smart System',
                adminTab: 'Администратор',
                teacherTab: 'Учитель',
                studentTab: 'Ученик',
                home: 'Главная',
                logout: 'Выход',
                studentId: 'ИД',
                fullName: 'Ф.И.О',
                class: 'Класс',
                parentContact: 'Контакт родителей',
                address: 'Адрес',
                actions: 'Действия',
                welcome: 'Добро пожаловать',
                teacher: 'Учитель'
            },
            en: {
                languageLabel: 'Language:',
                systemTitle: 'Edu Smart System',
                adminTab: 'Administrator',
                teacherTab: 'Teacher',
                studentTab: 'Student',
                home: 'Home',
                logout: 'Logout',
                studentId: 'ID',
                fullName: 'Full Name',
                class: 'Class',
                parentContact: 'Parent Contact',
                address: 'Address',
                actions: 'Actions',
                welcome: 'Welcome',
                teacher: 'Teacher'
            }
        };
        
        if (basicTranslations[currentLang] && basicTranslations[currentLang][key]) {
            element.textContent = basicTranslations[currentLang][key];
        }
    });
    
    // Also ensure table headers are translated
    ensureTableTranslations();
}

// Function to specifically translate the welcome message
function translateWelcomeMessage(language) {
    const welcomeElements = document.querySelectorAll('[data-translate="welcome"]');
    
    // Define fallback translations if data.js translations are not available
    const welcomeTranslations = {
        uz: 'Xush kelibsiz',
        ru: 'Добро пожаловать',
        en: 'Welcome'
    };
    
    // Get the correct translation
    let translation = welcomeTranslations[language];
    
    // Try to get it from data.js first if available
    if (typeof getTranslation === 'function') {
        const dataJsTranslation = getTranslation('welcome');
        if (dataJsTranslation && dataJsTranslation !== 'welcome') {
            translation = dataJsTranslation;
        }
    } else if (window.allTranslations && window.allTranslations[language] && window.allTranslations[language]['welcome']) {
        translation = window.allTranslations[language]['welcome'];
    }
    
    // Apply to all welcome elements on the page
    welcomeElements.forEach(element => {
        element.textContent = translation;
        
        // Force a DOM reflow to ensure changes are visible
        element.style.display = 'none';
        element.offsetHeight; // Force reflow
        element.style.display = '';
    });
    
    console.log(`Welcome message translated to: ${translation} (${language})`);
}

// Function to specifically translate the teacher text
function translateTeacherText(language) {
    const teacherElements = document.querySelectorAll('[data-translate="teacher"]');
    console.log(`Found ${teacherElements.length} teacher elements to translate`);
    
    // Also get the teacherTab elements in the sidebar
    const teacherTabElements = document.querySelectorAll('[data-translate="teacherTab"]');
    console.log(`Found ${teacherTabElements.length} teacherTab elements in sidebar to translate`);
    
    // Define fallback translations if data.js translations are not available
    const teacherTranslations = {
        uz: 'O\'qituvchi',
        ru: 'Учитель',
        en: 'Teacher'
    };
    
    // Get the correct translation
    let translation = teacherTranslations[language];
    
    // Try to get it from data.js first if available
    if (typeof getTranslation === 'function') {
        const dataJsTranslation = getTranslation('teacher');
        console.log(`getTranslation('teacher') returned: ${dataJsTranslation}`);
        if (dataJsTranslation && dataJsTranslation !== 'teacher') {
            translation = dataJsTranslation;
        }
    } else if (window.allTranslations && window.allTranslations[language] && window.allTranslations[language]['teacher']) {
        translation = window.allTranslations[language]['teacher'];
        console.log(`Got translation from window.allTranslations: ${translation}`);
    }
    
    console.log(`Will apply teacher translation: "${translation}" for language: ${language}`);
    
    // Apply to all teacher elements on the page
    teacherElements.forEach((element, index) => {
        console.log(`Translating teacher element ${index + 1}: ${element.outerHTML}`);
        
        // Directly set text content
        element.textContent = translation;
        
        // Force a DOM reflow to ensure changes are visible
        element.style.display = 'none';
        element.offsetHeight; // Force reflow
        element.style.display = '';
        
        console.log(`After translation: ${element.outerHTML}`);
    });
    
    // Apply to all teacherTab elements in the sidebar
    teacherTabElements.forEach((element, index) => {
        console.log(`Translating teacherTab element ${index + 1}: ${element.outerHTML}`);
        
        // Directly set text content
        element.textContent = translation;
        
        // Add forced text attribute for CSS solution
        element.setAttribute('data-forced-text', translation);
        
        // Force a DOM reflow to ensure changes are visible
        element.style.display = 'none';
        element.offsetHeight; // Force reflow
        element.style.display = '';
        
        console.log(`After translation: ${element.outerHTML}`);
    });
    
    // Special handling for teacher element with ID
    const teacherNameElement = document.getElementById('teacherName');
    if (teacherNameElement) {
        console.log(`Found specific teacherName element: ${teacherNameElement.outerHTML}`);
        teacherNameElement.textContent = translation;
        console.log(`After translation: ${teacherNameElement.outerHTML}`);
    }
    
    console.log(`Teacher text translation completed. Set to: ${translation} (${language})`);
}

// Function to apply forced text attributes based on current language
function applyForcedTextAttributes(language) {
    const teacherTranslation = getTeacherTranslation(language);
    const teacherTabElements = document.querySelectorAll('[data-translate="teacherTab"]');
    
    teacherTabElements.forEach(element => {
        element.setAttribute('data-forced-text', teacherTranslation);
        console.log(`Set data-forced-text attribute to "${teacherTranslation}"`);
    });
}

// Function to translate sidebar elements specifically
function translateSidebarElements(language) {
    // Get translations from data.js if available
    let translations = {
        home: { uz: 'Bosh sahifa', ru: 'Главная', en: 'Home' },
        students: { uz: 'O\'quvchilar', ru: 'Ученики', en: 'Students' },
        attendance: { uz: 'Davomat', ru: 'Посещаемость', en: 'Attendance' },
        grades: { uz: 'Baholar', ru: 'Оценки', en: 'Grades' },
        announcements: { uz: 'E\'lonlar', ru: 'Объявления', en: 'Announcements' },
        logout: { uz: 'Chiqish', ru: 'Выход', en: 'Logout' },
        teacherTab: { uz: 'O\'qituvchi', ru: 'Учитель', en: 'Teacher' },
        systemTitle: { uz: 'Edu Smart System', ru: 'Edu Smart System', en: 'Edu Smart System' }
    };
    
    // First, explicitly handle the teacherTab element as it's the one that keeps reverting
    const teacherTabElement = document.querySelector('.sidebar [data-translate="teacherTab"]');
    if (teacherTabElement) {
        const teacherTranslation = getTeacherTranslation(language);
        console.log(`Direct teacherTab translation: setting to "${teacherTranslation}"`);
        
        // Use multiple methods to ensure the text stays translated
        teacherTabElement.textContent = teacherTranslation;
        teacherTabElement.innerHTML = teacherTranslation;
        
        // Store the correct translation for CSS-based approach
        teacherTabElement.setAttribute('data-forced-text', teacherTranslation);
        
        // Store the correct translation in a custom attribute for verification later
        teacherTabElement.setAttribute('data-correct-translation', teacherTranslation);
        
        // Force reflow to ensure the change is visible
        teacherTabElement.style.display = 'none';
        teacherTabElement.offsetHeight;
        teacherTabElement.style.display = '';
    }
    
    // Find all sidebar elements with data-translate attributes in the sidebar
    const sidebarElements = document.querySelectorAll('.sidebar [data-translate]');
    console.log(`Found ${sidebarElements.length} sidebar elements to translate`);
    
    sidebarElements.forEach(element => {
        const key = element.getAttribute('data-translate');
        
        // Skip teacherTab since we already handled it specifically
        if (key === 'teacherTab') return;
        
        // First try to get translation from data.js
        let translatedText = null;
        if (typeof getTranslation === 'function') {
            translatedText = getTranslation(key);
            if (translatedText === key) translatedText = null; // Reset if not found
        }
        
        // If not found in data.js, use our local translations
        if (!translatedText && translations[key] && translations[key][language]) {
            translatedText = translations[key][language];
        }
        
        // Apply translation if found
        if (translatedText) {
            console.log(`Translating sidebar element [${key}] to: ${translatedText}`);
            element.textContent = translatedText;
            
            // Store the correct translation in a custom attribute for verification later
            element.setAttribute('data-correct-translation', translatedText);
            
            // Force reflow
            element.style.display = 'none';
            element.offsetHeight;
            element.style.display = '';
        }
    });
    
    // Modified: Remove the CSS rule that was hiding the original text
    try {
        const styleId = 'enforced-translations';
        let styleElement = document.getElementById(styleId);
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.id = styleId;
            document.head.appendChild(styleElement);
        }
        
        // Simplified CSS without making text transparent
        styleElement.textContent = `
            .sidebar [data-translate="teacherTab"] {
                position: relative;
            }
            /* Removed the ::after pseudo-element */
        `;
    } catch (e) {
        console.error("Error setting CSS override:", e);
    }
}

// Function to get the expected teacher translation for a given language
function getTeacherTranslation(language) {
    // Define fallback translations
    const teacherTranslations = {
        uz: 'O\'qituvchi',
        ru: 'Учитель',
        en: 'Teacher'
    };
    
    // Get the correct translation
    let translation = teacherTranslations[language];
    
    // Try to get it from data.js first if available
    if (typeof getTranslation === 'function') {
        const dataJsTranslation = getTranslation('teacher');
        if (dataJsTranslation && dataJsTranslation !== 'teacher') {
            translation = dataJsTranslation;
        }
    } else if (window.allTranslations && window.allTranslations[language] && window.allTranslations[language]['teacher']) {
        translation = window.allTranslations[language]['teacher'];
    }
    
    return translation;
} 