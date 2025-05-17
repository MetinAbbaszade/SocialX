
const themeToggle = document.getElementById('theme-toggle');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const body = document.body;
const postList = document.getElementById('post-list');


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


themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');


    const isDarkTheme = body.classList.contains('dark-theme');
    localStorage.setItem('dark-theme', isDarkTheme);
});


if (localStorage.getItem('dark-theme') === 'true') {
    body.classList.add('dark-theme');
}


mobileMenuBtn.addEventListener('click', () => {
    toggleMobileMenu();
});

function toggleMobileMenu() {

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


    mobileMenu.classList.toggle('active');
    body.classList.toggle('mobile-menu-active');


    const spans = mobileMenuBtn.querySelectorAll('span');
    spans.forEach(span => span.classList.toggle('active'));
}


function renderPosts() {

    postList.innerHTML = '';


    posts.forEach(post => {
        const postElement = document.createElement('article');
        postElement.className = 'post';
        postElement.onclick = () => window.location.href = `../news/index.html?id=${post.id}`
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


const categoryButtons = document.querySelectorAll('.category-btn');
categoryButtons.forEach(button => {
    button.addEventListener('click', () => {

        categoryButtons.forEach(btn => btn.classList.remove('active'));


        button.classList.add('active');



        const category = button.textContent;
        console.log(`Filtering by category: ${category}`);



        renderPosts();
    });
});


document.addEventListener('click', (e) => {

    if (e.target.closest('.post-stats span')) {
        const action = e.target.closest('.post-stats span');


        action.style.transform = 'scale(1.2)';
        setTimeout(() => {
            action.style.transform = 'scale(1)';
        }, 200);


        console.log('Action clicked:', action.textContent.trim());
    }
});


document.addEventListener('DOMContentLoaded', () => {
    renderPosts();


    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});


let lastScrollPosition = 0;
window.addEventListener('scroll', () => {
    const currentScrollPosition = window.pageYOffset;


    if (currentScrollPosition > 10) {
        document.querySelector('.header').style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        document.querySelector('.header').style.boxShadow = '0 2px 10px var(--shadow-color)';
    }


    if (currentScrollPosition > lastScrollPosition && currentScrollPosition > 300) {

        document.querySelector('.header').style.transform = 'translateY(-100%)';
    } else {

        document.querySelector('.header').style.transform = 'translateY(0)';
    }

    lastScrollPosition = currentScrollPosition;
});
