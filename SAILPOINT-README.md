# SailPoint Workflow Viewer

A simple web application that connects to a SailPoint Identity Security Cloud (ISC) tenant and displays all workflows with their details.

## Features

- Connect to SailPoint ISC using OAuth2 authentication
- Fetch and display all workflows from your tenant
- View workflow details including:
  - Workflow name
  - Enabled/Disabled status
  - Workflow ID
  - Creation and modification dates
  - Owner information
  - Description
- Search workflows by name, ID, or description
- Real-time statistics (Total, Enabled, Disabled workflows)
- Modern, responsive UI

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- A SailPoint Identity Security Cloud tenant
- SailPoint Personal Access Token (PAT) with appropriate permissions

## Getting Your SailPoint Credentials

1. Log in to your SailPoint Identity Security Cloud tenant
2. Navigate to **Preferences** (gear icon) → **Personal Access Tokens**
3. Click **New Token**
4. Give your token a name (e.g., "Workflow Viewer")
5. Set appropriate scopes (at minimum, you'll need read access to workflows)
6. Click **Create Token**
7. **Important**: Copy the `Client ID` and `Client Secret` immediately - you won't be able to see the secret again!

For detailed instructions, see: [Managing API Keys and Personal Access Tokens](https://documentation.sailpoint.com/saas/help/common/api_keys.html)

## Installation

1. Clone or download this repository

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file by copying the example:
   ```bash
   cp .env.example .env
   ```

4. Edit `.env` and add your SailPoint credentials:
   ```env
   SAILPOINT_TENANT=your-tenant-name
   SAILPOINT_CLIENT_ID=your-client-id
   SAILPOINT_CLIENT_SECRET=your-client-secret
   SAILPOINT_BASE_URL=https://sailpoint.api.identitynow.com
   PORT=3000
   ```

   Replace:
   - `your-tenant-name`: Your SailPoint tenant name (e.g., "acme" if your URL is `https://acme.identitynow.com`)
   - `your-client-id`: The Client ID from your Personal Access Token
   - `your-client-secret`: The Client Secret from your Personal Access Token

## Running the Application

1. Start the server:
   ```bash
   npm start
   ```

   For development with auto-reload:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

3. Click the **"Load Workflows"** button to fetch and display all workflows from your SailPoint ISC tenant

## API Endpoints

The application provides the following API endpoints:

### Get All Workflows
```
GET /api/workflows
```
Returns all workflows from your SailPoint ISC tenant.

**Response:**
```json
{
  "success": true,
  "count": 5,
  "workflows": [
    {
      "id": "workflow-id",
      "name": "Workflow Name",
      "description": "Workflow description",
      "enabled": true,
      "created": "2024-01-01T00:00:00Z",
      "modified": "2024-01-15T00:00:00Z",
      "owner": {
        "name": "John Doe"
      }
    }
  ]
}
```

### Health Check
```
GET /api/health
```
Returns the health status of the application.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T12:00:00Z",
  "configured": true
}
```

## Project Structure

```
.
├── server.js                 # Express backend server
├── workflow-viewer.html      # Frontend web interface
├── package.json             # Node.js dependencies
├── .env.example             # Environment variables template
├── .env                     # Your credentials (not committed to git)
├── .gitignore              # Git ignore rules
└── SAILPOINT-README.md     # This file
```

## Architecture

### Backend (Node.js + Express)
- Handles OAuth2 authentication with SailPoint ISC
- Manages access token lifecycle
- Proxies requests to SailPoint API
- Serves the frontend application

### Frontend (HTML/CSS/JavaScript)
- Modern, responsive UI
- Displays workflows in cards
- Real-time search/filter functionality
- Statistics dashboard

### Authentication Flow
1. Application requests access token using Client Credentials flow
2. SailPoint ISC validates credentials and returns JWT access token
3. Application uses access token to make API requests
4. Token is cached and automatically refreshed when expired

## Technologies Used

- **Backend**: Node.js, Express.js, Axios
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Authentication**: OAuth 2.0 Client Credentials Flow
- **API**: SailPoint Identity Security Cloud V2025 API

## Troubleshooting

### Error: "SailPoint configuration is incomplete"
- Make sure your `.env` file exists and contains all required credentials
- Verify that your credentials are correct (no extra spaces or quotes)

### Error: "Failed to authenticate with SailPoint ISC"
- Check that your Client ID and Client Secret are correct
- Verify that your Personal Access Token is still active in SailPoint
- Ensure your token has the necessary permissions to read workflows

### Error: "Failed to fetch workflows"
- Verify your tenant name is correct
- Check that your access token has the required scopes
- Ensure your SailPoint tenant is accessible

### No workflows displayed
- Verify that workflows exist in your SailPoint ISC tenant
- Check the browser console for any JavaScript errors
- Verify API response in the Network tab of browser developer tools

## Security Notes

- **Never commit your `.env` file** to version control - it contains sensitive credentials
- The `.gitignore` file is configured to exclude `.env` automatically
- Access tokens are stored in memory only (not persisted to disk)
- In production, consider using a proper secret management solution

## API Documentation

For more information about the SailPoint Identity Security Cloud API:

- [SailPoint Developer Community](https://developer.sailpoint.com/docs/)
- [Authentication Documentation](https://developer.sailpoint.com/docs/api/authentication/)
- [V2025 API Reference](https://developer.sailpoint.com/docs/api/v2025/)
- [Workflows API](https://developer.sailpoint.com/docs/api/v2025/identity-security-cloud-v-2025-api/)

## License

MIT

## Support

For issues or questions:
1. Check the SailPoint Developer Community: https://developer.sailpoint.com/discuss/
2. Review the API documentation: https://developer.sailpoint.com/docs/api/v2025/
3. Verify your credentials and permissions in the SailPoint ISC admin console

## Sources

- [SailPoint Identity Security Cloud V2025 API](https://developer.sailpoint.com/docs/api/v2025/identity-security-cloud-v-2025-api/)
- [SailPoint Authentication](https://developer.sailpoint.com/docs/api/authentication/)
- [List Workflows Endpoint](https://developer.sailpoint.com/docs/api/v3/list-workflows/)
- [Managing API Keys and Personal Access Tokens](https://documentation.sailpoint.com/saas/help/common/api_keys.html)
