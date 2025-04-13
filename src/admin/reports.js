// Davomat hisobotini yaratish
function generateAttendanceReport() {
    const classFilter = document.getElementById('classFilterAttendance').value;
    const monthFilter = document.getElementById('monthFilterAttendance').value;
    
    // Hisobot yaratish logikasi
    downloadReport('attendance', {
        class: classFilter,
        month: monthFilter
    });
}

// O'zlashtirish hisobotini yaratish
function generatePerformanceReport() {
    const classFilter = document.getElementById('classFilterPerformance').value;
    const subjectFilter = document.getElementById('subjectFilterPerformance').value;
    
    // Hisobot yaratish logikasi
    downloadReport('performance', {
        class: classFilter,
        subject: subjectFilter
    });
}

// Hisobotni yuklab olish
function downloadReport(type, filters) {
    // Bu yerda backend bilan bog'lanish va hisobotni yuklab olish logikasi bo'ladi
    console.log(`Hisobot turi: ${type}`);
    console.log('Filterlar:', filters);
    
    // Vaqtinchalik xabar
    alert(`${type === 'attendance' ? 'Davomat' : 'O\'zlashtirish'}  hisoboti yuklab olinmoqda...`);
}

// Sahifa yuklanganda
document.addEventListener('DOMContentLoaded', function() {
    // Joriy oyni o'rnatish
    const today = new Date();
    const monthInput = document.getElementById('monthFilterAttendance');
    monthInput.value = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
    renderReportsList();
});

// Hisobotlar ro'yxati
let reports = [
    {
        id: 1,
        name: "Davomat hisoboti",
        type: "attendance"
    }
];
let nextId = 2;

// Modal oynani ko'rsatish
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
    }
}

// Modal oynani yopish
function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        // Formani tozalash
        if (modalId === 'addReportModal') {
            document.getElementById('addReportForm').reset();
        }
    }
}

// Yangi hisobot qo'shish
function saveReport(event) {
    event.preventDefault();
    
    const newReport = {
        id: nextId++,
        name: document.getElementById('reportName').value,
        type: document.getElementById('reportType').value,
    };
    
    reports.push(newReport);
    renderReportsList();
    hideModal('addReportModal');
    
    // Muvaffaqiyatli xabar
    showNotification('Hisobot muvaffaqiyatli qo\'shildi');
    
    return false;
}

// Hisobotlar ro'yxatini ko'rsatish
function renderReportsList() {
    const tbody = document.getElementById('reportsList');
    tbody.innerHTML = ''; // Ro'yxatni tozalash
    
    reports.forEach(report => {
        const row = document.createElement('tr');
        row.id = `report-${report.id}`;
        
        // Hisobot turi uchun chiroyli ko'rinish
        let typeText = report.type;
        if (report.type === 'attendance') {
            typeText = 'Davomat';
        } else if (report.type === 'performance') {
            typeText = 'O\'zlashtirish';
        }
        
        row.innerHTML = `
            <td>${report.id}</td>
            <td>${report.name}</td>
            <td>${typeText}</td>
            <td class="actions">
                <button class="icon-btn edit" onclick="editReport(${report.id})">
                    <i class="material-icons">edit</i>
                </button>
                <button class="icon-btn delete" onclick="deleteReport(${report.id})">
                    <i class="material-icons">delete</i>
                </button>
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

// Hisobotni tahrirlash
function editReport(id) {
    const report = reports.find(r => r.id === id);
    if (report) {
        document.getElementById('reportName').value = report.name;
        document.getElementById('reportType').value = report.type;
        
        // Modal oynani ko'rsatish
        showModal('addReportModal');
        
        // Eski hisobotni o'chirish
        reports = reports.filter(r => r.id !== id);
        renderReportsList();
    }
}

// Hisobotni o'chirish
function deleteReport(id) {
    if (confirm('Haqiqatan ham bu hisobotni o\'chirmoqchimisiz?')) {
        reports = reports.filter(r => r.id !== id);
        renderReportsList();
        showNotification('Hisobot o\'chirildi');
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

// Modal oynani yopish uchun tashqi click
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        hideModal(event.target.id);
    }
};