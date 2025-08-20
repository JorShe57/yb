// Quick test script to verify EmailJS configuration
// This can be run in browser console to test EmailJS independently

console.log('Testing EmailJS configuration...');
console.log('Service ID:', import.meta.env.VITE_EMAILJS_SERVICE_ID);
console.log('Template ID:', import.meta.env.VITE_EMAILJS_TEMPLATE_ID);
console.log('Public Key:', import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

// Test the specific service ID with EmailJS
import emailjs from '@emailjs/browser';

async function testEmailJS() {
  try {
    // Initialize EmailJS
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
    
    const testParams = {
      from_name: 'Test User',
      from_email: 'test@example.com',
      phone: '555-1234',
      city: 'Test City',
      address: '123 Test St',
      service: 'Testing',
      comments: 'This is a test email',
      submitted_date: new Date().toLocaleString(),
      reply_to: 'test@example.com'
    };
    
    const result = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      testParams
    );
    
    console.log('EmailJS test successful:', result);
    return result;
  } catch (error) {
    console.error('EmailJS test failed:', error);
    throw error;
  }
}

// Export for console testing
window.testEmailJS = testEmailJS;