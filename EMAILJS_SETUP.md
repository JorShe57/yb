# EmailJS Setup Guide

This project now uses EmailJS to send quote request emails directly from the frontend. This is more reliable and doesn't require server-side email configuration.

## Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/) and create a free account
2. After signup, you'll be taken to the dashboard

## Step 2: Add Email Service

1. In the EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, Yahoo, etc.)
4. Follow the setup instructions for your email provider
5. **Important**: Make sure to click "Test Connection" and verify it works
6. Note down the **Service ID** (should look like "service_xxxxxxx")

**Troubleshooting Service ID Issues:**
- Make sure the service is properly connected and tested
- The service ID should start with "service_" followed by letters/numbers
- If you get "service ID not found" error, try creating a new service
- Ensure your email provider connection is properly authenticated

## Step 3: Create Email Template

1. Go to "Email Templates" in the dashboard
2. Click "Create New Template"
3. Use this template content:

**Subject:** New Quote Request from {{from_name}}

**Content:**
```
New Quote Request Received

Customer Details:
Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
City: {{city}}
Service Address: {{address}}

Service Requested: {{service}}
Additional Comments: {{comments}}

Submitted: {{submitted_date}}

Please respond to this customer as soon as possible.
Reply directly to {{reply_to}} to contact the customer.
```

4. Save the template and note down the **Template ID**

## Step 4: Get Public Key

1. Go to "Account" in the dashboard
2. Find your **Public Key** (starts with something like "user_...")

## Step 5: Add Environment Variables

Add these environment variables to your Replit project:

- `VITE_EMAILJS_SERVICE_ID` - Your Service ID from Step 2
- `VITE_EMAILJS_TEMPLATE_ID` - Your Template ID from Step 3  
- `VITE_EMAILJS_PUBLIC_KEY` - Your Public Key from Step 4

## Testing

Once configured, submit a quote request on your website and you should receive an email notification automatically.

**If you get errors:**
- "Service ID not found": Check that your EmailJS service is properly set up and connected
- "Template ID not found": Verify your template ID is correct and template is saved
- "Public key invalid": Make sure you're using the correct public key from Account settings

**Current Status:**
Your service ID is set to: `service_61e088p`

If this service ID isn't working, you may need to:
1. Log into EmailJS dashboard
2. Check if this service exists and is properly connected
3. Create a new service if needed
4. Update the VITE_EMAILJS_SERVICE_ID environment variable

## Benefits of EmailJS

- ✅ No server configuration needed
- ✅ Works directly from the browser
- ✅ Free tier includes 200 emails/month
- ✅ Reliable delivery
- ✅ Easy to set up and maintain