document.addEventListener('DOMContentLoaded', function () {
    // Sample data - in a real app, this would come from a backend
    const posts = [
        {
            id: 1,
            title: "The Future of Quantum Computing",
            category: "it-news",
            categoryName: "IT News",
            snippet: "Recent breakthroughs in quantum computing suggest we're closer than ever to practical applications...",
            comments: 42,
            upvotes: 156,
            image: "https://source.unsplash.com/random/300x200/?quantum"
        },
        {
            id: 2,
            title: "City Council Approves New Park Development",
            category: "local-news",
            categoryName: "Local News",
            snippet: "The city council has approved a $2.5 million budget for a new community park in downtown...",
            comments: 18,
            upvotes: 87,
            image: "https://source.unsplash.com/random/300x200/?park"
        },
        {
            id: 3,
            title: "When the Code Doesn't Work",
            category: "memes",
            categoryName: "Memes",
            snippet: "Every developer knows that feeling when your code suddenly works without knowing why...",
            comments: 103,
            upvotes: 420,
            image: "https://source.unsplash.com/random/300x200/?code"
        },
        {
            id: 4,
            title: "How to Optimize Database Queries?",
            category: "qa",
            categoryName: "Q&A",
            snippet: "What are the best practices for optimizing database queries in a large-scale application?",
            comments: 34,
            upvotes: 67,
            image: "https://source.unsplash.com/random/300x200/?database"
        },
        {
            id: 5,
            title: "NASA Discovers New Exoplanet",
            category: "science",
            categoryName: "Science",
            snippet: "NASA's James Webb telescope has discovered a potentially habitable exoplanet in a nearby star system...",
            comments: 56,
            upvotes: 213,
            image: "https://source.unsplash.com/random/300x200/?planet"
        },
        {
            id: 6,
            title: "New JavaScript Framework Released",
            category: "it-news",
            categoryName: "IT News",
            snippet: "A new lightweight JavaScript framework promises to be faster and more efficient than existing options...",
            comments: 29,
            upvotes: 98,
            image: "https://source.unsplash.com/random/300x200/?javascript"
        },
        {
            id: 7,
            title: "Local Business Owner Wins Entrepreneur Award",
            category: "local-news",
            categoryName: "Local News",
            snippet: "Jane Smith, owner of Smith's Bakery, has been recognized with this year's community entrepreneur award...",
            comments: 12,
            upvotes: 45,
            image: "https://source.unsplash.com/random/300x200/?bakery"
        },
        {
            id: 8,
            title: "Explaining Code to Non-Technical People",
            category: "memes",
            categoryName: "Memes",
            snippet: "When you try to explain your code to someone who doesn't understand programming...",
            comments: 87,
            upvotes: 342,
            image: "https://source.unsplash.com/random/300x200/?explain"
        }
    ];

    // DOM elements
    const postsContainer = document.getElementById('posts-container');
    const categoryItems = document.querySelectorAll('.category-item');
    const categoryTitle = document.getElementById('category-title');
    const themeToggleBtn = document.getElementById('theme-toggle-btn');

    // Theme toggle functionality
    themeToggleBtn.addEventListener('click', toggleTheme);

    function toggleTheme() {
        document.body.classList.toggle('dark-mode');

        if (document.body.classList.contains('dark-mode')) {
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        }
    }

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // Filter posts by category
    categoryItems.forEach(item => {
        item.addEventListener('click', function () {
            // Update active category
            categoryItems.forEach(cat => cat.classList.remove('active'));
            this.classList.add('active');

            const selectedCategory = this.getAttribute('data-category');
            updateCategoryTitle(selectedCategory);

            // Apply animation to container
            postsContainer.style.opacity = '0';

            setTimeout(() => {
                // Filter and display posts
                displayPosts(selectedCategory);
                postsContainer.style.opacity = '1';
            }, 300);
        });
    });

    // Update category title text
    function updateCategoryTitle(category) {
        if (category === 'all') {
            categoryTitle.textContent = 'All Topics';
        } else {
            const categoryObject = categoryItems[Array.from(categoryItems).findIndex(item => item.getAttribute('data-category') === category)];
            categoryTitle.textContent = categoryObject.textContent;
        }
    }

    // Display posts based on selected category
    function displayPosts(category) {
        let filteredPosts;

        if (category === 'all') {
            filteredPosts = posts;
        } else {
            filteredPosts = posts.filter(post => post.category === category);
        }

        // Generate HTML for posts
        if (filteredPosts.length > 0) {
            let postsHTML = '';

            filteredPosts.forEach(post => {
                postsHTML += `
                <article class="post-card">
                    <img src="${post.image}" alt="${post.title}" class="post-image">
                    <div class="post-content">
                        <div class="post-category">${post.categoryName}</div>
                        <h3 class="post-title">${post.title}</h3>
                        <p class="post-snippet">${post.snippet}</p>
                        <div class="post-meta">
                            <span><i class="fas fa-comment"></i> ${post.comments} comments</span>
                            <span><i class="fas fa-arrow-up"></i> ${post.upvotes} upvotes</span>
                        </div>
                    </div>
                </article>`;
            });

            postsContainer.innerHTML = postsHTML;
        } else {
            postsContainer.innerHTML = '<div class="loading">No posts found in this category.</div>';
        }
    }

    // Initialize with all posts
    displayPosts('all');
});
