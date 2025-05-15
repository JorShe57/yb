# Yard Bros Landscaping Website - Email Notification Setup

This document explains how the email notification system works for quote requests and how to configure it for your business use.

## How It Works

When a visitor submits a quote request form on your website:

1. The form data is saved to the database
2. An email is automatically sent to your business email with all the customer's details
3. You can reply directly to the customer by simply responding to the email

This makes managing quote requests easy - you'll be notified immediately when someone is interested in your services, even when you're away from your computer.

## Requirements

To use the email functionality, you need:

1. A SendGrid account (free tier available)
2. A verified sender email address in SendGrid
3. A SendGrid API key with email sending permissions

## Configuration

The email system uses environment variables to make it easy to configure without changing code:

### Required Environment Variables

- `SENDGRID_API_KEY`: Your SendGrid API key for authentication

### Optional Environment Variables

- `NOTIFICATION_EMAIL`: The email address where you want to receive quote notifications
  - Default: business.owner@example.com
  - Example: john@yardbroslandscaping.com

- `SENDER_EMAIL`: The "From" email address shown to recipients
  - Default: noreply@yardbroslandscaping.com
  - Note: This MUST be a verified sender in your SendGrid account

## Setting Up SendGrid (Instructions for Business Owner)

1. **Create a SendGrid Account**:
   - Go to [sendgrid.com](https://sendgrid.com) and sign up for a free account
   - The free tier includes 100 emails per day (enough for most small businesses)

2. **Verify a Sender Email**:
   - In SendGrid dashboard, go to Settings → Sender Authentication
   - Follow instructions to verify your domain or a single sender email
   - You can use your business email or create a dedicated noreply@ address

3. **Create an API Key**:
   - In SendGrid dashboard, go to Settings → API Keys
   - Create a new API key with "Mail Send" permissions
   - Copy the key immediately as it will only be shown once

4. **Update Environment Variables**:
   - Provide your API key, notification email, and sender email to your hosting provider
   - If using Replit, these can be set in the Secrets tab of your project

## Testing

After setting up, you can test the email system by:

1. Submitting a test quote request on your website
2. Checking that you receive an email notification with all the form details
3. Verifying you can reply directly to the customer

## Troubleshooting

If emails are not being sent:

1. Check your SendGrid dashboard for any sending issues
2. Verify that your API key is correctly set in the environment variables
3. Ensure your sender email is properly verified in SendGrid
4. Check server logs for any specific error messages

For additional help, contact your web developer or refer to SendGrid's documentation.