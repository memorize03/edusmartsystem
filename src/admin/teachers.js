// O'qituvchilar ro'yxati
let teachers = [
    {
        id: 1,
        name: "Rahimov Muhammad",
        subject: "Matematika"
    }
];
let nextId = 2;

// Modal oynani ko'rsatish
function showModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function exitModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Modal oynani yopish
function hideModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    // Formani tozalash
    if (modalId === 'addTeacherModal') {
        document.getElementById('addTeacherForm').reset();
    }
}

// O'qituvchi qo'shish
function saveTeacher(event) {
    event.preventDefault();
    
    const newTeacher = {
        id: nextId++,
        name: document.getElementById('teacherName').value,
        subject: document.getElementById('teacherSubject').value,
    };
    
    teachers.push(newTeacher);
    renderTeachersList();
    hideModal('addTeacherModal');
    
    // Muvaffaqiyatli xabar
    showNotification('O\'qituvchi muvaffaqiyatli qo\'shildi');
    
    return false;
}

// O'qituvchilar ro'yxatini yangilash
function renderTeachersList() {
    const tbody = document.getElementById('teachersList');
    tbody.innerHTML = ''; // Ro'yxatni tozalash
    
    teachers.forEach(teacher => {
        const row = document.createElement('tr');
        row.id = `teacher-${teacher.id}`;
        
        row.innerHTML = `
            <td>${teacher.id}</td>
            <td>${teacher.name}</td>
            <td>${teacher.subject}</td>
            <td class="actions">
                <button class="icon-btn edit" onclick="editTeacher(${teacher.id})">
                    <i class="material-icons">edit</i>
                </button>
                <button class="icon-btn delete" onclick="deleteTeacher(${teacher.id})">
                    <i class="material-icons">delete</i>
                </button>
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

// O'qituvchini tahrirlash
function editTeacher(id) {
    const teacher = teachers.find(t => t.id === id);
    if (teacher) {
        document.getElementById('teacherName').value = teacher.name;
        document.getElementById('teacherSubject').value = teacher.subject;
        
        // Modal oynani ko'rsatish
        showModal('addTeacherModal');
        
        // Eski o'qituvchini o'chirish
        teachers = teachers.filter(t => t.id !== id);
        renderTeachersList();
    }
}

// O'qituvchini o'chirish
function deleteTeacher(id) {
    if (confirm('Haqiqatan ham bu o\'qituvchini o\'chirmoqchimisiz?')) {
        teachers = teachers.filter(t => t.id !== id);
        renderTeachersList();
        showNotification('O\'qituvchi o\'chirildi');
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
    renderTeachersList();
});

// Modal oynani yopish uchun tashqi click
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        hideModal(event.target.id);
    }
}; 