import React, { useState, useEffect } from 'react';
import '../style/ProjectDetails.css'; // We will update this CSS

// Placeholder Icons
const CategoryIcon = () => <span className="pd-icon">🏷️</span>;
const TechIcon = () => <span className="pd-icon">💻</span>;
const LinkIcon = () => <span className="pd-icon">🔗</span>;
const UserIcon = () => <span className="pd-icon">👤</span>;
const StarIcon = () => <span className="pd-icon-rating">★</span>;
const PriceIcon = () => <span className="pd-icon">💲</span>;
const StageIcon = () => <span className="pd-icon">🚀</span>;
const IntentIcon = () => <span className="pd-icon">🎯</span>;
const DeliverablesIcon = () => <span className="pd-icon">📦</span>;
const ShareIcon = () => <span className="pd-icon">↪️</span>;
const BookmarkIcon = () => <span className="pd-icon">🔖</span>;
const ReportIcon = () => <span className="pd-icon">🚩</span>;
const CartIcon = () => <span className="pd-icon">🛒</span>; // New Cart Icon
const CloseIcon = () => <span className="pd-icon">❌</span>; // New Close Icon
const TrashIcon = () => <span className="pd-icon">🗑️</span>; // New Trash Icon

// --- DUMMY PROJECT DATA (Using the 20+ Projects from previous response) ---
const allDummyProjects = [
  // (Using the same 21 projects from the previous response - keeping it concise here for brevity)
  // Make sure this array is populated with your 21 projects
  {
    id: 'p1', title: 'Artisan Goods Marketplace', category: 'eCommerce', shortDescription: 'Connects artisans with buyers globally.', longDescription: "Built with scalability in mind, this platform features vendor dashboards, secure checkout via Stripe, product reviews, and advanced search filters. The frontend uses React for a modern user experience, while the Node.js backend ensures efficient operations. Perfect for entrepreneurs passionate about sustainability.", price: 1500, techStack: ['React', 'Node.js', 'MongoDB', 'Stripe API'], image: 'https://images.unsplash.com/photo-1524230656860-b58753a0497a?auto=format&fit=crop&w=1000&q=75', githubUrl: 'https://github.com/example/artisan-marketplace', liveDemoUrl: 'https://demo.artisan.example.com', stageOfDevelopment: 'Launched Product', lookingFor: 'Full Sale', deliverables: ['Full Source Code (Frontend & Backend)', 'Domain Name Transfer (example.com)', 'Database Schema & Data Migration Script', 'Deployment Guide', '30 Days Post-Sale Support'], seller: { id: 's1', name: 'CraftConnect Solutions', rating: 4.9, memberSince: '2022-03-10', avatar: 'https://via.placeholder.com/80/A7F3D0/000?text=CS' }
  },
  {
    id: 'p2', title: 'Subscription Box Service for Pets', category: 'eCommerce', shortDescription: 'Monthly curated boxes for dogs and cats.', longDescription: "A fully operational subscription service for pet lovers. Features include customizable box preferences, recurring billing with Stripe, and an admin panel for managing subscribers and products. The platform is built on Shopify with custom app integrations.", price: 800, techStack: ['Shopify', 'Klaviyo', 'Recharge Payments'], image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1000&q=75', stageOfDevelopment: 'MVP Ready', lookingFor: 'Seed Investment ($25k)', seller: { id: 's2', name: 'PawsomePacks Co.', rating: 4.7, memberSince: '2023-01-20', avatar: 'https://via.placeholder.com/80/BAE6FD/000?text=PP' }
  },
  { id: 'p3', title: 'Local Events Finder App', category: 'Mobile App', shortDescription: 'Discover events happening near you.', longDescription: "This cross-platform mobile app (React Native) helps users find local concerts, workshops, meetups, and more. It integrates with multiple event APIs and features geolocation, user reviews, and ticket booking (via affiliate links).", price: 650, techStack: ['React Native', 'Firebase', 'Node.js (for API proxy)'], image: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=1000&q=75', stageOfDevelopment: 'Prototype', lookingFor: 'Co-founder (Marketing & Growth)', seller: { id: 's3', name: 'EventHorizon Devs', rating: 4.5, memberSince: '2023-05-01', avatar: 'https://via.placeholder.com/80/FBCFE8/000?text=EH' } },
  { id: 'p4', title: 'AI Language Learning Tutor', category: 'Mobile App', shortDescription: 'Personalized language lessons with AI.', longDescription: "An iOS app that acts as a personal language tutor. Uses CoreML for on-device speech recognition and generation, and a Python backend for advanced NLP tasks. Offers interactive conversations, grammar corrections, and vocabulary building exercises.", price: 2200, techStack: ['Swift', 'Python (Flask)', 'CoreML', 'AWS Polly'], image: 'https://images.unsplash.com/photo-1523240795610-5717136db666?auto=format&fit=crop&w=1000&q=75', stageOfDevelopment: 'Launched Product (v1.0)', lookingFor: 'Acquisition / Strategic Buyer', deliverables: ['Full iOS App Source Code', 'Backend API Source Code', 'User Database (anonymized)', 'All Design Assets'], seller: { id: 's4', name: 'LinguaBot AI Inc.', rating: 4.9, memberSince: '2021-11-15', avatar: 'https://via.placeholder.com/80/DDD6FE/000?text=LAI' } },
  { id: 'p5', title: 'Small Business CRM', category: 'SaaS', shortDescription: 'Simple CRM for freelancers and small teams.', longDescription: "A user-friendly CRM designed specifically for the needs of freelancers and small businesses. Features contact management, deal tracking, task assignments, and basic reporting. Built with a Vue.js frontend and a Node.js/Express backend using PostgreSQL.", price: 3500, techStack: ['Vue.js', 'Node.js', 'Express', 'PostgreSQL'], image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1000&q=75', stageOfDevelopment: 'Growth Stage', lookingFor: 'Series A Funding ($200k)', seller: { id: 's5', name: 'ClientFlow Solutions', rating: 4.8, memberSince: '2022-02-01', avatar: 'https://via.placeholder.com/80/A5F3FC/000?text=CF' } },
  { id: 'p6', title: 'Project Management Tool for Creatives', category: 'SaaS', shortDescription: 'Visual project tracking for designers.', longDescription: "IdeaBoard is a SaaS tool that helps creative teams manage projects visually. It uses a Kanban-style board with features tailored for design workflows, such as image proofing, version control for assets, and client feedback portals. Built with Ruby on Rails and React.", price: 1800, techStack: ['Ruby on Rails', 'React', 'PostgreSQL', 'AWS S3'], image: 'https://images.unsplash.com/photo-1522071820081-009f0129c7da?auto=format&fit=crop&w=1000&q=75', stageOfDevelopment: 'Launched Product', lookingFor: 'Strategic Partnership or Sale', deliverables: ['Complete Source Code', 'Customer List', 'Brand Assets'], seller: { id: 's6', name: 'IdeaBoard Creators', rating: 4.6, memberSince: '2022-08-11', avatar: 'https://via.placeholder.com/80/FDE68A/000?text=IBC' } },
  { id: 'p7', title: 'Portfolio Website Generator', category: 'Web Tool', shortDescription: 'Quickly create stunning portfolios.', longDescription: "A simple yet powerful online tool for creating beautiful, responsive portfolio websites without any coding. Users can choose from various templates, customize layouts, and easily add their projects. Built with Next.js and TailwindCSS for optimal performance and design flexibility.", price: 450, techStack: ['Next.js', 'TailwindCSS', 'Vercel'], image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=1000&q=75', stageOfDevelopment: 'MVP Ready', lookingFor: 'Feedback / Early Users', seller: { id: 's7', name: 'Portfolia Systems', rating: null, memberSince: '2023-09-05', avatar: 'https://via.placeholder.com/80/BFDBFE/000?text=PS' } },
  { id: 'p8', title: 'Code Snippet Manager', category: 'Developer Tool', shortDescription: 'Organize and share your code snippets.', longDescription: "A desktop application (Electron) for developers to organize, tag, and quickly access their frequently used code snippets. Supports syntax highlighting for various languages and cloud sync (optional).", price: 300, techStack: ['Electron', 'Vue.js', 'SQLite'], image: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=1000&q=75', stageOfDevelopment: 'Beta Version', lookingFor: 'Open Source Contributors or Sale', deliverables: ['Source Code', 'Build Scripts'], seller: { id: 's8', name: 'DevUtils Co.', rating: 4.3, memberSince: '2023-03-18', avatar: 'https://via.placeholder.com/80/FECACA/000?text=DUC' } },
  { id: 'p9', title: 'Mobile Puzzle Game "Color Grid"', category: 'Game Development', shortDescription: 'Addictive color-matching puzzle.', longDescription: "An engaging mobile puzzle game built with Unity, available on both Android and iOS. Features hundreds of levels, daily challenges, and in-app purchases for hints/themes. Consistently good user reviews.", price: 900, techStack: ['Unity', 'C#'], image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1000&q=75', stageOfDevelopment: 'Launched (Android/iOS)', lookingFor: 'Full Sale', deliverables: ['Unity Project Files', 'App Store/Play Store Listings Transfer', 'Art Assets'], seller: { id: 's9', name: 'GridGames Studio', rating: 4.7, memberSince: '2022-06-22', avatar: 'https://via.placeholder.com/80/A7F3D0/000?text=GG' } },
  { id: 'p10', title: 'VR Adventure Experience Concept', category: 'Game Development', shortDescription: 'Immersive VR exploration game concept.', longDescription: "A detailed game design document (GDD) and early environment prototypes (Unreal Engine) for a VR adventure game set in a mystical world. Concept includes unique locomotion mechanics and puzzle designs. Looking for a technical co-founder or an interested studio.", price: 0, techStack: ['Unreal Engine', 'Blender (for assets)'], image: 'https://images.unsplash.com/photo-1587130310991-b32cd1301604?auto=format&fit=crop&w=1000&q=75', stageOfDevelopment: 'Idea / Concept with Prototype', lookingFor: 'Technical Co-founder / Studio Partnership', seller: { id: 's10', name: 'VR Visions Lab', rating: null, memberSince: '2024-02-01', avatar: 'https://via.placeholder.com/80/BAE6FD/000?text=VVL' } },
  { id: 'p11', title: 'AI-Powered Content Summarizer', category: 'AI Tool', shortDescription: 'Summarizes long articles and documents.', longDescription: "A web-based tool that uses advanced NLP models (via Hugging Face Transformers) to generate concise summaries of long texts, articles, or documents. Python/Flask backend with a simple React frontend. Currently a working prototype.", price: 1250, techStack: ['Python', 'Flask', 'Hugging Face Transformers', 'React'], image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1000&q=75', stageOfDevelopment: 'Working Prototype', lookingFor: 'Seed Investment or Acquisition', seller: { id: 's11', name: 'SummaryAI Tech', rating: 4.2, memberSince: '2023-07-10', avatar: 'https://via.placeholder.com/80/FBCFE8/000?text=SAI' } },
  { id: 'p12', title: 'Image Recognition API Service', category: 'AI Service', shortDescription: 'API for object detection in images.', longDescription: "A scalable API service built with TensorFlow and deployed on Kubernetes. Offers various endpoints for object detection, image classification, and facial recognition (with ethical considerations). Currently serving a few beta clients.", price: 0, techStack: ['TensorFlow', 'Python (FastAPI)', 'Kubernetes', 'Docker'], image: 'https://images.unsplash.com/photo-1517502884422-41ea045b0034?auto=format&fit=crop&w=1000&q=75', stageOfDevelopment: 'Launched Product (Beta Clients)', lookingFor: 'Enterprise Clients / Resellers', seller: { id: 's12', name: 'VisionAPI Systems', rating: 4.9, memberSince: '2022-10-03', avatar: 'https://via.placeholder.com/80/DDD6FE/000?text=VAS' } },
  { id: 'p13', title: 'Premium Domain: Cloudly.ai', category: 'Domain Name', shortDescription: 'High-value domain name for AI/Cloud.', longDescription: "A highly brandable and relevant .ai domain name, perfect for a startup in the cloud computing or artificial intelligence space. Short, memorable, and keyword-rich.", price: 2200, techStack: ['N/A'], image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=75', stageOfDevelopment: 'Registered Domain', lookingFor: 'Full Sale', deliverables: ['Domain Transfer Authorization'], seller: { id: 's13', name: 'DomainBroker Pro', rating: 5.0, memberSince: '2020-01-15', avatar: 'https://via.placeholder.com/80/A5F3FC/000?text=DBP' } },
  { id: 'p14', title: 'Brandable Domain: Zenvo.co', category: 'Domain Name', shortDescription: 'Short, brandable .co domain.', longDescription: "Zenvo.co - a short, catchy, and modern .co domain name suitable for a wide range of tech startups, SaaS products, or creative agencies. Easy to remember and pronounce.", price: 750, techStack: ['N/A'], image: 'https://images.unsplash.com/photo-1585942000900-27b50a62a09a?auto=format&fit=crop&w=1000&q=75', stageOfDevelopment: 'Registered Domain', lookingFor: 'Full Sale', deliverables: ['Domain Transfer Authorization'], seller: { id: 's14', name: 'NameSpark Ventures', rating: 4.8, memberSince: '2021-05-20', avatar: 'https://via.placeholder.com/80/FDE68A/000?text=NSV' } },
  { id: 'p15', title: 'Travel Blog - SE Asia Focus', category: 'Content Site', shortDescription: 'Established travel blog with traffic.', longDescription: "An established WordPress travel blog focusing on Southeast Asia, with over 500 articles, consistent organic traffic (10k+ UV/month), and multiple monetization streams (AdSense, affiliates, sponsored posts). Includes social media accounts.", price: 19000, techStack: ['WordPress', 'SEO (Yoast)', 'Google Analytics'], image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1000&q=75', stageOfDevelopment: 'Established Site (Profitable)', lookingFor: 'Acquisition', deliverables: ['WordPress Site Transfer', 'Domain Name', 'Social Media Accounts', 'Content SOPs'], seller: { id: 's15', name: 'NomadNotes Media', rating: 4.9, memberSince: '2019-07-01', avatar: 'https://via.placeholder.com/80/BFDBFE/000?text=NNM' } },
  { id: 'p16', title: 'Recipe Blog - Vegan Cuisine', category: 'Content Site', shortDescription: 'Growing blog for vegan recipes.', longDescription: "A beautifully designed recipe blog built on Ghost CMS, focusing on vegan cuisine. Features high-quality photography and well-written recipes. Growing social media presence and email list. Perfect for someone passionate about vegan food.", price: 6000, techStack: ['Ghost CMS', 'Mailchimp', 'Pinterest Marketing'], image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1000&q=75', stageOfDevelopment: 'Growing Traffic & Revenue', lookingFor: 'Partnership (Content Creator) or Sale', seller: { id: 's16', name: 'PlantPoweredPlates Blog', rating: 4.6, memberSince: '2022-12-01', avatar: 'https://via.placeholder.com/80/FECACA/000?text=PPP' } },
  { id: 'p17', title: 'Smart Home Garden Sensor Kit', category: 'IoT Device', shortDescription: 'Prototype for a soil and light sensor.', longDescription: "A working hardware prototype of a smart garden sensor kit (Arduino based). Measures soil moisture, temperature, and ambient light, sending data to a mobile app (basic Flutter app included). Includes 3D printable casing designs. Looking for funding for a small manufacturing run or an electronics hobbyist to take it further.", price: 350, techStack: ['Arduino', 'Flutter', 'Bluetooth LE'], image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=1000&q=75', stageOfDevelopment: 'Hardware Prototype with Basic App', lookingFor: 'Funding / Hobbyist Acquirer', deliverables: ['Hardware Schematics', 'Arduino Code', 'Flutter App Source Code', '3D Casing Files'], seller: { id: 's17', name: 'GreenThumbTech Labs', rating: 4.0, memberSince: '2023-10-10', avatar: 'https://via.placeholder.com/80/A7F3D0/000?text=GTT' } },
  { id: 'p18', title: 'NFT Art Generator Tool (Web)', category: 'Web3 Tool', shortDescription: 'Web tool to create unique digital art collections.', longDescription: "A user-friendly web application built with Next.js that allows users to upload layers and generate unique NFT art collections with metadata. Integrates with IPFS for image hosting. Simple smart contract (Solidity) for basic minting on Ethereum testnets included.", price: 1500, techStack: ['Solidity', 'Next.js', 'IPFS', 'Hardhat'], image: 'https://images.unsplash.com/photo-1640831636077-3beda85d0751?auto=format&fit=crop&w=1000&q=75', stageOfDevelopment: 'MVP Ready', lookingFor: 'Full Sale or Co-developer for Mainnet', seller: { id: 's18', name: 'NFTCrafter Suite', rating: 4.5, memberSince: '2023-04-15', avatar: 'https://via.placeholder.com/80/BAE6FD/000?text=NCS' } },
  { id: 'p19', title: 'Interactive Coding Platform for Kids', category: 'EdTech', shortDescription: 'Gamified coding lessons for children.', longDescription: "A web platform offering gamified coding lessons for kids aged 8-12. Uses Blockly for visual programming and introduces basic Python concepts. Features progress tracking, badges, and parent dashboards. Currently in beta with a small group of schools.", price: 0, techStack: ['React', 'Blockly', 'Node.js', 'MongoDB'], image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1000&q=75', stageOfDevelopment: 'Beta Version (School Pilots)', lookingFor: 'Educational Partners / Seed Investment', seller: { id: 's19', name: 'CodeSprouts Education', rating: 4.8, memberSince: '2022-09-01', avatar: 'https://via.placeholder.com/80/FBCFE8/000?text=CSE' } },
  { id: 'p20', title: 'Minimalist Task Manager (Flutter)', category: 'Productivity App', shortDescription: 'Simple and clean task management.', longDescription: "A cross-platform task manager app built with Flutter, focusing on simplicity and a clean user interface. Offers basic to-do lists, reminders, and tagging. Launched on App Store and Play Store with a small user base.", price: 250, techStack: ['Flutter', 'Firebase (Firestore)'], image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1000&q=75', stageOfDevelopment: 'Launched Product', lookingFor: 'Feedback / Small Acquirer', deliverables: ['Flutter Source Code', 'Firebase Project Access'], seller: { id: 's20', name: 'FocusFlow Apps', rating: 4.2, memberSince: '2023-06-30', avatar: 'https://via.placeholder.com/80/DDD6FE/000?text=FFA' } },
  { id: 'p21', title: 'Automated Newsletter Builder (AI)', category: 'Productivity SaaS', shortDescription: 'AI-assisted newsletter creation.', longDescription: "A SaaS tool that helps users create engaging newsletters faster using AI. It can curate content from specified sources, suggest headlines, and help with formatting. Python (Django) backend with Celery for task processing and a GPT-3/similar API integration. Currently in private beta.", price: 0, techStack: ['Python (Django)', 'Celery', 'React', 'GPT-3 API (or similar)'], image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=1000&q=75', stageOfDevelopment: 'Private Beta', lookingFor: 'Seed Funding / Technical Co-founder', seller: { id: 's21', name: 'LetterSpark AI', rating: null, memberSince: '2024-01-10', avatar: 'https://via.placeholder.com/80/A5F3FC/000?text=LSAI' } }
];

const ProjectDetails = () => {
  const [project, setProject] = useState(null);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);

  useEffect(() => {
    if (allDummyProjects && allDummyProjects.length > 0) {
      setProject(allDummyProjects[currentProjectIndex]);
    }
  }, [currentProjectIndex]);

  const handleNextProject = () => setCurrentProjectIndex((prev) => (prev + 1) % allDummyProjects.length);
  const handlePrevProject = () => setCurrentProjectIndex((prev) => (prev - 1 + allDummyProjects.length) % allDummyProjects.length);

  const handleContactSeller = () => alert(`Contacting seller of "${project.title}".`);
  const handleBookmarkProject = () => alert(`Project "${project.title}" bookmarked!`);
  const handleSocialShare = (platform) => {
    let shareUrl = encodeURIComponent(window.location.href);
    let text = encodeURIComponent(`Check out: ${project.title}`);
    let url = platform === 'Twitter' ? `https://twitter.com/intent/tweet?text=${text}&url=${shareUrl}`
            : platform === 'Facebook' ? `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`
            : platform === 'LinkedIn' ? `https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${text}` : '';
    if (url) window.open(url, '_blank', 'noopener,noreferrer'); else alert(`Sharing on ${platform}.`);
  };
  const handleReportListing = () => alert(`Reporting listing "${project.title}".`);

  // --- CART FUNCTIONALITY ---
  const handleAddToCart = (projectToAdd) => {
    if (!projectToAdd) return;
    setCartItems(prevItems => {
      const isItemInCart = prevItems.find(item => item.id === projectToAdd.id);
      if (isItemInCart) {
        alert(`${projectToAdd.title} is already in your cart.`);
        return prevItems;
      }
      alert(`${projectToAdd.title} added to cart!`);
      return [...prevItems, projectToAdd];
    });
  };

  const handleRemoveFromCart = (projectIdToRemove) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== projectIdToRemove));
  };

  const toggleCartVisibility = () => setIsCartVisible(!isCartVisible);

  const calculateCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price || 0), 0);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    alert(`Proceeding to checkout with ${cartItems.length} item(s), total: $${calculateCartTotal().toLocaleString()}. \n(This is a demo, no real transaction will occur.)`);
    // Potentially clear cart after checkout: setCartItems([]);
    setIsCartVisible(false);
  };

  if (!project) return <div className="pd-loading">Loading Project Details...</div>;

  return (
    <>
      {/* --- DEMO NAVIGATION & CART ICON --- */}
      <div className="pd-demo-nav">
        <button onClick={handlePrevProject}>« Previous</button>
        <span>{project.title}</span>
        <button onClick={handleNextProject}>Next »</button>
        <button onClick={toggleCartVisibility} className="pd-cart-toggle-button">
          <CartIcon /> Cart ({cartItems.length})
        </button>
      </div>

      {/* --- CART MODAL --- */}
      {isCartVisible && (
        <div className="pd-cart-modal-overlay">
          <div className="pd-cart-modal">
            <div className="pd-cart-modal-header">
              <h2>Your Cart</h2>
              <button onClick={toggleCartVisibility} className="pd-cart-close-button"><CloseIcon /></button>
            </div>
            <div className="pd-cart-modal-body">
              {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <ul className="pd-cart-items-list">
                  {cartItems.map(item => (
                    <li key={item.id} className="pd-cart-item">
                      <img src={item.image || 'https://via.placeholder.com/50x50/E2E8F0/4A5568?text=Img'} alt={item.title} className="pd-cart-item-image" />
                      <div className="pd-cart-item-details">
                        <span className="pd-cart-item-title">{item.title}</span>
                        <span className="pd-cart-item-price">
                          {item.price > 0 ? `$${item.price.toLocaleString()}` : (item.lookingFor && item.lookingFor.toLowerCase().includes('investment')) ? `Seeking: ${item.lookingFor}` : 'Contact for Price'}
                        </span>
                      </div>
                      <button onClick={() => handleRemoveFromCart(item.id)} className="pd-cart-item-remove-button">
                        <TrashIcon />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {cartItems.length > 0 && (
              <div className="pd-cart-modal-footer">
                <div className="pd-cart-total">
                  Total: <span>${calculateCartTotal().toLocaleString()}</span>
                </div>
                <button onClick={handleCheckout} className="pd-cart-checkout-button">
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="project-details-page-container"> {/* Outer container for page context */}
        <div className="project-details-layout-container"> {/* Flex container for main and sidebar */}
          {/* --- Main Content Area (Left) --- */}
          <main className="pd-main-content-area">
            <section className="pd-image-section">
              <img
                src={project.image || 'https://via.placeholder.com/1000x600/E2E8F0/4A5568?text=Project+Image'}
                alt={`${project.title} main visual`}
                className="pd-main-image"
              />
            </section>

            <div className="pd-title-header">
              <h1 className="pd-project-title">{project.title}</h1>
              <button onClick={handleBookmarkProject} className="pd-bookmark-button">
                <BookmarkIcon /> Save
              </button>
            </div>

            <div className="pd-meta-info-badges">
              <span className="pd-meta-badge"><CategoryIcon /> {project.category}</span>
              <span className="pd-meta-badge"><StageIcon /> {project.stageOfDevelopment}</span>
              <span className="pd-meta-badge"><IntentIcon /> {project.lookingFor}</span>
            </div>

            <section className="pd-description-section">
              <p>{project.longDescription || project.description}</p>
            </section>

            {project.deliverables && project.deliverables.length > 0 && (
              <section className="pd-deliverables-section">
                <h2 className="pd-section-heading"><DeliverablesIcon /> What You Get</h2>
                <ul className="pd-deliverables-list">
                  {project.deliverables.map((item, index) => (
                    <li key={index} className="pd-deliverable-item">{item}</li>
                  ))}
                </ul>
              </section>
            )}

            <section className="pd-tech-stack-section">
              <h2 className="pd-section-heading"><TechIcon /> Tech Stack</h2>
              <div className="pd-tech-tags-container">
                {project.techStack && project.techStack.length > 0 && project.techStack[0] !== 'N/A' ? (
                  project.techStack.map((tech, index) => (
                    <span key={index} className="pd-tech-tag">{tech}</span>
                  ))
                ) : (
                  <p className="pd-no-info-text">Not specified.</p>
                )}
              </div>
            </section>

            <section className="pd-project-links-section">
              <h2 className="pd-section-heading"><LinkIcon /> Project Links</h2>
              <div className="pd-link-buttons-wrapper">
                {(project.githubUrl && project.githubUrl !== '#') || (project.liveDemoUrl && project.liveDemoUrl !== '#') ? (
                  <>
                    {project.githubUrl && project.githubUrl !== '#' && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="pd-action-link-button">View GitHub Repo</a>
                    )}
                    {project.liveDemoUrl && project.liveDemoUrl !== '#' && (
                      <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer" className="pd-action-link-button">View Live Demo</a>
                    )}
                  </>
                ) : (
                  <p className="pd-no-info-text">No public links provided.</p>
                )}
              </div>
            </section>

            <section className="pd-share-project-section">
              <h2 className="pd-section-heading"><ShareIcon /> Share this Project</h2>
              <div className="pd-social-share-buttons">
                <button onClick={() => handleSocialShare('Twitter')} className="pd-social-button">Twitter</button>
                <button onClick={() => handleSocialShare('Facebook')} className="pd-social-button">Facebook</button>
                <button onClick={() => handleSocialShare('LinkedIn')} className="pd-social-button">LinkedIn</button>
              </div>
            </section>
          </main>

          {/* --- Sidebar Area (Right) --- */}
          <aside className="pd-sidebar-area">
            <section className="pd-sidebar-widget pd-interest-widget">
              <h3 className="pd-widget-title"><PriceIcon /> Interested?</h3>
              {project.price > 0 && (
                <p className="pd-widget-price-display">Price: <span>${project.price.toLocaleString()}</span></p>
              )}
              {project.price === 0 && project.lookingFor && project.lookingFor.toLowerCase().includes('investment') && (
                <p className="pd-widget-price-display">Seeking: <span>{project.lookingFor}</span></p>
              )}
              {project.price === 0 && !(project.lookingFor && project.lookingFor.toLowerCase().includes('investment')) && (
                <p className="pd-widget-price-display"><span>Contact for Details</span></p>
              )}
              <button onClick={handleContactSeller} className="pd-contact-seller-button">
                Contact Seller
              </button>
              {/* --- ADD TO CART BUTTON --- */}
              <button onClick={() => handleAddToCart(project)} className="pd-add-to-cart-button">
                <CartIcon /> Add to Cart
              </button>
            </section>

            <section className="pd-sidebar-widget pd-seller-widget">
              <h3 className="pd-widget-title"><UserIcon /> Seller Information</h3>
              {project.seller ? (
                <div className="pd-seller-info-content">
                  {project.seller.avatar && (
                    <img src={project.seller.avatar} alt={project.seller.name} className="pd-seller-avatar-img"/>
                  )}
                  <div className="pd-seller-text-details">
                    <span className="pd-seller-main-name">{project.seller.name || 'N/A'}</span>
                    {project.seller.rating && (
                      <span className="pd-seller-detail-item">
                        <StarIcon /> {project.seller.rating.toFixed(1)} Rating
                      </span>
                    )}
                    <span className="pd-seller-detail-item">
                      Member Since: {project.seller.memberSince ? new Date(project.seller.memberSince).toLocaleDateString() : 'N/A'}
                    </span>
                    <a href="#sellers-other-projects" className="pd-seller-other-link" onClick={(e) => { e.preventDefault(); alert("Navigate to seller's other projects"); }}>
                      View other projects by this seller
                    </a>
                  </div>
                </div>
              ) : (
                <p className="pd-no-info-text">Seller information not available.</p>
              )}
            </section>

            <div className="pd-report-listing-action">
              <a href="#report" className="pd-report-action-link" onClick={(e) => {e.preventDefault(); handleReportListing();}}>
                <ReportIcon /> Report this listing
              </a>
            </div>
          </aside>
        </div>

        <footer className="pd-page-footer">
          <p>© {new Date().getFullYear()} MicroStartupX. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
};

export default ProjectDetails;