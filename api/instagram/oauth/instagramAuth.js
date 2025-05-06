// Vercel serverless function for Instagram OAuth token exchange
// https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login

const axios = require('axios');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { code, redirect_uri } = req.body;
  if (!code || !redirect_uri) {
    return res.status(400).json({ error: 'Missing code or redirect_uri' });
  }
  try {
    const params = new URLSearchParams();
    params.append('client_id', process.env.INSTAGRAM_CLIENT_ID);
    params.append('client_secret', process.env.INSTAGRAM_CLIENT_SECRET);
    params.append('grant_type', 'authorization_code');
    params.append('redirect_uri', redirect_uri);
    params.append('code', code);

    const response = await axios.post('https://api.instagram.com/oauth/access_token', params);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { error: 'Unknown error' });
  }
} 