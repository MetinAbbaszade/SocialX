
const loginSection = document.getElementById('login-section');
const signupSection = document.getElementById('signup-section');
const showSignupLink = document.getElementById('show-signup');
const showLoginLink = document.getElementById('show-login');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const themeToggle = document.querySelector('.theme-toggle');
const togglePasswordBtns = document.querySelectorAll('.toggle-password');
const alert = document.getElementById('alert');
const alertMessage = document.getElementById('alert-message');
const closeAlert = document.getElementById('close-alert');


showSignupLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginSection.classList.remove('active');
    signupSection.classList.add('active');
});

showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    signupSection.classList.remove('active');
    loginSection.classList.add('active');
});


themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
});


document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
});


togglePasswordBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const input = btn.parentElement.querySelector('input');
        if (input.type === 'password') {
            input.type = 'text';
            btn.classList.replace('fa-eye', 'fa-eye-slash');
        } else {
            input.type = 'password';
            btn.classList.replace('fa-eye-slash', 'fa-eye');
        }
    });
});


function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

function showError(input, message) {
    const formGroup = input.parentElement.parentElement;
    const errorMessage = formGroup.querySelector('.error-message');
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    input.classList.add('error');
}

function clearError(input) {
    const formGroup = input.parentElement.parentElement;
    const errorMessage = formGroup.querySelector('.error-message');
    errorMessage.textContent = '';
    errorMessage.style.display = 'none';
    input.classList.remove('error');
}

function showAlert(message, type) {
    alertMessage.textContent = message;
    alert.classList.add('show', type);

    setTimeout(() => {
        alert.classList.remove('show');
    }, 5000);
}

closeAlert.addEventListener('click', () => {
    alert.classList.remove('show');
});


loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;
    const email = document.getElementById('login-email');
    const password = document.getElementById('login-password');

    
    clearError(email);
    clearError(password);

    
    if (!validateEmail(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }

    
    if (password.value.trim() === '') {
        showError(password, 'Password cannot be empty');
        isValid = false;
    }

    if (isValid) {
        
        setTimeout(() => {
            showAlert('Login successful! Redirecting...', 'success');
            loginForm.reset();
        }, 1000);
    }
});


signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;
    const fullName = document.getElementById('full-name');
    const email = document.getElementById('signup-email');
    const password = document.getElementById('signup-password');
    const confirmPassword = document.getElementById('confirm-password');

    
    clearError(fullName);
    clearError(email);
    clearError(password);
    clearError(confirmPassword);

    
    if (fullName.value.trim() === '') {
        showError(fullName, 'Full name is required');
        isValid = false;
    }

    
    if (!validateEmail(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }

    
    if (!validatePassword(password.value)) {
        showError(password, 'Password must be at least 6 characters long');
        isValid = false;
    }

    
    if (password.value !== confirmPassword.value) {
        showError(confirmPassword, 'Passwords do not match');
        isValid = false;
    }

    if (isValid) {
        
        setTimeout(() => {
            showAlert('Account created successfully!', 'success');
            signupForm.reset();
            
            signupSection.classList.remove('active');
            loginSection.classList.add('active');
        }, 1000);
    }
});


document.querySelectorAll('input').forEach(input => {
    input.addEventListener('blur', () => {
        if (input.id === 'login-email' || input.id === 'signup-email') {
            if (!validateEmail(input.value) && input.value.trim() !== '') {
                showError(input, 'Please enter a valid email address');
            } else {
                clearError(input);
            }
        }

        if (input.id === 'signup-password') {
            if (!validatePassword(input.value) && input.value.trim() !== '') {
                showError(input, 'Password must be at least 6 characters long');
            } else {
                clearError(input);
            }
        }

        if (input.id === 'confirm-password') {
            const password = document.getElementById('signup-password');
            if (input.value !== password.value && input.value.trim() !== '') {
                showError(input, 'Passwords do not match');
            } else {
                clearError(input);
            }
        }
    });
});


document.querySelectorAll('input').forEach(input => {
    input.addEventListener('focus', () => {
        clearError(input);
    });
});
