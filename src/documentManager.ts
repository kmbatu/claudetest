import * as vscode from 'vscode';
import { SailPointApiClient } from './sailpointApiClient';

export class DocumentManager {
    constructor(private apiClient: SailPointApiClient) {}

    register(context: vscode.ExtensionContext): void {
        // Listen for document saves
        context.subscriptions.push(
            vscode.workspace.onWillSaveTextDocument(async (event) => {
                const metadata = (event.document as any)._sailpointMetadata;

                if (!metadata) {
                    return; // Not a SailPoint document
                }

                event.waitUntil(this.saveDocument(event.document, metadata));
            })
        );
    }

    private async saveDocument(document: vscode.TextDocument, metadata: any): Promise<void> {
        try {
            const content = JSON.parse(document.getText());

            if (metadata.type === 'workflow') {
                if (metadata.isNew) {
                    await this.apiClient.createWorkflow(content);
                    vscode.window.showInformationMessage(`Workflow "${content.name}" created successfully`);

                    // Update metadata to mark as no longer new
                    delete metadata.isNew;
                    metadata.id = content.id;
                } else {
                    await this.apiClient.updateWorkflow(metadata.id, content);
                    vscode.window.showInformationMessage(`Workflow "${content.name}" updated successfully`);
                }
            } else if (metadata.type === 'rule') {
                if (metadata.isNew) {
                    await this.apiClient.createRule(content);
                    vscode.window.showInformationMessage(`Rule "${content.name}" created successfully`);

                    // Update metadata
                    delete metadata.isNew;
                    metadata.id = content.id;
                } else {
                    await this.apiClient.updateRule(metadata.id, content);
                    vscode.window.showInformationMessage(`Rule "${content.name}" updated successfully`);
                }
            }

            // Refresh the tree view
            vscode.commands.executeCommand('sailpoint.refreshExplorer');
        } catch (error: any) {
            if (error instanceof SyntaxError) {
                vscode.window.showErrorMessage('Invalid JSON format. Please fix syntax errors.');
            } else {
                vscode.window.showErrorMessage(`Failed to save: ${error.message}`);
            }
            throw error; // Prevent save if there's an error
        }
    }
}
