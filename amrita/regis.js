// ============= Form Submission Handler =============
// Get form element from HTML
const form = document.getElementById('registerForm');

// Get social login button elements from HTML
const googleBtn = document.getElementById('googleBtn');
const githubBtn = document.getElementById('githubBtn');

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

// ============= Registration Form Handler =============
// Handle form submission when user clicks Create Account button
form.addEventListener('submit', e => {
    e.preventDefault();
    
    // Get all form input values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirm = document.getElementById('confirm').value;
    
    // ============= Password Validation =============
    // Check if password is at least 8 characters
    if (password.length < 8) {
        alert('Password must be at least 8 characters');
        return;
    }
    
    // Check if passwords match
    if (password !== confirm) {
        alert('Passwords do not match');
        return;
    }
    
    // ============= Check for Existing Email =============
    // Get all registered users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || {};
    
    // Check if email already exists
    if (users[email]) {
        alert('Email already registered');
        return;
    }
    
    // ============= Save User to localStorage =============
    // Store new user email and password
    users[email] = password;
    localStorage.setItem('users', JSON.stringify(users));
    
    // Success message and redirect to login
    alert('Account created! Redirecting to login...');
    window.location.href = '../login/index.html';
});

// ============= Google Sign-up Handler =============
// Handle Google OAuth button click
googleBtn.addEventListener('click', () => {
    alert('🔷 Google Sign-up\n\nThis will connect to your Google account');
    // TODO: Implement actual Google OAuth flow
});

// ============= GitHub Sign-up Handler =============
// Handle GitHub OAuth button click
githubBtn.addEventListener('click', () => {
    alert('⚫ GitHub Sign-up\n\nThis will connect to your GitHub account');
    // TODO: Implement actual GitHub OAuth flow
});

