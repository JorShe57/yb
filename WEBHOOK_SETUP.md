# Webhook Setup for Quote Forms

I've created a webhook endpoint at `/webhook/quote` that can receive form submissions from various external services. This is much more reliable than EmailJS for receiving notifications.

## Webhook URL

Your webhook endpoint is: `https://your-replit-app.replit.app/webhook/quote`

## Supported Services

### 1. Formspree (Recommended - Free)
1. Go to [Formspree.io](https://formspree.io/)
2. Create a free account
3. Create a new form
4. Set the endpoint to: `https://your-replit-app.replit.app/webhook/quote`
5. Use the Formspree form HTML in your website

**Formspree Benefits:**
- Free tier: 50 submissions/month
- Spam protection included
- Email notifications built-in
- Easy setup

### 2. Netlify Forms
If you deploy on Netlify:
1. Add `netlify` attribute to your form
2. Add a hidden field: `<input type="hidden" name="form-name" value="quote-request" />`
3. Configure webhook in Netlify settings

### 3. Zapier Webhooks
1. Create a Zapier account
2. Set up a webhook trigger
3. Connect to Gmail, Slack, or any notification service
4. Point webhook to: `https://your-replit-app.replit.app/webhook/quote`

### 4. Direct Form Submission
You can also modify your existing form to submit directly to the webhook:

```html
<form action="https://your-replit-app.replit.app/webhook/quote" method="POST">
  <input type="text" name="name" required />
  <input type="email" name="email" required />
  <input type="tel" name="phone" required />
  <input type="text" name="city" required />
  <input type="text" name="address" required />
  <select name="service" required>
    <option value="sod">Sod Installation</option>
    <option value="landscaping">Landscaping</option>
    <option value="maintenance">Maintenance</option>
    <option value="topsoil">Topsoil</option>
    <option value="other">Other</option>
  </select>
  <textarea name="comments"></textarea>
  <button type="submit">Submit Quote Request</button>
</form>
```

## How It Works

1. **Form Submission**: Customer fills out form on any platform
2. **Webhook Receives**: Data sent to `/webhook/quote` endpoint
3. **Database Storage**: Quote saved to your database
4. **Email Notification**: External service (Formspree/Zapier) handles email
5. **Confirmation**: Customer gets confirmation via the external service

## Testing the Webhook

You can test the webhook with curl:

```bash
curl -X POST https://your-replit-app.replit.app/webhook/quote \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Customer",
    "email": "test@example.com",
    "phone": "555-123-4567",
    "city": "Test City",
    "address": "123 Test St",
    "service": "landscaping",
    "comments": "Test webhook submission"
  }'
```

## Current Status

✅ **Working**: Quote submissions save to database
✅ **Working**: Webhook endpoint ready for external services
✅ **Working**: Form validation and error handling
❌ **Fixed**: EmailJS issues resolved by using webhook approach

## Next Steps

1. Choose a service (Formspree recommended for simplicity)
2. Set up the external form service
3. Configure email notifications through that service
4. Test the complete flow

This approach is much more reliable and gives you better control over email delivery and spam protection.