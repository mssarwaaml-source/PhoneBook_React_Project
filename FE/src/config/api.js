// API Configuration for Netlify deployment
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

// API endpoints
export const API_ENDPOINTS = {
  // Authentication
  LOGIN: `${API_BASE_URL}/api/login`,
  LOGOUT: `${API_BASE_URL}/api/logout`,
  SIGNUP: `${API_BASE_URL}/api/signup`,
  CHECK_AUTH: `${API_BASE_URL}/api/check-auth`,

  // Contacts
  GET_CONTACTS: `${API_BASE_URL}/api/contacts`,
  ADD_CONTACT: `${API_BASE_URL}/api/contacts/add`,
  UPDATE_CONTACT: (id) => `${API_BASE_URL}/api/contacts/update/${id}`,
  DELETE_CONTACT: (id) => `${API_BASE_URL}/api/contacts/delete/${id}`,
  SEARCH_CONTACTS: `${API_BASE_URL}/api/contacts/search`,

  // Groups
  GET_GROUPS: `${API_BASE_URL}/api/groups`,
  ADD_GROUP: `${API_BASE_URL}/api/groups/add`,
  UPDATE_GROUP: (id) => `${API_BASE_URL}/api/groups/update/${id}`,
  DELETE_GROUP: (id) => `${API_BASE_URL}/api/groups/delete/${id}`,
  ADD_CONTACT_TO_GROUP: `${API_BASE_URL}/api/groups/add-contact`,
  REMOVE_CONTACT_FROM_GROUP: `${API_BASE_URL}/api/groups/remove-contact`,

  // Images
  UPLOAD_IMAGE: `${API_BASE_URL}/api/upload-image`,
  GET_IMAGE: (filename) => `${API_BASE_URL}/images/${filename}`,

  // Health check
  HEALTH: `${API_BASE_URL}/health`
};

// For Netlify deployment, if no API_BASE_URL is set, use relative paths
export const getApiUrl = (endpoint) => {
  if (API_BASE_URL) {
    return endpoint;
  }
  // For Netlify, use relative paths
  return endpoint.replace('/api/', '/.netlify/functions/api/');
};
