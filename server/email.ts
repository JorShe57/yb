import sgMail from '@sendgrid/mail';
import { QuoteRequest } from '@shared/schema';

// Initialize SendGrid with the API key
if (!process.env.SENDGRID_API_KEY) {
  console.warn('SENDGRID_API_KEY is not set. Email notifications will not be sent.');
} else {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

// Get the email address that will receive quote requests from environment variables
// This makes it easy for the business owner to change it without editing code
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || 'jorshevel@gmail.com';
// Note: In production, the business owner should set NOTIFICATION_EMAIL in their environment

/**
 * Sends an email notification about a new quote request
 */
export async function sendQuoteRequestEmail(quoteRequest: QuoteRequest): Promise<boolean> {
  if (!process.env.SENDGRID_API_KEY) {
    console.warn('Email notification skipped: SENDGRID_API_KEY not set');
    return false;
  }

  try {
    // Format the service more nicely if provided
    const service = quoteRequest.service 
      ? formatServiceName(quoteRequest.service)
      : 'Not specified';

    // Create email HTML content
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #274422; border-bottom: 2px solid #274422; padding-bottom: 10px;">New Quote Request</h2>
        
        <p>A new quote request has been submitted on your website:</p>
        
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Name:</strong> ${quoteRequest.name}</p>
          <p><strong>Email:</strong> ${quoteRequest.email}</p>
          <p><strong>Phone:</strong> ${quoteRequest.phone}</p>
          <p><strong>City:</strong> ${quoteRequest.city}</p>
          <p><strong>Address:</strong> ${quoteRequest.address}</p>
          <p><strong>Service:</strong> ${service}</p>
          <p><strong>Additional Comments:</strong> ${quoteRequest.comments || 'None provided'}</p>
          <p><strong>Submitted:</strong> ${new Date(quoteRequest.createdAt).toLocaleString()}</p>
        </div>
        
        <p>Please respond to this customer as soon as possible.</p>
        
        <div style="margin-top: 30px; font-size: 12px; color: #777; border-top: 1px solid #eee; padding-top: 10px;">
          <p>This is an automated email from your Yard Bros website.</p>
        </div>
      </div>
    `;

    // Plain text version as fallback
    const textContent = `
      NEW QUOTE REQUEST
      
      Name: ${quoteRequest.name}
      Email: ${quoteRequest.email}
      Phone: ${quoteRequest.phone}
      City: ${quoteRequest.city}
      Address: ${quoteRequest.address}
      Service: ${service}
      Additional Comments: ${quoteRequest.comments || 'None provided'}
      Submitted: ${new Date(quoteRequest.createdAt).toLocaleString()}
      
      Please respond to this customer as soon as possible.
      
      This is an automated email from your Yard Bros website.
    `;

    // Get sender email from environment or use default
    const senderEmail = process.env.SENDER_EMAIL || 'quotes@yardbroslandscaping.com';
    
    // Prepare the email
    const msg = {
      to: NOTIFICATION_EMAIL,
      from: senderEmail, // Must be a verified sender in SendGrid
      subject: `New Quote Request from ${quoteRequest.name}`,
      text: textContent,
      html: htmlContent,
      replyTo: quoteRequest.email // Allow direct reply to the customer
    };

    // Send the email
    await sgMail.send(msg);
    console.log(`Email notification sent for quote request #${quoteRequest.id}`);
    return true;
  } catch (error) {
    console.error('Failed to send email notification:', error);
    return false;
  }
}

/**
 * Helper function to format service names for better readability
 */
function formatServiceName(service: string): string {
  const serviceMap: Record<string, string> = {
    'sod': 'Sod Installation',
    'landscaping': 'Landscaping',
    'maintenance': 'Yard Maintenance',
    'topsoil': 'Topsoil Delivery',
    'other': 'Other Services'
  };
  
  return serviceMap[service] || service;
}