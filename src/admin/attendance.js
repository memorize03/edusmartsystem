// Davomat ro'yxati
let attendance = [
    {
        id: 1,
        studentName: "Salimov Ozodbek",
        status: "present"
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
    if (modalId === 'addAttendanceModal') {
        document.getElementById('addAttendanceForm').reset();
    }
}

// Yangi davomat qo'shish
function saveAttendance(event) {
    event.preventDefault();
    
    const newAttendance = {
        id: nextId++, // Unique ID
        studentName: document.getElementById('studentName').value,
        status: document.getElementById('attendanceStatus').value,
    };
    
    attendance.push(newAttendance);
    renderAttendanceList();
    hideModal('addAttendanceModal');
    
    // Muvaffaqiyatli xabar
    showNotification('Davomat muvaffaqiyatli qo\'shildi');
    
    return false;
}

// Davomat ro'yxatini ko'rsatish
function renderAttendanceList() {
    const tbody = document.getElementById('attendanceList');
    tbody.innerHTML = ''; // Ro'yxatni tozalash
    
    attendance.forEach(item => {
        const row = document.createElement('tr');
        row.id = `attendance-${item.id}`;
        
        // Holat uchun chiroyli ko'rinish
        let statusText;
        switch(item.status) {
            case 'present':
                statusText = 'Keldi';
                break;
            case 'absent':
                statusText = 'Kelmadi';
                break;
            case 'late':
                statusText = 'Kechikdi';
                break;
            default:
                statusText = item.status;
        }
        
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.studentName}</td>
            <td>${statusText}</td>
            <td class="actions">
                <button class="icon-btn edit" onclick="editAttendance(${item.id})">
                    <i class="material-icons">edit</i>
                </button>
                <button class="icon-btn delete" onclick="deleteAttendance(${item.id})">
                    <i class="material-icons">delete</i>
                </button>
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

// Davomatni tahrirlash
function editAttendance(id) {
    const attendanceItem = attendance.find(a => a.id === id);
    if (attendanceItem) {
        document.getElementById('studentName').value = attendanceItem.studentName;
        document.getElementById('attendanceStatus').value = attendanceItem.status;
        
        // Modal oynani ko'rsatish
        showModal('addAttendanceModal');
        
        // Eski davomatni o'chirish
        attendance = attendance.filter(a => a.id !== id);
        renderAttendanceList();
    }
}

// Davomatni o'chirish
function deleteAttendance(id) {
    if (confirm('Haqiqatan ham bu davomatni o\'chirmoqchimisiz?')) {
        attendance = attendance.filter(a => a.id !== id);
        renderAttendanceList();
        showNotification('Davomat o\'chirildi');
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
    renderAttendanceList();
});

// Modal oynani yopish uchun tashqi click
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        hideModal(event.target.id);
    }
}; 