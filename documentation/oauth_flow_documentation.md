
# OAuth 2.0 Authentication Flow Documentation

## Overview

OAuth 2.0 is an authorization framework that enables applications to obtain limited access to user accounts on an HTTP service. It works by delegating user authentication to the service that hosts the user account and authorizing third-party applications to access the user account.

## Use Case in Project

In this project, we use OAuth 2.0 to authenticate users with the Instagram Graph API. After successful login and consent, we retrieve an access token that allows us to fetch data such as user profile, media, comments, etc.

## OAuth Flow Steps

### 1. Register App with Facebook for Developers

- Go to [Facebook for Developers](https://developers.facebook.com/)
- Create an app under "My Apps"
- Choose "For Everything Else" for custom app
- Add Instagram Graph API product
- Add a valid OAuth redirect URI under "Facebook Login" settings

### 2. Get App Credentials

- App ID (Client ID)
- App Secret

### 3. User Authorization (Frontend)

Send users to the following URL:

```
https://www.facebook.com/v17.0/dialog/oauth?
  client_id={app-id}
  &redirect_uri={redirect-uri}
  &scope={permissions}
  &response_type=code
```

**Scopes**: `instagram_basic`, `pages_show_list`, `instagram_manage_insights`, etc.

### 4. Handle Redirect and Exchange Code for Access Token (Backend)

POST request to:

```
https://graph.facebook.com/v17.0/oauth/access_token?
  client_id={app-id}
  &redirect_uri={redirect-uri}
  &client_secret={app-secret}
  &code={code}
```

### 5. Save Access Token to Supabase

Store the access token securely in Supabase under the authenticated user's record. Also store token expiry and user ID.

### 6. Make Authenticated Requests

Example:

```
GET https://graph.instagram.com/me?fields=id,username&access_token={access-token}
```

### 7. Refresh Long-Lived Tokens

If using long-lived tokens:

```
GET https://graph.instagram.com/refresh_access_token?
  grant_type=ig_refresh_token
  &access_token={long-lived-token}
```

## Supabase Integration

- Table: `user_tokens`
  - `user_id`
  - `platform` = 'instagram'
  - `access_token`
  - `expires_at`
- Use Supabase Auth to identify and secure user sessions.

## Security Tips

- Never expose your App Secret in frontend.
- Always validate `state` parameter to prevent CSRF.
- Use HTTPS for all redirects and token exchanges.
- Periodically refresh tokens and revoke access when needed.

## Useful Links

- [Instagram Graph API Docs](https://developers.facebook.com/docs/instagram-api/)
- [Facebook OAuth Docs](https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow/)
- [Supabase Docs](https://supabase.com/docs)
