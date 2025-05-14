import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Optional: For redirecting after success
import '../style/AddProject.css'; // We'll create this CSS file

const AddProject = () => {
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [category, setCategory] = useState('');
  const [techStack, setTechStack] = useState(''); // Storing as comma-separated string for simplicity
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null); // To store the File object
  const [imagePreview, setImagePreview] = useState(null); // For showing image preview
  const [githubUrl, setGithubUrl] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate(); // Optional: if you want to redirect

  const categories = ['SaaS', 'App', 'eCommerce', 'MVP', 'Domain', 'Website', 'Bot', 'Other'];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Create temporary URL for preview
      setErrors(prev => ({ ...prev, image: null })); // Clear image error if any
    } else {
      setImage(null);
      setImagePreview(null);
      // Optionally set an error message
      setErrors(prev => ({ ...prev, image: 'Please select a valid image file.' }));
    }
  };

  // Basic validation
  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Title is required.';
    if (!shortDescription.trim()) newErrors.shortDescription = 'Short description is required.';
    if (shortDescription.length > 200) newErrors.shortDescription = 'Short description max 200 chars.';
    if (!category) newErrors.category = 'Category is required.';
    if (!techStack.trim()) newErrors.techStack = 'Tech stack is required.';
    if (!price || isNaN(price) || price <= 0) newErrors.price = 'Valid price is required.';
    if (!image) newErrors.image = 'Project image is required.';
    // Optional URL validation (simple check)
    if (githubUrl && !githubUrl.startsWith('http')) newErrors.githubUrl = 'Enter a valid URL (e.g., https://...).';
    if (demoUrl && !demoUrl.startsWith('http')) newErrors.demoUrl = 'Enter a valid URL (e.g., https://...).';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // True if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return; // Stop submission if validation fails
    }

    setIsSubmitting(true);
    setSubmissionSuccess(false);

    // --- Simulate API Call ---
    // In a real app, you'd create FormData, append fields (including the image file),
    // and send it to your backend API using fetch or axios.
    console.log("Submitting data:", {
        title, shortDescription, longDescription, category, 
        techStack: techStack.split(',').map(t => t.trim()), // Convert string to array
        price, image: image ? image.name : null, githubUrl, demoUrl 
    });
    
    // Example: Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500)); 
    
    // --- End Simulation ---
    
    setIsSubmitting(false);
    setSubmissionSuccess(true);

    // Reset form after a brief delay to show success message
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
      // navigate('/explore'); // Optional: redirect user
    }, 3000); 
  };

  return (
    <div className="add-project-container">
      <h1 className="ap-main-title">List Your Project</h1>
      <p className="ap-subtitle">Fill in the details below to put your micro-startup on the marketplace.</p>

      {submissionSuccess && (
        <div className="ap-success-message">
          Project submitted successfully! It will be reviewed shortly.
        </div>
      )}

      <form onSubmit={handleSubmit} className="ap-form" noValidate>
        {/* Title */}
        <div className="ap-form-group">
          <label htmlFor="title" className="ap-label">Project Title *</label>
          <input
            type="text"
            id="title"
            className={`ap-input ${errors.title ? 'ap-input-error' : ''}`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          {errors.title && <p className="ap-error-text">{errors.title}</p>}
        </div>

        {/* Short Description */}
        <div className="ap-form-group">
          <label htmlFor="shortDescription" className="ap-label">Short Description (Max 200 chars) *</label>
          <textarea
            id="shortDescription"
            className={`ap-textarea ${errors.shortDescription ? 'ap-input-error' : ''}`}
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            rows="3"
            maxLength="200"
            required
          />
           {errors.shortDescription && <p className="ap-error-text">{errors.shortDescription}</p>}
        </div>

        {/* Long Description */}
        <div className="ap-form-group">
          <label htmlFor="longDescription" className="ap-label">Long Description</label>
          <textarea
            id="longDescription"
            className="ap-textarea"
            value={longDescription}
            onChange={(e) => setLongDescription(e.target.value)}
            rows="6"
            placeholder="Provide more details about the project, features, market, reason for selling, etc."
          />
        </div>

        {/* Category */}
        <div className="ap-form-group">
          <label htmlFor="category" className="ap-label">Category *</label>
          <select
            id="category"
            className={`ap-select ${errors.category ? 'ap-input-error' : ''}`}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="" disabled>-- Select a Category --</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
           {errors.category && <p className="ap-error-text">{errors.category}</p>}
        </div>

        {/* Tech Stack */}
        <div className="ap-form-group">
          <label htmlFor="techStack" className="ap-label">Tech Stack *</label>
          <input
            type="text"
            id="techStack"
            className={`ap-input ${errors.techStack ? 'ap-input-error' : ''}`}
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
            placeholder="e.g., React, Node.js, MongoDB, AWS"
            required
          />
          <small className="ap-helper-text">Enter technologies separated by commas.</small>
          {errors.techStack && <p className="ap-error-text">{errors.techStack}</p>}
        </div>

        {/* Price */}
        <div className="ap-form-group">
          <label htmlFor="price" className="ap-label">Price (USD) *</label>
           <div className="ap-price-input-wrapper">
            <span className="ap-currency-symbol">$</span>
            <input
                type="number"
                id="price"
                className={`ap-input ap-input-price ${errors.price ? 'ap-input-error' : ''}`}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                min="0"
                step="1" // Or "any" for decimals
                placeholder="e.g., 500"
                required
            />
           </div>
          {errors.price && <p className="ap-error-text">{errors.price}</p>}
        </div>

        {/* Image Upload */}
        <div className="ap-form-group">
          <label htmlFor="image" className="ap-label">Project Image / Screenshot *</label>
          <input
            type="file"
            id="image"
            className={`ap-input-file ${errors.image ? 'ap-input-error' : ''}`}
            accept="image/png, image/jpeg, image/webp"
            onChange={handleImageChange}
            required
          />
           {imagePreview && (
            <div className="ap-image-preview-container">
              <p>Preview:</p>
              <img src={imagePreview} alt="Project preview" className="ap-image-preview" />
            </div>
          )}
          {errors.image && <p className="ap-error-text">{errors.image}</p>}
        </div>

        {/* GitHub Link (Optional) */}
        <div className="ap-form-group">
          <label htmlFor="githubUrl" className="ap-label">GitHub Repository URL (Optional)</label>
          <input
            type="url"
            id="githubUrl"
            className={`ap-input ${errors.githubUrl ? 'ap-input-error' : ''}`}
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            placeholder="https://github.com/your-repo"
          />
          {errors.githubUrl && <p className="ap-error-text">{errors.githubUrl}</p>}
        </div>

        {/* Demo URL (Optional) */}
        <div className="ap-form-group">
          <label htmlFor="demoUrl" className="ap-label">Live Demo URL (Optional)</label>
          <input
            type="url"
            id="demoUrl"
            className={`ap-input ${errors.demoUrl ? 'ap-input-error' : ''}`}
            value={demoUrl}
            onChange={(e) => setDemoUrl(e.target.value)}
            placeholder="https://your-live-demo.com"
          />
          {errors.demoUrl && <p className="ap-error-text">{errors.demoUrl}</p>}
        </div>

        {/* Submit Button */}
        <div className="ap-form-group ap-submit-group">
          <button type="submit" className="ap-submit-button" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Project'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProject;