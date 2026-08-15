# GitHub OAuth Integration Guide

## Frontend Setup (✅ Completed)

The frontend has been set up with GitHub OAuth support. Here's what was added:

### Components & Files Created:
1. **`GitHubOAuthService.ts`** - Service to handle OAuth flow
   - `generateGitHubAuthUrl()` - Generates the GitHub authorization URL
   - `exchangeCodeForToken()` - Exchanges auth code for access token
   - `startGitHubLogin()` - Initiates GitHub login

2. **`useGitHubOAuth.ts`** - Hook to handle OAuth callback
   - Manages the GitHub callback with code parameter
   - Exchanges code for token via backend
   - Auto-logs in user and redirects to `/vaults`

3. **`GitHubCallback` Component** - `/auth/github/callback` page
   - Shows loading state while authenticating
   - Displays error messages if authentication fails
   - Auto-redirects on success

4. **Login Component Updates**
   - Added "Login with GitHub" button
   - Added visual separator between methods
   - Button styled to match dark theme

### Environment Variables Required:
Add to your `.env` file:
```env
VITE_GITHUB_CLIENT_ID=your_client_id_here
VITE_GITHUB_REDIRECT_URI=http://localhost:5173/auth/github/callback
VITE_BACKEND_BASE_URI=http://localhost:3000
```

## Backend Setup (Required)

### 1. GitHub OAuth App Setup
1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Create a new OAuth App:
   - **Application name**: Your app name
   - **Homepage URL**: `http://localhost:5173` (or your production URL)
   - **Authorization callback URL**: `http://localhost:5173/auth/github/callback` (must match `VITE_GITHUB_REDIRECT_URI`)
3. Save the `Client ID` and `Client Secret`

### 2. Backend Endpoint Required
Your backend needs a `POST /auth/github/callback` endpoint that:

**Request Body:**
```json
{
  "code": "github_authorization_code"
}
```

**Response:**
```json
{
  "accessToken": "your_jwt_token",
  "userInfo": {
    "id": "user_id",
    "username": "github_username",
    "email": "user_email"
  }
}
```

**Backend Implementation Steps:**
1. Accept the `code` from the frontend
2. Exchange it for a GitHub access token using your Client Secret:
   ```
   POST https://github.com/login/oauth/access_token
   client_id={CLIENT_ID}
   client_secret={CLIENT_SECRET}
   code={CODE}
   ```
3. Get user info from GitHub API:
   ```
   GET https://api.github.com/user
   Authorization: Bearer {GITHUB_TOKEN}
   ```
4. Check if user exists in your database:
   - If exists: Generate JWT and return user info
   - If not exists: Create new user and generate JWT
5. Return the JWT token and user info

**Example Node.js/Express implementation:**
```typescript
import axios from 'axios'

app.post('/auth/github/callback', async (req, res) => {
  const { code } = req.body

  // Exchange code for GitHub token
  const tokenResponse = await axios.post(
    'https://github.com/login/oauth/access_token',
    {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code
    },
    { headers: { Accept: 'application/json' } }
  )

  const githubToken = tokenResponse.data.access_token

  // Get GitHub user info
  const userResponse = await axios.get('https://api.github.com/user', {
    headers: { Authorization: `Bearer ${githubToken}` }
  })

  const githubUser = userResponse.data

  // Find or create user in your database
  let user = await User.findOne({ githubId: githubUser.id })
  
  if (!user) {
    user = await User.create({
      githubId: githubUser.id,
      username: githubUser.login,
      email: githubUser.email,
      // ... other fields
    })
  }

  // Generate JWT
  const accessToken = generateJWT({
    id: user._id,
    username: user.username,
    email: user.email
  })

  res.json({
    accessToken,
    userInfo: {
      id: user._id,
      username: user.username,
      email: user.email
    }
  })
})
```

## Testing Locally

1. **Start your backend server** on `http://localhost:3000`
2. **Update `.env` file** with your GitHub Client ID and credentials
3. **Run frontend**: `pnpm dev`
4. Go to login page and click "Login with GitHub"
5. You'll be redirected to GitHub to authorize
6. After authorization, you'll be redirected back to `/auth/github/callback`
7. If successful, you'll be logged in and redirected to `/vaults`

## Production Deployment

1. Update `VITE_GITHUB_REDIRECT_URI` to your production callback URL
2. Add your production domain to GitHub OAuth App settings
3. Ensure your backend handles CORS properly
4. Test the full flow in production

## Troubleshooting

**Issue**: "No authorization code received"
- Check that the redirect URI matches exactly in GitHub settings and `.env`

**Issue**: Backend returns error
- Verify Client Secret is correct
- Check that GitHub API calls are working
- Ensure user creation/update logic in backend is correct

**Issue**: Login button doesn't redirect to GitHub
- Check `VITE_GITHUB_CLIENT_ID` is set correctly
- Check browser console for errors
- Verify redirect URI is correct

## Security Notes

- Always keep `GITHUB_CLIENT_SECRET` on the backend only
- Use environment variables for all sensitive data
- Validate the authorization code on the backend
- Use HTTPS in production
- Set secure HTTP-only cookies for session management if needed
