// E'lonlar ro'yxati
let announcements = [
    {
        id: 1,
        title: "Ota-onalar yig'ilishi",
        text: "Ertaga soat 15:00 da maktabda ota-onalar yig'ilishi bo'lib o'tadi"
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
    if (modalId === 'addAnnouncementModal') {
        document.getElementById('addAnnouncementForm').reset();
    }
}

// E'lon qo'shish
function saveAnnouncement(event) {
    event.preventDefault();
    
    const newAnnouncement = {
        id: nextId++,
        title: document.getElementById('announcementTitle').value,
        text: document.getElementById('announcementText').value,
    };
    
    announcements.push(newAnnouncement);
    renderAnnouncementsList();
    hideModal('addAnnouncementModal');
    
    // Muvaffaqiyatli xabar
    showNotification('E\'lon muvaffaqiyatli qo\'shildi');
    
    return false;
}

// E'lonlar ro'yxatini ko'rsatish
function renderAnnouncementsList() {
    const tbody = document.getElementById('announcementsList');
    tbody.innerHTML = ''; // Ro'yxatni tozalash
    
    announcements.forEach(announcement => {
        const row = document.createElement('tr');
        row.id = `announcement-${announcement.id}`;
        
        // Matnni qisqartirish
        let shortText = announcement.text;
        if (shortText.length > 50) {
            shortText = shortText.substring(0, 47) + '...';
        }
        
        row.innerHTML = `
            <td>${announcement.id}</td>
            <td>${announcement.title}</td>
            <td>${shortText}</td>
            <td class="actions">
                <button class="icon-btn edit" onclick="editAnnouncement(${announcement.id})">
                    <i class="material-icons">edit</i>
                </button>
                <button class="icon-btn delete" onclick="deleteAnnouncement(${announcement.id})">
                    <i class="material-icons">delete</i>
                </button>
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

// E'lonni tahrirlash
function editAnnouncement(id) {
    const announcement = announcements.find(a => a.id === id);
    if (announcement) {
        document.getElementById('announcementTitle').value = announcement.title;
        document.getElementById('announcementText').value = announcement.text;
        
        // Modal oynani ko'rsatish
        showModal('addAnnouncementModal');
        
        // Eski e'lonni o'chirish
        announcements = announcements.filter(a => a.id !== id);
        renderAnnouncementsList();
    }
}

// E'lonni o'chirish
function deleteAnnouncement(id) {
    if (confirm('Haqiqatan ham bu e\'lonni o\'chirmoqchimisiz?')) {
        announcements = announcements.filter(a => a.id !== id);
        renderAnnouncementsList();
        showNotification('E\'lon o\'chirildi');
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
    renderAnnouncementsList();
});

// Modal oynani yopish uchun tashqi click
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        hideModal(event.target.id);
    }
}; 