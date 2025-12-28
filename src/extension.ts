import * as vscode from 'vscode';
import { SailPointProvider } from './sailpointProvider';
import { SailPointApiClient } from './sailpointApiClient';
import { DocumentManager } from './documentManager';

let sailpointProvider: SailPointProvider;
let apiClient: SailPointApiClient;
let documentManager: DocumentManager;

export function activate(context: vscode.ExtensionContext) {
    console.log('SailPoint ISC Manager extension is now active');

    // Initialize API client
    apiClient = new SailPointApiClient();

    // Initialize document manager
    documentManager = new DocumentManager(apiClient);
    documentManager.register(context);

    // Initialize tree view provider
    sailpointProvider = new SailPointProvider(apiClient);
    vscode.window.registerTreeDataProvider('sailpointExplorer', sailpointProvider);

    // Register commands
    context.subscriptions.push(
        vscode.commands.registerCommand('sailpoint.connect', async () => {
            await connectToSailPoint();
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('sailpoint.disconnect', () => {
            apiClient.disconnect();
            sailpointProvider.refresh();
            vscode.window.showInformationMessage('Disconnected from SailPoint');
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('sailpoint.refreshExplorer', () => {
            sailpointProvider.refresh();
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('sailpoint.openWorkflow', async (item) => {
            await openWorkflow(item);
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('sailpoint.deleteWorkflow', async (item) => {
            await deleteWorkflow(item);
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('sailpoint.openRule', async (item) => {
            await openRule(item);
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('sailpoint.deleteRule', async (item) => {
            await deleteRule(item);
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('sailpoint.createWorkflow', async () => {
            await createWorkflow();
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('sailpoint.createRule', async () => {
            await createRule();
        })
    );

    // Try to auto-connect if credentials are configured
    const config = vscode.workspace.getConfiguration('sailpoint');
    if (config.get('tenantUrl') && config.get('clientId') && config.get('clientSecret')) {
        connectToSailPoint().catch(() => {
            // Silent fail on auto-connect
        });
    }
}

async function connectToSailPoint() {
    const config = vscode.workspace.getConfiguration('sailpoint');
    let tenantUrl = config.get<string>('tenantUrl') || '';
    let clientId = config.get<string>('clientId') || '';
    let clientSecret = config.get<string>('clientSecret') || '';

    // Prompt for credentials if not configured
    if (!tenantUrl) {
        tenantUrl = await vscode.window.showInputBox({
            prompt: 'Enter SailPoint tenant URL',
            placeHolder: 'https://tenant.identitynow.com'
        }) || '';
        if (tenantUrl) {
            await config.update('tenantUrl', tenantUrl, vscode.ConfigurationTarget.Global);
        }
    }

    if (!clientId) {
        clientId = await vscode.window.showInputBox({
            prompt: 'Enter SailPoint API Client ID',
            placeHolder: 'client-id'
        }) || '';
        if (clientId) {
            await config.update('clientId', clientId, vscode.ConfigurationTarget.Global);
        }
    }

    if (!clientSecret) {
        clientSecret = await vscode.window.showInputBox({
            prompt: 'Enter SailPoint API Client Secret',
            placeHolder: 'client-secret',
            password: true
        }) || '';
        if (clientSecret) {
            await config.update('clientSecret', clientSecret, vscode.ConfigurationTarget.Global);
        }
    }

    if (!tenantUrl || !clientId || !clientSecret) {
        vscode.window.showErrorMessage('SailPoint credentials are required');
        return;
    }

    try {
        await apiClient.connect(tenantUrl, clientId, clientSecret);
        sailpointProvider.refresh();
        vscode.window.showInformationMessage('Connected to SailPoint successfully');
    } catch (error) {
        vscode.window.showErrorMessage(`Failed to connect to SailPoint: ${error}`);
    }
}

async function openWorkflow(item: any) {
    try {
        const workflow = await apiClient.getWorkflow(item.id);
        const doc = await vscode.workspace.openTextDocument({
            content: JSON.stringify(workflow, null, 2),
            language: 'json'
        });
        const editor = await vscode.window.showTextDocument(doc);

        // Store metadata for saving later
        (doc as any)._sailpointMetadata = {
            type: 'workflow',
            id: item.id,
            name: item.label
        };
    } catch (error) {
        vscode.window.showErrorMessage(`Failed to open workflow: ${error}`);
    }
}

async function deleteWorkflow(item: any) {
    const confirmation = await vscode.window.showWarningMessage(
        `Are you sure you want to delete workflow "${item.label}"?`,
        { modal: true },
        'Delete'
    );

    if (confirmation === 'Delete') {
        try {
            await apiClient.deleteWorkflow(item.id);
            vscode.window.showInformationMessage(`Workflow "${item.label}" deleted successfully`);
            sailpointProvider.refresh();
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to delete workflow: ${error}`);
        }
    }
}

async function openRule(item: any) {
    try {
        const rule = await apiClient.getRule(item.id);
        const doc = await vscode.workspace.openTextDocument({
            content: JSON.stringify(rule, null, 2),
            language: 'json'
        });
        const editor = await vscode.window.showTextDocument(doc);

        // Store metadata for saving later
        (doc as any)._sailpointMetadata = {
            type: 'rule',
            id: item.id,
            name: item.label
        };
    } catch (error) {
        vscode.window.showErrorMessage(`Failed to open rule: ${error}`);
    }
}

async function deleteRule(item: any) {
    const confirmation = await vscode.window.showWarningMessage(
        `Are you sure you want to delete rule "${item.label}"?`,
        { modal: true },
        'Delete'
    );

    if (confirmation === 'Delete') {
        try {
            await apiClient.deleteRule(item.id);
            vscode.window.showInformationMessage(`Rule "${item.label}" deleted successfully`);
            sailpointProvider.refresh();
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to delete rule: ${error}`);
        }
    }
}

async function createWorkflow() {
    const name = await vscode.window.showInputBox({
        prompt: 'Enter workflow name',
        placeHolder: 'My Workflow'
    });

    if (!name) {
        return;
    }

    const template = {
        name: name,
        description: '',
        enabled: true,
        trigger: {
            type: 'EVENT'
        },
        steps: []
    };

    const doc = await vscode.workspace.openTextDocument({
        content: JSON.stringify(template, null, 2),
        language: 'json'
    });

    (doc as any)._sailpointMetadata = {
        type: 'workflow',
        isNew: true,
        name: name
    };

    await vscode.window.showTextDocument(doc);
}

async function createRule() {
    const name = await vscode.window.showInputBox({
        prompt: 'Enter rule name',
        placeHolder: 'My Rule'
    });

    if (!name) {
        return;
    }

    const template = {
        name: name,
        description: '',
        type: 'BuildMap',
        signature: {
            input: [],
            output: {}
        },
        sourceCode: {
            script: '// Your rule code here\nreturn null;'
        }
    };

    const doc = await vscode.workspace.openTextDocument({
        content: JSON.stringify(template, null, 2),
        language: 'json'
    });

    (doc as any)._sailpointMetadata = {
        type: 'rule',
        isNew: true,
        name: name
    };

    await vscode.window.showTextDocument(doc);
}

export function deactivate() {
    // Cleanup
}
