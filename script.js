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
    trainer: { emoji: '🎯', name: 'AI Trainer', description: 'Trained your first AI!' },
    expert: { emoji: '🏆', name: 'AI Expert', description: 'Completed all modules!' },
    perfect: { emoji: '💎', name: 'Perfect Score', description: 'Got perfect scores!' }
};

// Modules Content
const modules = [
    {
        title: 'What is AI?',
        content: () => `
            <div class="lesson-text">
                <h3>Welcome to the World of Artificial Intelligence!</h3>
                <p>Imagine a computer that can learn, think, and make decisions just like you do! That's what AI is all about.</p>

                <p><strong>AI (Artificial Intelligence)</strong> is when we teach computers to do tasks that usually require human intelligence, like:</p>
                <ul style="margin: 20px 0; padding-left: 30px; line-height: 2;">
                    <li>🗣️ Understanding and speaking languages</li>
                    <li>👁️ Recognizing faces and objects in photos</li>
                    <li>🎮 Playing games and solving puzzles</li>
                    <li>🚗 Driving cars autonomously</li>
                    <li>🎵 Creating music and art</li>
                </ul>

                <p>Think of AI as a really smart assistant that gets better the more it practices!</p>
            </div>

            <div class="quiz-container">
                <div class="quiz-question">Quick Check: Which of these is an example of AI?</div>
                <div class="quiz-options" id="quiz1">
                    <div class="quiz-option" data-correct="false" onclick="selectQuizOption(this, 0)">
                        A regular calculator that adds numbers
                    </div>
                    <div class="quiz-option" data-correct="true" onclick="selectQuizOption(this, 0)">
                        A voice assistant that understands and responds to your questions
                    </div>
                    <div class="quiz-option" data-correct="false" onclick="selectQuizOption(this, 0)">
                        A digital clock that shows the time
                    </div>
                    <div class="quiz-option" data-correct="false" onclick="selectQuizOption(this, 0)">
                        A light switch that turns on and off
                    </div>
                </div>
                <div class="quiz-feedback" id="feedback1"></div>
            </div>
        `
    },
    {
        title: 'Machine Learning Magic',
        content: () => `
            <div class="lesson-text">
                <h3>How Do Machines Learn?</h3>
                <p>Machine Learning is like teaching a child through examples. Instead of programming every rule, we show the computer lots of examples, and it figures out the patterns!</p>

                <div style="background: #dbeafe; padding: 20px; border-radius: 12px; margin: 20px 0;">
                    <h4>📖 The Learning Process:</h4>
                    <p><strong>1. Data:</strong> We give the computer lots of examples (like thousands of cat photos)</p>
                    <p><strong>2. Training:</strong> The computer studies these examples to find patterns</p>
                    <p><strong>3. Testing:</strong> We check if it learned correctly with new examples</p>
                    <p><strong>4. Prediction:</strong> Now it can identify new things it's never seen before!</p>
                </div>

                <p>Think of it like learning to ride a bike - the more you practice, the better you get!</p>
            </div>

            <div class="interactive-demo">
                <h4 style="text-align: center; margin-bottom: 20px;">🎯 Interactive Demo: Teach AI to Recognize Shapes!</h4>
                <p style="text-align: center; margin-bottom: 20px;">Click on all the circles to train the AI:</p>
                <div class="training-images" id="shapeTraining">
                    <div class="training-image" data-shape="circle" onclick="selectShape(this)">⭕</div>
                    <div class="training-image" data-shape="square" onclick="selectShape(this)">⬜</div>
                    <div class="training-image" data-shape="circle" onclick="selectShape(this)">🔵</div>
                    <div class="training-image" data-shape="triangle" onclick="selectShape(this)">🔺</div>
                    <div class="training-image" data-shape="circle" onclick="selectShape(this)">⚪</div>
                    <div class="training-image" data-shape="square" onclick="selectShape(this)">🟦</div>
                </div>
                <button class="btn btn-primary" onclick="checkShapeTraining()" id="checkShapesBtn" disabled>Check My Selection</button>
                <div id="shapeResult"></div>
            </div>
        `
    },
    {
        title: 'Neural Networks Unveiled',
        content: () => `
            <div class="lesson-text">
                <h3>What Are Neural Networks?</h3>
                <p>Neural Networks are inspired by how our brains work! Just like your brain has billions of neurons working together, artificial neural networks have layers of "digital neurons" that process information.</p>

                <div style="background: #fef3c7; padding: 20px; border-radius: 12px; margin: 20px 0;">
                    <h4>🧠 How Neural Networks Work:</h4>
                    <p><strong>Input Layer:</strong> Receives the data (like pixels of an image)</p>
                    <p><strong>Hidden Layers:</strong> Process and find patterns (the "thinking" part)</p>
                    <p><strong>Output Layer:</strong> Gives the final answer (like "This is a cat!")</p>
                </div>
            </div>

            <div class="interactive-demo">
                <h4 style="text-align: center; margin-bottom: 20px;">🔮 Interactive Neural Network</h4>
                <p style="text-align: center; margin-bottom: 20px;">Click the neurons to see how information flows through the network!</p>

                <div class="neural-network" id="neuralNet">
                    <div class="network-layer">
                        <div style="text-align: center; margin-bottom: 10px; font-weight: 600;">Input</div>
                        <div class="neuron" onclick="activateNeuron(this, 0)">I1</div>
                        <div class="neuron" onclick="activateNeuron(this, 0)">I2</div>
                        <div class="neuron" onclick="activateNeuron(this, 0)">I3</div>
                    </div>
                    <div class="network-layer">
                        <div style="text-align: center; margin-bottom: 10px; font-weight: 600;">Hidden</div>
                        <div class="neuron" onclick="activateNeuron(this, 1)">H1</div>
                        <div class="neuron" onclick="activateNeuron(this, 1)">H2</div>
                        <div class="neuron" onclick="activateNeuron(this, 1)">H3</div>
                        <div class="neuron" onclick="activateNeuron(this, 1)">H4</div>
                    </div>
                    <div class="network-layer">
                        <div style="text-align: center; margin-bottom: 10px; font-weight: 600;">Output</div>
                        <div class="neuron" onclick="activateNeuron(this, 2)">O1</div>
                        <div class="neuron" onclick="activateNeuron(this, 2)">O2</div>
                    </div>
                </div>
                <p style="text-align: center; margin-top: 20px; color: #64748b;">Each neuron passes information to the next layer, working together to make a decision!</p>
            </div>

            <div class="quiz-container" style="margin-top: 30px;">
                <div class="quiz-question">Which layer does the "thinking" or processing?</div>
                <div class="quiz-options" id="quiz3">
                    <div class="quiz-option" data-correct="false" onclick="selectQuizOption(this, 2)">Input Layer</div>
                    <div class="quiz-option" data-correct="true" onclick="selectQuizOption(this, 2)">Hidden Layers</div>
                    <div class="quiz-option" data-correct="false" onclick="selectQuizOption(this, 2)">Output Layer</div>
                </div>
                <div class="quiz-feedback" id="feedback3"></div>
            </div>
        `
    },
    {
        title: 'Training Your AI',
        content: () => `
            <div class="lesson-text">
                <h3>How Do We Train AI?</h3>
                <p>Training AI is like being a teacher! You need to:</p>
                <ul style="margin: 20px 0; padding-left: 30px; line-height: 2;">
                    <li>📊 <strong>Collect Data:</strong> Gather lots of examples (the more, the better!)</li>
                    <li>🏷️ <strong>Label Data:</strong> Tell the AI what each example is</li>
                    <li>🎯 <strong>Train:</strong> Let the AI study and learn from the examples</li>
                    <li>✅ <strong>Validate:</strong> Test it on new examples to see if it learned correctly</li>
                    <li>🔧 <strong>Improve:</strong> Adjust and retrain to make it better</li>
                </ul>

                <div style="background: #d1fae5; padding: 20px; border-radius: 12px; margin: 20px 0;">
                    <h4>💡 Fun Fact:</h4>
                    <p>Training a large AI model can take weeks and use as much electricity as several homes use in a year! That's why we need good data and smart algorithms.</p>
                </div>
            </div>

            <div class="training-game">
                <h4 style="margin-bottom: 20px;">🎮 Mini Game: Be an AI Trainer!</h4>
                <p style="margin-bottom: 20px;">You're training an AI to recognize fruits. Select all the images that show <strong id="targetFruit">apples</strong>:</p>

                <div class="training-images" id="fruitTraining">
                    <div class="training-image" data-fruit="apple" onclick="selectFruit(this)">🍎</div>
                    <div class="training-image" data-fruit="banana" onclick="selectFruit(this)">🍌</div>
                    <div class="training-image" data-fruit="apple" onclick="selectFruit(this)">🍏</div>
                    <div class="training-image" data-fruit="orange" onclick="selectFruit(this)">🍊</div>
                    <div class="training-image" data-fruit="apple" onclick="selectFruit(this)">🍎</div>
                    <div class="training-image" data-fruit="grape" onclick="selectFruit(this)">🍇</div>
                </div>

                <button class="btn btn-primary" onclick="checkFruitTraining()" id="checkFruitsBtn" disabled>Train the AI!</button>
                <div id="fruitResult"></div>
            </div>
        `
    },
    {
        title: 'AI in Action',
        content: () => `
            <div class="lesson-text">
                <h3>Real-World AI Applications</h3>
                <p>AI is already all around you! Let's explore where you encounter AI in your daily life:</p>
            </div>

            <div class="matching-game" id="matchingGame">
                <div class="match-card" data-match="assistant" onclick="selectMatch(this)">
                    <div class="match-card-icon">🗣️</div>
                    <div class="match-card-title">Voice Assistants</div>
                    <div class="match-card-desc">Siri, Alexa, Google Assistant</div>
                </div>
                <div class="match-card" data-match="recommendation" onclick="selectMatch(this)">
                    <div class="match-card-icon">🎬</div>
                    <div class="match-card-title">Recommendations</div>
                    <div class="match-card-desc">Netflix, Spotify, YouTube</div>
                </div>
                <div class="match-card" data-match="navigation" onclick="selectMatch(this)">
                    <div class="match-card-icon">🗺️</div>
                    <div class="match-card-title">Smart Navigation</div>
                    <div class="match-card-desc">Google Maps, Waze</div>
                </div>
                <div class="match-card" data-match="photo" onclick="selectMatch(this)">
                    <div class="match-card-icon">📸</div>
                    <div class="match-card-title">Photo Recognition</div>
                    <div class="match-card-desc">Face detection, object tagging</div>
                </div>
                <div class="match-card" data-match="translation" onclick="selectMatch(this)">
                    <div class="match-card-icon">🌐</div>
                    <div class="match-card-title">Translation</div>
                    <div class="match-card-desc">Google Translate, DeepL</div>
                </div>
                <div class="match-card" data-match="health" onclick="selectMatch(this)">
                    <div class="match-card-icon">🏥</div>
                    <div class="match-card-title">Healthcare</div>
                    <div class="match-card-desc">Disease diagnosis, drug discovery</div>
                </div>
            </div>

            <div class="lesson-text" style="margin-top: 30px;">
                <p>Click on each card to learn more about how AI powers these amazing technologies!</p>
                <div id="matchDetails" style="margin-top: 20px; padding: 20px; background: #f8fafc; border-radius: 12px; display: none;">
                    <h4 id="matchTitle"></h4>
                    <p id="matchDescription"></p>
                </div>
            </div>
        `
    },
    {
        title: 'AI Ethics & the Future',
        content: () => `
            <div class="lesson-text">
                <h3>Responsible AI: The Important Stuff</h3>
                <p>With great power comes great responsibility! As AI becomes more powerful, we need to think about using it wisely:</p>

                <div style="background: #fee2e2; padding: 20px; border-radius: 12px; margin: 20px 0;">
                    <h4>⚠️ Important Considerations:</h4>
                    <ul style="padding-left: 30px; line-height: 2;">
                        <li><strong>Privacy:</strong> Protecting people's personal data</li>
                        <li><strong>Bias:</strong> Making sure AI is fair to everyone</li>
                        <li><strong>Transparency:</strong> Understanding how AI makes decisions</li>
                        <li><strong>Safety:</strong> Ensuring AI systems are secure and reliable</li>
                        <li><strong>Jobs:</strong> Thinking about how AI affects employment</li>
                    </ul>
                </div>

                <h4 style="margin-top: 30px;">🚀 The Future of AI:</h4>
                <p>AI is evolving rapidly! Here's what might be coming:</p>
                <ul style="margin: 20px 0; padding-left: 30px; line-height: 2;">
                    <li>🏥 Better healthcare and early disease detection</li>
                    <li>🌍 Solutions to climate change and environmental issues</li>
                    <li>🎓 Personalized education for every student</li>
                    <li>🚗 Self-driving vehicles and smart cities</li>
                    <li>🔬 Scientific discoveries and space exploration</li>
                </ul>
            </div>

            <div class="scenario-cards" id="ethicsScenarios">
                <div class="scenario-card">
                    <div class="scenario-title">Scenario 1: Hiring AI</div>
                    <div class="scenario-description">A company wants to use AI to screen job applications. What should they be careful about?</div>
                    <div class="scenario-options">
                        <button class="scenario-btn" onclick="selectScenario(this, 'good')">Ensure the AI doesn't discriminate based on gender, race, or age</button>
                        <button class="scenario-btn" onclick="selectScenario(this, 'bad')">Just let the AI decide without checking</button>
                    </div>
                </div>

                <div class="scenario-card">
                    <div class="scenario-title">Scenario 2: Medical AI</div>
                    <div class="scenario-description">An AI system helps doctors diagnose diseases. What's the best approach?</div>
                    <div class="scenario-options">
                        <button class="scenario-btn" onclick="selectScenario(this, 'good')">Use AI as a helpful tool while doctors make final decisions</button>
                        <button class="scenario-btn" onclick="selectScenario(this, 'bad')">Replace all doctors with AI immediately</button>
                    </div>
                </div>

                <div class="scenario-card">
                    <div class="scenario-title">Scenario 3: Data Privacy</div>
                    <div class="scenario-description">You're building an AI app. How should you handle user data?</div>
                    <div class="scenario-options">
                        <button class="scenario-btn" onclick="selectScenario(this, 'good')">Only collect necessary data and protect it securely</button>
                        <button class="scenario-btn" onclick="selectScenario(this, 'bad')">Collect as much data as possible and sell it</button>
                    </div>
                </div>
            </div>

            <div id="ethicsResult" style="margin-top: 20px;"></div>
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
        if (gameState.currentModule === 2) showBadge('network');
        if (gameState.currentModule === 3) showBadge('trainer');

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
    if (gameState.score >= 1000) showBadge('perfect');

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
        feedbackEl.textContent = '🎉 Correct! You\'re learning fast!';
        addScore(50);
    } else {
        option.classList.add('incorrect');
        feedbackEl.className = 'quiz-feedback incorrect';
        feedbackEl.textContent = '❌ Not quite! Check out the correct answer highlighted above.';
        addScore(20);
    }

    feedbackEl.style.display = 'block';
}

// Shape Training
let selectedShapes = [];
function selectShape(element) {
    if (element.classList.contains('selected')) {
        element.classList.remove('selected');
        const index = selectedShapes.indexOf(element);
        if (index > -1) selectedShapes.splice(index, 1);
    } else {
        element.classList.add('selected');
        selectedShapes.push(element);
    }
    document.getElementById('checkShapesBtn').disabled = selectedShapes.length === 0;
}

function checkShapeTraining() {
    const allCircles = document.querySelectorAll('[data-shape="circle"]');
    const correctSelections = Array.from(selectedShapes).every(el => el.dataset.shape === 'circle');
    const allCirclesSelected = Array.from(allCircles).every(el => selectedShapes.includes(el));

    const resultEl = document.getElementById('shapeResult');
    if (correctSelections && allCirclesSelected && selectedShapes.length === allCircles.length) {
        resultEl.innerHTML = '<div class="quiz-feedback correct">🎉 Perfect! You just trained an AI to recognize circles! This is exactly how real AI learns patterns.</div>';
        addScore(100);
    } else if (correctSelections) {
        resultEl.innerHTML = '<div class="quiz-feedback incorrect">👍 Good job, but you missed some circles! Try to find all of them.</div>';
        addScore(50);
    } else {
        resultEl.innerHTML = '<div class="quiz-feedback incorrect">❌ Oops! Make sure you only select circles. Try again!</div>';
        addScore(20);
    }
    document.getElementById('checkShapesBtn').disabled = true;
}

// Fruit Training
let selectedFruits = [];
function selectFruit(element) {
    if (element.classList.contains('selected')) {
        element.classList.remove('selected');
        const index = selectedFruits.indexOf(element);
        if (index > -1) selectedFruits.splice(index, 1);
    } else {
        element.classList.add('selected');
        selectedFruits.push(element);
    }
    document.getElementById('checkFruitsBtn').disabled = selectedFruits.length === 0;
}

function checkFruitTraining() {
    const allApples = document.querySelectorAll('[data-fruit="apple"]');
    const correctSelections = Array.from(selectedFruits).every(el => el.dataset.fruit === 'apple');
    const allApplesSelected = Array.from(allApples).every(el => selectedFruits.includes(el));

    const resultEl = document.getElementById('fruitResult');
    if (correctSelections && allApplesSelected && selectedFruits.length === allApples.length) {
        resultEl.innerHTML = '<div class="quiz-feedback correct">🎉 Excellent! Your AI is now trained to recognize apples! In real life, this process uses thousands of images.</div>';
        addScore(150);
    } else if (correctSelections && allApplesSelected) {
        resultEl.innerHTML = '<div class="quiz-feedback correct">✅ Great! You selected all the apples correctly!</div>';
        addScore(100);
    } else if (correctSelections) {
        resultEl.innerHTML = '<div class="quiz-feedback incorrect">⚠️ You\'re on the right track, but make sure you get ALL the apples!</div>';
        addScore(50);
    } else {
        resultEl.innerHTML = '<div class="quiz-feedback incorrect">❌ Remember, you\'re training the AI to recognize apples only. Try selecting just the apples!</div>';
        addScore(20);
    }
    document.getElementById('checkFruitsBtn').disabled = true;
}

// Neural Network Interaction
let activeNeurons = [0, 0, 0];
function activateNeuron(element, layer) {
    element.classList.add('active');
    activeNeurons[layer]++;

    setTimeout(() => {
        element.classList.remove('active');
    }, 1000);

    if (activeNeurons[layer] === 1) {
        addScore(30);
    }
}

// Matching Game
const matchDetails = {
    assistant: {
        title: '🗣️ Voice Assistants',
        description: 'Voice assistants use Natural Language Processing (NLP) to understand your words, context, and intent. They combine speech recognition, language understanding, and text-to-speech to have conversations with you!'
    },
    recommendation: {
        title: '🎬 Recommendation Systems',
        description: 'These AI systems analyze your watching/listening history, compare it with millions of other users, and predict what you might enjoy next. They use collaborative filtering and deep learning!'
    },
    navigation: {
        title: '🗺️ Smart Navigation',
        description: 'Navigation apps use AI to predict traffic patterns, find the fastest routes, and even estimate arrival times based on current conditions and historical data. They process real-time data from millions of users!'
    },
    photo: {
        title: '📸 Photo Recognition',
        description: 'AI can detect faces, identify objects, and even understand scenes in photos. This uses Convolutional Neural Networks (CNNs) trained on millions of images to recognize patterns!'
    },
    translation: {
        title: '🌐 Translation',
        description: 'Modern translation uses Neural Machine Translation (NMT) that understands context and nuance, not just word-for-word replacement. It learns from millions of translated documents!'
    },
    health: {
        title: '🏥 Healthcare AI',
        description: 'AI helps doctors by analyzing medical images, predicting disease risks, discovering new drugs, and personalizing treatment plans. It can spot patterns humans might miss in complex medical data!'
    }
};

function selectMatch(element) {
    const matchType = element.dataset.match;
    const details = matchDetails[matchType];

    // Highlight selected
    document.querySelectorAll('.match-card').forEach(card => card.style.background = '#f8fafc');
    element.style.background = '#dbeafe';

    // Show details
    const detailsEl = document.getElementById('matchDetails');
    document.getElementById('matchTitle').textContent = details.title;
    document.getElementById('matchDescription').textContent = details.description;
    detailsEl.style.display = 'block';

    addScore(30);
}

// Ethics Scenarios
let ethicsScore = 0;
function selectScenario(button, type) {
    const options = button.parentElement.querySelectorAll('.scenario-btn');
    options.forEach(btn => btn.disabled = true);

    if (type === 'good') {
        button.classList.add('selected-good');
        ethicsScore++;
        addScore(50);
    } else {
        button.classList.add('selected-bad');
        addScore(20);
    }

    // Check if all scenarios completed
    if (document.querySelectorAll('.scenario-btn[disabled]').length === 6) {
        const resultEl = document.getElementById('ethicsResult');
        if (ethicsScore === 3) {
            resultEl.innerHTML = '<div class="quiz-feedback correct">🌟 Perfect! You understand the importance of ethical AI! You\'re ready to build a better future with AI.</div>';
        } else {
            resultEl.innerHTML = '<div class="quiz-feedback incorrect">💭 Good try! Remember, AI should always be used responsibly to benefit humanity while protecting individual rights and fairness.</div>';
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
    document.getElementById('level').textContent = Math.floor(gameState.score / 200) + 1;
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
    addScore(100);

    setTimeout(() => {
        popup.classList.remove('show');
    }, 3000);
}

// Initialize on load
window.addEventListener('DOMContentLoaded', init);
