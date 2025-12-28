const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// SailPoint ISC Configuration
const SAILPOINT_CONFIG = {
    tenant: process.env.SAILPOINT_TENANT,
    clientId: process.env.SAILPOINT_CLIENT_ID,
    clientSecret: process.env.SAILPOINT_CLIENT_SECRET,
    baseUrl: process.env.SAILPOINT_BASE_URL || 'https://sailpoint.api.identitynow.com'
};

// Store access token in memory (in production, use proper caching)
let accessToken = null;
let tokenExpiry = null;

/**
 * Authenticate with SailPoint ISC and get access token
 */
async function authenticate() {
    try {
        // Check if token is still valid
        if (accessToken && tokenExpiry && Date.now() < tokenExpiry) {
            return accessToken;
        }

        console.log('Authenticating with SailPoint ISC...');

        // Create Basic Auth header from client credentials
        const auth = Buffer.from(`${SAILPOINT_CONFIG.clientId}:${SAILPOINT_CONFIG.clientSecret}`).toString('base64');

        const response = await axios.post(
            `${SAILPOINT_CONFIG.baseUrl}/oauth/token`,
            new URLSearchParams({
                grant_type: 'client_credentials'
            }),
            {
                headers: {
                    'Authorization': `Basic ${auth}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );

        accessToken = response.data.access_token;
        // Set token expiry (default 1 hour, reduce by 5 minutes for safety)
        tokenExpiry = Date.now() + (response.data.expires_in - 300) * 1000;

        console.log('Authentication successful');
        return accessToken;
    } catch (error) {
        console.error('Authentication error:', error.response?.data || error.message);
        throw new Error('Failed to authenticate with SailPoint ISC');
    }
}

/**
 * Fetch all workflows from SailPoint ISC
 */
async function fetchWorkflows() {
    try {
        const token = await authenticate();

        console.log('Fetching workflows from SailPoint ISC...');

        const response = await axios.get(
            `${SAILPOINT_CONFIG.baseUrl}/v2025/workflows`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log(`Successfully fetched ${response.data.length} workflows`);
        return response.data;
    } catch (error) {
        console.error('Error fetching workflows:', error.response?.data || error.message);
        throw new Error('Failed to fetch workflows from SailPoint ISC');
    }
}

// API Routes

/**
 * GET /api/workflows
 * Returns all workflows from SailPoint ISC tenant
 */
app.get('/api/workflows', async (req, res) => {
    try {
        // Validate configuration
        if (!SAILPOINT_CONFIG.tenant || !SAILPOINT_CONFIG.clientId || !SAILPOINT_CONFIG.clientSecret) {
            return res.status(500).json({
                error: 'SailPoint configuration is incomplete. Please check your .env file.'
            });
        }

        const workflows = await fetchWorkflows();

        res.json({
            success: true,
            count: workflows.length,
            workflows: workflows
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * GET /api/health
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        configured: !!(SAILPOINT_CONFIG.tenant && SAILPOINT_CONFIG.clientId && SAILPOINT_CONFIG.clientSecret)
    });
});

// Serve the workflow viewer page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'workflow-viewer.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`\n🚀 SailPoint Workflow Viewer Server running on port ${PORT}`);
    console.log(`📝 Access the application at: http://localhost:${PORT}`);
    console.log(`🔧 Health check: http://localhost:${PORT}/api/health\n`);

    if (!SAILPOINT_CONFIG.tenant || !SAILPOINT_CONFIG.clientId || !SAILPOINT_CONFIG.clientSecret) {
        console.warn('⚠️  WARNING: SailPoint configuration is incomplete!');
        console.warn('Please create a .env file with your SailPoint credentials.\n');
    }
});
