
# Instagram Graph API – Full Developer Documentation (for SentiWiz)

## 🔹 Overview:
The **Instagram Graph API** is a part of the Facebook Graph API and is used to access Instagram Business and Creator account data, such as media, insights, profile, comments, etc.  
**Note:** It does **not** work with personal Instagram accounts.

## 🔑 Required Setup

### 1. Meta App Setup (https://developers.facebook.com/apps)
Steps:
- Create a new app under "For Everything Else".
- Add **Instagram Graph API** and **Facebook Login**.
- Configure **OAuth Redirect URI**.
- Enable `user_profile`, `user_media` permissions.
- Add valid domain and privacy policy.

### 2. Instagram Business Account & Facebook Page
- Instagram account must be a **Business or Creator** account.
- Must be connected to a **Facebook Page**.

### 3. Permissions Required:
- `instagram_basic`
- `pages_show_list`
- `instagram_manage_insights`
- `instagram_manage_comments`
- `pages_read_engagement`

## 🔐 OAuth Flow

### Login URL Format:
```bash
https://www.facebook.com/v17.0/dialog/oauth?
client_id={app-id}
&redirect_uri={redirect-uri}
&scope=instagram_basic,pages_show_list,instagram_manage_insights,instagram_manage_comments
&response_type=code
```

### Access Token Exchange:
```bash
POST https://graph.facebook.com/v17.0/oauth/access_token
?client_id={app-id}
&client_secret={app-secret}
&redirect_uri={redirect-uri}
&code={authorization-code}
```

#### Response:
```json
{
  "access_token": "{token}",
  "token_type": "bearer",
  "expires_in": 5183944
}
```

### Long-Lived Token (recommended):
```bash
GET https://graph.facebook.com/v17.0/oauth/access_token
?grant_type=fb_exchange_token
&client_id={app-id}
&client_secret={app-secret}
&fb_exchange_token={short-lived-token}
```

## 👤 Get Instagram Business Account ID

```bash
GET https://graph.facebook.com/v17.0/me/accounts?access_token={user-access-token}
```

```bash
GET https://graph.facebook.com/v17.0/{page-id}?fields=instagram_business_account&access_token={user-access-token}
```

#### Returns:
```json
{
  "instagram_business_account": {
    "id": "17841400000000000"
  }
}
```

## 📸 Get Media

```bash
GET https://graph.facebook.com/v17.0/{ig-user-id}/media
?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username
&access_token={access-token}
```

## 💬 Get Comments on Media

```bash
GET https://graph.facebook.com/v17.0/{media-id}/comments
?access_token={access-token}
```

## 📊 Get Insights (Analytics)

### For Media:
```bash
GET https://graph.facebook.com/v17.0/{media-id}/insights
?metric=impressions,reach,engagement,saved
&access_token={access-token}
```

### For Account:
```bash
GET https://graph.facebook.com/v17.0/{ig-user-id}/insights
?metric=impressions,reach,profile_views
&period=day
&access_token={access-token}
```

## 🧑‍💻 Common Fields

- `id`: Media or user ID
- `username`: Instagram handle
- `media_type`: IMAGE / VIDEO / CAROUSEL_ALBUM
- `caption`: Post caption
- `media_url`: URL to the media
- `permalink`: Instagram post link
- `timestamp`: ISO 8601 format
- `comments_count`, `like_count`: Not directly available, fetch via `/comments` or `insights`

## 🗃️ Rate Limits
- Typically: 200 calls/user/hour
- Use `X-App-Usage` headers to track usage

## 🧾 Webhooks (Optional – for real-time updates)
Setup webhook for:
- `comments`
- `mentions`
- `media`

→ Requires HTTPS endpoint & challenge verification from Meta.

## 📁 Useful Tools
- Graph API Explorer: https://developers.facebook.com/tools/explorer/
- Access Token Debugger: https://developers.facebook.com/tools/debug/accesstoken/

## 🧷 Storage in Supabase (Suggestion)

### Tables:
- `users`: stores tokens, Instagram ID, profile info
- `media`: post info
- `comments`: comments on media
- `insights`: analytics data
