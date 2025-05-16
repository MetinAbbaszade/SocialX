document.addEventListener('DOMContentLoaded', function() {
    
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            
            this.classList.add('active');
            
            
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    
    const themeSwitch = document.querySelector('.theme-switch');
    const moonIcon = document.querySelector('.fa-moon');
    const sunIcon = document.querySelector('.fa-sun');
    
    themeSwitch.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        document.body.classList.toggle('light-mode');
        
        
        moonIcon.classList.toggle('active');
        sunIcon.classList.toggle('active');
        
        
        const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', currentTheme);
    });
    
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
            moonIcon.classList.add('active');
            sunIcon.classList.remove('active');
        } else {
            document.body.classList.add('light-mode');
            document.body.classList.remove('dark-mode');
            sunIcon.classList.add('active');
            moonIcon.classList.remove('active');
        }
    }

    
    const profileActionButton = document.querySelector('.profile-action-button');
    profileActionButton.addEventListener('click', function() {
        if (this.textContent === 'Follow') {
            this.textContent = 'Following';
            this.style.backgroundColor = '#4CAF50'; 
        } else if (this.textContent === 'Following') {
            this.textContent = 'Follow';
            this.style.backgroundColor = ''; 
        }
    });

    
    const postCards = document.querySelectorAll('.post-card');
    postCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderColor = 'var(--primary-color)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.borderColor = '';
        });
    });

    
    const unfollowButtons = document.querySelectorAll('.unfollow-button');
    unfollowButtons.forEach(button => {
        button.addEventListener('click', function() {
            
            const followCard = this.closest('.follow-card');
            
            
            followCard.style.opacity = '0';
            followCard.style.transform = 'translateX(30px)';
            
            
            setTimeout(() => {
                followCard.remove();
            }, 300);
        });
    });

    
    const replyButtons = document.querySelectorAll('.reply-button');
    replyButtons.forEach(button => {
        button.addEventListener('click', function() {
            
            const commentCard = this.closest('.comment-card');
            
            
            const existingForm = commentCard.querySelector('.reply-form');
            if (existingForm) {
                existingForm.remove();
                return;
            }
            
            
            const replyForm = document.createElement('div');
            replyForm.className = 'reply-form';
            replyForm.innerHTML = `
                <textarea placeholder="Write your reply..."></textarea>
                <button class="submit-reply">Submit</button>
            `;
            
            
            const textarea = replyForm.querySelector('textarea');
            const submitButton = replyForm.querySelector('.submit-reply');
            
            textarea.style.width = '100%';
            textarea.style.padding = '0.75rem';
            textarea.style.borderRadius = '8px';
            textarea.style.border = '1px solid var(--text-secondary)';
            textarea.style.background = 'var(--bg-primary)';
            textarea.style.color = 'var(--text-primary)';
            textarea.style.marginTop = '0.75rem';
            textarea.style.resize = 'vertical';
            textarea.style.minHeight = '80px';
            textarea.style.fontFamily = 'inherit';
            
            submitButton.style.background = 'var(--primary-color)';
            submitButton.style.color = 'white';
            submitButton.style.border = 'none';
            submitButton.style.padding = '0.5rem 1rem';
            submitButton.style.borderRadius = '8px';
            submitButton.style.marginTop = '0.5rem';
            submitButton.style.cursor = 'pointer';
            submitButton.style.fontWeight = '600';
            
            
            commentCard.appendChild(replyForm);
            
            
            textarea.focus();
            
            
            submitButton.addEventListener('click', function() {
                if (textarea.value.trim() !== '') {
                    alert('Reply submitted! (In a real app, this would save to a database)');
                    replyForm.remove();
                }
            });
        });
    });
});
