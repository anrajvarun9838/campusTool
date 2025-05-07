document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(email) && password.length >= 3) {
        alert("Login successful!");
        window.location.href = "home.html"; // Redirect to main page
    } else {
        alert("Please enter a valid email and password (min 3 characters).");
    }
});

