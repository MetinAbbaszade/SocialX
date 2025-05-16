document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const body = document.body;
    
    themeToggleBtn.addEventListener('click', function() {
        if (body.classList.contains('light-mode')) {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Apply saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
    }
    
    // Form validation and submission
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');
    
    const modal = document.getElementById('confirmation-modal');
    const closeModal = document.querySelector('.close-modal');
    
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    function validateForm() {
        let isValid = true;
        
        // Reset error messages
        nameError.textContent = '';
        emailError.textContent = '';
        messageError.textContent = '';
        
        // Validate name
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Name is required';
            isValid = false;
        }
        
        // Validate email
        if (emailInput.value.trim() === '') {
            emailError.textContent = 'Email is required';
            isValid = false;
        } else if (!validateEmail(emailInput.value.trim())) {
            emailError.textContent = 'Please enter a valid email address';
            isValid = false;
        }
        
        // Validate message
        if (messageInput.value.trim() === '') {
            messageError.textContent = 'Message is required';
            isValid = false;
        }
        
        return isValid;
    }
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Simulate form submission
            setTimeout(() => {
                modal.style.display = 'flex';
                
                // Reset form
                contactForm.reset();
            }, 800);
        }
    });
    
    // Close modal
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Real-time validation
    nameInput.addEventListener('blur', function() {
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Name is required';
        } else {
            nameError.textContent = '';
        }
    });
    
    emailInput.addEventListener('blur', function() {
        if (emailInput.value.trim() === '') {
            emailError.textContent = 'Email is required';
        } else if (!validateEmail(emailInput.value.trim())) {
            emailError.textContent = 'Please enter a valid email address';
        } else {
            emailError.textContent = '';
        }
    });
    
    messageInput.addEventListener('blur', function() {
        if (messageInput.value.trim() === '') {
            messageError.textContent = 'Message is required';
        } else {
            messageError.textContent = '';
        }
    });
});
