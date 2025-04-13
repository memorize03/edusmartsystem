// O'quvchilar ro'yxati
let students = [
    { id: 1, name: 'Aliyev Aziz', class: '9-A', phone: '+998 90 123 45 67' }
];

// Modal oynani ko'rsatish
function showAddStudentModal() {
    document.getElementById('addStudentModal').style.display = 'block';
}

// Modal oynani yopish
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    console.log("1");
}

// Yangi o'quvchi qo'shish
document.getElementById('addStudentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const newStudent = {
        id: students.length + 1,
        name: document.getElementById('studentName').value,
        class: document.getElementById('studentClass').value,
        phone: document.getElementById('studentPhone').value
    };
    
    students.push(newStudent);
    addStudentToTable(newStudent);
    closeModal('addStudentModal');
    this.reset();
});

// O'quvchini jadvalga qo'shish
function addStudentToTable(student) {
    const tbody = document.querySelector('#studentsTable tbody');
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
}

// O'quvchini tahrirlash
function editStudent(id) {
    const student = students.find(s => s.id === id);
    if (student) {
        // Tahrirlash logikasi
        const newName = prompt('Yangi ism-familiya:', student.name);
        if (newName) {
            student.name = newName;
            updateStudentTable();
        }
    }
}

// O'quvchini o'chirish
function deleteStudent(id) {
    if (confirm("Haqiqatan ham bu o'quvchini o'chirmoqchimisiz?")) {
        students = students.filter(s => s.id !== id);
        updateStudentTable();
    }
}

// Jadvalni yangilash
function updateStudentTable() {
    const tbody = document.querySelector('#studentsTable tbody');
    tbody.innerHTML = '';
    students.forEach(student => addStudentToTable(student));
}

// Modal oynani yopish uchun tashqi click
window.onclick = function(event) {
    if (event.target.className === 'modal') {
        event.target.style.display = 'none';
    }
} 