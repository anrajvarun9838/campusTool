document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const name = document.querySelector('input[placeholder="Full Name"]').value.trim();
    const email = document.querySelector('input[placeholder="Email"]').value.trim();
    const password = document.querySelector('input[placeholder="Password"]').value;
  
    if (name && email && password) {
        alert(`Registered successfully!\nName: ${name}\nEmail: ${email}`);
        // Optionally store data in localStorage or send to server here
        // Redirect to login or main page if desired
    } else {
        alert('Please fill out all fields.');
    }
});
