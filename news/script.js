// DOM Elements
const themeSwitch = document.getElementById('theme-switch');
const body = document.body;
const commentForm = document.getElementById('comment-form');
const commentInput = document.getElementById('comment-input');
const charCount = document.getElementById('char-count');
const commentsContainer = document.querySelector('.comments-container');
const commentCountSpan = document.querySelector('.comment-count');
const upvoteBtn = document.querySelector('.upvote');
const downvoteBtn = document.querySelector('.downvote');
const voteCount = document.querySelector('.vote-count');
const copyLinkBtn = document.querySelector('.copy-link');
const notification = document.getElementById('notification');

// Initialize state
let darkMode = localStorage.getItem('darkMode') === 'true';
let votes = parseInt(voteCount.textContent) || 0;
let userVote = localStorage.getItem('userVote') || 'none';
let commentCount = document.querySelectorAll('.comment').length;

// Initialize the page
function initPage() {
    // Set the theme
    setTheme(darkMode);
    themeSwitch.checked = darkMode;
    
    // Update vote buttons based on stored preference
    updateVoteButtons();
    
    // Update comment count
    updateCommentCount();
}

// Theme toggle functionality
themeSwitch.addEventListener('change', () => {
    darkMode = themeSwitch.checked;
    setTheme(darkMode);
    localStorage.setItem('darkMode', darkMode);
});

function setTheme(isDark) {
    if (isDark) {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
    }
}

// Comment character counter
commentInput.addEventListener('input', () => {
    const length = commentInput.value.length;
    charCount.textContent = length;
    
    // Visual feedback for character limit
    if (length > 450) {
        charCount.style.color = '#ff9800';
    } else if (length > 490) {
        charCount.style.color = '#f44336';
    } else {
        charCount.style.color = '';
    }
});

// Comment submission
commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const commentText = commentInput.value.trim();
    if (commentText.length === 0) return;
    
    addComment(commentText);
    commentInput.value = '';
    charCount.textContent = '0';
});

function addComment(text) {
    // Create new comment element
    const comment = document.createElement('div');
    comment.classList.add('comment');
    
    // Create username and timestamp (using some placeholder values)
    const now = new Date();
    const timeString = 'just now';
    const username = 'You'; // In a real app, this would be the logged-in user
    
    comment.innerHTML = `
        <div class="comment-header">
            <span class="username">${username}</span>
            <span class="timestamp">${timeString}</span>
        </div>
        <div class="comment-body">
            <p>${text}</p>
        </div>
        <div class="comment-actions">
            <button class="reply-btn"><i class="fas fa-reply"></i> Reply</button>
        </div>
    `;
    
    // Add to DOM
    commentsContainer.prepend(comment);
    
    // Update comment count
    commentCount++;
    updateCommentCount();
    
    // Smooth scroll and add animation
    comment.scrollIntoView({ behavior: 'smooth' });
}

// Update comment counter
function updateCommentCount() {
    commentCountSpan.textContent = `(${commentCount})`;
}

// Voting functionality
upvoteBtn.addEventListener('click', () => {
    if (userVote === 'up') {
        // Remove upvote
        userVote = 'none';
        votes--;
    } else if (userVote === 'down') {
        // Change downvote to upvote
        userVote = 'up';
        votes += 2;
    } else {
        // Add upvote
        userVote = 'up';
        votes++;
    }
    
    updateVotes();
});

downvoteBtn.addEventListener('click', () => {
    if (userVote === 'down') {
        // Remove downvote
        userVote = 'none';
        votes++;
    } else if (userVote === 'up') {
        // Change upvote to downvote
        userVote = 'down';
        votes -= 2;
    } else {
        // Add downvote
        userVote = 'down';
        votes--;
    }
    
    updateVotes();
});

function updateVotes() {
    voteCount.textContent = votes;
    localStorage.setItem('userVote', userVote);
    updateVoteButtons();
}

function updateVoteButtons() {
    // Reset classes
    upvoteBtn.classList.remove('active');
    downvoteBtn.classList.remove('active');
    
    // Add active class based on user's vote
    if (userVote === 'up') {
        upvoteBtn.classList.add('active');
    } else if (userVote === 'down') {
        downvoteBtn.classList.add('active');
    }
}

// Copy link functionality
copyLinkBtn.addEventListener('click', () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        showNotification('Link copied to clipboard!');
    });
});

// Share buttons functionality
document.querySelector('.share-twitter').addEventListener('click', () => {
    const url = window.location.href;
    const title = document.querySelector('.post-title').textContent;
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
});

document.querySelector('.share-facebook').addEventListener('click', () => {
    const url = window.location.href;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
});

// Notification functionality
function showNotification(message) {
    const notificationText = notification.querySelector('p');
    notificationText.textContent = message;
    
    notification.classList.add('active');
    
    setTimeout(() => {
        notification.classList.remove('active');
    }, 3000);
}

// Reply button functionality (just a stub for now)
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('reply-btn') || e.target.parentElement.classList.contains('reply-btn')) {
        // In a real app, this would open a reply form
        // For now, let's focus on the comment input
        commentInput.focus();
    }
});

// Initialize the page
initPage();
