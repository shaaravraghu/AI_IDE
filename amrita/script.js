// ============= Load Registered Users =============
// Get form element from HTML
const form = document.getElementById('loginForm');

// Load all users from localStorage (created during registration)
const users = JSON.parse(localStorage.getItem('users')) || {};

// ============= Initialize Theme =============
// Load theme when page loads
window.addEventListener('load', () => {
    initializeTheme();
});

// Initialize theme from localStorage
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark-theme');
        document.getElementById('themeToggle').textContent = '☀️';
    }
    
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
}

// Toggle between dark and light themes
function toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark-theme');
    const theme = isDark ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    document.getElementById('themeToggle').textContent = isDark ? '☀️' : '🌙';
}

// ============= Login Form Handler =============
// Handle form submission when user clicks Sign In button
form.addEventListener('submit', e => {
    e.preventDefault();
    
    // Get email and password values from form inputs
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // ============= Credential Validation =============
    // Check if email exists in users database and password matches
    if (users[email] && users[email] === password) {
        // Extract user name from email (part before @)
        const userName = email.split('@')[0];
        
        // Store current user info in sessionStorage (active session)
        sessionStorage.setItem('user', email);
        sessionStorage.setItem('userName', userName);
        
        // If "Remember me" checkbox is checked, save email to localStorage
        document.getElementById('remember').checked && localStorage.setItem('email', email);
        
        // Redirect to dashboard page
window.location.href = '../dashboard/index.html';
    } else {
        // Show error if email not found or password incorrect
        alert('Invalid credentials');
    }
});

// ============= Auto-fill Email (Remember Me) =============
// When page loads, check if email was saved from previous login
window.addEventListener('load', () => {
    // Get saved email from localStorage
    const email = localStorage.getItem('email');
    
    // If email exists, automatically fill the email input field
    if (email) document.getElementById('email').value = email;
});
