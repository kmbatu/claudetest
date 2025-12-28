import * as vscode from 'vscode';
import { SailPointApiClient, Workflow, Rule } from './sailpointApiClient';

export class SailPointProvider implements vscode.TreeDataProvider<SailPointItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<SailPointItem | undefined | null | void> = new vscode.EventEmitter<SailPointItem | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<SailPointItem | undefined | null | void> = this._onDidChangeTreeData.event;

    constructor(private apiClient: SailPointApiClient) {}

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element: SailPointItem): vscode.TreeItem {
        return element;
    }

    async getChildren(element?: SailPointItem): Promise<SailPointItem[]> {
        if (!this.apiClient.isConnected()) {
            return [new SailPointItem('Not connected', '', vscode.TreeItemCollapsibleState.None, 'info')];
        }

        if (!element) {
            // Root level - show categories
            return [
                new SailPointItem('Workflows', 'workflows', vscode.TreeItemCollapsibleState.Collapsed, 'category'),
                new SailPointItem('Rules', 'rules', vscode.TreeItemCollapsibleState.Collapsed, 'category')
            ];
        }

        // Load items based on category
        if (element.id === 'workflows') {
            return this.getWorkflows();
        } else if (element.id === 'rules') {
            return this.getRules();
        }

        return [];
    }

    private async getWorkflows(): Promise<SailPointItem[]> {
        try {
            const workflows = await this.apiClient.getWorkflows();
            return workflows.map(w => {
                const item = new SailPointItem(
                    w.name,
                    w.id,
                    vscode.TreeItemCollapsibleState.None,
                    'workflow'
                );
                item.description = w.enabled ? '✓ Enabled' : '✗ Disabled';
                item.tooltip = `${w.name}\n${w.description || 'No description'}`;
                item.command = {
                    command: 'sailpoint.openWorkflow',
                    title: 'Open Workflow',
                    arguments: [item]
                };
                return item;
            });
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to load workflows: ${error}`);
            return [new SailPointItem('Failed to load workflows', 'error', vscode.TreeItemCollapsibleState.None, 'error')];
        }
    }

    private async getRules(): Promise<SailPointItem[]> {
        try {
            const rules = await this.apiClient.getRules();
            return rules.map(r => {
                const item = new SailPointItem(
                    r.name,
                    r.id,
                    vscode.TreeItemCollapsibleState.None,
                    'rule'
                );
                item.description = r.type;
                item.tooltip = `${r.name}\n${r.description || 'No description'}\nType: ${r.type}`;
                item.command = {
                    command: 'sailpoint.openRule',
                    title: 'Open Rule',
                    arguments: [item]
                };
                return item;
            });
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to load rules: ${error}`);
            return [new SailPointItem('Failed to load rules', 'error', vscode.TreeItemCollapsibleState.None, 'error')];
        }
    }
}

export class SailPointItem extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        public readonly id: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        public readonly contextValue: string
    ) {
        super(label, collapsibleState);

        // Set icons based on type
        if (contextValue === 'workflow') {
            this.iconPath = new vscode.ThemeIcon('symbol-event');
        } else if (contextValue === 'rule') {
            this.iconPath = new vscode.ThemeIcon('symbol-method');
        } else if (contextValue === 'category') {
            this.iconPath = new vscode.ThemeIcon('folder');
        } else if (contextValue === 'info') {
            this.iconPath = new vscode.ThemeIcon('info');
        } else if (contextValue === 'error') {
            this.iconPath = new vscode.ThemeIcon('error');
        }
    }
}
