import React from 'react';
import '../style/LandingPage.css'; // Path to your CSS

// Placeholder icons
const RocketIcon = () => <span className="icon-placeholder">🚀</span>;
const LightbulbIcon = () => <span className="icon-placeholder">💡</span>;
const BriefcaseIcon = () => <span className="icon-placeholder">💼</span>;
const ChartIcon = () => <span className="icon-placeholder">📈</span>;
const ArrowRightIcon = () => <span className="icon-placeholder">→</span>;


const LandingPage = () => {
  // --- Data Arrays (Investor Basics images updated) ---
  const categories = [
    { icon: <RocketIcon />, title: 'Early Stage Tech', description: 'Invest in innovative technology startups shaping the future.', link: '/explore/tech' },
    { icon: <LightbulbIcon />, title: 'Creative Projects', description: 'Support and fund unique creative endeavors and artistic visions.', link: '/explore/creative' },
    { icon: <BriefcaseIcon />, title: 'Small Businesses', description: 'Empower local and growing businesses with your backing.', link: '/explore/smb' },
    { icon: <ChartIcon />, title: 'Growth Equity', description: 'Participate in funding rounds for scaling companies.', link: '/explore/growth' },
  ];

  const investorBasics = [
    { title: 'Understanding Micro-Startups', illustration: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=600&q=70&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHNtYWxsJTIwYnVzaW5lc3MlMjBsZWFybmluZ3xlbnwwfHwwfHx8MA%3D%3D', link: '/learn/micro-startups', bgColorClass: 'bg-emerald-light-unique' },
    { title: 'How to Invest with Us', illustration: 'https://images.unsplash.com/photo-1554260570-e9689a3418b8?auto=format&fit=crop&w=600&q=70&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGludmVzdG1lbnQlMjBtZWV0aW5nfGVufDB8fDB8fHww', link: '/learn/how-to-invest', bgColorClass: 'bg-sky-light-unique' },
    { title: 'Our Due Diligence Standards', illustration: 'https://images.unsplash.com/photo-1579567761406-46847b38acc6?auto=format&fit=crop&w=600&q=70&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZHVlJTIwZGlsaWdlbmNlfGVufDB8fDB8fHww', link: '/learn/due-diligence', bgColorClass: 'bg-violet-light-unique' },
  ];

  const featuredSectors = [
    { tag: 'HOT RIGHT NOW', title: 'AI & Machine Learning', backgroundImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=70', link: '/sectors/ai-ml' },
    { tag: 'GROWING FAST', title: 'Sustainable Tech', backgroundImage: 'https://images.unsplash.com/photo-1509390480408-669801dd0084?auto=format&fit=crop&w=600&q=70', link: '/sectors/sustainability' },
    { tag: 'EMERGING', title: 'Web3 & Blockchain', backgroundImage: 'https://images.unsplash.com/photo-1642104790590-054607ac59c4?auto=format&fit=crop&w=600&q=70', link: '/sectors/web3' },
  ];

  const howItWorksSteps = [
    { number: '01', title: 'Discover Opportunities', description: 'Browse vetted startups and projects across various industries that align with your interests.' },
    { number: '02', title: 'Review & Research', description: 'Access detailed information, pitch decks, and financials to make informed decisions.' },
    { number: '03', title: 'Invest or Fund', description: 'Easily commit capital to the projects you believe in through our secure platform.' },
    { number: '04', title: 'Track & Grow', description: 'Monitor your portfolio, receive updates, and be part of the startup journey.' },
  ];

  const articles = [
    { image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=400&q=60', category: 'Founder Insights', title: 'Navigating Early-Stage Funding Challenges', author: 'Jane Doe', date: '3 days ago', link: '/blog/early-stage-funding' },
    { image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=400&q=60', category: 'Market Trends', title: 'The Rise of Micro-SaaS: Opportunities for 2025', author: 'John Smith', date: '1 week ago', link: '/blog/micro-saas-trends' },
    { image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=60', category: 'Platform News', title: 'MicroStartupX Hits 1,000 Funded Projects!', author: 'Team MicroStartupX', date: '2 weeks ago', link: '/blog/platform-milestone' },
    { image: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&w=400&q=60', category: 'Investor Tips', title: 'Building a Diversified Micro-Startup Portfolio', author: 'Alice Brown', date: '1 month ago', link: '/blog/diversified-portfolio' },
  ];

  return (
    <>
      {/* 
        A typical application structure would have a Navbar component here, rendered above this page content.
        The padding-top on .hero-section-republic (via --navbar-height) accounts for its height.
      */}

      {/* Hero Section - New Hero Image URL */}
      <section id="hero" className="hero-section-republic">
        <div className="hero-content-republic"> {/* Full-width flex container */}
          <div className="hero-text-column-republic">
            <div className="hero-text-content-inner-republic"> {/* Inner container for text padding/max-width */}
              <h1 className="hero-main-title-republic">Invest in the Future. Build with Us.</h1>
              <p className="hero-sub-text-republic">
                MicroStartupX is where innovative startups connect with passionate investors and builders.
                Discover, fund, and grow the next wave of groundbreaking companies.
              </p>
              <div className="hero-buttons-container-republic">
                {/* MODIFIED HERE: href changed to "/login" */}
                <a href="/login" className="button-unique hero-cta-button-republic">Get Started</a>
                <a href="/explore" className="button-unique hero-explore-button-republic">Explore</a>
              </div>
            </div>
          </div>
          <div className="hero-image-column-republic">
            <img
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1500&q=80"
              alt="Team of three collaborating around a laptop in a modern office"
              className="hero-main-image-republic"
            />
          </div>
        </div>
      </section>


      {/* Categories Section */}
      <section id="categories" className="snap-section categories-section-unique">
        <div className="container-unique">
          <h2 className="section-title-unique">Browse Opportunities by Type</h2>
          <div className="categories-grid-unique">
            {categories.map((category, index) => <CategoryCard key={index} {...category} />)}
          </div>
        </div>
      </section>

      {/* Learn Investor Basics Section */}
      <section id="investor-basics" className="snap-section investor-basics-section-unique scrollbar-standard">
        <div className="container-unique">
          <h2 className="section-title-unique">Learn the Investor Basics</h2>
          <p className="section-subtitle-unique">
            Discover how to invest with us, what a nominee is, and why our due diligence standards are industry leading.
          </p>
          <div className="investor-basics-grid-unique">
            {investorBasics.map((item, index) => <InvestorBasicCard key={index} {...item} />)}
          </div>
        </div>
      </section>

      {/* Featured Sectors Section */}
      <section id="featured-sectors" className="snap-section featured-sectors-section-unique">
        <div className="container-unique">
          <h2 className="section-title-unique">Featured Sectors</h2>
          <p className="section-subtitle-unique">
            Explore diverse businesses to invest in, uniting primary raises and secondary sellers in one marketplace.
          </p>
          <div className="featured-sectors-grid-unique">
            {featuredSectors.map((sector, index) => <SectorCard key={index} {...sector} />)}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="snap-section how-it-works-section-unique attractive-how-it-works">
        <div className="container-unique">
          <h2 className="section-title-unique">How MicroStartupX Works</h2>
          <div className="steps-container-unique">
            {howItWorksSteps.map((step, index) => <StepCard key={index} {...step} /> )}
          </div>
        </div>
      </section>

      {/* Articles Section - Adjusted header alignment */}
      <section id="articles" className="snap-section articles-section-unique scrollbar-hidden">
        <div className="container-unique articles-header-container-unique">
          <div className="articles-header-unique">
            <div className="articles-header-text-content-unique">
              <h2 className="section-title-unique">From Our Blog</h2>
              <p className="section-subtitle-unique">
                Latest blogs, press releases, market updates, and founder interviews on micro-startups and private investing.
              </p>
            </div>
            <a href="/blog" className="view-all-articles-link-unique">View all <ArrowRightIcon/></a>
          </div>
        </div>
        <div className="articles-carousel-outer-container-unique">
            <div className="articles-carousel-unique">
                {articles.map((article, index) => <ArticleCard key={index} {...article} />)}
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="snap-section footer-unique">
         <div className="container-unique footer-content-unique">
          <div className="footer-top-unique">
            <div className="footer-logo-area-unique">
              <h3 className="footer-logo-text-unique">MicroStartupX</h3>
              <p className="footer-tagline-unique">Powering Startup Innovation.</p>
            </div>
            <div className="footer-links-column-unique">
              <h4>Explore</h4>
              <a href="/explore/tech" className="footer-link-unique">Tech Startups</a>
              <a href="/explore/creative" className="footer-link-unique">Creative Projects</a>
              <a href="/explore/smb" className="footer-link-unique">Small Businesses</a>
            </div>
            <div className="footer-links-column-unique">
              <h4>For Founders</h4>
              <a href="/list-project" className="footer-link-unique">List Your Project</a>
              <a href="/resources" className="footer-link-unique">Founder Resources</a>
              <a href="/faq-founders" className="footer-link-unique">FAQ</a>
            </div>
            <div className="footer-links-column-unique">
              <h4>Company</h4>
              <a href="/about" className="footer-link-unique">About Us</a>
              <a href="/contact" className="footer-link-unique">Contact</a>
              <a href="/terms" className="footer-link-unique">Terms</a>
              <a href="/privacy" className="footer-link-unique">Privacy</a>
            </div>
          </div>
          <div className="footer-bottom-unique">
            <p>© {new Date().getFullYear()} MicroStartupX. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

// --- Reusable Components (ensure classNames end with -unique) ---
const CategoryCard = ({ icon, title, description, link }) => (
  <a href={link} className="category-card-unique">
    <div className="category-card-icon-unique">{icon}</div>
    <h3 className="category-card-title-unique">{title}</h3>
    <p className="category-card-description-unique">{description}</p>
    <span className="category-card-link-unique">Explore <ArrowRightIcon/></span>
  </a>
);

const InvestorBasicCard = ({ title, illustration, link, bgColorClass }) => (
  <a href={link} className={`investor-basic-card-unique ${bgColorClass}`}>
    <div className="investor-basic-card-illustration-unique">
      <img src={illustration} alt={title} />
    </div>
    <h3 className="investor-basic-card-title-unique">{title}</h3>
  </a>
);

const SectorCard = ({ tag, title, backgroundImage, link }) => (
  <a href={link} className="sector-card-unique" style={{ backgroundImage: `url(${backgroundImage})` }}>
    <div className="sector-card-overlay-unique"></div>
    <div className="sector-card-content-unique">
      <span className="sector-card-tag-unique">{tag}</span>
      <h3 className="sector-card-title-unique">{title}</h3>
      <span className="sector-card-link-unique">Explore Sector <ArrowRightIcon/></span>
    </div>
  </a>
);

const StepCard = ({ number, title, description }) => (
  <div className="step-card-unique">
    <div className="step-number-container-unique">
      <span className="step-number-unique">{number}</span>
    </div>
    <div className="step-content-unique">
      <h3 className="step-title-unique">{title}</h3>
      <p className="step-description-unique">{description}</p>
    </div>
  </div>
);

const ArticleCard = ({ image, category, title, author, date, link }) => (
  <a href={link} className="article-card-unique">
    <div className="article-card-image-unique">
      <img src={image} alt={title} />
    </div>
    <div className="article-card-content-unique">
      <span className="article-card-category-unique">{category}</span>
      <h3 className="article-card-title-unique">{title}</h3>
      <p className="article-card-meta-unique">{author} • {date}</p>
    </div>
  </a>
);

export default LandingPage;