document.addEventListener('DOMContentLoaded', function() {
    
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    
    
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
    
    
    const titleError = document.getElementById('title-error');
    const linkError = document.getElementById('link-error');
    const categoryError = document.getElementById('category-error');
    
    
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
    
    
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
    
    
    removeImageBtn.addEventListener('click', function() {
        imageUpload.value = '';
        imagePreviewContainer.style.display = 'none';
        imagePreview.src = '#';
    });
    
    
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
            
            linkError.textContent = '';
            return true;
        }
        
        
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
    
    
    titleInput.addEventListener('blur', validateTitle);
    linkInput.addEventListener('blur', validateLink);
    categorySelect.addEventListener('change', validateCategory);
    
    
    postForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const isTitleValid = validateTitle();
        const isLinkValid = validateLink();
        const isCategoryValid = validateCategory();
        
        if (isTitleValid && isLinkValid && isCategoryValid) {
            
            successMessage.classList.add('active');
            
            
            console.log({
                title: titleInput.value,
                link: linkInput.value,
                body: document.getElementById('post-body').value,
                category: categorySelect.value,
                hasImage: imageUpload.files.length > 0
            });
        }
    });
    
    
    closeSuccessBtn.addEventListener('click', function() {
        successMessage.classList.remove('active');
        
        postForm.reset();
        imagePreviewContainer.style.display = 'none';
    });
});
