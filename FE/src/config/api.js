// API Configuration
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: `${API_BASE_URL}/`,
  SIGNUP: `${API_BASE_URL}/signup`,
  LOGOUT: `${API_BASE_URL}/logout`,
  CHECK_AUTH: `${API_BASE_URL}/check`,

  // Contact endpoints
  CONTACTS: `${API_BASE_URL}/app/contacts`,
  ADD_CONTACT: `${API_BASE_URL}/app/Contacts/add`,
  UPDATE_CONTACT: `${API_BASE_URL}/app/Contacts/update`,
  DELETE_CONTACT: `${API_BASE_URL}/app/Contacts/delete`,
  GET_CONTACT: `${API_BASE_URL}/app/Contacts/get`,

  // Group endpoints
  GROUPS: `${API_BASE_URL}/app/groups`,
  ADD_GROUP: `${API_BASE_URL}/app/groups/add`,
  DELETE_GROUP: `${API_BASE_URL}/app/groups`,
  REMOVE_FROM_GROUP: `${API_BASE_URL}/app/groups`,
  ADD_TO_GROUP: `${API_BASE_URL}/app/groups/addcontact`,

  // Image endpoints
  IMAGES: `${API_BASE_URL}/images`,
};

export default API_BASE_URL;
