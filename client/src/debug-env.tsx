// Debug component to check environment variables in browser
import React from 'react';

export function DebugEnv() {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  console.log('Environment debug:');
  console.log('VITE_EMAILJS_SERVICE_ID:', serviceId);
  console.log('VITE_EMAILJS_TEMPLATE_ID:', templateId);
  console.log('VITE_EMAILJS_PUBLIC_KEY:', publicKey);

  return (
    <div style={{ background: '#f0f0f0', padding: '10px', margin: '10px', fontSize: '12px' }}>
      <h4>EmailJS Debug Info:</h4>
      <p><strong>Service ID:</strong> {serviceId || 'NOT SET'}</p>
      <p><strong>Template ID:</strong> {templateId || 'NOT SET'}</p>
      <p><strong>Public Key:</strong> {publicKey || 'NOT SET'}</p>
      <p><strong>All env vars:</strong></p>
      <pre>{JSON.stringify(import.meta.env, null, 2)}</pre>
    </div>
  );
}