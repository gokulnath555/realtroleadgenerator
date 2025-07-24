import { v4 as uuidv4 } from 'uuid';

// Generate a unique token for a realtor
export const generateRealtorToken = (realtorId, realtorName) => {
  const timestamp = Date.now();
  const uniqueId = uuidv4();
  const token = `${realtorId}-${timestamp}-${uniqueId}`;
  
  return {
    token,
    createdAt: new Date().toISOString(),
    expiresAt: null, // No expiration by default
    active: true,
    metadata: {
      realtorId,
      realtorName,
      createdBy: realtorId
    }
  };
};

// Generate a shareable URL with token
export const generateShareableUrl = (token, baseUrl = window.location.origin) => {
  return `${baseUrl}/public-lead-capture-form?token=${token}`;
};

// Validate token format
export const validateTokenFormat = (token) => {
  if (!token || typeof token !== 'string') {
    return false;
  }
  
  // Check if token matches expected format: realtorId-timestamp-uuid
  const parts = token.split('-');
  return parts.length >= 3;
};

// Extract realtor ID from token
export const extractRealtorIdFromToken = (token) => {
  if (!validateTokenFormat(token)) {
    return null;
  }
  
  const parts = token.split('-');
  return parts[0];
};

// Generate QR code data URL (placeholder for QR implementation)
export const generateQRCodeDataUrl = (url) => {
  // In a real implementation, you would use a QR code library
  // For now, return a placeholder data URL
  return `data:image/svg+xml;base64,${btoa(`
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="200" fill="white"/>
      <text x="100" y="100" text-anchor="middle" fill="black" font-size="12">QR Code</text>
      <text x="100" y="120" text-anchor="middle" fill="black" font-size="10">${url}</text>
    </svg>
  `)}`;
};

// Format analytics data
export const formatAnalyticsData = (rawData) => {
  return {
    totalClicks: rawData?.clicks || 0,
    totalSubmissions: rawData?.submissions || 0,
    conversionRate: rawData?.clicks > 0 ? ((rawData?.submissions || 0) / rawData.clicks * 100).toFixed(1) : '0.0',
    uniqueVisitors: rawData?.uniqueVisitors || 0
  };
};

// Generate social media post content
export const generateSocialMediaContent = (realtorName, shareableUrl) => {
  const baseMessage = `Looking to sell your property? I'm ${realtorName}, and I'd love to help you get the best value for your home. Fill out my quick form to get started:`;
  
  return {
    facebook: `${baseMessage}\n\n${shareableUrl}\n\n#RealEstate #HomeSelling #${realtorName.replace(/\s+/g, '')}`,
    instagram: `${baseMessage}\n\n${shareableUrl}\n\n#realestate #homeselling #property #realtor`,
    linkedin: `${baseMessage}\n\n${shareableUrl}\n\nLet's discuss your property goals and create a strategic plan for your sale.`,
    twitter: `${baseMessage}\n\n${shareableUrl}\n\n#RealEstate #HomeSelling`
  };
};

export default {
  generateRealtorToken,
  generateShareableUrl,
  validateTokenFormat,
  extractRealtorIdFromToken,
  generateQRCodeDataUrl,
  formatAnalyticsData,
  generateSocialMediaContent
};