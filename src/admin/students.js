// O'quvchilar ro'yxati
let students = [
    { 
        id: 1, 
        name: 'Salimov Ozodbek', 
        class: '9', 
        phone: '+998901234567' 
    }
];

// Modal oynani ko'rsatish
function showModel(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
    }
}

// Modal oynani yopish
function hideModel(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        // Formani tozalash
        if (modalId === 'addStudentModal') {
            document.getElementById('addStudentForm').reset();
        }
    }
}

// Yangi o'quvchi qo'shish
function saveStudent(event) {
    event.preventDefault();
    console.log("saveStudent funksiyasi chaqirildi");
    
    const nameInput = document.getElementById('studentName');
    const classInput = document.getElementById('studentClass');
    const phoneInput = document.getElementById('studentPhone');

    // Maydonlarni tekshirish
    if (!nameInput.value.trim() || !classInput.value.trim() || !phoneInput.value.trim()) {
        alert('Iltimos, barcha maydonlarni to'ldiring!');
        return false;
    }

    const newStudent = {
        id: students.length > 0 ? students[students.length - 1].id + 1 : 1,
        name: nameInput.value.trim(),
        class: classInput.value.trim(),
        phone: phoneInput.value.trim()
    };

    console.log("Yangi o'quvchi:", newStudent);

    // Ro'yxatga qo'shish
    students.push(newStudent);
    renderStudentsList();
    
    // Modal oynani yopish
    if (typeof closeModel === 'function') {
        closeModel('addStudentModal');
    } else {
        console.error("closeModel funksiyasi topilmadi");
        // Agar closeModel funksiyasi topilmasa, to'g'ridan-to'g'ri DOM orqali yopamiz
        const modal = document.getElementById('addStudentModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }
    
    console.log("O'quvchilar ro'yxati yangilandi:", students);
    return false;
}

// O'quvchilar ro'yxatini yangilash
function renderStudentsList() {
    const tbody = document.querySelector('#studentsTable tbody');
    if (!tbody) return;
    
    tbody.innerHTML = ''; // Ro'yxatni tozalash
    
    students.forEach(student => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.class}</td>
            <td>${student.phone}</td>
            <td class="actions">
                <button class="icon-btn edit" onclick="editStudent(${student.id})">
                    <i class="material-icons">edit</i>
                </button>
                <button class="icon-btn delete" onclick="deleteStudent(${student.id})">
                    <i class="material-icons">delete</i>
                </button>
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

// O'quvchini tahrirlash
function editStudent(id) {
    const student = students.find(s => s.id === id);
    if (student) {
        // Modal formani to'ldirish
        document.getElementById('studentName').value = student.name;
        document.getElementById('studentClass').value = student.class;
        document.getElementById('studentPhone').value = student.phone;
        
        // Modal oynani ko'rsatish
        showModel('addStudentModal');
        
        // Eski o'quvchini o'chirish
        students = students.filter(s => s.id !== id);
    }
}

// O'quvchini o'chirish
function deleteStudent(id) {
    if (confirm('Haqiqatan ham bu o\'quvchini o\'chirmoqchimisiz?')) {
        students = students.filter(s => s.id !== id);
        renderStudentsList();
    }
}

// Sahifa yuklanganda ro'yxatni ko'rsatish
document.addEventListener('DOMContentLoaded', function() {
    renderStudentsList();
});
