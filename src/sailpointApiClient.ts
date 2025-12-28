import axios, { AxiosInstance } from 'axios';

export interface Workflow {
    id: string;
    name: string;
    description?: string;
    enabled: boolean;
    trigger: any;
    steps: any[];
    created?: string;
    modified?: string;
}

export interface Rule {
    id: string;
    name: string;
    description?: string;
    type: string;
    signature?: any;
    sourceCode?: any;
    created?: string;
    modified?: string;
}

export class SailPointApiClient {
    private axiosInstance?: AxiosInstance;
    private tenantUrl: string = '';
    private accessToken: string = '';
    private connected: boolean = false;

    async connect(tenantUrl: string, clientId: string, clientSecret: string): Promise<void> {
        this.tenantUrl = tenantUrl.replace(/\/$/, ''); // Remove trailing slash

        try {
            // Authenticate and get access token
            const authResponse = await axios.post(
                `${this.tenantUrl}/oauth/token`,
                new URLSearchParams({
                    grant_type: 'client_credentials',
                    client_id: clientId,
                    client_secret: clientSecret
                }),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            );

            this.accessToken = authResponse.data.access_token;

            // Create axios instance with auth token
            this.axiosInstance = axios.create({
                baseURL: `${this.tenantUrl}/v3`,
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`,
                    'Content-Type': 'application/json'
                }
            });

            this.connected = true;
        } catch (error: any) {
            this.connected = false;
            throw new Error(`Authentication failed: ${error.message}`);
        }
    }

    disconnect(): void {
        this.connected = false;
        this.axiosInstance = undefined;
        this.accessToken = '';
    }

    isConnected(): boolean {
        return this.connected;
    }

    private ensureConnected(): void {
        if (!this.connected || !this.axiosInstance) {
            throw new Error('Not connected to SailPoint. Please connect first.');
        }
    }

    // Workflow operations
    async getWorkflows(): Promise<Workflow[]> {
        this.ensureConnected();
        try {
            const response = await this.axiosInstance!.get('/workflows');
            return response.data;
        } catch (error: any) {
            throw new Error(`Failed to fetch workflows: ${error.message}`);
        }
    }

    async getWorkflow(id: string): Promise<Workflow> {
        this.ensureConnected();
        try {
            const response = await this.axiosInstance!.get(`/workflows/${id}`);
            return response.data;
        } catch (error: any) {
            throw new Error(`Failed to fetch workflow: ${error.message}`);
        }
    }

    async createWorkflow(workflow: Partial<Workflow>): Promise<Workflow> {
        this.ensureConnected();
        try {
            const response = await this.axiosInstance!.post('/workflows', workflow);
            return response.data;
        } catch (error: any) {
            throw new Error(`Failed to create workflow: ${error.message}`);
        }
    }

    async updateWorkflow(id: string, workflow: Partial<Workflow>): Promise<Workflow> {
        this.ensureConnected();
        try {
            const response = await this.axiosInstance!.put(`/workflows/${id}`, workflow);
            return response.data;
        } catch (error: any) {
            throw new Error(`Failed to update workflow: ${error.message}`);
        }
    }

    async deleteWorkflow(id: string): Promise<void> {
        this.ensureConnected();
        try {
            await this.axiosInstance!.delete(`/workflows/${id}`);
        } catch (error: any) {
            throw new Error(`Failed to delete workflow: ${error.message}`);
        }
    }

    // Rule operations (using Cloud Rules API)
    async getRules(): Promise<Rule[]> {
        this.ensureConnected();
        try {
            // Note: SailPoint uses different endpoints for different rule types
            // This is a simplified version - you may need to adjust based on your needs
            const response = await this.axiosInstance!.get('/connector-rules');
            return response.data;
        } catch (error: any) {
            throw new Error(`Failed to fetch rules: ${error.message}`);
        }
    }

    async getRule(id: string): Promise<Rule> {
        this.ensureConnected();
        try {
            const response = await this.axiosInstance!.get(`/connector-rules/${id}`);
            return response.data;
        } catch (error: any) {
            throw new Error(`Failed to fetch rule: ${error.message}`);
        }
    }

    async createRule(rule: Partial<Rule>): Promise<Rule> {
        this.ensureConnected();
        try {
            const response = await this.axiosInstance!.post('/connector-rules', rule);
            return response.data;
        } catch (error: any) {
            throw new Error(`Failed to create rule: ${error.message}`);
        }
    }

    async updateRule(id: string, rule: Partial<Rule>): Promise<Rule> {
        this.ensureConnected();
        try {
            const response = await this.axiosInstance!.put(`/connector-rules/${id}`, rule);
            return response.data;
        } catch (error: any) {
            throw new Error(`Failed to update rule: ${error.message}`);
        }
    }

    async deleteRule(id: string): Promise<void> {
        this.ensureConnected();
        try {
            await this.axiosInstance!.delete(`/connector-rules/${id}`);
        } catch (error: any) {
            throw new Error(`Failed to delete rule: ${error.message}`);
        }
    }
}
