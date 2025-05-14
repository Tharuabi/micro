import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/Dashboard.css'; // We will create/update this CSS file

// --- ICONS --- (Using emojis that roughly match the image's intent)
const IconProjectsUploaded = () => <span className="dash-icon-custom">📊</span>; // Bar chart for projects
const IconTotalEarnings = () => <span className="dash-icon-custom">💰</span>;  // Money bag
const IconTotalViews = () => <span className="dash-icon-custom">👁️</span>;     // Eye
const IconTotalLikes = () => <span className="dash-icon-custom">❤️</span>;     // Heart
const IconTotalInquiries = () => <span className="dash-icon-custom">💬</span>; // Speech bubble

// Generic icons (can be kept or replaced if you have a proper icon library)
const IconProjects = () => <span className="dash-icon">📊</span>;
const IconEarnings = () => <span className="dash-icon">💰</span>;
const IconUsers = () => <span className="dash-icon">👥</span>;
const IconPerformance = () => <span className="dash-icon">📈</span>;
const IconNotification = () => <span className="dash-icon">🔔</span>;

const IconEdit = () => <span className="dash-action-icon">✏️</span>;
const IconDelete = () => <span className="dash-action-icon">🗑️</span>;
const IconAdd = () => <span className="dash-action-icon">➕</span>;
const IconProfile = () => <span className="dash-action-icon">👤</span>;
const IconPurchases = () => <span className="dash-action-icon">🛒</span>;
const IconApprove = () => <span className="dash-action-icon">✔️</span>;
const IconReject = () => <span className="dash-action-icon">❌</span>;
const IconViewDetails = () => <span className="dash-action-icon">📄</span>;


// --- DUMMY DATA ---
const dummyCurrentUserData = {
  id: 'user123',
  name: 'Alex Developer',
  role: 'user', // Can be 'user' or 'admin'
};

const initialUserProjectsData = [
  // Match the number of projects in the image and their status for accurate styling
  { id: 'p1', title: 'EcoFriendly Marketplace', status: 'Approved', price: 1200, views: 12100, likes: 250, inquiries: 15, earnings: 1100, isSold: true },
  { id: 'p2', title: 'AI Fitness Coach', status: 'Approved', price: 950, views: 5200, likes: 180, inquiries: 8, earnings: 0, isSold: false },
  { id: 'p4', title: 'Indie Game MVP', status: 'Pending', price: 250, views: 1100, likes: 45, inquiries: 2, earnings: 0, isSold: false },
  // Add more if they appear below the fold in your image
];

// Updated to reflect the 5 stats from the image
const userStatsDataFromImage = {
  projectsUploaded: 4,      // From image
  totalEarnings: 1100,    // From image
  totalViews: 18750,      // From image
  totalLikes: 485,        // From image
  totalInquiries: 26,       // From image
};


const allMarketplaceProjectsData = [
  ...initialUserProjectsData,
  { id: 'p5', userId: 'user456', userName: 'Jane Designer', title: 'Portfolio Website Template', status: 'Approved', price: 150, views: 8000, likes: 190, inquiries: 10, dateListed: '2023-09-20', earnings: 130, isSold: true },
  { id: 'p6', userId: 'user789', userName: 'Mike Coder', title: 'Task Management App', status: 'Pending', price: 400, views: 500, likes: 20, inquiries: 0, dateListed: '2023-12-05', earnings: 0, isSold: false },
];

const dummyAdminStats = {
  totalProjectsSubmitted: allMarketplaceProjectsData.length,
  totalUsers: 150,
  activeUsers: 120,
  overallSales: allMarketplaceProjectsData.reduce((sum, p) => sum + (p.isSold ? p.price : 0), 0),
  marketplaceEarnings: allMarketplaceProjectsData.reduce((sum, p) => sum + (p.isSold ? p.price * 0.1 : 0), 0),
  pendingApprovalCount: allMarketplaceProjectsData.filter(p => p.status === 'Pending').length,
};


const Dashboard = () => {
  const [currentUser, setCurrentUser] = useState(dummyCurrentUserData);
  const [userProjects, setUserProjects] = useState(initialUserProjectsData);
  const [userStats, setUserStats] = useState(userStatsDataFromImage); // Use new stats
  const [allProjects, setAllProjects] = useState(allMarketplaceProjectsData);
  const navigate = useNavigate();

  const toggleRole = () => {
    setCurrentUser(prev => ({
      ...prev,
      role: prev.role === 'user' ? 'admin' : 'user'
    }));
     // When switching to user, reset to user-specific stats
    if (currentUser.role === 'admin') { // about to switch to user
        setUserStats(userStatsDataFromImage);
    }
  };

  const handleDeleteProject = (projectId, projectTitle) => {
    if (window.confirm(`Are you sure you want to delete "${projectTitle}"?`)) {
      if (currentUser.role === 'user') {
        setUserProjects(current => current.filter(p => p.id !== projectId));
        setAllProjects(current => current.filter(p => p.id !== projectId));
      } else if (currentUser.role === 'admin') {
        setAllProjects(current => current.filter(p => p.id !== projectId));
      }
      console.log(`Project ${projectId} deleted.`);
    }
  };

  const handleEditProject = (projectId) => navigate(`/edit-project/${projectId}`);

  const handleProjectApproval = (projectId, newStatus) => {
    const reason = newStatus === 'Rejected' ? prompt("Enter rejection reason (optional):") || "Not specified." : undefined;
    setAllProjects(currentProjects =>
      currentProjects.map(p =>
        p.id === projectId ? { ...p, status: newStatus, rejectionReason: reason } : p
      )
    );
    setUserProjects(currentProjects =>
        currentProjects.map(p =>
          p.id === projectId ? { ...p, status: newStatus, rejectionReason: reason } : p
        )
    );
    console.log(`Project ${projectId} status changed to ${newStatus}`);
  };

  // --- JSX for User Dashboard (Updated to match image structure) ---
  const UserDashboard = () => (
    <>
      <section className="dashboard-welcome-header">
        <h1>Welcome back, {currentUser.name}!</h1>
        <p>Manage your projects and track your performance.</p>
      </section>

      <section className="dashboard-stats-grid">
        {/* Card 1: Projects Uploaded */}
        <div className="dash-stat-card">
          <IconProjectsUploaded />
          <span className="dash-stat-value">{userStats.projectsUploaded}</span>
          <span className="dash-stat-label">Projects Uploaded</span>
        </div>
        {/* Card 2: Total Earnings */}
        <div className="dash-stat-card">
          <IconTotalEarnings />
          <span className="dash-stat-value">${userStats.totalEarnings.toLocaleString()}</span>
          <span className="dash-stat-label">Total Earnings</span>
        </div>
        {/* Card 3: Total Views */}
        <div className="dash-stat-card">
          <IconTotalViews />
          <span className="dash-stat-value">{userStats.totalViews.toLocaleString()}</span>
          <span className="dash-stat-label">Total Views</span>
        </div>
        {/* Card 4: Total Likes */}
        <div className="dash-stat-card">
          <IconTotalLikes />
          <span className="dash-stat-value">{userStats.totalLikes.toLocaleString()}</span>
          <span className="dash-stat-label">Total Likes</span>
        </div>
        {/* Card 5: Total Inquiries */}
        <div className="dash-stat-card">
          <IconTotalInquiries />
          <span className="dash-stat-value">{userStats.totalInquiries.toLocaleString()}</span>
          <span className="dash-stat-label">Total Inquiries</span>
        </div>
      </section>

      <section className="dashboard-projects-section">
        <div className="dashboard-section-header">
          <h2 className="dashboard-section-title">Your Projects</h2>
          <Link to="/add-project" className="dash-btn dash-btn-primary add-project-btn">
            <IconAdd /> Add New Project
          </Link>
        </div>
        {userProjects.length > 0 ? (
          <div className="dash-table-container">
            <table className="dash-projects-table">
              <thead>
                <tr>
                  <th>TITLE</th>
                  <th>STATUS</th>
                  <th>PRICE</th>
                  <th>VIEWS</th>
                  <th>LIKES</th>
                  <th>INQUIRIES</th>
                  <th>EARNINGS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {userProjects.map(p => (
                  <tr key={p.id}>
                    <td data-label="TITLE">{p.title}</td>
                    <td data-label="STATUS">
                      <span className={`dash-status-badge status-${p.status.toLowerCase().replace(/\s+/g, '-')}`}>
                        {p.status}
                      </span>
                      {p.status === 'Rejected' && p.rejectionReason && (
                        <small className="dash-rejection-reason">Reason: {p.rejectionReason}</small>
                      )}
                    </td>
                    <td data-label="PRICE">${p.price.toLocaleString()}</td>
                    <td data-label="VIEWS">{p.views.toLocaleString()}</td>
                    <td data-label="LIKES">{p.likes.toLocaleString()}</td>
                    <td data-label="INQUIRIES">{p.inquiries.toLocaleString()}</td>
                    <td data-label="EARNINGS">${p.earnings.toLocaleString()}</td>
                    <td data-label="ACTIONS" className="dash-actions-cell">
                      <button onClick={() => handleEditProject(p.id)} className="dash-action-btn edit-btn" title="Edit"><IconEdit /></button>
                      <button onClick={() => handleDeleteProject(p.id, p.title)} className="dash-action-btn delete-btn" title="Delete" disabled={p.isSold}><IconDelete /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="dash-no-items">You haven't listed any projects yet. <Link to="/add-project">Add your first project!</Link></p>
        )}
      </section>
      
      {/* Account Management section can be styled similarly or kept as is for now */}
      <section className="dashboard-section dashboard-other-actions">
         <h2 className="dashboard-section-title">Account Management</h2>
         <div className="dash-action-links">
            <Link to="/profile/edit" className="dash-btn dash-btn-secondary">
                <IconProfile /> Edit Profile
            </Link>
            <Link to="/purchases" className="dash-btn dash-btn-secondary">
               <IconPurchases/> View Purchases
            </Link>
         </div>
      </section>
    </>
  );

  // --- JSX for Admin Dashboard (remains structurally similar, will benefit from new CSS) ---
  const AdminDashboard = () => {
    const topPerformingProjects = [...allProjects]
        .filter(p => p.status === 'Approved' || p.isSold)
        .sort((a, b) => (b.views + b.likes * 10 + b.inquiries * 5) - (a.views + a.likes * 10 + a.inquiries * 5))
        .slice(0, 3);

    return (
    <>
      <section className="dashboard-welcome-header"> {/* Use same class for consistency */}
        <h1>Admin Dashboard</h1>
        <p>Oversee marketplace activity and manage content.</p>
      </section>

      <section className="dashboard-stats-grid">
        <div className="dash-stat-card">
          <IconProjects /><span className="dash-stat-value">{dummyAdminStats.totalProjectsSubmitted}</span><span className="dash-stat-label">Total Projects</span>
        </div>
        <div className="dash-stat-card">
          <IconUsers /><span className="dash-stat-value">{dummyAdminStats.totalUsers}</span><span className="dash-stat-label">Total Users</span>
        </div>
        <div className="dash-stat-card">
          <IconUsers /><span className="dash-stat-value">{dummyAdminStats.activeUsers}</span><span className="dash-stat-label">Active Users</span>
        </div>
        <div className="dash-stat-card">
          <IconEarnings /><span className="dash-stat-value">${dummyAdminStats.overallSales.toLocaleString()}</span><span className="dash-stat-label">Overall Sales</span>
        </div>
        <div className="dash-stat-card">
          <IconEarnings /><span className="dash-stat-value">${dummyAdminStats.marketplaceEarnings.toLocaleString()}</span><span className="dash-stat-label">Marketplace Earnings</span>
        </div>
        <div className="dash-stat-card">
          <IconNotification /><span className="dash-stat-value">{dummyAdminStats.pendingApprovalCount}</span><span className="dash-stat-label">Pending Approval</span>
        </div>
      </section>

      <section className="dashboard-projects-section"> {/* Use same class */}
        <div className="dashboard-section-header">
            <h2 className="dashboard-section-title">Project Management</h2>
             {/* Optional: Add button for admin specific actions */}
        </div>
        {allProjects.length > 0 ? (
          <div className="dash-table-container">
            <table className="dash-projects-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Submitted By</th>
                  <th>Status</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {allProjects.map(p => (
                  <tr key={p.id}>
                    <td data-label="Title">{p.title}</td>
                    <td data-label="Submitted By">{p.userName || 'N/A'}</td>
                    <td data-label="Status">
                      <span className={`dash-status-badge status-${p.status.toLowerCase().replace(/\s+/g, '-')}`}>
                        {p.status}
                      </span>
                       {p.status === 'Rejected' && p.rejectionReason && (
                        <small className="dash-rejection-reason">Reason: {p.rejectionReason}</small>
                      )}
                    </td>
                    <td data-label="Price">${p.price.toLocaleString()}</td>
                    <td data-label="Actions" className="dash-actions-cell">
                      <Link to={`/project/${p.id}`} className="dash-action-btn" title="View Details"><IconViewDetails /></Link>
                      {p.status === 'Pending' && (
                        <>
                          <button onClick={() => handleProjectApproval(p.id, 'Approved')} className="dash-action-btn approve-btn" title="Approve"><IconApprove /></button>
                          <button onClick={() => handleProjectApproval(p.id, 'Rejected')} className="dash-action-btn reject-btn" title="Reject"><IconReject /></button>
                        </>
                      )}
                      {(p.status === 'Approved' && !p.isSold) && (
                         <button onClick={() => handleProjectApproval(p.id, 'Rejected')} className="dash-action-btn reject-btn" title="Reject/Unlist"><IconReject /></button>
                      )}
                      <button onClick={() => handleEditProject(p.id)} className="dash-action-btn edit-btn" title="Edit (Admin)"><IconEdit /></button>
                      <button onClick={() => handleDeleteProject(p.id, p.title)} className="dash-action-btn delete-btn" title="Delete"><IconDelete /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="dash-no-items">No projects submitted to the marketplace yet.</p>
        )}
      </section>

      <section className="dashboard-section">
        <h2 className="dashboard-section-title">Top Performing Projects</h2>
        {topPerformingProjects.length > 0 ? (
            <ul className="dash-list">
                {topPerformingProjects.map(p => (
                    <li key={p.id} className="dash-list-item">
                        <Link to={`/project/${p.id}`}>{p.title}</Link>
                        <span> - {p.views.toLocaleString()} views, {p.likes.toLocaleString()} likes</span>
                    </li>
                ))}
            </ul>
        ) : (
            <p className="dash-no-items">Not enough data for top performing projects.</p>
        )}
      </section>
    </>
    );
  };


  return (
    <div className="dashboard-page-container"> {/* Renamed for clarity with body styling */}
      {/* Role switcher can be kept for demo or removed if auth handles roles */}
      <div className="dashboard-role-switcher">
        <span>Viewing as: <strong>{currentUser.role.toUpperCase()}</strong></span>
        <button onClick={toggleRole} className="dash-btn dash-btn-secondary dash-btn-small">
          Switch to {currentUser.role === 'user' ? 'Admin' : 'User'} View
        </button>
      </div>

      <div className="dashboard-content-area"> {/* Main content wrapper */}
        {currentUser.role === 'user' ? <UserDashboard /> : <AdminDashboard />}
      </div>
    </div>
  );
};

export default Dashboard;