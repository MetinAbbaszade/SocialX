
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


let darkMode = localStorage.getItem('darkMode') === 'true';
let votes = parseInt(voteCount.textContent) || 0;
let userVote = localStorage.getItem('userVote') || 'none';
let commentCount = document.querySelectorAll('.comment').length;


function initPage() {
    
    setTheme(darkMode);
    themeSwitch.checked = darkMode;
    
    
    updateVoteButtons();
    
    
    updateCommentCount();
}


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


commentInput.addEventListener('input', () => {
    const length = commentInput.value.length;
    charCount.textContent = length;
    
    
    if (length > 450) {
        charCount.style.color = '#ff9800';
    } else if (length > 490) {
        charCount.style.color = '#f44336';
    } else {
        charCount.style.color = '';
    }
});


commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const commentText = commentInput.value.trim();
    if (commentText.length === 0) return;
    
    addComment(commentText);
    commentInput.value = '';
    charCount.textContent = '0';
});

function addComment(text) {
    
    const comment = document.createElement('div');
    comment.classList.add('comment');
    
    
    const now = new Date();
    const timeString = 'just now';
    const username = 'You'; 
    
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
    
    
    commentsContainer.prepend(comment);
    
    
    commentCount++;
    updateCommentCount();
    
    
    comment.scrollIntoView({ behavior: 'smooth' });
}


function updateCommentCount() {
    commentCountSpan.textContent = `(${commentCount})`;
}


upvoteBtn.addEventListener('click', () => {
    if (userVote === 'up') {
        
        userVote = 'none';
        votes--;
    } else if (userVote === 'down') {
        
        userVote = 'up';
        votes += 2;
    } else {
        
        userVote = 'up';
        votes++;
    }
    
    updateVotes();
});

downvoteBtn.addEventListener('click', () => {
    if (userVote === 'down') {
        
        userVote = 'none';
        votes++;
    } else if (userVote === 'up') {
        
        userVote = 'down';
        votes -= 2;
    } else {
        
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
    
    upvoteBtn.classList.remove('active');
    downvoteBtn.classList.remove('active');
    
    
    if (userVote === 'up') {
        upvoteBtn.classList.add('active');
    } else if (userVote === 'down') {
        downvoteBtn.classList.add('active');
    }
}


copyLinkBtn.addEventListener('click', () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        showNotification('Link copied to clipboard!');
    });
});


document.querySelector('.share-twitter').addEventListener('click', () => {
    const url = window.location.href;
    const title = document.querySelector('.post-title').textContent;
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
});

document.querySelector('.share-facebook').addEventListener('click', () => {
    const url = window.location.href;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
});


function showNotification(message) {
    const notificationText = notification.querySelector('p');
    notificationText.textContent = message;
    
    notification.classList.add('active');
    
    setTimeout(() => {
        notification.classList.remove('active');
    }, 3000);
}


document.addEventListener('click', (e) => {
    if (e.target.classList.contains('reply-btn') || e.target.parentElement.classList.contains('reply-btn')) {
        
        
        commentInput.focus();
    }
});


initPage();
