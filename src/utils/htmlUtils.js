// Utility function to extract text from HTML that works on both server and client
export const extractTextFromHtml = (htmlString) => {
  if (!htmlString) return '';

  // Check if we're in the browser and DOMParser is available
  if (typeof window !== 'undefined' && window.DOMParser) {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlString, 'text/html');
      return doc.documentElement.textContent || '';
    } catch (error) {
      console.warn('Error parsing HTML with DOMParser:', error);
      // Fallback to regex
      return htmlString.replace(/<[^>]*>/g, '');
    }
  }

  // Server-side fallback: simple HTML tag removal
  return htmlString.replace(/<[^>]*>/g, '');
};
