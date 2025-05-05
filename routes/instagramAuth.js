const express = require('express');
const axios = require('axios');
const router = express.Router();

// POST /api/instagram/oauth/access_token
router.post('/oauth/access_token', async (req, res) => {
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
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { error: 'Unknown error' });
  }
});

module.exports = router; 