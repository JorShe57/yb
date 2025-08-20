# n8n Webhook Integration

Your n8n webhook is now integrated with the quote form! Here's how it works:

## Integration Details

**Webhook URL**: `https://jordenshevel.app.n8n.cloud/webhook/22616fdf-1439-4ded-a78f-11fcf8c4c650`

**Data Flow**:
1. Customer submits quote form
2. Form data saves to database
3. Formatted data sends to your n8n webhook
4. n8n processes and sends email notifications

## Data Format Sent to n8n

The webhook receives this JSON data:

```json
{
  "name": "Customer Name",
  "email": "customer@email.com", 
  "phone": "555-123-4567",
  "city": "Customer City",
  "address": "123 Customer St",
  "service": "Sod Installation", // Formatted service name
  "comments": "Customer comments",
  "submitted_date": "8/20/2025, 5:15:03 PM",
  "quote_id": 44 // Database ID for reference
}
```

## Service Name Formatting

The raw service values are automatically formatted for better readability:
- `sod` → `Sod Installation`
- `landscaping` → `Landscaping`
- `maintenance` → `Yard Maintenance`
- `topsoil` → `Topsoil Delivery`
- `other` → `Other Services`

## Benefits of n8n Integration

✅ **Reliable email delivery** - n8n handles email sending with better deliverability
✅ **Flexible workflows** - You can add multiple actions (email, SMS, Slack, etc.)
✅ **Error handling** - n8n provides retry logic and error notifications
✅ **Data enrichment** - You can add timestamps, formatting, or external API calls
✅ **Multiple recipients** - Easy to send to different emails based on service type

## Recommended n8n Workflow

1. **Webhook Trigger** - Receives the quote data
2. **Email Node** - Sends formatted email to business owner
3. **Optional: Customer Email** - Send confirmation to customer
4. **Optional: Slack/Discord** - Notify team immediately
5. **Optional: CRM Integration** - Add to your CRM system

## Error Handling

- If n8n webhook fails, the quote still saves to database
- No user-facing errors from webhook failures
- Console logs webhook successes and failures

## Testing

You can test the webhook directly:
```bash
curl -X POST https://jordenshevel.app.n8n.cloud/webhook/22616fdf-1439-4ded-a78f-11fcf8c4c650 \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","service":"Landscaping"}'
```

Your email notification system is now much more robust and reliable!