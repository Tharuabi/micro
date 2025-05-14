import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Home.css'; // Ensure this path is correct

// Import local images
import featuredImage1 from '../assets/home5.jpg'; // Adjust path if your assets folder is elsewhere
import featuredImage2 from '../assets/image2.jpg.jpg'; // Corrected typo from image2.jpg.jpg
import featuredImage3 from '../assets/image3.jpg';

// Placeholder Icons (can be replaced with actual icon components/SVGs)
const StarIcon = () => <span className="icon-rating">★</span>;
const HeartIcon = () => <span className="icon-like">♥</span>;

const dummyFeaturedProjects = [
  {
    id: '1',
    title: 'Recipe Finder App',
    description: 'An app to discover recipes and meal ideas with user ratings and favorites. Explore thousands of culinary delights from around the globe.',
    price: '$350',
    category: 'App',
    techStack: ['React', 'Node.js', 'MongoDB', 'API'],
    image: featuredImage1, // Use the imported variable
    rating: 4.8,
    likes: 215,
  },
  {
    id: '2',
    title: 'Productivity MVP', 
    description: 'A minimalistic task management app with reminders and deadlines. Perfect for personal productivity or small team task management.',
    price: '$150',
    category: 'MVP',
    techStack: ['Vue.js', 'Firebase'],
    image: featuredImage2, // Use the imported variable
    rating: 4.5,
    likes: 120,
  },
  {
    id: '3',
    title: 'ClipShare Social', 
    description: 'A social media platform focused on sharing short video clips. Engage with a vibrant community and showcase your creativity.',
    price: '$500',
    category: 'App',
    techStack: ['Next.js', 'Express', 'PostgreSQL'],
    image: featuredImage3, // Use the imported variable
    rating: 4.2,
    likes: 350,
  },
];

const Home = () => {
  const dummyExploreProjectsData = [
    {
      id: 'ex1',
      title: 'Modern E-commerce Store', 
      price: '$1250',
      category: 'eCommerce',
      techStack: ['Shopify', 'Liquid', 'JS'],
      description: 'A fully functional e-commerce store template for modern brands. Easily customizable and scalable for your business needs.',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=400&q=70', 
      rating: 4.9,
      likes: 480,
    },
    {
      id: 'ex2',
      title: 'SaaS Dashboard Kit', 
      price: '$800',
      category: 'SaaS',
      techStack: ['Node.js', 'React', 'Stripe'],
      description: 'A starter kit for building subscription-based software products quickly. Includes authentication, payments, and more.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=70', 
      rating: 4.7,
      likes: 190,
    },
     {
      id: 'ex3',
      title: 'Travel Blog Theme',
      price: '$220',
      category: 'Website',
      techStack: ['WordPress', 'PHP', 'CSS'],
      description: 'A beautiful and responsive theme for travel bloggers and content creators. SEO optimized and easy to use.',
      image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=400&q=70', 
      rating: 4.6,
      likes: 155,
    },
  ];

  return (
    <div className="home-page-container">
      <header className="home-header-section">
        <h1 className="home-main-heading">Welcome to Micro-Startup Marketplace</h1>
        <p className="home-subheading">
          Explore, list, and sell small startup projects like websites, apps, and MVPs.
        </p>
        <div className="home-header-buttons">
          <Link to="/explore" className="home-btn home-btn-primary">
            Explore Startups
          </Link>
          <Link to="/post-project" className="home-btn home-btn-secondary">
            Post a Project
          </Link>
        </div>
      </header>

      <section className="home-content-section">
        <h2 className="home-section-heading">Featured Projects</h2>
        <div className="home-projects-grid featured-projects-grid">
          {dummyFeaturedProjects.map(project => (
            <div key={project.id} className="home-project-card">
              <Link to={`/project/${project.id}`} className="home-card-image-link">
                <div className="home-card-image-container">
                  {/* Fallback for image prop if it's somehow undefined, though imports should work */}
                  <img src={project.image || 'featuredImage3'} alt={project.title} className="home-card-image"/>
                </div>
              </Link>
              <div className="home-card-content">
                <h3 className="home-card-title">
                  <Link to={`/project/${project.id}`}>{project.title}</Link>
                </h3>
                <p className="home-card-description">{project.description}</p>
                
                <div className="home-card-tech-stack">
                  {project.techStack.map((tech, index) => (
                    <span key={index} className="home-tech-badge">{tech}</span>
                  ))}
                </div>

                <div className="home-card-feedback">
                  <span className="home-card-rating">
                    <StarIcon /> {project.rating.toFixed(1)}
                  </span>
                  <span className="home-card-likes">
                    <HeartIcon /> {project.likes}
                  </span>
                </div>
              </div>
              <div className="home-card-footer">
                  <span className="home-card-price">{project.price}</span>
                  <Link to={`/project/${project.id}`} className="home-btn home-btn-view-details">
                    View Details
                  </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="home-content-section">
        <h2 className="home-section-heading">Explore Projects</h2>
        <div className="home-projects-grid explore-projects-grid"> 
          {dummyExploreProjectsData.map((project) => (
             <div key={project.id} className="home-project-card">
              <Link to={`/project/${project.id}`} className="home-card-image-link">
                <div className="home-card-image-container">
                  <img src={project.image || 'https://via.placeholder.com/400x250/CBD5E0/4A5568?text=Explore'} alt={project.title} className="home-card-image"/>
                </div>
              </Link>
              <div className="home-card-content">
                <h3 className="home-card-title">
                   <Link to={`/project/${project.id}`}>{project.title}</Link>
                </h3>
                <p className="home-card-description">{project.description}</p>
                
                <div className="home-card-tech-stack">
                  {project.techStack.map((tech, index) => (
                    <span key={index} className="home-tech-badge">{tech}</span>
                  ))}
                </div>

                <div className="home-card-feedback">
                  <span className="home-card-rating">
                    <StarIcon /> {project.rating.toFixed(1)}
                  </span>
                  <span className="home-card-likes">
                    <HeartIcon /> {project.likes}
                  </span>
                </div>
              </div>
              <div className="home-card-footer">
                  <span className="home-card-price">{project.price}</span>
                   <Link to={`/project/${project.id}`} className="home-btn home-btn-view-details">
                    View Details
                  </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;