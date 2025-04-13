document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Form yuborildi: ' + document.getElementById('name').value);
}); 