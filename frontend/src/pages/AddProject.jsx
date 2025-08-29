import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/AddProject.css';

const AddProject = () => {
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [category, setCategory] = useState('');
  const [techStack, setTechStack] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [githubUrl, setGithubUrl] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const categories = ['SaaS', 'App', 'eCommerce', 'MVP', 'Domain', 'Website', 'Bot', 'Other'];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      setErrors(prev => ({ ...prev, image: null }));
    } else {
      setImage(null);
      setImagePreview(null);
      setErrors(prev => ({ ...prev, image: 'Please select a valid image file.' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Title is required.';
    if (!shortDescription.trim()) newErrors.shortDescription = 'Short description is required.';
    if (shortDescription.length > 200) newErrors.shortDescription = 'Max 200 characters.';
    if (!category) newErrors.category = 'Category is required.';
    if (!techStack.trim()) newErrors.techStack = 'Tech stack is required.';
    if (!price || isNaN(price) || price <= 0) newErrors.price = 'Valid price required.';
    if (!image) newErrors.image = 'Project image is required.';
    if (githubUrl && !githubUrl.startsWith('http')) newErrors.githubUrl = 'Enter valid GitHub URL.';
    if (demoUrl && !demoUrl.startsWith('http')) newErrors.demoUrl = 'Enter valid demo URL.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmissionSuccess(false);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('shortDescription', shortDescription);
    formData.append('longDescription', longDescription);
    formData.append('category', category);
    formData.append('techStack', techStack);
    formData.append('price', price);
    formData.append('image', image);
    formData.append('githubUrl', githubUrl);
    formData.append('demoUrl', demoUrl);

    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setSubmissionSuccess(true);
        setTimeout(() => {
          setTitle('');
          setShortDescription('');
          setLongDescription('');
          setCategory('');
          setTechStack('');
          setPrice('');
          setImage(null);
          setImagePreview(null);
          setGithubUrl('');
          setDemoUrl('');
          setSubmissionSuccess(false);
          // navigate('/explore');
        }, 3000);
      } else {
        let errorMsg = 'Error submitting project.';
        try {
          const errorData = await response.json();
          errorMsg = errorData.message || errorMsg;
        } catch (jsonErr) {
          // Not JSON, keep default
        }
        alert(errorMsg);
      }
    } catch (error) {
      console.error('Submit Error:', error);
      alert('Something went wrong. Please check your network or try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-project-container">
      <button className="dashboard-add-btn" style={{marginBottom: 24}} onClick={() => navigate('/add-idea')}>Post Idea</button>
      <h1 className="ap-main-title">List Your Project</h1>
      <p className="ap-subtitle">Fill in the details below to list your micro-startup.</p>

      {submissionSuccess && (
        <div className="ap-success-message">Project submitted successfully!</div>
      )}

      <form onSubmit={handleSubmit} className="ap-form" noValidate>
        {/* Title */}
        <div className="ap-form-group">
          <label>Project Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`ap-input ${errors.title ? 'ap-input-error' : ''}`}
            required
          />
          {errors.title && <p className="ap-error-text">{errors.title}</p>}
        </div>

        {/* Short Description */}
        <div className="ap-form-group ap-form-group--full">
          <label>Short Description (Max 200 chars) *</label>
          <textarea
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            rows="3"
            maxLength="200"
            className={`ap-textarea ${errors.shortDescription ? 'ap-input-error' : ''}`}
            required
          />
          {errors.shortDescription && <p className="ap-error-text">{errors.shortDescription}</p>}
        </div>

        {/* Long Description */}
        <div className="ap-form-group ap-form-group--full">
          <label>Long Description</label>
          <textarea
            value={longDescription}
            onChange={(e) => setLongDescription(e.target.value)}
            rows="6"
            className="ap-textarea"
          />
        </div>

        {/* Category */}
        <div className="ap-form-group">
          <label>Category *</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`ap-select ${errors.category ? 'ap-input-error' : ''}`}
            required
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && <p className="ap-error-text">{errors.category}</p>}
        </div>

        {/* Tech Stack */}
        <div className="ap-form-group">
          <label>Tech Stack *</label>
          <input
            type="text"
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
            placeholder="e.g., React, Node.js"
            className={`ap-input ${errors.techStack ? 'ap-input-error' : ''}`}
            required
          />
          {errors.techStack && <p className="ap-error-text">{errors.techStack}</p>}
        </div>

        {/* Price */}
        <div className="ap-form-group">
          <label>Price (USD) *</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className={`ap-input ${errors.price ? 'ap-input-error' : ''}`}
            required
          />
          {errors.price && <p className="ap-error-text">{errors.price}</p>}
        </div>

        {/* Image Upload */}
        <div className="ap-form-group ap-form-group--full">
          <label>Project Image *</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className={`ap-input-file ${errors.image ? 'ap-input-error' : ''}`}
            required
          />
          {imagePreview && (
            <div className="ap-image-preview-container">
              <img src={imagePreview} alt="Preview" className="ap-image-preview" />
            </div>
          )}
          {errors.image && <p className="ap-error-text">{errors.image}</p>}
        </div>

        {/* GitHub URL */}
        <div className="ap-form-group">
          <label>GitHub URL</label>
          <input
            type="url"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            className={`ap-input ${errors.githubUrl ? 'ap-input-error' : ''}`}
            placeholder="https://github.com/..."
          />
          {errors.githubUrl && <p className="ap-error-text">{errors.githubUrl}</p>}
        </div>

        {/* Demo URL */}
        <div className="ap-form-group">
          <label>Live Demo URL</label>
          <input
            type="url"
            value={demoUrl}
            onChange={(e) => setDemoUrl(e.target.value)}
            className={`ap-input ${errors.demoUrl ? 'ap-input-error' : ''}`}
            placeholder="https://example.com/demo"
          />
          {errors.demoUrl && <p className="ap-error-text">{errors.demoUrl}</p>}
        </div>

        <button type="submit" className="ap-submit-button" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Project'}
        </button>
        <div style={{ width: '100%', marginTop: 12 }}>
          <button type="button" className="dashboard-add-btn" onClick={() => navigate('/add-idea')}>
            Or, Post an Idea Instead
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProject;
