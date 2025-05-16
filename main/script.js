// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const body = document.body;
const postList = document.getElementById('post-list');

// Sample post data for demonstration
const posts = [
    {
        id: 1,
        title: "Understanding JavaScript Promises for Better Asynchronous Code",
        category: "Technology",
        timeAgo: "3 hours ago",
        summary: "Learn how to use Promises effectively to handle asynchronous operations and improve your JavaScript code quality.",
        image: "https://via.placeholder.com/600x400",
        upvotes: 850,
        comments: 125
    },
    {
        id: 2,
        title: "10 Essential Tips for Remote Work Productivity",
        category: "Lifestyle",
        timeAgo: "5 hours ago",
        summary: "Working from home can be challenging. Here are proven strategies to boost your productivity and maintain work-life balance.",
        image: "https://via.placeholder.com/600x400",
        upvotes: 632,
        comments: 87
    },
    {
        id: 3,
        title: "Climate Change: New Research Shows Accelerated Impact",
        category: "Science",
        timeAgo: "7 hours ago",
        summary: "Recent studies reveal the effects of climate change are happening faster than previously predicted. Here's what you need to know.",
        image: "https://via.placeholder.com/600x400",
        upvotes: 1205,
        comments: 342
    },
    {
        id: 4,
        title: "The Rise of Indie Game Development",
        category: "Entertainment",
        timeAgo: "9 hours ago",
        summary: "How independent game studios are creating innovative experiences and challenging the mainstream gaming industry.",
        image: "https://via.placeholder.com/600x400",
        upvotes: 480,
        comments: 64
    },
    {
        id: 5,
        title: "Global Markets React to New Economic Policies",
        category: "Politics",
        timeAgo: "12 hours ago",
        summary: "Markets worldwide show varied responses to the latest economic policy changes. Experts weigh in on potential long-term impacts.",
        image: "https://via.placeholder.com/600x400",
        upvotes: 325,
        comments: 92
    }
];

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');

    // Save theme preference to localStorage
    const isDarkTheme = body.classList.contains('dark-theme');
    localStorage.setItem('dark-theme', isDarkTheme);
});

// Check for saved theme preference
if (localStorage.getItem('dark-theme') === 'true') {
    body.classList.add('dark-theme');
}

// Mobile menu functionality
mobileMenuBtn.addEventListener('click', () => {
    toggleMobileMenu();
});

function toggleMobileMenu() {
    // Check if mobile menu exists, create if not
    let mobileMenu = document.querySelector('.mobile-menu');

    if (!mobileMenu) {
        mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu';
        mobileMenu.innerHTML = `
            <div class="mobile-menu-nav">
                <ul>
                    <li><a href="#" class="active">Home</a></li>
                    <li><a href="#">Popular</a></li>
                    <li><a href="#">Recent</a></li>
                    <li><a href="#">About</a></li>
                </ul>
            </div>
            <div class="mobile-menu-actions">
                <button class="btn btn-primary">Sign Up</button>
                <button class="btn btn-outline">Log In</button>
            </div>
        `;
        body.appendChild(mobileMenu);
    }

    // Toggle mobile menu visibility
    mobileMenu.classList.toggle('active');
    body.classList.toggle('mobile-menu-active');

    // Animate hamburger button
    const spans = mobileMenuBtn.querySelectorAll('span');
    spans.forEach(span => span.classList.toggle('active'));
}

// Function to render posts
function renderPosts() {
    // Clear existing posts
    postList.innerHTML = '';

    // Generate HTML for each post
    posts.forEach(post => {
        const postElement = document.createElement('article');
        postElement.className = 'post';

        postElement.innerHTML = `
            <div class="post-thumbnail">
                <img src="${post.image}" alt="${post.title}">
            </div>
            <div class="post-content">
                <div class="post-meta">
                    <span class="post-category">${post.category}</span>
                    <span class="post-time">${post.timeAgo}</span>
                </div>
                <h4 class="post-title">${post.title}</h4>
                <p class="post-summary">${post.summary}</p>
                <div class="post-stats">
                    <span><i class="fas fa-arrow-up"></i> ${post.upvotes}</span>
                    <span><i class="fas fa-comment"></i> ${post.comments}</span>
                    <span><i class="fas fa-share"></i> Share</span>
                </div>
            </div>
        `;

        postList.appendChild(postElement);
    });
}

// Category filter functionality
const categoryButtons = document.querySelectorAll('.category-btn');
categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        categoryButtons.forEach(btn => btn.classList.remove('active'));

        // Add active class to clicked button
        button.classList.add('active');

        // In a real application, this would filter posts by category
        // For this demo, we'll just simulate a reload
        const category = button.textContent;
        console.log(`Filtering by category: ${category}`);

        // You could implement actual filtering here
        // For now, just re-render all posts
        renderPosts();
    });
});

// Handle upvote/comment actions
document.addEventListener('click', (e) => {
    // Use event delegation to handle clicks on dynamically created elements
    if (e.target.closest('.post-stats span')) {
        const action = e.target.closest('.post-stats span');

        // Add a simple animation
        action.style.transform = 'scale(1.2)';
        setTimeout(() => {
            action.style.transform = 'scale(1)';
        }, 200);

        // In a real app, this would send data to the server
        console.log('Action clicked:', action.textContent.trim());
    }
});

// Initialize posts
document.addEventListener('DOMContentLoaded', () => {
    renderPosts();

    // Add smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// Handle scroll effects
let lastScrollPosition = 0;
window.addEventListener('scroll', () => {
    const currentScrollPosition = window.pageYOffset;

    // Add shadow to header on scroll
    if (currentScrollPosition > 10) {
        document.querySelector('.header').style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        document.querySelector('.header').style.boxShadow = '0 2px 10px var(--shadow-color)';
    }

    // Hide/show header on scroll down/up
    if (currentScrollPosition > lastScrollPosition && currentScrollPosition > 300) {
        // Scrolling down
        document.querySelector('.header').style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        document.querySelector('.header').style.transform = 'translateY(0)';
    }

    lastScrollPosition = currentScrollPosition;
});
