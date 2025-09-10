# CampusFash - OAuth Login Setup

This React application provides OAuth login functionality using Google and Microsoft authentication providers.

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- Google Cloud Console account
- Microsoft Azure account

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure OAuth Providers

#### Google OAuth Setup:

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Configure the OAuth consent screen
6. Set application type to "Web application"
7. Add authorized JavaScript origins:
   - `http://localhost:3000` (for development)
   - Your production domain
8. Add authorized redirect URIs:
   - `http://localhost:3000` (for development)
   - Your production domain
9. Copy the Client ID

#### Microsoft OAuth Setup:

1. Go to the [Microsoft Azure Portal](https://portal.azure.com/)
2. Navigate to "Azure Active Directory" → "App registrations"
3. Click "New registration"
4. Set the name (e.g., "CampusFash")
5. Choose "Accounts in any organizational directory and personal Microsoft accounts"
6. Set redirect URI to:
   - Type: Single-page application (SPA)
   - URI: `http://localhost:3000` (for development)
7. Click "Register"
8. Copy the "Application (client) ID"
9. Go to "Authentication" and ensure:
   - "Access tokens" is checked
   - "ID tokens" is checked

### 3. Environment Configuration

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Update `.env` with your OAuth credentials:
```
REACT_APP_GOOGLE_CLIENT_ID=your-actual-google-client-id
REACT_APP_MICROSOFT_CLIENT_ID=your-actual-microsoft-client-id
```

### 4. Run the Application

```bash
npm start
```

The application will start at `http://localhost:3000`

## Features

- ✅ Google OAuth login/registration
- ✅ Microsoft OAuth login/registration
- ✅ User session management
- ✅ Responsive design
- ✅ Error handling
- ✅ Logout functionality
- ✅ User profile display

## Security Features

- Only allows registration/login through Google and Microsoft
- JWT token validation for Google
- Secure token storage in localStorage
- HTTPS redirect URIs for production

## File Structure

```
src/
├── login.jsx          # Main login component
├── login.css          # Login component styles
App.js                 # Main app component with OAuth provider
index.js               # React app entry point
public/
├── index.html         # HTML template
package.json           # Dependencies and scripts
.env                   # Environment variables (not in git)
.env.example           # Environment variables template
```

## Production Deployment

1. Update OAuth provider settings with production URLs
2. Set production environment variables
3. Build the app: `npm run build`
4. Deploy the `build` folder to your hosting service

## Troubleshooting

### Common Issues:

1. **"Invalid client" error**: Check that your client IDs are correct in `.env`
2. **"Redirect URI mismatch"**: Ensure redirect URIs in OAuth providers match your domain
3. **Microsoft login popup blocked**: Allow popups for your domain
4. **Google login not working**: Check that Google+ API is enabled

### Environment Variables Not Loading:

- Ensure `.env` file is in the root directory
- Environment variables must start with `REACT_APP_`
- Restart the development server after changing `.env`

## Support

For issues related to OAuth setup, refer to:
- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Microsoft MSAL Documentation](https://docs.microsoft.com/en-us/azure/active-directory/develop/msal-overview)
# campusstuff
