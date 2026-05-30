import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Blog.css";

const CATEGORIES = ["All", "Travel Tips", "Destination Guide", "Adventure", "Food & Culture", "Stay Reviews"];

const POSTS = [
  {
    id: 1, category: "Destination Guide", featured: true,
    title: "The Ultimate Guide to Jibhi: Hidden Himalayas",
    excerpt: "Discover the untouched beauty of Jibhi — a tiny village in Himachal Pradesh that has become India's best-kept secret for mountain lovers.",
    author: "Priya Sharma", authorImg: "https://i.pravatar.cc/48?img=5",
    date: "May 20, 2026", readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&h=500&fit=crop",
    tags: ["Jibhi", "Mountains", "Himachal"],
  },
  {
    id: 2, category: "Travel Tips",
    title: "10 Things to Know Before Visiting Tirthan Valley",
    excerpt: "From the best time to visit to local customs and hidden waterfalls — everything you need to know for the perfect Tirthan Valley trip.",
    author: "Rajan Mehta", authorImg: "https://i.pravatar.cc/48?img=12",
    date: "May 14, 2026", readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=700&h=450&fit=crop",
    tags: ["Tirthan", "Travel Tips"],
  },
  {
    id: 3, category: "Adventure",
    title: "Trekking the Great Himalayan National Park: A Complete Guide",
    excerpt: "One of India's UNESCO World Heritage sites sits right next to Jibhi. Here's how to trek through its pristine forests and high-altitude meadows.",
    author: "Ananya Singh", authorImg: "https://i.pravatar.cc/48?img=9",
    date: "May 8, 2026", readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=700&h=450&fit=crop",
    tags: ["Trekking", "GHNP", "Adventure"],
  },
  {
    id: 4, category: "Food & Culture",
    title: "Himachali Cuisine: Dishes You Must Try in the Mountains",
    excerpt: "Siddu, Chha Gosht, Aktori — the mountain cuisine of Himachal Pradesh is as rich as its landscapes. A foodie's guide to eating local.",
    author: "Priya Sharma", authorImg: "https://i.pravatar.cc/48?img=5",
    date: "April 30, 2026", readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=700&h=450&fit=crop",
    tags: ["Food", "Culture", "Himachal"],
  },
  {
    id: 5, category: "Stay Reviews",
    title: "We Stayed at 5 Jibhi Properties — Here's the Honest Truth",
    excerpt: "Our team spent two weeks testing the best stays in Jibhi valley. Which ones lived up to the hype, and which ones surprised us completely?",
    author: "Vikram Nair", authorImg: "https://i.pravatar.cc/48?img=15",
    date: "April 22, 2026", readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=700&h=450&fit=crop",
    tags: ["Review", "Properties", "Jibhi"],
  },
  {
    id: 6, category: "Destination Guide",
    title: "Kasauli vs Shimla: Which Hill Station Is Right for You?",
    excerpt: "Two of Himachal's most beloved hill stations — but they offer very different experiences. We break down everything to help you choose.",
    author: "Rajan Mehta", authorImg: "https://i.pravatar.cc/48?img=12",
    date: "April 15, 2026", readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=700&h=450&fit=crop",
    tags: ["Kasauli", "Shimla", "Guide"],
  },
  {
    id: 7, category: "Adventure",
    title: "River Crossing & Camping in Banjar Valley: A Weekend Escape",
    excerpt: "Banjar offers some of the best weekend adventure spots for city folks looking to disconnect. Here's a perfect 2-day itinerary.",
    author: "Ananya Singh", authorImg: "https://i.pravatar.cc/48?img=9",
    date: "April 10, 2026", readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1537564166069-399b6f8abcfa?w=700&h=450&fit=crop",
    tags: ["Banjar", "Camping", "Weekend"],
  },
  {
    id: 8, category: "Travel Tips",
    title: "How to Travel Himachal Pradesh on a Budget in 2026",
    excerpt: "From cheap dhabas to shared taxis, here's how locals and savvy travelers experience the Himalayas without breaking the bank.",
    author: "Vikram Nair", authorImg: "https://i.pravatar.cc/48?img=15",
    date: "April 4, 2026", readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=700&h=450&fit=crop",
    tags: ["Budget", "Tips", "Himachal"],
  },
];

export default function Blog() {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");

  const featured = POSTS.find(p => p.featured);
  const filtered = POSTS.filter(p => !p.featured).filter(p =>
    (activeTab === "All" || p.category === activeTab) &&
    (p.title.toLowerCase().includes(search.toLowerCase()) ||
     p.excerpt.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="blog-page">
      {/* Hero */}
      <section className="blog-hero">
        <div className="blog-hero__inner">
          <span className="blog-hero__tag">Our Journal</span>
          <h1 className="blog-hero__title">Stories from the Mountains</h1>
          <p className="blog-hero__sub">Travel guides, hidden gems, and insider tips from the Himalayas</p>
          <nav className="blog-hero__breadcrumb">
            <NavLink to="/">Home</NavLink>
            <span>›</span>
            <span>Blog</span>
          </nav>
        </div>
      </section>

      {/* Featured post */}
      {featured && (
        <section className="blog-featured">
          <div className="blog-featured__inner">
            <div className="blog-featured__card">
              <div className="blog-featured__img-wrap">
                <img src={featured.image} alt={featured.title} loading="lazy" />
                <span className="blog-featured__badge">Featured</span>
              </div>
              <div className="blog-featured__content">
                <span className="blog-cat-tag">{featured.category}</span>
                <h2 className="blog-featured__title">{featured.title}</h2>
                <p className="blog-featured__excerpt">{featured.excerpt}</p>
                <div className="blog-meta">
                  <img src={featured.authorImg} alt={featured.author} className="blog-meta__avatar" />
                  <span className="blog-meta__author">{featured.author}</span>
                  <span className="blog-meta__dot">·</span>
                  <span className="blog-meta__date">{featured.date}</span>
                  <span className="blog-meta__dot">·</span>
                  <span className="blog-meta__read">{featured.readTime}</span>
                </div>
                <a href="#" className="blog-featured__btn">Read Article →</a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Filter & Search */}
      <div className="blog-controls">
        <div className="blog-controls__inner">
          <div className="blog-tabs">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={"blog-tab" + (activeTab === cat ? " blog-tab--active" : "")}
                onClick={() => setActiveTab(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="blog-search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7a8a86" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text" placeholder="Search articles…"
              value={search} onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="blog-grid-section">
        <div className="blog-grid-section__inner">
          {filtered.length === 0 ? (
            <div className="blog-empty">
              <span className="blog-empty__icon">📖</span>
              <h3>No articles found</h3>
              <p>Try a different category or search term.</p>
            </div>
          ) : (
            <div className="blog-grid">
              {filtered.map(post => (
                <a key={post.id} href="#" className="blog-card">
                  <div className="blog-card__img-wrap">
                    <img src={post.image} alt={post.title} loading="lazy" />
                    <span className="blog-card__cat">{post.category}</span>
                  </div>
                  <div className="blog-card__body">
                    <h3 className="blog-card__title">{post.title}</h3>
                    <p className="blog-card__excerpt">{post.excerpt}</p>
                    <div className="blog-meta">
                      <img src={post.authorImg} alt={post.author} className="blog-meta__avatar" />
                      <span className="blog-meta__author">{post.author}</span>
                      <span className="blog-meta__dot">·</span>
                      <span className="blog-meta__read">{post.readTime}</span>
                    </div>
                    <div className="blog-card__tags">
                      {post.tags.map(tag => (
                        <span key={tag} className="blog-card__tag">#{tag}</span>
                      ))}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter inline */}
      <section className="blog-newsletter">
        <div className="blog-newsletter__inner">
          <div className="blog-newsletter__text">
            <h3>Never Miss a Story</h3>
            <p>Get the latest travel guides and property stories delivered to your inbox</p>
          </div>
          <form className="blog-newsletter__form" onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
}