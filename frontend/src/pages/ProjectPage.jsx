import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import CheckoutPage from './CheckoutPage';
import '../style/ProjectPage.css'; // We will update this CSS file

// Placeholder Icons
const SearchIcon = () => <span className="pp-icon pp-icon-search">🔍</span>;
const FilterIcon = () => <span className="pp-icon pp-icon-filter">🔧</span>;
const SortIcon = () => <span className="pp-icon pp-icon-sort">⇅</span>;
const ExternalLinkIcon = () => <span className="pp-icon pp-icon-external-link">🔗</span>;
const DetailsIcon = () => <span className="pp-icon pp-icon-details">ℹ️</span>; // New Icon for internal details
const GridViewIcon = () => <svg className="pp-view-icon-svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h8v8H3V3zm0 10h8v8H3v-8zM13 3h8v8h-8V3zm0 10h8v8h-8v-8z"></path></svg>;
const ListViewIcon = () => <svg className="pp-view-icon-svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z"></path></svg>;
const CartIcon = () => <span className="pp-icon pp-icon-cart">🛒</span>;
const CloseIcon = () => <span className="pp-icon pp-icon-close">❌</span>;
const TrashIcon = () => <span className="pp-icon pp-icon-trash">🗑️</span>;


// --- Dummy Data (External Links as provided previously) ---
const allDummyProjects = [
  { id: 'p1', title: 'Artisan Goods Marketplace', category: 'eCommerce', description: 'Connects artisans with buyers globally.', price: 90000, techStack: ['React', 'Node.js', 'MongoDB'], image: './src/assets/image_files/img2.jpg', dateAdded: '2023-10-01', externalLink: 'https://www.etsy.com/' },
  { id: 'p2', title: 'AI Fitness & Wellness Coach', category: 'App', description: 'Personalized workout and nutrition plans using AI.', price: 70000, techStack: ['Python', 'TensorFlow', 'SwiftUI'], image: './src/assets/image_files/image6.jpg', dateAdded: '2023-11-15', externalLink: 'https://www.fitbod.me/' },
  { id: 'p3', title: 'Zenith Task Management SaaS', category: 'SaaS', description: 'Collaborative project and task tool for modern teams.', price: 45000, techStack: ['Vue.js', 'Firebase', 'TailwindCSS'], image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=400&q=75', dateAdded: '2023-09-20', externalLink: 'https://asana.com/' },
  { id: 'p4', title: 'Pixel Puzzler – Indie Game', category: 'Game', description: 'Playable demo of a new vibrant puzzle adventure game.', price: 20000, techStack: ['Unity', 'C#'], image: './src/assets/image_files/image8.jpg', dateAdded: '2023-12-01', externalLink: 'https://pixel-puzzler.playcurious.games/' },
  { id: 'p5', title: 'CryptoArt Minting Suite', category: 'Web3', description: 'User-friendly tool to create and manage NFT collections.', price: 110000, techStack: ['Solidity', 'Next.js', 'IPFS', 'Hardhat'], image: './src/assets/image_files/imag1.jpg', dateAdded: '2023-10-25', externalLink: 'https://opensea.io/' },
  { id: 'p6', title: 'Premium Domain: Innovate.ai', category: 'Domain', description: 'High-value, brandable .ai domain for tech startups.', price: 180000, techStack: ['N/A'], image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=400&q=75', dateAdded: '2023-08-10', externalLink: 'https://dan.com/buy-domain/innovate.ai' },
  { id: 'p7', title: 'HyperLocal Delivery App Kit', category: 'App', description: 'Complete solution to connect local stores with customers.', price: 60000, techStack: ['Flutter', 'Firebase', 'Google Maps API'], image: './src/assets/image_files/image10.jpg', dateAdded: '2023-11-05', externalLink: 'https://www.dunzo.com/' },
  { id: 'p8', title: 'The Hobbyist Box Subscription', category: 'eCommerce', description: 'Curated monthly boxes for various niche hobbies & crafts.', price: 30000, techStack: ['Shopify', 'Klaviyo', 'Recharge'], image: './src/assets/image_files/img5.jpg', dateAdded: '2023-07-15', externalLink: 'https://craftsmancrate.com/' },
  { id: 'p9', title: 'Polyglot AI Language Tutor', category: 'AI Tool', description: 'AI-powered chatbot for practicing new languages interactively.', price: 15000, techStack: ['Python', 'Dialogflow', 'React'], image: './src/assets/image_files/image7.jpg', dateAdded: '2023-12-10', externalLink: 'https://www.polyglotai.io/' },
  { id: 'p10', title: 'SecureCloud Backup SaaS', category: 'SaaS', description: 'Robust and secure cloud backup solution for SMBs.', price: 65000, techStack: ['Go', 'AWS S3', 'Vue.js', 'Docker'], image: 'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=400&q=75', dateAdded: '2023-09-01', externalLink: 'https://www.backblaze.com/' },
  { id: 'p11', title: 'Beanly – Gourmet Coffee Subscription', category: 'eCommerce', description: 'Monthly delivery of ethically sourced premium coffee beans.', price: 25000, techStack: ['WooCommerce', 'WordPress', 'Stripe'], image: './src/assets/image_files/image3.jpg', dateAdded: '2024-01-05', externalLink: 'https://beanbox.com/' },
  { id: 'p12', title: 'Wanderlust Mobile Travel Planner', category: 'App', description: 'Plan, organize, and share your travel itineraries seamlessly.', price: 55000, techStack: ['React Native', 'Firebase Auth', 'GraphQL'], image: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=400&q=75', dateAdded: '2024-01-10', externalLink: 'https://www.tripit.com/' },
  { id: 'p13', title: 'FinSavvy Personal Finance SaaS', category: 'SaaS', description: 'Track expenses, manage budgets, and view investment analytics.', price: 40000, techStack: ['Ruby on Rails', 'PostgreSQL', 'Chart.js'], image: './src/assets/image_files/image9.jpg', dateAdded: '2023-11-20', externalLink: 'https://www.youneedabudget.com/' },
  { id: 'p14', title: 'KidSpark Educational Game Suite', category: 'EdTech', description: 'Interactive learning games prototype for ages 5-8.', price: 18000, techStack: ['HTML5 Canvas', 'JavaScript', 'Phaser.js'], image: './src/assets/image_files/image2.jpg', dateAdded: '2024-01-15', externalLink: 'https://kidsparkeducation.org/' },
  { id: 'p15', title: 'NovaNet: Decentralized Social Platform', category: 'Web3', description: 'Proof of concept for a censorship-resistant Web3 social network.', price: 95000, techStack: ['IPFS', 'Ethereum', 'Gun.js', 'Vue.js'], image: './src/assets/image_files/image5.jpg', dateAdded: '2023-12-28', externalLink: 'https://lens.xyz/' },
  { id: 'p16', title: 'DevVault Code Snippet Manager', category: 'Developer Tool', description: 'Desktop tool to organize, tag, and share code snippets.', price: 12000, techStack: ['Electron', 'React', 'SQLite', 'Prism.js'], image: 'https://images.unsplash.com/photo-1607706189992-eae578626c86?auto=format&fit=crop&w=400&q=75', dateAdded: '2023-10-10', externalLink: 'https://www.cacher.io/' },
  { id: 'p17', title: 'Aura Smart Home Automation API', category: 'API', description: 'RESTful API to control and monitor smart home devices.', price: 75000, techStack: ['Python', 'FastAPI', 'MQTT', 'Docker'], image: './src/assets/image_files/image4.jpg', dateAdded: '2024-01-02', externalLink: 'https://home-assistant.io/' },
  { id: 'p18', title: 'The Crafted Corner Online Store', category: 'eCommerce', description: 'Platform for artisans to showcase and sell unique handmade items.', price: 35000, techStack: ['Shopify Theme Dev', 'Liquid', 'GraphQL'], image: './src/assets/image_files/img3.jpg', dateAdded: '2023-08-25', externalLink: 'https://www.uncommongoods.com/' },
  { id: 'p19', title: 'RecipeBook Community Platform', category: 'MVP', description: 'A community-driven platform for sharing and discovering recipes.', price: 22000, techStack: ['Django', 'PostgreSQL', 'Bootstrap'], image: 'https://images.unsplash.com/photo-1542010589005-d1eacc3918f2?auto=format&fit=crop&w=400&q=75', dateAdded: '2023-12-18', externalLink: 'https://www.allrecipes.com/' },
  { id: 'p20', title: 'ConnectSphere Virtual Event SaaS', category: 'SaaS', description: 'Full-featured platform to host and manage engaging online events.', price: 150000, techStack: ['Node.js', 'WebRTC', 'Socket.io', 'React'], image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=400&q=75', dateAdded: '2023-11-01', externalLink: 'https://hopin.com/' },
  { id: 'p21', title: 'Quill: Minimalist Blogging Platform', category: 'Web Tool', description: 'A simple, fast, and elegant blogging platform for writers.', price: 28000, techStack: ['Next.js', 'Markdown', 'Vercel', 'TailwindCSS'], image: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=400&q=75', dateAdded: '2024-01-20', externalLink: 'https://ghost.org/'},
  { id: 'p22', title: 'TaleWeaver AI Story Generator', category: 'AI Tool', description: 'Generate unique story plots, characters, and dialogues using AI.', price: 62000, techStack: ['Python', 'GPT-3 API', 'Flask', 'React'], image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=400&q=75', dateAdded: '2023-12-05', externalLink: 'https://www.novelai.net/'},
  { id: 'p23', title: 'LearnSphere Online Course Hub', category: 'EdTech', description: 'Marketplace for instructors to sell courses and learners to enroll.', price: 130000, techStack: ['PHP', 'Laravel', 'MySQL', 'Vue.js', 'Stripe Connect'], image: 'https://images.unsplash.com/photo-1532619187608-e5375cab36aa?auto=format&fit=crop&w=400&q=75', dateAdded: '2023-10-18', externalLink: 'https://www.udemy.com/'},
  { id: 'p24', title: 'TeeDesigner Custom Apparel Tool', category: 'eCommerce', description: 'Online tool to design and order custom t-shirts and apparel.', price: 50000, techStack: ['JavaScript', 'Fabric.js', 'Shopify API', 'Printful API'], image: './src/assets/image_files/image.jpg', dateAdded: '2024-01-22', externalLink: 'https://www.customink.com/'},
  { id: 'p25', title: 'GrooveStream Music Service MVP', category: 'App', description: 'Basic music streaming application with playlist functionality.', price: 70000, techStack: ['Kotlin', 'ExoPlayer', 'Firebase Firestore', 'Jetpack Compose'], image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=400&q=75', dateAdded: '2023-11-28', externalLink: 'https://www.spotify.com/'},
  { id: 'p26', title: 'NoteWiz – Productivity App', category: 'App', description: 'Smart note-taking and organization for creative minds.', price: 30000, techStack: ['React Native', 'SQLite', 'Redux'], image: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&w=400&q=75', dateAdded: '2024-02-01', externalLink: 'https://notewiz-demo.vercel.app/'}
];
// --- End Dummy Data ---

const ProjectPage = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTech, setSelectedTech] = useState('');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [viewMode, setViewMode] = useState('grid');

  const [cartItems, setCartItems] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    setTimeout(() => {
      try {
        setProjects(allDummyProjects);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load projects.');
        setIsLoading(false);
      }
    }, 800);
  }, []);

  const categories = useMemo(() =>
    ['All', ...new Set(projects.map(p => p.category).sort())]
  , [projects]);

  const filteredAndSortedProjects = useMemo(() => {
    let processedProjects = [...projects];

    if (selectedCategory !== 'All') {
      processedProjects = processedProjects.filter(p => p.category === selectedCategory);
    }

    switch(priceRange) {
        case '0-25000':
            processedProjects = processedProjects.filter(p => p.price >= 0 && p.price <= 25000);
            break;
        case '25001-75000':
             processedProjects = processedProjects.filter(p => p.price >= 25001 && p.price <= 75000);
             break;
        case '75001-150000':
             processedProjects = processedProjects.filter(p => p.price >= 75001 && p.price <= 150000);
             break;
        case '150001+':
             processedProjects = processedProjects.filter(p => p.price >= 150001);
             break;
        case 'all':
        default:
             break;
    }

    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      processedProjects = processedProjects.filter(p =>
        p.title.toLowerCase().includes(lowerSearch) ||
        p.description.toLowerCase().includes(lowerSearch) ||
        p.category.toLowerCase().includes(lowerSearch) ||
        p.techStack.some(tech => tech.toLowerCase().includes(lowerSearch))
      );
    }

     if (selectedTech) {
        const lowerTech = selectedTech.toLowerCase();
        processedProjects = processedProjects.filter(p =>
            p.techStack.some(tech => tech.toLowerCase().includes(lowerTech))
        );
    }

    switch (sortBy) {
      case 'price_asc':
        processedProjects.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        processedProjects.sort((a, b) => b.price - a.price);
        break;
      case 'title_asc':
        processedProjects.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'title_desc':
        processedProjects.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'latest':
      default:
        processedProjects.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
        break;
    }
    return processedProjects;
  }, [projects, searchTerm, selectedCategory, priceRange, selectedTech, sortBy]);

  const currentProjects = filteredAndSortedProjects;

  const handleAddToCart = (projectToAdd) => {
    if (!projectToAdd) return;
    setCartItems(prevItems => {
      const isItemInCart = prevItems.find(item => item.id === projectToAdd.id);
      if (isItemInCart) {
        // Optionally, you could provide some non-alert feedback here,
        // like changing the button state or showing a small message.
        // For now, just returning prevents duplicates.
        console.warn(`${projectToAdd.title} is already in your cart.`);
        return prevItems;
      }
      // console.log(`${projectToAdd.title} added to cart!`); // Optional: for developer console
      return [...prevItems, { ...projectToAdd, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (projectIdToRemove) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== projectIdToRemove));
  };

  const toggleCartVisibility = () => setIsCartVisible(!isCartVisible);

  const calculateCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  };

  useEffect(() => {
    if (isCartVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isCartVisible]);

  return (
    <div className="project-page-container">
      <header className="pp-header">
        <div className="pp-header-content">
            <h1>Explore Our Projects</h1>
            <p>Discover innovative startups, apps, SaaS solutions, and more, ready for you.</p>
        </div>
        <button
            onClick={toggleCartVisibility}
            className={`pp-cart-button-header ${isCartVisible ? 'active' : ''}`}
            aria-label={`View Cart, ${cartItems.length} items`}
            aria-expanded={isCartVisible}
        >
            <CartIcon />
            <span className="pp-cart-button-text">Cart</span>
            {cartItems.length > 0 && <span className="pp-cart-count">{cartItems.length}</span>}
        </button>
      </header>

      {isCartVisible && (
        <div className="pp-cart-modal-overlay visible" onClick={toggleCartVisibility}>
          <div className="pp-cart-modal" onClick={(e) => e.stopPropagation()}>
            <div className="pp-cart-modal-header">
              <h2>Your Selections</h2>
              <button onClick={toggleCartVisibility} className="pp-cart-close-button" aria-label="Close Cart"><CloseIcon /></button>
            </div>
            <div className="pp-cart-modal-body">
              {cartItems.length === 0 ? (
                <p className="pp-cart-empty-message">Your selection is currently empty. Start adding some amazing projects!</p>
              ) : (
                <ul className="pp-cart-items-list">
                  {cartItems.map(item => (
                    <li key={item.id} className="pp-cart-item">
                      <Link to={`/project/${item.id}`} onClick={toggleCartVisibility}>
                        <img src={item.image || 'https://via.placeholder.com/60x60/E2E8F0/4A5568?text=Proj'} alt={item.title} className="pp-cart-item-image" />
                      </Link>
                      <div className="pp-cart-item-details">
                        <Link to={`/project/${item.id}`} className="pp-cart-item-title-link" onClick={toggleCartVisibility}>
                          <span className="pp-cart-item-title">{item.title}</span>
                        </Link>
                        <span className="pp-cart-item-price">
                          ₹{item.price.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <button onClick={() => handleRemoveFromCart(item.id)} className="pp-cart-item-remove-button" aria-label={`Remove ${item.title} from cart`}>
                        <TrashIcon />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {cartItems.length > 0 && (
              <div className="pp-cart-modal-footer">
                <div className="pp-cart-total">
                  Subtotal: <span>₹{calculateCartTotal().toLocaleString('en-IN')}</span>
                </div>
                {/* MODIFIED: Replaced "Continue Browsing" with "Proceed to Payment" */}
                <Link 
                    to="/checkoutpage" /* Replace with your actual payment/checkout page route */
                    onClick={toggleCartVisibility} 
                    className="pp-btn pp-cart-proceed-payment-button"
                >
                    Proceed to Payment
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      <section className="pp-controls-section">
        <div className="pp-search-bar-container">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search by name, category, tech..."
            className="pp-search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search projects"
          />
        </div>

        <div className="pp-filters-sort-container">
          <div className="pp-filter-group">
            <label htmlFor="category-filter" className="pp-filter-label"><FilterIcon /> Type</label>
            <select id="category-filter" className="pp-dropdown" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

           <div className="pp-filter-group">
            <label htmlFor="price-filter" className="pp-filter-label">Price (₹)</label>
            <select id="price-filter" className="pp-dropdown" value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
              <option value="all">All Prices</option>
              <option value="0-25000">₹0 - ₹25,000</option>
              <option value="25001-75000">₹25,001 - ₹75,000</option>
              <option value="75001-150000">₹75,001 - ₹150,000</option>
              <option value="150001+">₹150,001+</option>
            </select>
          </div>

          <div className="pp-filter-group pp-tech-filter">
             <label htmlFor="tech-filter" className="pp-filter-label">Tech</label>
             <input
                type="text"
                id="tech-filter"
                className="pp-tech-input"
                placeholder="e.g., React, Python"
                value={selectedTech}
                onChange={(e) => setSelectedTech(e.target.value)}
                aria-label="Filter by technology"
             />
          </div>

          <div className="pp-filter-group">
            <label htmlFor="sort-filter" className="pp-filter-label"><SortIcon /> Sort By</label>
            <select id="sort-filter" className="pp-dropdown" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="latest">Latest</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="title_asc">Name: A to Z</option>
              <option value="title_desc">Name: Z to A</option>
            </select>
          </div>
        </div>

        <div className="pp-view-toggle">
          <button
            className={`pp-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
            title="Grid View" aria-pressed={viewMode === 'grid'}
          > <GridViewIcon /> <span className="pp-view-btn-text">Grid</span> </button>
          <button
            className={`pp-view-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
            title="List View" aria-pressed={viewMode === 'list'}
          > <ListViewIcon /> <span className="pp-view-btn-text">List</span> </button>
        </div>
      </section>

      <section className="pp-projects-display-section">
        {isLoading && <div className="pp-loading-spinner-container"><div className="pp-loading-spinner"></div><p>Loading Projects...</p></div>}
        {error && <p className="pp-error-message">Oops! Something went wrong: {error}</p>}
        
        {!isLoading && !error && currentProjects.length === 0 && (
          <div className="pp-no-projects-found">
            <h2>No Projects Found</h2>
            <p>Try adjusting your search or filter criteria, or check back later for new listings!</p>
          </div>
        )}

        {!isLoading && !error && currentProjects.length > 0 && (
          viewMode === 'grid' ? (
            <div className="pp-projects-grid">
              {currentProjects.map(project => (
                 <div key={project.id} className="pp-project-card">
                    <Link to={`/project/${project.id}`} className="pp-card-image-link" aria-label={`View details for ${project.title}`}>
                        <div className="pp-card-image-container">
                            <img src={project.image || 'https://via.placeholder.com/400x225/E2E8F0/4A5568?text=No+Image'} alt={project.title} className="pp-card-image"/>
                            <span className="pp-card-category-badge-on-image">{project.category}</span>
                        </div>
                    </Link>
                    <div className="pp-card-content">
                        <h3 className="pp-card-title">
                            <Link to={`/project/${project.id}`}>{project.title}</Link>
                        </h3>
                        <p className="pp-card-description">{project.description.substring(0, 90)}{project.description.length > 90 ? '...' : ''}</p>
                         
                        {project.externalLink ? (
                            <a href={project.externalLink} target="_blank" rel="noopener noreferrer" className="pp-project-link pp-external-link">
                                <ExternalLinkIcon /> Visit Project Site
                            </a>
                        ) : (
                            <Link to={`/project/${project.id}`} className="pp-project-link pp-internal-link">
                                <DetailsIcon /> View Platform Details
                            </Link>
                        )}

                        <div className="pp-card-tech-stack">
                             {project.techStack.slice(0, 3).map((tech, index) => (
                                <span key={index} className="pp-tech-badge">{tech}</span>
                            ))}
                            {project.techStack.length > 3 && <span className="pp-tech-badge">+{project.techStack.length - 3} more</span>}
                        </div>
                    </div>
                    <div className="pp-card-footer">
                        <span className="pp-card-price">₹{project.price.toLocaleString('en-IN')}</span>
                        <button onClick={() => handleAddToCart(project)} className="pp-btn pp-btn-add-to-cart" aria-label={`Add ${project.title} to cart`}>
                            <CartIcon /> Add to Cart
                        </button>
                    </div>
                 </div>
              ))}
            </div>
          ) : (
            <div className="pp-projects-list">
              {currentProjects.map(project => (
                <div key={project.id} className="pp-project-list-item">
                   <Link to={`/project/${project.id}`} className="pp-list-item-image-link" aria-label={`View details for ${project.title}`}>
                       <img src={project.image || 'https://via.placeholder.com/180x120/E2E8F0/4A5568?text=No+Image'} alt={project.title} className="pp-list-item-image"/>
                   </Link>
                   <div className="pp-list-item-info">
                       <span className="pp-card-category-badge">{project.category}</span>
                       <h3 className="pp-list-item-title">
                            <Link to={`/project/${project.id}`}>{project.title}</Link>
                       </h3>
                       <p className="pp-list-item-description">{project.description.substring(0, 150)}{project.description.length > 150 ? '...' : ''}</p>
                        
                        {project.externalLink ? (
                            <a href={project.externalLink} target="_blank" rel="noopener noreferrer" className="pp-project-link pp-external-link">
                               <ExternalLinkIcon /> Visit Project Site
                            </a>
                        ) : (
                            <Link to={`/project/${project.id}`} className="pp-project-link pp-internal-link">
                                <DetailsIcon /> View Platform Details
                            </Link>
                        )}

                       <div className="pp-list-item-tech-stack">
                            {project.techStack.slice(0, 5).map((tech, index) => (
                                <span key={index} className="pp-tech-badge">{tech}</span>
                            ))}
                            {project.techStack.length > 5 && <span className="pp-tech-badge">+{project.techStack.length - 5}</span>}
                        </div>
                   </div>
                    <div className="pp-list-item-action">
                        <span className="pp-list-item-price">₹{project.price.toLocaleString('en-IN')}</span>
                        <button onClick={() => handleAddToCart(project)} className="pp-btn pp-btn-add-to-cart" aria-label={`Add ${project.title} to cart`}>
                            <CartIcon /> Add to Cart
                        </button>
                   </div>
                </div>
              ))}
            </div>
          )
        )}
      </section>
    </div>
  );
};

export default ProjectPage;