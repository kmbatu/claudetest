# SailPoint ISC Manager for VS Code

A Visual Studio Code extension that allows you to manage SailPoint Identity Security Cloud (ISC) workflows and rules directly from your editor.

## Features

- **Connect to SailPoint ISC**: Authenticate with your SailPoint tenant using OAuth2
- **Manage Workflows**: Browse, read, modify, create, and delete workflows
- **Manage Rules**: Browse, read, modify, create, and delete connector rules
- **Tree View Explorer**: Visual interface to navigate your SailPoint objects
- **JSON Editing**: Edit workflows and rules as JSON with syntax highlighting
- **Auto-Save**: Changes are automatically synced to SailPoint when you save

## Prerequisites

Before using this extension, you need:

1. A SailPoint Identity Security Cloud tenant
2. API credentials (Client ID and Client Secret) with appropriate permissions

### Getting SailPoint API Credentials

1. Log in to your SailPoint ISC tenant
2. Navigate to **Admin** > **API Management**
3. Create a new **Personal Access Token** or **OAuth Client**
4. Note down the **Client ID** and **Client Secret**
5. Ensure the credentials have permissions for:
   - Reading/Writing Workflows
   - Reading/Writing Connector Rules

## Installation

### From Source

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Compile the extension:
   ```bash
   npm run compile
   ```

4. Open the project in VS Code and press `F5` to launch the extension in debug mode

### From VSIX (Coming Soon)

Install the `.vsix` file directly in VS Code:
1. Open VS Code
2. Go to Extensions
3. Click on the `...` menu
4. Select "Install from VSIX..."

## Usage

### Initial Setup

1. Open VS Code and activate the extension
2. Click on the SailPoint icon in the Activity Bar (left sidebar)
3. Run the command **SailPoint: Connect to Tenant** (Cmd/Ctrl+Shift+P)
4. Enter your:
   - Tenant URL (e.g., `https://tenant.identitynow.com`)
   - Client ID
   - Client Secret

Alternatively, configure these in VS Code settings:
- `sailpoint.tenantUrl`
- `sailpoint.clientId`
- `sailpoint.clientSecret`

### Working with Workflows

**Browse Workflows:**
- Click on "Workflows" in the SailPoint Explorer
- All workflows will be listed with their status (Enabled/Disabled)

**Open a Workflow:**
- Click on any workflow in the explorer
- The workflow JSON will open in the editor

**Edit a Workflow:**
- Make changes to the JSON
- Press `Cmd/Ctrl+S` to save
- Changes are automatically pushed to SailPoint

**Create a Workflow:**
- Run command: **SailPoint: Create New Workflow**
- Enter a name for the workflow
- Edit the template and save

**Delete a Workflow:**
- Right-click on a workflow in the explorer
- Select "Delete Workflow"
- Confirm the deletion

### Working with Rules

**Browse Rules:**
- Click on "Rules" in the SailPoint Explorer
- All connector rules will be listed

**Open a Rule:**
- Click on any rule in the explorer
- The rule JSON will open in the editor

**Edit a Rule:**
- Make changes to the JSON
- Press `Cmd/Ctrl+S` to save
- Changes are automatically pushed to SailPoint

**Create a Rule:**
- Run command: **SailPoint: Create New Rule**
- Enter a name for the rule
- Edit the template and save

**Delete a Rule:**
- Right-click on a rule in the explorer
- Select "Delete Rule"
- Confirm the deletion

## Commands

- `SailPoint: Connect to Tenant` - Connect to your SailPoint tenant
- `SailPoint: Disconnect` - Disconnect from the current tenant
- `SailPoint: Create New Workflow` - Create a new workflow
- `SailPoint: Create New Rule` - Create a new rule

## Configuration

You can configure the extension in VS Code settings (`settings.json`):

```json
{
  "sailpoint.tenantUrl": "https://your-tenant.identitynow.com",
  "sailpoint.clientId": "your-client-id",
  "sailpoint.clientSecret": "your-client-secret"
}
```

## API Endpoints Used

This extension uses the SailPoint V3 API:

- **Authentication**: `/oauth/token`
- **Workflows**: `/v3/workflows`
- **Rules**: `/v3/connector-rules`

## Security Notes

- API credentials are stored in VS Code settings
- Access tokens are kept in memory only
- Always use HTTPS for your tenant URL
- Never commit credentials to version control

## Troubleshooting

### Connection Failed

- Verify your tenant URL is correct (should start with `https://`)
- Check that your Client ID and Client Secret are valid
- Ensure your API credentials have the necessary permissions

### Failed to Load Workflows/Rules

- Verify you're connected (check the SailPoint Explorer)
- Refresh the explorer using the refresh button
- Check API permissions for your credentials

### Save Failed

- Ensure JSON is valid (check for syntax errors)
- Verify you have write permissions
- Check that required fields are present

## Development

### Building

```bash
npm run compile
```

### Running in Debug Mode

1. Open the project in VS Code
2. Press `F5`
3. A new VS Code window will open with the extension loaded

### Project Structure

```
├── src/
│   ├── extension.ts           # Main extension entry point
│   ├── sailpointApiClient.ts  # SailPoint API client
│   ├── sailpointProvider.ts   # Tree view provider
│   └── documentManager.ts     # Document save handler
├── package.json               # Extension manifest
└── tsconfig.json              # TypeScript configuration
```

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

MIT

## Disclaimer

This extension is not officially supported by SailPoint Technologies. Use at your own risk.
