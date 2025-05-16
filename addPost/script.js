document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme from local storage or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    
    // Elements
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const postForm = document.getElementById('post-form');
    const titleInput = document.getElementById('post-title');
    const linkInput = document.getElementById('external-link');
    const categorySelect = document.getElementById('category');
    const imageUpload = document.getElementById('image-upload');
    const imagePreviewContainer = document.getElementById('image-preview-container');
    const imagePreview = document.getElementById('image-preview');
    const removeImageBtn = document.getElementById('remove-image');
    const successMessage = document.getElementById('success-message');
    const closeSuccessBtn = document.getElementById('close-success');
    
    // Error message elements
    const titleError = document.getElementById('title-error');
    const linkError = document.getElementById('link-error');
    const categoryError = document.getElementById('category-error');
    
    // Theme toggle functionality
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
    
    // Image upload and preview
    imageUpload.addEventListener('change', function() {
        const file = this.files[0];
        
        if (file) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                imagePreview.src = e.target.result;
                imagePreviewContainer.style.display = 'block';
            }
            
            reader.readAsDataURL(file);
        }
    });
    
    // Remove image functionality
    removeImageBtn.addEventListener('click', function() {
        imageUpload.value = '';
        imagePreviewContainer.style.display = 'none';
        imagePreview.src = '#';
    });
    
    // Form validation functions
    function validateTitle() {
        if (!titleInput.value.trim()) {
            titleError.textContent = 'Title is required';
            return false;
        }
        titleError.textContent = '';
        return true;
    }
    
    function validateLink() {
        const linkValue = linkInput.value.trim();
        
        if (linkValue === '') {
            // Link is optional, so empty is fine
            linkError.textContent = '';
            return true;
        }
        
        // Simple URL validation
        try {
            new URL(linkValue);
            linkError.textContent = '';
            return true;
        } catch (error) {
            linkError.textContent = 'Please enter a valid URL';
            return false;
        }
    }
    
    function validateCategory() {
        if (!categorySelect.value) {
            categoryError.textContent = 'Please select a category';
            return false;
        }
        categoryError.textContent = '';
        return true;
    }
    
    // Input validation listeners
    titleInput.addEventListener('blur', validateTitle);
    linkInput.addEventListener('blur', validateLink);
    categorySelect.addEventListener('change', validateCategory);
    
    // Form submission
    postForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const isTitleValid = validateTitle();
        const isLinkValid = validateLink();
        const isCategoryValid = validateCategory();
        
        if (isTitleValid && isLinkValid && isCategoryValid) {
            // Show success message (in a real app, you would submit to backend)
            successMessage.classList.add('active');
            
            // For demo purposes, just log the form data
            console.log({
                title: titleInput.value,
                link: linkInput.value,
                body: document.getElementById('post-body').value,
                category: categorySelect.value,
                hasImage: imageUpload.files.length > 0
            });
        }
    });
    
    // Close success message
    closeSuccessBtn.addEventListener('click', function() {
        successMessage.classList.remove('active');
        // Reset form
        postForm.reset();
        imagePreviewContainer.style.display = 'none';
    });
});
