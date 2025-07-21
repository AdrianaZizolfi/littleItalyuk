// Add this at the top of your handleSubmit function for debugging
const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ message: "", type: "" });
  
    // Debug logging
    console.log("Form data:", form);
    console.log("API URL:", 'http://localhost:8001/api/contact/');
  
    try {
      const response = await axios.post(
        'http://localhost:8001/api/contact/',
        form,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      console.log("Response:", response.data);
      // ... rest of your code
    } catch (error) {
      console.error("Full error:", error);
      console.error("Error response:", error.response);
      // ... rest of your error handling
    }
  };
// src/config/api.js
const API_CONFIG = {
    // Development
    development: {
      baseURL: 'http://localhost:8001',
      endpoints: {
        contact: '/api/contact/',
      }
    },
    
    // Production - update these with your actual domain
    production: {
      baseURL: 'https://yourdomain.com', // Replace with your actual domain
      endpoints: {
        contact: '/api/contact/',
      }
    }
  };
  
  const ENV = import.meta.env.MODE || 'development';
  const config = API_CONFIG[ENV];
  
  export const API_BASE_URL = config.baseURL;
  export const API_ENDPOINTS = config.endpoints;
  
  // Helper function to get full API URL
  export const getApiUrl = (endpoint) => {
    return `${API_BASE_URL}${API_ENDPOINTS[endpoint]}`;
  };
  
  export default config;