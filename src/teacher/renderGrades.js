// Baholar ro'yxatini ko'rsatish
function renderGrades(gradesList) {
    const tbody = document.getElementById('gradesList');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    // Joriy tilni olish
    const currentLang = getCurrentLanguage();
    
    gradesList.forEach(grade => {
        const row = document.createElement('tr');
        
        // Baho uchun chiroyli ko'rinish
        let gradeClass;
        switch(parseInt(grade.grade)) {
            case 5:
                gradeClass = 'grade-5';
                break;
            case 4:
                gradeClass = 'grade-4';
                break;
            case 3:
                gradeClass = 'grade-3';
                break;
            case 2:
                gradeClass = 'grade-2';
                break;
            default:
                gradeClass = '';
        }
        
        row.innerHTML = `
            <td>${grade.id}</td>
            <td>${grade.studentName}</td>
            <td>${grade.class}</td>
            <td>${grade.subject}</td>
            <td class="${gradeClass}">${grade.grade}</td>
            <td>${formatDate(grade.date)}</td>
            <td class="actions">
                <button class="icon-btn edit" onclick="editGrade(${grade.id})" title="${getTranslation('editGrade')}">
                    <i class="material-icons">edit</i>
                </button>
                <button class="icon-btn delete" onclick="deleteGrade(${grade.id})" title="${getTranslation('delete')}">
                    <i class="material-icons">delete</i>
                </button>
            </td>
        `;
        
        tbody.appendChild(row);
    });
    
    // Jadval sarlavhalarini yangilaymiz
    const headers = document.querySelectorAll('th[data-translate]');
    headers.forEach(header => {
        const key = header.getAttribute('data-translate');
        const translation = getTranslation(key);
        if (translation) {
            header.textContent = translation;
        }
    });
    
    // Tarjimalarni yangilash
    applyTranslations();
} 