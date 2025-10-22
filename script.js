// Game State
let gameState = {
    currentModule: 0,
    score: 0,
    level: 1,
    badges: [],
    completedModules: []
};

// Badges
const badges = {
    starter: { emoji: '🌟', name: 'AI Explorer', description: 'Started your AI journey!' },
    learner: { emoji: '📚', name: 'Quick Learner', description: 'Completed 3 modules!' },
    network: { emoji: '🧠', name: 'Neural Navigator', description: 'Mastered Neural Networks!' },
    transformer: { emoji: '⚡', name: 'Transformer Master', description: 'Understood attention mechanisms!' },
    llm: { emoji: '🤖', name: 'LLM Expert', description: 'Mastered Large Language Models!' },
    rag: { emoji: '📖', name: 'RAG Specialist', description: 'Built a RAG system!' },
    agent: { emoji: '🎯', name: 'Agent Architect', description: 'Designed AI agents!' },
    expert: { emoji: '🏆', name: 'AI Expert', description: 'Completed all modules!' },
    perfect: { emoji: '💎', name: 'Perfect Score', description: 'Got perfect scores!' }
};

// Modules Content
const modules = [
    {
        title: 'AI & Machine Learning Fundamentals',
        content: () => `
            <div class="lesson-text">
                <h3>The AI Landscape</h3>
                <p>AI encompasses multiple paradigms, but modern AI is dominated by <strong>Machine Learning</strong> - systems that improve through experience.</p>

                <div class="tech-box">
                    <h4>📊 Three Main Types of ML:</h4>
                    <div class="ml-types">
                        <div class="ml-type">
                            <strong>Supervised Learning</strong>
                            <p>Training with labeled data (input → output pairs)</p>
                            <code>Examples: Classification, Regression</code>
                        </div>
                        <div class="ml-type">
                            <strong>Unsupervised Learning</strong>
                            <p>Finding patterns in unlabeled data</p>
                            <code>Examples: Clustering, Dimensionality Reduction</code>
                        </div>
                        <div class="ml-type">
                            <strong>Reinforcement Learning</strong>
                            <p>Learning through rewards and penalties</p>
                            <code>Examples: Game AI, Robotics</code>
                        </div>
                    </div>
                </div>

                <div class="code-example">
                    <h4>💻 Conceptual ML Pipeline:</h4>
                    <pre><code>Data Collection → Preprocessing → Feature Engineering
    ↓
Model Training → Validation → Hyperparameter Tuning
    ↓
Testing → Deployment → Monitoring</code></pre>
                </div>

                <p><strong>Key Insight:</strong> The quality of your data matters more than the sophistication of your algorithm. "Garbage in, garbage out" is a fundamental principle in ML.</p>
            </div>

            <div class="quiz-container">
                <div class="quiz-question">Which learning type would you use for training a chess AI that learns by playing against itself?</div>
                <div class="quiz-options" id="quiz1">
                    <div class="quiz-option" data-correct="false" onclick="selectQuizOption(this, 0)">
                        Supervised Learning
                    </div>
                    <div class="quiz-option" data-correct="false" onclick="selectQuizOption(this, 0)">
                        Unsupervised Learning
                    </div>
                    <div class="quiz-option" data-correct="true" onclick="selectQuizOption(this, 0)">
                        Reinforcement Learning
                    </div>
                </div>
                <div class="quiz-feedback" id="feedback1"></div>
            </div>
        `
    },
    {
        title: 'Deep Learning & Neural Networks',
        content: () => `
            <div class="lesson-text">
                <h3>The Power of Deep Neural Networks</h3>
                <p>Deep Learning uses multi-layered neural networks to learn hierarchical representations of data. Each layer learns increasingly abstract features.</p>

                <div class="tech-box">
                    <h4>🧠 Neural Network Architecture:</h4>
                    <p><strong>Forward Propagation:</strong> Data flows through layers, each applying transformations:</p>
                    <code>output = activation(weights × input + bias)</code>

                    <p style="margin-top: 15px;"><strong>Backpropagation:</strong> Error gradients flow backward to update weights via gradient descent:</p>
                    <code>∂Loss/∂w → Update weights to minimize loss</code>
                </div>

                <div class="interactive-demo">
                    <h4 style="text-align: center; margin-bottom: 20px;">🔮 Neural Network Visualization</h4>

                    <div class="neural-network" id="neuralNet">
                        <div class="network-layer">
                            <div style="text-align: center; margin-bottom: 10px; font-weight: 600; font-size: 12px;">Input Layer<br/>(Features)</div>
                            <div class="neuron" onclick="activateNeuron(this, 0)" title="Pixel values, text embeddings, etc.">x₁</div>
                            <div class="neuron" onclick="activateNeuron(this, 0)">x₂</div>
                            <div class="neuron" onclick="activateNeuron(this, 0)">x₃</div>
                        </div>
                        <div class="network-layer">
                            <div style="text-align: center; margin-bottom: 10px; font-weight: 600; font-size: 12px;">Hidden Layer 1<br/>(Low-level)</div>
                            <div class="neuron" onclick="activateNeuron(this, 1)" title="Edges, textures">h₁</div>
                            <div class="neuron" onclick="activateNeuron(this, 1)">h₂</div>
                            <div class="neuron" onclick="activateNeuron(this, 1)">h₃</div>
                            <div class="neuron" onclick="activateNeuron(this, 1)">h₄</div>
                        </div>
                        <div class="network-layer">
                            <div style="text-align: center; margin-bottom: 10px; font-weight: 600; font-size: 12px;">Hidden Layer 2<br/>(High-level)</div>
                            <div class="neuron" onclick="activateNeuron(this, 2)" title="Shapes, patterns">h₅</div>
                            <div class="neuron" onclick="activateNeuron(this, 2)">h₆</div>
                            <div class="neuron" onclick="activateNeuron(this, 2)">h₇</div>
                        </div>
                        <div class="network-layer">
                            <div style="text-align: center; margin-bottom: 10px; font-weight: 600; font-size: 12px;">Output<br/>(Predictions)</div>
                            <div class="neuron" onclick="activateNeuron(this, 3)">ŷ₁</div>
                            <div class="neuron" onclick="activateNeuron(this, 3)">ŷ₂</div>
                        </div>
                    </div>
                    <p style="text-align: center; margin-top: 20px; color: #64748b; font-size: 14px;">
                        Each layer extracts more abstract features. Click neurons to see activation flow!
                    </p>
                </div>

                <div class="tech-box" style="margin-top: 20px;">
                    <h4>🎯 Common Activation Functions:</h4>
                    <ul style="line-height: 2;">
                        <li><strong>ReLU:</strong> max(0, x) - Most common, prevents vanishing gradients</li>
                        <li><strong>Sigmoid:</strong> 1/(1+e⁻ˣ) - Outputs between 0 and 1</li>
                        <li><strong>Tanh:</strong> (eˣ-e⁻ˣ)/(eˣ+e⁻ˣ) - Outputs between -1 and 1</li>
                        <li><strong>Softmax:</strong> eˣⁱ/Σeˣʲ - For multi-class classification</li>
                    </ul>
                </div>
            </div>

            <div class="quiz-container">
                <div class="quiz-question">What is the primary purpose of backpropagation?</div>
                <div class="quiz-options" id="quiz2">
                    <div class="quiz-option" data-correct="false" onclick="selectQuizOption(this, 1)">
                        To pass data forward through the network
                    </div>
                    <div class="quiz-option" data-correct="true" onclick="selectQuizOption(this, 1)">
                        To compute gradients and update weights to minimize loss
                    </div>
                    <div class="quiz-option" data-correct="false" onclick="selectQuizOption(this, 1)">
                        To normalize the input data
                    </div>
                </div>
                <div class="quiz-feedback" id="feedback2"></div>
            </div>
        `
    },
    {
        title: 'Transformers & Attention Mechanisms',
        content: () => `
            <div class="lesson-text">
                <h3>The Transformer Revolution</h3>
                <p>Introduced in the 2017 paper "Attention Is All You Need", transformers revolutionized AI by using <strong>self-attention</strong> mechanisms instead of recurrence.</p>

                <div class="tech-box">
                    <h4>⚡ How Self-Attention Works:</h4>
                    <p>For each word, the model learns to "attend" to other relevant words in the sequence:</p>

                    <div class="attention-demo" style="background: #f8fafc; padding: 20px; border-radius: 12px; margin: 15px 0;">
                        <p style="text-align: center; font-size: 18px; margin-bottom: 15px;">
                            <span class="word" onclick="highlightAttention(0)">The</span>
                            <span class="word" onclick="highlightAttention(1)">cat</span>
                            <span class="word" onclick="highlightAttention(2)">sat</span>
                            <span class="word" onclick="highlightAttention(3)">on</span>
                            <span class="word" onclick="highlightAttention(4)">the</span>
                            <span class="word" onclick="highlightAttention(5)">mat</span>
                        </p>
                        <p style="text-align: center; font-size: 14px; color: #64748b;">Click words to see attention weights!</p>
                        <div id="attentionResult" style="margin-top: 15px; text-align: center; font-weight: 600;"></div>
                    </div>

                    <div class="code-example">
                        <h4>🔢 Attention Formula:</h4>
                        <pre><code>Q = Query (what I'm looking for)
K = Key (what I have to offer)
V = Value (actual information)

Attention(Q,K,V) = softmax(QKᵀ/√dₖ) × V</code></pre>
                    </div>
                </div>

                <div class="tech-box">
                    <h4>🏗️ Transformer Architecture:</h4>
                    <div class="ml-types">
                        <div class="ml-type">
                            <strong>Encoder</strong>
                            <p>Processes input sequence</p>
                            <code>Multi-Head Attention → FFN</code>
                        </div>
                        <div class="ml-type">
                            <strong>Decoder</strong>
                            <p>Generates output sequence</p>
                            <code>Masked Attention → Cross-Attention → FFN</code>
                        </div>
                    </div>
                    <p style="margin-top: 15px;"><strong>Key Innovation:</strong> Parallel processing (vs sequential in RNNs) enables training on massive datasets efficiently.</p>
                </div>

                <div class="tech-box">
                    <h4>🌟 Why Transformers Won:</h4>
                    <ul style="line-height: 2;">
                        <li>✅ <strong>Parallelization:</strong> Process all tokens simultaneously</li>
                        <li>✅ <strong>Long-range dependencies:</strong> Capture relationships across entire sequences</li>
                        <li>✅ <strong>Scalability:</strong> Performance improves with model size and data</li>
                        <li>✅ <strong>Transfer learning:</strong> Pre-train once, fine-tune for many tasks</li>
                    </ul>
                </div>
            </div>

            <div class="quiz-container">
                <div class="quiz-question">What is the main advantage of transformers over RNNs?</div>
                <div class="quiz-options" id="quiz3">
                    <div class="quiz-option" data-correct="false" onclick="selectQuizOption(this, 2)">
                        Transformers use less memory
                    </div>
                    <div class="quiz-option" data-correct="true" onclick="selectQuizOption(this, 2)">
                        Transformers can process sequences in parallel, making training much faster
                    </div>
                    <div class="quiz-option" data-correct="false" onclick="selectQuizOption(this, 2)">
                        Transformers are simpler to implement
                    </div>
                </div>
                <div class="quiz-feedback" id="feedback3"></div>
            </div>
        `
    },
    {
        title: 'LLMs, Embeddings & Vector Databases',
        content: () => `
            <div class="lesson-text">
                <h3>Large Language Models (LLMs)</h3>
                <p>LLMs like GPT, Claude, and Llama are transformer models trained on vast text corpora. They learn statistical patterns of language and develop emergent capabilities.</p>

                <div class="tech-box">
                    <h4>📏 Understanding Embeddings</h4>
                    <p>Embeddings convert text into high-dimensional vectors that capture semantic meaning. Similar concepts have similar vectors.</p>

                    <div class="embedding-demo">
                        <h4 style="text-align: center; margin: 20px 0;">🎯 Semantic Similarity Demo</h4>
                        <div class="embedding-examples">
                            <div class="embedding-pair">
                                <div class="embed-word">King</div>
                                <div class="similarity-bar" style="width: 90%;">0.90</div>
                                <div class="embed-word">Queen</div>
                            </div>
                            <div class="embedding-pair">
                                <div class="embed-word">King</div>
                                <div class="similarity-bar" style="width: 75%;">0.75</div>
                                <div class="embed-word">Monarch</div>
                            </div>
                            <div class="embedding-pair">
                                <div class="embed-word">King</div>
                                <div class="similarity-bar" style="width: 15%;">0.15</div>
                                <div class="embed-word">Pizza</div>
                            </div>
                        </div>
                        <p style="text-align: center; margin-top: 15px; font-size: 14px; color: #64748b;">
                            Cosine similarity between word embeddings (1 = identical, 0 = unrelated)
                        </p>
                    </div>
                </div>

                <div class="code-example">
                    <h4>💻 Using Embeddings in Code:</h4>
                    <pre><code>// Generate embeddings
const embedding = await model.embed("Hello world");
// Returns: [0.23, -0.45, 0.67, ...] (1536 dimensions)

// Find similar items using cosine similarity
similarity = dot(vec1, vec2) / (norm(vec1) * norm(vec2))</code></pre>
                </div>

                <div class="tech-box">
                    <h4>🗄️ Vector Databases</h4>
                    <p>Specialized databases that store and efficiently search high-dimensional embeddings:</p>
                    <ul style="line-height: 2; margin-top: 10px;">
                        <li><strong>Pinecone, Weaviate, Chroma:</strong> Purpose-built vector DBs</li>
                        <li><strong>pgvector:</strong> PostgreSQL extension for vectors</li>
                        <li><strong>FAISS:</strong> Facebook's similarity search library</li>
                    </ul>
                    <p style="margin-top: 15px;"><strong>Use Case:</strong> Semantic search - find documents by meaning, not just keywords!</p>
                </div>

                <div class="interactive-demo">
                    <h4>🎮 Interactive: Match Semantic Queries</h4>
                    <p style="margin-bottom: 15px;">Which document would an embedding-based search return for: <strong>"How do I reset my password?"</strong></p>
                    <div class="quiz-options" id="embedQuiz">
                        <div class="quiz-option" data-correct="false" onclick="selectEmbedOption(this)">
                            Document about "Password encryption algorithms"
                        </div>
                        <div class="quiz-option" data-correct="true" onclick="selectEmbedOption(this)">
                            Document titled "Account Recovery Guide"
                        </div>
                        <div class="quiz-option" data-correct="false" onclick="selectEmbedOption(this)">
                            Document about "Creating strong passwords"
                        </div>
                    </div>
                    <div class="quiz-feedback" id="embedFeedback"></div>
                </div>
            </div>

            <div class="tech-box">
                <h4>🎓 LLM Training Stages:</h4>
                <ol style="line-height: 2;">
                    <li><strong>Pre-training:</strong> Learn language patterns from massive text corpus (unsupervised)</li>
                    <li><strong>Fine-tuning:</strong> Adapt to specific tasks with labeled data</li>
                    <li><strong>RLHF:</strong> Reinforcement Learning from Human Feedback to align with human preferences</li>
                </ol>
            </div>
        `
    },
    {
        title: 'RAG: Retrieval Augmented Generation',
        content: () => `
            <div class="lesson-text">
                <h3>Enhancing LLMs with External Knowledge</h3>
                <p>RAG combines the power of LLMs with external knowledge retrieval. Instead of relying only on training data, the model can access up-to-date information.</p>

                <div class="tech-box">
                    <h4>🔄 The RAG Pipeline:</h4>
                    <div class="rag-flow">
                        <div class="rag-step">
                            <div class="rag-number">1</div>
                            <h5>User Query</h5>
                            <p>"What is RAG?"</p>
                        </div>
                        <div class="rag-arrow">→</div>
                        <div class="rag-step">
                            <div class="rag-number">2</div>
                            <h5>Embed Query</h5>
                            <p>Convert to vector</p>
                        </div>
                        <div class="rag-arrow">→</div>
                        <div class="rag-step">
                            <div class="rag-number">3</div>
                            <h5>Retrieve</h5>
                            <p>Search vector DB</p>
                        </div>
                        <div class="rag-arrow">→</div>
                        <div class="rag-step">
                            <div class="rag-number">4</div>
                            <h5>Augment</h5>
                            <p>Add context to query</p>
                        </div>
                        <div class="rag-arrow">→</div>
                        <div class="rag-step">
                            <div class="rag-number">5</div>
                            <h5>Generate</h5>
                            <p>LLM produces answer</p>
                        </div>
                    </div>
                </div>

                <div class="code-example">
                    <h4>💻 RAG Implementation:</h4>
                    <pre><code>// 1. Index your documents
const chunks = splitDocuments(documents);
const embeddings = await embed(chunks);
await vectorDB.insert(embeddings, chunks);

// 2. Query with RAG
async function ragQuery(question) {
    // Retrieve relevant context
    const queryEmbedding = await embed(question);
    const relevant = await vectorDB.search(queryEmbedding, k=3);

    // Augment prompt with context
    const prompt = \`Context: \${relevant.join('\\n')}

    Question: \${question}
    Answer based on the context above:\`;

    // Generate answer
    return await llm.generate(prompt);
}</code></pre>
                </div>

                <div class="tech-box">
                    <h4>✨ Benefits of RAG:</h4>
                    <ul style="line-height: 2;">
                        <li>📚 <strong>Up-to-date information:</strong> Access current data without retraining</li>
                        <li>🎯 <strong>Domain-specific knowledge:</strong> Use proprietary or specialized content</li>
                        <li>🔍 <strong>Reduced hallucinations:</strong> Ground responses in real documents</li>
                        <li>📖 <strong>Source attribution:</strong> Cite where information came from</li>
                        <li>💰 <strong>Cost-effective:</strong> Cheaper than fine-tuning for every use case</li>
                    </ul>
                </div>

                <div class="interactive-demo">
                    <h4>🎯 Build Your RAG System</h4>
                    <p>Put the RAG steps in the correct order:</p>
                    <div id="ragOrderGame" class="ordering-game">
                        <div class="order-item" draggable="true" data-order="3">
                            🔍 Search vector database for similar documents
                        </div>
                        <div class="order-item" draggable="true" data-order="1">
                            📝 User submits a question
                        </div>
                        <div class="order-item" draggable="true" data-order="5">
                            🤖 LLM generates answer using retrieved context
                        </div>
                        <div class="order-item" draggable="true" data-order="2">
                            🔢 Convert question to embedding vector
                        </div>
                        <div class="order-item" draggable="true" data-order="4">
                            ➕ Augment prompt with retrieved documents
                        </div>
                    </div>
                    <button class="btn btn-primary" onclick="checkRAGOrder()" style="margin-top: 15px;">Check Order</button>
                    <div id="ragOrderResult"></div>
                </div>

                <div class="tech-box">
                    <h4>🚀 Advanced RAG Techniques:</h4>
                    <ul style="line-height: 2;">
                        <li><strong>Hybrid Search:</strong> Combine vector search with keyword search (BM25)</li>
                        <li><strong>Re-ranking:</strong> Use a separate model to re-score retrieved documents</li>
                        <li><strong>Query Expansion:</strong> Generate multiple query variants for better recall</li>
                        <li><strong>Contextual Chunking:</strong> Smart document splitting that preserves meaning</li>
                    </ul>
                </div>
            </div>
        `
    },
    {
        title: 'MCP: Model Context Protocol',
        content: () => `
            <div class="lesson-text">
                <h3>Standardizing AI-to-System Communication</h3>
                <p>The <strong>Model Context Protocol (MCP)</strong> is an open standard that enables LLMs to securely access external data sources and tools through a unified interface.</p>

                <div class="tech-box">
                    <h4>🔌 What is MCP?</h4>
                    <p>Think of MCP as "USB for AI" - a universal way for LLMs to connect to various data sources and tools without custom integrations for each one.</p>

                    <div class="mcp-diagram">
                        <div class="mcp-layer">
                            <div class="mcp-box llm-box">🤖 LLM Client<br/><small>(Claude, GPT, etc.)</small></div>
                        </div>
                        <div class="mcp-arrow-down">↕️<br/>MCP Protocol</div>
                        <div class="mcp-layer">
                            <div class="mcp-box server-box">MCP Servers</div>
                        </div>
                        <div class="mcp-arrow-down">↓ ↓ ↓</div>
                        <div class="mcp-layer mcp-sources">
                            <div class="mcp-source">📁 Files</div>
                            <div class="mcp-source">🗄️ Databases</div>
                            <div class="mcp-source">🌐 APIs</div>
                            <div class="mcp-source">🔧 Tools</div>
                        </div>
                    </div>
                </div>

                <div class="tech-box">
                    <h4>🎯 Core MCP Concepts:</h4>
                    <div class="ml-types">
                        <div class="ml-type">
                            <strong>Resources</strong>
                            <p>Data the LLM can read</p>
                            <code>file://, db://, api://</code>
                        </div>
                        <div class="ml-type">
                            <strong>Prompts</strong>
                            <p>Reusable templates</p>
                            <code>Pre-configured workflows</code>
                        </div>
                        <div class="ml-type">
                            <strong>Tools</strong>
                            <p>Functions the LLM can call</p>
                            <code>calculate(), search(), etc.</code>
                        </div>
                    </div>
                </div>

                <div class="code-example">
                    <h4>💻 MCP Server Example:</h4>
                    <pre><code>// Simple MCP server providing weather data
import { Server } from "@modelcontextprotocol/sdk/server";

const server = new Server({
  name: "weather-server",
  version: "1.0.0"
});

// Expose a tool
server.addTool({
  name: "get_weather",
  description: "Get current weather for a location",
  parameters: {
    location: { type: "string", required: true }
  },
  handler: async (params) => {
    const weather = await fetchWeather(params.location);
    return { temperature: weather.temp, condition: weather.condition };
  }
});

server.start();</code></pre>
                </div>

                <div class="tech-box">
                    <h4>✨ MCP Benefits:</h4>
                    <ul style="line-height: 2;">
                        <li>🔒 <strong>Security:</strong> Controlled access with clear permissions</li>
                        <li>🔄 <strong>Interoperability:</strong> Write once, works with any MCP client</li>
                        <li>📦 <strong>Modularity:</strong> Mix and match data sources easily</li>
                        <li>🚀 <strong>Rapid Development:</strong> Plug-and-play AI integrations</li>
                        <li>🌍 <strong>Community:</strong> Growing ecosystem of MCP servers</li>
                    </ul>
                </div>

                <div class="interactive-demo">
                    <h4>🎮 MCP Connection Builder</h4>
                    <p>Match each MCP server to its best use case:</p>
                    <div class="matching-game">
                        <div class="match-card" data-match="filesystem" onclick="selectMCPMatch(this, 'filesystem')">
                            <div class="match-card-icon">📁</div>
                            <div class="match-card-title">Filesystem Server</div>
                        </div>
                        <div class="match-card" data-match="database" onclick="selectMCPMatch(this, 'database')">
                            <div class="match-card-icon">🗄️</div>
                            <div class="match-card-title">Database Server</div>
                        </div>
                        <div class="match-card" data-match="api" onclick="selectMCPMatch(this, 'api')">
                            <div class="match-card-icon">🌐</div>
                            <div class="match-card-title">API Integration Server</div>
                        </div>
                        <div class="match-card" data-match="git" onclick="selectMCPMatch(this, 'git')">
                            <div class="match-card-icon">🔧</div>
                            <div class="match-card-title">Git Server</div>
                        </div>
                    </div>
                    <div id="mcpMatchResult" style="margin-top: 15px;"></div>
                </div>

                <div class="tech-box">
                    <h4>🔮 Real-World MCP Use Cases:</h4>
                    <ul style="line-height: 2;">
                        <li><strong>Documentation Assistant:</strong> Query your codebase, docs, and Slack history</li>
                        <li><strong>Data Analysis:</strong> Connect to databases, spreadsheets, and analytics platforms</li>
                        <li><strong>Automation:</strong> Control enterprise tools (Jira, Salesforce, etc.)</li>
                        <li><strong>Research:</strong> Access scientific databases and research papers</li>
                    </ul>
                </div>
            </div>

            <div class="quiz-container">
                <div class="quiz-question">What is the main purpose of MCP?</div>
                <div class="quiz-options" id="quiz6">
                    <div class="quiz-option" data-correct="false" onclick="selectQuizOption(this, 5)">
                        To train AI models faster
                    </div>
                    <div class="quiz-option" data-correct="true" onclick="selectQuizOption(this, 5)">
                        To provide a standardized way for LLMs to access external data and tools
                    </div>
                    <div class="quiz-option" data-correct="false" onclick="selectQuizOption(this, 5)">
                        To compress model weights
                    </div>
                </div>
                <div class="quiz-feedback" id="feedback6"></div>
            </div>
        `
    },
    {
        title: 'Agentic AI & AI Agents',
        content: () => `
            <div class="lesson-text">
                <h3>From Chatbots to Autonomous Agents</h3>
                <p><strong>AI Agents</strong> are systems that can perceive their environment, make decisions, and take actions to achieve goals - often with minimal human intervention.</p>

                <div class="tech-box">
                    <h4>🤖 The Agent Loop:</h4>
                    <div class="agent-loop">
                        <div class="agent-step">
                            <div class="agent-icon">👀</div>
                            <h5>Observe</h5>
                            <p>Perceive environment & gather context</p>
                        </div>
                        <div class="agent-arrow">→</div>
                        <div class="agent-step">
                            <div class="agent-icon">🧠</div>
                            <h5>Reason</h5>
                            <p>Plan actions using LLM</p>
                        </div>
                        <div class="agent-arrow">→</div>
                        <div class="agent-step">
                            <div class="agent-icon">⚡</div>
                            <h5>Act</h5>
                            <p>Execute tools & APIs</p>
                        </div>
                        <div class="agent-arrow">→</div>
                        <div class="agent-step">
                            <div class="agent-icon">📊</div>
                            <h5>Learn</h5>
                            <p>Update based on feedback</p>
                        </div>
                        <div class="agent-arrow-back">↺ Repeat</div>
                    </div>
                </div>

                <div class="tech-box">
                    <h4>🏗️ Agent Architectures:</h4>
                    <div class="ml-types">
                        <div class="ml-type">
                            <strong>ReAct</strong>
                            <p>Reasoning + Acting</p>
                            <code>Think → Act → Observe → Repeat</code>
                        </div>
                        <div class="ml-type">
                            <strong>Chain-of-Thought</strong>
                            <p>Step-by-step reasoning</p>
                            <code>Break complex tasks into steps</code>
                        </div>
                        <div class="ml-type">
                            <strong>Multi-Agent</strong>
                            <p>Specialized agents collaborate</p>
                            <code>Researcher + Coder + Reviewer</code>
                        </div>
                    </div>
                </div>

                <div class="code-example">
                    <h4>💻 Simple Agent Implementation:</h4>
                    <pre><code>class Agent {
    constructor(llm, tools) {
        this.llm = llm;
        this.tools = tools;
        this.memory = [];
    }

    async run(task) {
        while (!this.isComplete(task)) {
            // Observe: Get current state
            const context = this.buildContext();

            // Reason: Decide next action
            const thought = await this.llm.complete(\`
                Task: \${task}
                Context: \${context}
                Available tools: \${this.tools.map(t => t.name)}
                What should I do next?
            \`);

            // Act: Execute chosen tool
            const action = this.parseAction(thought);
            const result = await this.tools[action.tool](action.params);

            // Learn: Update memory
            this.memory.push({ thought, action, result });
        }
        return this.synthesizeResult();
    }
}</code></pre>
                </div>

                <div class="tech-box">
                    <h4>🎯 Key Agent Capabilities:</h4>
                    <ul style="line-height: 2;">
                        <li>🔧 <strong>Tool Use:</strong> Call functions, APIs, and external services</li>
                        <li>💾 <strong>Memory:</strong> Maintain context across multiple interactions</li>
                        <li>📋 <strong>Planning:</strong> Break down complex tasks into sub-tasks</li>
                        <li>🔄 <strong>Iteration:</strong> Retry and self-correct when needed</li>
                        <li>🎭 <strong>Multi-modal:</strong> Process text, images, audio, etc.</li>
                    </ul>
                </div>

                <div class="interactive-demo">
                    <h4>🎮 Build an Agent Workflow</h4>
                    <p>Design an agent to research and write a report. Select the tools it needs:</p>
                    <div class="tool-selection">
                        <div class="tool-option" onclick="toggleTool(this, true)">
                            <input type="checkbox" /> 🔍 Web Search
                        </div>
                        <div class="tool-option" onclick="toggleTool(this, true)">
                            <input type="checkbox" /> 📝 Document Writer
                        </div>
                        <div class="tool-option" onclick="toggleTool(this, false)">
                            <input type="checkbox" /> 🎮 Game Controller
                        </div>
                        <div class="tool-option" onclick="toggleTool(this, true)">
                            <input type="checkbox" /> 🗂️ File Manager
                        </div>
                        <div class="tool-option" onclick="toggleTool(this, false)">
                            <input type="checkbox" /> 🎵 Music Player
                        </div>
                        <div class="tool-option" onclick="toggleTool(this, true)">
                            <input type="checkbox" /> 📊 Data Analyzer
                        </div>
                    </div>
                    <button class="btn btn-primary" onclick="checkAgentTools()" style="margin-top: 15px;">Check Selection</button>
                    <div id="agentToolResult"></div>
                </div>

                <div class="tech-box">
                    <h4>🚀 Real-World Agent Applications:</h4>
                    <ul style="line-height: 2;">
                        <li><strong>Code Assistants:</strong> AutoGPT, Claude Code - write and debug code autonomously</li>
                        <li><strong>Research Agents:</strong> Gather information from multiple sources, synthesize findings</li>
                        <li><strong>Customer Service:</strong> Handle complex queries requiring multiple system lookups</li>
                        <li><strong>DevOps:</strong> Monitor, diagnose, and fix infrastructure issues</li>
                        <li><strong>Data Analysis:</strong> Explore datasets, generate insights, create visualizations</li>
                    </ul>
                </div>

                <div class="tech-box">
                    <h4>⚠️ Agent Challenges:</h4>
                    <ul style="line-height: 2;">
                        <li><strong>Reliability:</strong> Ensuring consistent performance across diverse tasks</li>
                        <li><strong>Control:</strong> Balancing autonomy with human oversight</li>
                        <li><strong>Cost:</strong> Many LLM calls can be expensive</li>
                        <li><strong>Safety:</strong> Preventing harmful actions in open-ended environments</li>
                    </ul>
                </div>
            </div>
        `
    },
    {
        title: 'Prompt Engineering & Advanced Techniques',
        content: () => `
            <div class="lesson-text">
                <h3>Mastering LLM Communication</h3>
                <p><strong>Prompt Engineering</strong> is the art and science of crafting inputs to get optimal outputs from LLMs. It's becoming a critical skill in the AI era.</p>

                <div class="tech-box">
                    <h4>🎨 Prompt Patterns:</h4>
                    <div class="prompt-examples">
                        <div class="prompt-card">
                            <h5>Zero-Shot</h5>
                            <div class="prompt-box">
                                <code>Translate to French: "Hello world"</code>
                            </div>
                            <p>Direct instruction, no examples</p>
                        </div>
                        <div class="prompt-card">
                            <h5>Few-Shot</h5>
                            <div class="prompt-box">
                                <code>Dog → Puppy<br/>Cat → Kitten<br/>Bear → ?</code>
                            </div>
                            <p>Learn from examples</p>
                        </div>
                        <div class="prompt-card">
                            <h5>Chain-of-Thought</h5>
                            <div class="prompt-box">
                                <code>Let's think step by step:<br/>1. First...<br/>2. Then...</code>
                            </div>
                            <p>Explicit reasoning steps</p>
                        </div>
                    </div>
                </div>

                <div class="code-example">
                    <h4>💻 Advanced Prompting Techniques:</h4>
                    <pre><code>// 1. System + User Pattern
{
  system: "You are an expert Python debugger.",
  user: "Fix this code: [code]"
}

// 2. Role + Task + Format
\`Act as a technical writer.
Task: Explain RAG to beginners.
Format: 3 paragraphs with examples.\`

// 3. Few-Shot with Reasoning
\`Question: What's 15% of 80?
Reasoning: 80 × 0.15 = 12
Answer: 12

Question: What's 25% of 200?
Reasoning: 200 × 0.25 = 50
Answer: 50

Question: What's 18% of 150?
Reasoning:\`</code></pre>
                </div>

                <div class="tech-box">
                    <h4>🎯 Key Prompting Principles:</h4>
                    <ul style="line-height: 2;">
                        <li>✅ <strong>Be Specific:</strong> Clear instructions yield better results</li>
                        <li>✅ <strong>Provide Context:</strong> Give background information</li>
                        <li>✅ <strong>Use Examples:</strong> Show, don't just tell</li>
                        <li>✅ <strong>Break Down:</strong> Complex tasks → smaller steps</li>
                        <li>✅ <strong>Iterate:</strong> Refine prompts based on outputs</li>
                        <li>✅ <strong>Set Constraints:</strong> Length, format, tone, etc.</li>
                    </ul>
                </div>

                <div class="interactive-demo">
                    <h4>🎮 Prompt Engineering Challenge</h4>
                    <p>Which prompt would work best for getting a structured product review summary?</p>
                    <div class="quiz-options" id="promptQuiz">
                        <div class="quiz-option prompt-option" data-correct="false" onclick="selectPromptOption(this)">
                            <strong>Prompt A:</strong> "Summarize this review."
                        </div>
                        <div class="quiz-option prompt-option" data-correct="true" onclick="selectPromptOption(this)">
                            <strong>Prompt B:</strong> "Analyze this product review and provide:<br/>
                            1. Overall sentiment (positive/negative/mixed)<br/>
                            2. Key pros (bullet points)<br/>
                            3. Key cons (bullet points)<br/>
                            4. Recommendation (buy/skip/maybe)"
                        </div>
                        <div class="quiz-option prompt-option" data-correct="false" onclick="selectPromptOption(this)">
                            <strong>Prompt C:</strong> "Tell me about this review in a fun way!"
                        </div>
                    </div>
                    <div class="quiz-feedback" id="promptFeedback"></div>
                </div>

                <div class="tech-box">
                    <h4>🚀 Advanced Techniques:</h4>
                    <div class="ml-types">
                        <div class="ml-type">
                            <strong>Constitutional AI</strong>
                            <p>Self-critique and refinement</p>
                            <code>Generate → Critique → Revise</code>
                        </div>
                        <div class="ml-type">
                            <strong>Tree of Thoughts</strong>
                            <p>Explore multiple reasoning paths</p>
                            <code>Branch → Evaluate → Prune</code>
                        </div>
                        <div class="ml-type">
                            <strong>Meta-Prompting</strong>
                            <p>LLM generates its own prompts</p>
                            <code>Self-improving prompts</code>
                        </div>
                    </div>
                </div>

                <div class="tech-box">
                    <h4>⚡ Optimization Tips:</h4>
                    <ul style="line-height: 2;">
                        <li><strong>Temperature:</strong> Lower (0-0.3) for factual, higher (0.7-1.0) for creative</li>
                        <li><strong>Max Tokens:</strong> Set appropriate limits to control costs</li>
                        <li><strong>Stop Sequences:</strong> End generation at specific markers</li>
                        <li><strong>Top-p (Nucleus):</strong> Control diversity of word selection</li>
                    </ul>
                </div>
            </div>
        `
    },
    {
        title: 'AI Ethics, Safety & the Future',
        content: () => `
            <div class="lesson-text">
                <h3>Building Responsible AI Systems</h3>
                <p>As AI becomes more powerful and autonomous, addressing ethical concerns and safety challenges is crucial for beneficial deployment.</p>

                <div class="tech-box">
                    <h4>⚠️ Key Ethical Challenges:</h4>
                    <div class="ethics-grid">
                        <div class="ethics-card">
                            <div class="ethics-icon">🎯</div>
                            <h5>Bias & Fairness</h5>
                            <p>AI systems can perpetuate or amplify societal biases present in training data</p>
                        </div>
                        <div class="ethics-card">
                            <div class="ethics-icon">🔒</div>
                            <h5>Privacy</h5>
                            <p>Balancing data utility with individual privacy rights</p>
                        </div>
                        <div class="ethics-card">
                            <div class="ethics-icon">💼</div>
                            <h5>Job Displacement</h5>
                            <p>Automation may disrupt traditional employment</p>
                        </div>
                        <div class="ethics-card">
                            <div class="ethics-icon">🎭</div>
                            <h5>Transparency</h5>
                            <p>Understanding how AI makes decisions (explainability)</p>
                        </div>
                        <div class="ethics-card">
                            <div class="ethics-icon">🛡️</div>
                            <h5>Safety & Alignment</h5>
                            <p>Ensuring AI systems do what we intend</p>
                        </div>
                        <div class="ethics-card">
                            <div class="ethics-icon">⚖️</div>
                            <h5>Accountability</h5>
                            <p>Who's responsible when AI causes harm?</p>
                        </div>
                    </div>
                </div>

                <div class="tech-box">
                    <h4>🛡️ AI Safety Approaches:</h4>
                    <ul style="line-height: 2;">
                        <li><strong>RLHF (Reinforcement Learning from Human Feedback):</strong> Align AI with human values</li>
                        <li><strong>Red Teaming:</strong> Adversarial testing to find vulnerabilities</li>
                        <li><strong>Constitutional AI:</strong> AI that self-critiques using ethical principles</li>
                        <li><strong>Interpretability Research:</strong> Understanding neural network internals</li>
                        <li><strong>Robustness Testing:</strong> Ensuring consistent behavior across edge cases</li>
                    </ul>
                </div>

                <div class="scenario-cards" id="advancedScenarios">
                    <div class="scenario-card">
                        <div class="scenario-title">🏥 Scenario: AI in Healthcare</div>
                        <div class="scenario-description">An AI model shows higher accuracy for certain demographic groups. What's the responsible approach?</div>
                        <div class="scenario-options">
                            <button class="scenario-btn" onclick="selectScenario(this, 'good')">Investigate the bias, collect more diverse training data, and ensure equitable performance</button>
                            <button class="scenario-btn" onclick="selectScenario(this, 'bad')">Deploy anyway since overall accuracy is high</button>
                        </div>
                    </div>

                    <div class="scenario-card">
                        <div class="scenario-title">🔐 Scenario: Data Privacy</div>
                        <div class="scenario-description">You're building an LLM that could memorize training data. How do you handle this?</div>
                        <div class="scenario-options">
                            <button class="scenario-btn" onclick="selectScenario(this, 'good')">Implement differential privacy, test for data regurgitation, and add safeguards</button>
                            <button class="scenario-btn" onclick="selectScenario(this, 'bad')">Ignore it since the data was publicly available</button>
                        </div>
                    </div>

                    <div class="scenario-card">
                        <div class="scenario-title">🤖 Scenario: Autonomous Agents</div>
                        <div class="scenario-description">Your AI agent can execute financial transactions. What safety measures are needed?</div>
                        <div class="scenario-options">
                            <button class="scenario-btn" onclick="selectScenario(this, 'good')">Implement approval workflows, transaction limits, audit logging, and kill switches</button>
                            <button class="scenario-btn" onclick="selectScenario(this, 'bad')">Give it full autonomy to maximize efficiency</button>
                        </div>
                    </div>
                </div>

                <div id="ethicsResult" style="margin-top: 20px;"></div>

                <div class="tech-box">
                    <h4>🚀 The Future of AI:</h4>
                    <div class="future-timeline">
                        <div class="timeline-item">
                            <strong>Near-term (1-3 years)</strong>
                            <ul>
                                <li>Multimodal models (text, image, audio, video)</li>
                                <li>Longer context windows (millions of tokens)</li>
                                <li>Better reasoning and planning capabilities</li>
                                <li>More efficient models (smaller, faster, cheaper)</li>
                            </ul>
                        </div>
                        <div class="timeline-item">
                            <strong>Medium-term (3-10 years)</strong>
                            <ul>
                                <li>Specialized AI agents in every domain</li>
                                <li>Seamless human-AI collaboration</li>
                                <li>AI-assisted scientific breakthroughs</li>
                                <li>Personalized education and healthcare at scale</li>
                            </ul>
                        </div>
                        <div class="timeline-item">
                            <strong>Long-term (10+ years)</strong>
                            <ul>
                                <li>Artificial General Intelligence (AGI)?</li>
                                <li>Solving global challenges (climate, disease, etc.)</li>
                                <li>Fundamental questions about AI consciousness and rights</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="tech-box">
                    <h4>💡 Your Role in AI's Future:</h4>
                    <p>As an AI practitioner, you can:</p>
                    <ul style="line-height: 2;">
                        <li>🎓 <strong>Keep Learning:</strong> AI evolves rapidly; stay curious</li>
                        <li>🤝 <strong>Build Responsibly:</strong> Consider ethics in every project</li>
                        <li>🗣️ <strong>Advocate:</strong> Push for transparency and safety standards</li>
                        <li>🌍 <strong>Think Globally:</strong> Consider diverse perspectives and impacts</li>
                        <li>🔧 <strong>Open Source:</strong> Contribute to democratizing AI</li>
                    </ul>
                </div>
            </div>
        `
    }
];

// Initialize
function init() {
    updateUI();
}

function startQuest() {
    showBadge('starter');
    gameState.currentModule = 0;
    showModule();
}

function showModule() {
    hideAllScreens();
    document.getElementById('moduleScreen').classList.add('active');

    const module = modules[gameState.currentModule];
    document.getElementById('moduleNumber').textContent = `Module ${gameState.currentModule + 1} of ${modules.length}`;
    document.getElementById('moduleTitle').textContent = module.title;
    document.getElementById('lessonContent').innerHTML = module.content();

    // Update buttons
    document.getElementById('prevBtn').disabled = gameState.currentModule === 0;
    document.getElementById('nextBtn').textContent = gameState.currentModule === modules.length - 1 ? 'Finish Quest! 🎉' : 'Next →';

    updateProgress();
}

function nextModule() {
    if (gameState.currentModule < modules.length - 1) {
        gameState.currentModule++;
        addScore(100);
        gameState.completedModules.push(gameState.currentModule);

        // Award badges
        if (gameState.currentModule === 2) showBadge('learner');
        if (gameState.currentModule === 2) showBadge('transformer');
        if (gameState.currentModule === 3) showBadge('llm');
        if (gameState.currentModule === 4) showBadge('rag');
        if (gameState.currentModule === 6) showBadge('agent');

        showModule();
    } else {
        completeQuest();
    }
}

function previousModule() {
    if (gameState.currentModule > 0) {
        gameState.currentModule--;
        showModule();
    }
}

function completeQuest() {
    showBadge('expert');
    if (gameState.score >= 1500) showBadge('perfect');

    hideAllScreens();
    document.getElementById('completionScreen').classList.add('active');
    document.getElementById('finalScore').textContent = gameState.score;
    document.getElementById('badgesEarned').textContent = gameState.badges.length;

    // Display badges
    const badgesDisplay = document.getElementById('badgesDisplay');
    badgesDisplay.innerHTML = '';
    gameState.badges.forEach(badgeKey => {
        const badge = badges[badgeKey];
        const badgeEl = document.createElement('div');
        badgeEl.className = 'badge';
        badgeEl.innerHTML = `
            <div class="badge-emoji">${badge.emoji}</div>
            <div class="badge-name">${badge.name}</div>
        `;
        badgesDisplay.appendChild(badgeEl);
    });

    updateProgress();
}

function restartQuest() {
    gameState = {
        currentModule: 0,
        score: 0,
        level: 1,
        badges: [],
        completedModules: []
    };
    updateUI();
    hideAllScreens();
    document.getElementById('welcomeScreen').classList.add('active');
}

// Quiz Functions
function selectQuizOption(option, quizIndex) {
    const quizContainer = option.parentElement;
    const options = quizContainer.querySelectorAll('.quiz-option');
    const isCorrect = option.dataset.correct === 'true';
    const feedbackEl = document.getElementById(`feedback${quizIndex + 1}`);

    options.forEach(opt => {
        opt.style.pointerEvents = 'none';
        if (opt.dataset.correct === 'true') {
            opt.classList.add('correct');
        }
    });

    if (isCorrect) {
        option.classList.add('correct');
        feedbackEl.className = 'quiz-feedback correct';
        feedbackEl.textContent = '🎉 Excellent! You\'re mastering these concepts!';
        addScore(100);
    } else {
        option.classList.add('incorrect');
        feedbackEl.className = 'quiz-feedback incorrect';
        feedbackEl.textContent = '❌ Not quite! The correct answer is highlighted above.';
        addScore(30);
    }

    feedbackEl.style.display = 'block';
}

// Attention Demo
function highlightAttention(wordIndex) {
    const words = ['The', 'cat', 'sat', 'on', 'the', 'mat'];
    const attentionWeights = [
        [0.1, 0.1, 0.1, 0.1, 0.6, 0.0],  // The -> the
        [0.1, 0.3, 0.2, 0.1, 0.1, 0.2],  // cat
        [0.1, 0.3, 0.2, 0.2, 0.1, 0.1],  // sat
        [0.1, 0.1, 0.1, 0.2, 0.2, 0.3],  // on
        [0.6, 0.1, 0.1, 0.1, 0.1, 0.0],  // the -> The
        [0.0, 0.3, 0.2, 0.2, 0.0, 0.3]   // mat
    ];

    const wordElements = document.querySelectorAll('.word');
    wordElements.forEach((el, idx) => {
        el.style.backgroundColor = '';
        el.style.fontWeight = '';
        const weight = attentionWeights[wordIndex][idx];
        if (weight > 0.2) {
            el.style.backgroundColor = `rgba(99, 102, 241, ${weight})`;
            el.style.fontWeight = weight > 0.4 ? 'bold' : 'normal';
        }
    });

    const topAttention = attentionWeights[wordIndex]
        .map((w, i) => ({ word: words[i], weight: w }))
        .filter(x => x.weight > 0.2)
        .sort((a, b) => b.weight - a.weight)
        .slice(0, 3);

    document.getElementById('attentionResult').innerHTML =
        `"${words[wordIndex]}" attends most to: ` +
        topAttention.map(x => `<strong>${x.word}</strong> (${(x.weight * 100).toFixed(0)}%)`).join(', ');

    addScore(20);
}

// Embedding Quiz
function selectEmbedOption(option) {
    const options = document.querySelectorAll('#embedQuiz .quiz-option');
    const isCorrect = option.dataset.correct === 'true';
    const feedbackEl = document.getElementById('embedFeedback');

    options.forEach(opt => opt.style.pointerEvents = 'none');

    if (isCorrect) {
        option.classList.add('correct');
        feedbackEl.className = 'quiz-feedback correct';
        feedbackEl.textContent = '🎉 Correct! Embeddings capture semantic meaning, so "reset password" and "account recovery" are semantically similar even without shared keywords.';
        addScore(100);
    } else {
        option.classList.add('incorrect');
        feedbackEl.className = 'quiz-feedback incorrect';
        feedbackEl.textContent = '❌ Not quite. Embedding search finds documents by meaning, not just keywords. "Account Recovery" is semantically closest to "reset password".';
        addScore(30);
    }
    feedbackEl.style.display = 'block';
}

// RAG Order Game
let ragOrderState = [];
function checkRAGOrder() {
    const items = document.querySelectorAll('#ragOrderGame .order-item');
    const currentOrder = Array.from(items).map((item, idx) => ({
        position: idx + 1,
        correctOrder: parseInt(item.dataset.order)
    }));

    const isCorrect = currentOrder.every(item => item.position === item.correctOrder);
    const resultEl = document.getElementById('ragOrderResult');

    if (isCorrect) {
        resultEl.innerHTML = '<div class="quiz-feedback correct">🎉 Perfect! You understand the RAG pipeline flow!</div>';
        addScore(150);
    } else {
        resultEl.innerHTML = '<div class="quiz-feedback incorrect">❌ Not quite right. The order should be: Question → Embed → Search → Augment → Generate</div>';
        addScore(50);
    }
}

// MCP Match
let mcpMatched = 0;
function selectMCPMatch(element, type) {
    if (element.classList.contains('matched')) return;

    element.classList.add('matched');
    mcpMatched++;

    const descriptions = {
        filesystem: 'Perfect for: Reading local files, documents, and configuration files',
        database: 'Perfect for: Querying structured data and running SQL',
        api: 'Perfect for: Integrating with external web services',
        git: 'Perfect for: Version control operations and code repository access'
    };

    const resultEl = document.getElementById('mcpMatchResult');
    resultEl.innerHTML = `<div class="quiz-feedback correct">${descriptions[type]}</div>`;
    addScore(50);
}

// Agent Tools
let selectedTools = [];
function toggleTool(element, isCorrect) {
    const checkbox = element.querySelector('input');
    checkbox.checked = !checkbox.checked;

    if (checkbox.checked) {
        selectedTools.push({ element, isCorrect });
    } else {
        selectedTools = selectedTools.filter(t => t.element !== element);
    }
}

function checkAgentTools() {
    const correctTools = selectedTools.filter(t => t.isCorrect).length;
    const incorrectTools = selectedTools.filter(t => !t.isCorrect).length;
    const resultEl = document.getElementById('agentToolResult');

    if (correctTools === 4 && incorrectTools === 0) {
        resultEl.innerHTML = '<div class="quiz-feedback correct">🎉 Perfect! A research agent needs: Web Search (to find info), Document Writer (to create report), File Manager (to save files), and Data Analyzer (to process findings).</div>';
        addScore(150);
    } else if (correctTools >= 3 && incorrectTools === 0) {
        resultEl.innerHTML = '<div class="quiz-feedback incorrect">👍 Good! You got most of them, but think about what tools are essential for researching and writing.</div>';
        addScore(80);
    } else {
        resultEl.innerHTML = '<div class="quiz-feedback incorrect">❌ Not quite. Focus on tools needed for research (search), analysis (data), and output (writing, files).</div>';
        addScore(40);
    }
}

// Prompt Option
function selectPromptOption(option) {
    const options = document.querySelectorAll('#promptQuiz .quiz-option');
    const isCorrect = option.dataset.correct === 'true';
    const feedbackEl = document.getElementById('promptFeedback');

    options.forEach(opt => opt.style.pointerEvents = 'none');

    if (isCorrect) {
        option.classList.add('correct');
        feedbackEl.className = 'quiz-feedback correct';
        feedbackEl.textContent = '🎉 Excellent! Prompt B is specific, structured, and provides clear formatting instructions, which leads to consistent, useful outputs.';
        addScore(100);
    } else {
        option.classList.add('incorrect');
        feedbackEl.className = 'quiz-feedback incorrect';
        feedbackEl.textContent = '❌ Not quite. The best prompt is specific, structured, and provides clear output formatting.';
        addScore(30);
    }
    feedbackEl.style.display = 'block';
}

// Neural Network Interaction
let activeNeurons = [0, 0, 0, 0];
function activateNeuron(element, layer) {
    element.classList.add('active');
    activeNeurons[layer]++;

    setTimeout(() => {
        element.classList.remove('active');
    }, 1000);

    if (activeNeurons[layer] === 1) {
        addScore(25);
    }
}

// Ethics Scenarios
let ethicsScore = 0;
function selectScenario(button, type) {
    const options = button.parentElement.querySelectorAll('.scenario-btn');
    options.forEach(btn => btn.disabled = true);

    if (type === 'good') {
        button.classList.add('selected-good');
        ethicsScore++;
        addScore(100);
    } else {
        button.classList.add('selected-bad');
        addScore(30);
    }

    // Check if all scenarios completed
    const totalButtons = document.querySelectorAll('.scenario-btn').length;
    const disabledButtons = document.querySelectorAll('.scenario-btn[disabled]').length;

    if (disabledButtons === totalButtons) {
        const resultEl = document.getElementById('ethicsResult');
        const maxScore = totalButtons / 2;
        if (ethicsScore === maxScore) {
            resultEl.innerHTML = '<div class="quiz-feedback correct">🌟 Perfect! You understand the critical importance of responsible AI development. These principles will guide you in building beneficial AI systems.</div>';
        } else {
            resultEl.innerHTML = '<div class="quiz-feedback incorrect">💭 Good effort! Remember: AI should augment human capabilities, protect individual rights, ensure fairness, and be deployed with appropriate safeguards.</div>';
        }
    }
}

// UI Functions
function hideAllScreens() {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
}

function updateUI() {
    document.getElementById('score').textContent = gameState.score;
    document.getElementById('level').textContent = Math.floor(gameState.score / 300) + 1;
}

function updateProgress() {
    const progress = ((gameState.currentModule + 1) / modules.length) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
}

function addScore(points) {
    gameState.score += points;
    updateUI();

    // Animate score
    const scoreEl = document.getElementById('score');
    scoreEl.style.transform = 'scale(1.3)';
    scoreEl.style.transition = 'transform 0.3s ease';
    setTimeout(() => {
        scoreEl.style.transform = 'scale(1)';
    }, 300);
}

function showBadge(badgeKey) {
    if (gameState.badges.includes(badgeKey)) return;

    gameState.badges.push(badgeKey);
    const badge = badges[badgeKey];

    const popup = document.getElementById('badgePopup');
    document.getElementById('badgeIcon').textContent = badge.emoji;
    document.getElementById('badgeTitle').textContent = badge.name;
    document.getElementById('badgeDescription').textContent = badge.description;

    popup.classList.add('show');
    addScore(150);

    setTimeout(() => {
        popup.classList.remove('show');
    }, 3000);
}

// Initialize on load
window.addEventListener('DOMContentLoaded', init);
