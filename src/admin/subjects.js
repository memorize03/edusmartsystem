// Fanlar ro'yxati
let subjects = [
    {
        id: 1,
        name: "fizika",
        hours: 9,
    }
];
let nextId = 2;

// Modal oynani ko'rsatish
function showModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

// Modal oynani yopish
function hideModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    // Formani tozalash
    if (modalId === 'addSubjectModal') {
        document.getElementById('addSubjectForm').reset();
    }
}

// Yangi fan qo'shish
function saveSubject(event) {
    event.preventDefault();
    
    const newSubject = {
        id: nextId++,
        name: document.getElementById('subjectName').value,
        hours: document.getElementById('subjectHours').value,
    };
    
    subjects.push(newSubject); // Yangi fanni qo'shish
    renderSubjectsList(); // Ro'yxatni yangilash
    hideModal('addSubjectModal');
    
    // Muvaffaqiyatli xabar
    showNotification('Fan muvaffaqiyatli qo\'shildi');
    
    return false;
}

// Fanlar ro'yxatini ko'rsatish
function renderSubjectsList() {
    const tbody = document.getElementById('subjectsList');
    tbody.innerHTML = ''; // Ro'yxatni tozalash
    
    subjects.forEach(subject => {
        const row = document.createElement('tr');
        row.id = `subject-${subject.id}`;
        
        row.innerHTML = `
            <td>${subject.id}</td>
            <td>${subject.name}</td>
            <td>${subject.hours}</td>
            <td class="actions">
                <button class="icon-btn edit" onclick="editSubject(${subject.id})">
                    <i class="material-icons">edit</i>
                </button>
                <button class="icon-btn delete" onclick="deleteSubject(${subject.id})">
                    <i class="material-icons">delete</i>
                </button>
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

// Fanni tahrirlash
function editSubject(id) {
    const subject = subjects.find(s => s.id === id);
    if (subject) {
        document.getElementById('subjectName').value = subject.name;
        document.getElementById('subjectHours').value = subject.hours;
        
        // Modal oynani ko'rsatish
        showModal('addSubjectModal');
        
        // Eski fanni o'chirish
        subjects = subjects.filter(s => s.id !== id);
        renderSubjectsList(); // Ro'yxatni yangilash
    }
}

// Fanni o'chirish
function deleteSubject(id) {
    if (confirm('Haqiqatan ham bu fanni o\'chirmoqchimisiz?')) {
        subjects = subjects.filter(s => s.id !== id);
        renderSubjectsList(); // Ro'yxatni yangilash
        showNotification('Fan o\'chirildi');
    }
}

// Xabar ko'rsatish
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Sahifa yuklanganda ro'yxatni ko'rsatish
document.addEventListener('DOMContentLoaded', function() {
    renderSubjectsList();
});

// Modal oynani yopish uchun tashqi click
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        hideModal(event.target.id);
    }
}; 