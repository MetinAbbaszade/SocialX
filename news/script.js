
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

const posts = [
    {
        id: 1,
        title: "The Future of Quantum Computing",
        category: "it-news",
        categoryName: "IT News",
        timeAgo: "3 hours ago",
        snippet: "Recent breakthroughs in quantum computing suggest we're closer than ever to practical applications...",
        comments: 42,
        upvotes: 156,
        image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 2,
        title: "City Council Approves New Park Development",
        category: "local-news",
        categoryName: "Local News",
        timeAgo: "5 hours ago",
        snippet: "The city council has approved a $2.5 million budget for a new community park in downtown...",
        comments: 18,
        upvotes: 87,
        image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 3,
        title: "When the Code Doesn't Work",
        category: "memes",
        categoryName: "Memes",
        timeAgo: "2 hours ago",
        snippet: "Every developer knows that feeling when your code suddenly works without knowing why...",
        comments: 103,
        upvotes: 420,
        image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 4,
        title: "How to Optimize Database Queries?",
        category: "qa",
        categoryName: "Q&A",
        timeAgo: "1 hours ago",
        snippet: "What are the best practices for optimizing database queries in a large-scale application?",
        comments: 34,
        upvotes: 67,
        image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 5,
        title: "NASA Discovers New Exoplanet",
        category: "science",
        categoryName: "Science",
        snippet: "NASA's James Webb telescope has discovered a potentially habitable exoplanet in a nearby star system...",
        timeAgo: "10 hours ago",
        comments: 56,
        upvotes: 213,
        image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 6,
        title: "New JavaScript Framework Released",
        category: "it-news",
        categoryName: "IT News",
        snippet: "A new lightweight JavaScript framework promises to be faster and more efficient than existing options...",
        comments: 29,
        upvotes: 98,
        timeAgo: "13 hours ago",
        image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 7,
        title: "Local Business Owner Wins Entrepreneur Award",
        category: "local-news",
        categoryName: "Local News",
        snippet: "Jane Smith, owner of Smith's Bakery, has been recognized with this year's community entrepreneur award...",
        timeAgo: "13 hours ago",
        comments: 12,
        upvotes: 45,
        image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 8,
        title: "Explaining Code to Non-Technical People",
        category: "memes",
        categoryName: "Memes",
        timeAgo: "12 hours ago",
        snippet: "When you try to explain your code to someone who doesn't understand programming...",
        comments: 87,
        upvotes: 342,
        image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    initPage();
})

const fetchData = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const data = posts.filter((post) => post.id == productId)
    return data[0]
}

const initData = () => {
    const data = fetchData()
    const dataWrapper = document.querySelector('.post')
    dataWrapper.innerHTML = `
    <div class="post-header">
                <h1 class="post-title">${data.title}</h1>
                <a href="#" class="external-link">
                    <i class="fas fa-external-link-alt"></i> Original Article
                </a>
                <div class="post-meta">Posted by <span class="username">EnergyExpert</span> • <span class="timestamp">${data.timeAgo}</span></div>
            </div>

            <div class="post-content">
                <p>${data.snippet}</p>
                
                <img src="${data.image}" alt="Renewable Energy" class="featured-image">
                
                <p>Solar panel efficiency has improved dramatically in the past decade, with new materials allowing for better energy capture even in low-light conditions. Meanwhile, wind turbine designs have evolved to capture energy from even gentle breezes, expanding their viability in more geographic regions.</p>
                
                <p>Battery storage technology, crucial for managing the intermittent nature of renewable sources, has seen breakthroughs in capacity and longevity. This development is particularly important for the widespread adoption of electric vehicles and grid-scale energy storage.</p>
                
                <p>What renewable energy innovations are you most excited about? Join the discussion below!</p>
            </div>

            <div class="reactions">
                <div class="votes">
                    <button class="vote-btn upvote"><i class="fas fa-arrow-up"></i></button>
                    <span class="vote-count">${data.upvotes}</span>
                    <button class="vote-btn downvote"><i class="fas fa-arrow-down"></i></button>
                </div>
                <div class="share-btns">
                    <button class="share-btn copy-link"><i class="fas fa-link"></i> Copy Link</button>
                    <button class="share-btn share-twitter"><i class="fab fa-twitter"></i> Twitter</button>
                    <button class="share-btn share-facebook"><i class="fab fa-facebook"></i> Facebook</button>
                </div>
            </div>`
}


let darkMode = localStorage.getItem('darkMode') === 'true';
let votes = parseInt(voteCount.textContent) || 0;
let userVote = localStorage.getItem('userVote') || 'none';
let commentCount = document.querySelectorAll('.comment').length;


function initPage() {

    setTheme(darkMode);
    themeSwitch.checked = darkMode;


    updateVoteButtons();


    updateCommentCount();
    initData()
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



