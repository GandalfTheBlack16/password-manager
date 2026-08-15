/**
 * BACKEND EXAMPLE: GitHub OAuth Callback Handler
 * This is a reference implementation for Node.js/Express
 * 
 * Place this in your backend project (e.g., routes/auth.js)
 * 
 * Dependencies needed:
 * - axios: npm install axios
 * - jwt library: npm install jsonwebtoken (or similar)
 * - mongoose (or your DB library)
 */

import axios from 'axios'
import jwt from 'jsonwebtoken'
import User from './models/User' // Your user model

/**
 * GitHub OAuth Callback Handler
 * 
 * POST /auth/github/callback
 * Body: { code: string }
 * 
 * Returns: {
 *   accessToken: string
 *   userInfo: { id, username, email }
 * }
 */
export async function handleGitHubCallback(req, res) {
  try {
    const { code } = req.body

    if (!code) {
      return res.status(400).json({ error: 'No authorization code provided' })
    }

    // Step 1: Exchange code for GitHub access token
    const tokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code: code
      },
      {
        headers: {
          'Accept': 'application/json'
        }
      }
    )

    if (tokenResponse.data.error) {
      return res.status(401).json({
        error: 'GitHub authentication failed',
        details: tokenResponse.data.error_description
      })
    }

    const githubToken = tokenResponse.data.access_token

    // Step 2: Get GitHub user information
    const userResponse = await axios.get('https://api.github.com/user', {
      headers: {
        'Authorization': `Bearer ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    })

    const githubUser = userResponse.data

    // Step 3: Get user email (important!)
    // GitHub may not return email in main response, check emails endpoint
    let userEmail = githubUser.email
    if (!userEmail) {
      const emailResponse = await axios.get(
        'https://api.github.com/user/emails',
        {
          headers: {
            'Authorization': `Bearer ${githubToken}`,
            'Accept': 'application/vnd.github.v3+json'
          }
        }
      )
      const primaryEmail = emailResponse.data.find(e => e.primary)
      userEmail = primaryEmail?.email || githubUser.login + '@github.local'
    }

    // Step 4: Find or create user in your database
    let user = await User.findOne({ githubId: githubUser.id })

    if (!user) {
      // Create new user
      user = await User.create({
        githubId: githubUser.id,
        username: githubUser.login,
        email: userEmail,
        avatar: githubUser.avatar_url,
        name: githubUser.name,
        // Add other fields as needed
        provider: 'github'
      })
    } else {
      // Update existing user with latest info
      user.email = userEmail
      user.avatar = githubUser.avatar_url
      user.name = githubUser.name
      await user.save()
    }

    // Step 5: Generate JWT token
    const accessToken = jwt.sign(
      {
        id: user._id.toString(),
        username: user.username,
        email: user.email
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    )

    // Step 6: Return response (matching frontend expectations)
    return res.status(200).json({
      accessToken: accessToken,
      userInfo: {
        id: user._id.toString(),
        username: user.username,
        email: user.email
      }
    })
  } catch (error) {
    console.error('GitHub OAuth Error:', error)
    return res.status(500).json({
      error: 'Authentication failed',
      message: error.message
    })
  }
}

// ==========================================
// SETUP INSTRUCTIONS
// ==========================================

/**
 * 1. Install dependencies:
 *    npm install axios jsonwebtoken
 *
 * 2. Set environment variables:
 *    GITHUB_CLIENT_ID=your_oauth_app_client_id
 *    GITHUB_CLIENT_SECRET=your_oauth_app_client_secret
 *    JWT_SECRET=your_jwt_secret_key
 *
 * 3. Create GitHub OAuth App:
 *    - Go to: https://github.com/settings/developers
 *    - Create new OAuth App
 *    - Set Redirect URI to: http://localhost:5173/auth/github/callback (or production URL)
 *    - Copy Client ID and Client Secret
 *
 * 4. Register route in your Express app:
 *    app.post('/auth/github/callback', handleGitHubCallback)
 *
 * 5. Enable CORS for frontend origin:
 *    app.use(cors({
 *      origin: 'http://localhost:5173', // or your frontend URL
 *      credentials: true
 *    }))
 *
 * 6. Test it:
 *    - Start backend: npm start
 *    - Start frontend: pnpm dev
 *    - Click "Login with GitHub" button
 *    - Authorize the application
 *    - You should be logged in!
 */

// ==========================================
// EXPRESS INTEGRATION EXAMPLE
// ==========================================

/*
import express from 'express'
import cors from 'cors'

const app = express()

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}))
app.use(express.json())

// Routes
app.post('/auth/github/callback', handleGitHubCallback)

// Other routes...

// Start server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
*/
