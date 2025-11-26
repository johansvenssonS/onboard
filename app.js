// Data storage
let documents = [];
let policies = [];
let onboardingSteps = [];
let activities = [];
let newEmployees = [];
let currentOnboarding = null;
let quests = [];
let achievements = [];

// Load data
function loadData() {
    const storedDocs = localStorage.getItem('hrDocuments');
    const storedPolicies = localStorage.getItem('hrPolicies');
    const storedOnboarding = localStorage.getItem('hrOnboarding');
    const storedActivities = localStorage.getItem('hrActivities');
    const storedEmployees = localStorage.getItem('hrNewEmployees');
    const storedQuests = localStorage.getItem('hrQuests');
    const storedAchievements = localStorage.getItem('hrAchievements');
    
    if (storedDocs) documents = JSON.parse(storedDocs);
    if (storedPolicies) policies = JSON.parse(storedPolicies);
    if (storedOnboarding) onboardingSteps = JSON.parse(storedOnboarding);
    if (storedActivities) activities = JSON.parse(storedActivities);
    if (storedEmployees) newEmployees = JSON.parse(storedEmployees);
    if (storedQuests) quests = JSON.parse(storedQuests);
    if (storedAchievements) achievements = JSON.parse(storedAchievements);

    if (documents.length === 0) addDemoData();
}

function saveData() {
    localStorage.setItem('hrDocuments', JSON.stringify(documents));
    localStorage.setItem('hrPolicies', JSON.stringify(policies));
    localStorage.setItem('hrOnboarding', JSON.stringify(onboardingSteps));
    localStorage.setItem('hrActivities', JSON.stringify(activities));
    localStorage.setItem('hrNewEmployees', JSON.stringify(newEmployees));
    localStorage.setItem('hrQuests', JSON.stringify(quests));
    localStorage.setItem('hrAchievements', JSON.stringify(achievements));
}

function addDemoData() {
    documents = [
        { id: '1', name: 'Anställningskontrakt Mall', category: 'Kontrakt', description: 'Standard anställningsavtal för heltidsanställda', tags: ['HR', 'Kontrakt'], date: '2024-11-15' },
        { id: '2', name: 'Företagshandbok 2024', category: 'Handbok', description: 'Komplett guide för alla anställda', tags: ['Onboarding', 'Policy'], date: '2024-11-01' },
        { id: '3', name: 'IT Säkerhetspolicy', category: 'Policy', description: 'Regler för IT-säkerhet och lösenordshantering', tags: ['IT', 'Säkerhet'], date: '2024-10-20' }
    ];

    policies = [
        { id: '1', name: 'Distansarbete Policy', type: 'HR Policy', content: 'Regler för distansarbete...', date: '2024-11-10' },
        { id: '2', name: 'GDPR Dataskydd', type: 'GDPR/Privacy', content: 'GDPR compliance policy...', date: '2024-10-15' },
        { id: '3', name: 'Arbetsmiljöpolicy', type: 'Arbetsmiljö', content: 'Arbetsmiljö och säkerhet...', date: '2024-09-20' }
    ];

    onboardingSteps = [
        { step: 1, title: 'Välkomstmail & Företagsinfo', description: 'Skicka välkomstmail med företagskultur och värderingar', completed: true },
        { step: 2, title: 'Kontrakt & Dokument', description: 'Signera anställningskontrakt och konfidentialitetsavtal', completed: true },
        { step: 3, title: 'IT Setup', description: 'Dator, email, och systemåtkomst konfigureras', completed: false },
        { step: 4, title: 'Introduktionsmöte', description: 'Möte med chef och teammedlemmar', completed: false },
        { step: 5, title: '30-dagars uppföljning', description: 'Utvärdera onboarding-erfarenhet', completed: false }
    ];

    activities = [
        { type: 'document', description: 'Företagshandbok uppdaterades', timestamp: new Date(Date.now() - 3600000).toISOString() },
        { type: 'policy', description: 'Ny GDPR-policy skapades', timestamp: new Date(Date.now() - 7200000).toISOString() }
    ];

    saveData();
}

function updateStats() {
    document.getElementById('totalDocs').textContent = documents.length;
    document.getElementById('totalPolicies').textContent = policies.length;
    document.getElementById('dashDocs').textContent = documents.length;
    document.getElementById('dashPolicies').textContent = policies.length;
    
    const completedSteps = onboardingSteps.filter(s => s.completed).length;
    const progress = Math.round((completedSteps / onboardingSteps.length) * 100);
    document.getElementById('onboardingProgress').textContent = progress + '%';
}

function renderDocuments() {
    const grid = document.getElementById('documentGrid');
    grid.innerHTML = documents.map(doc => `
        <div class="document-card">
            <div class="document-icon">📄</div>
            <div class="document-title">${doc.name}</div>
            <div class="document-meta">📁 ${doc.category} • 📅 ${doc.date}</div>
            <div style="color: #666; font-size: 0.9em; margin-top: 10px;">${doc.description}</div>
            <div class="document-tags">
                ${doc.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

function renderPolicies() {
    const grid = document.getElementById('policyGrid');
    grid.innerHTML = policies.map(policy => `
        <div class="document-card">
            <div class="document-icon">📜</div>
            <div class="document-title">${policy.name}</div>
            <div class="document-meta">🏷️ ${policy.type} • 📅 ${policy.date}</div>
            <div style="color: #666; font-size: 0.9em; margin-top: 10px;">${policy.content.substring(0, 100)}...</div>
        </div>
    `).join('');
}

function renderOnboarding() {
    const flow = document.getElementById('onboardingFlow');
    flow.innerHTML = onboardingSteps.map(step => `
        <div class="onboarding-step">
            <div class="step-number">${step.step}</div>
            <div class="step-content">
                <div class="step-title">${step.title}</div>
                <div style="color: #666; font-size: 0.9em;">${step.description}</div>
            </div>
            <div>
                ${step.completed ? 
                    '<span style="color: #28a745; font-size: 1.5em;">✅</span>' : 
                    '<button class="btn btn-primary btn-small" onclick="completeStep(' + step.step + ')">Markera klar</button>'
                }
            </div>
        </div>
    `).join('');
}

function renderNewEmployees() {
    const grid = document.getElementById('newEmployeesGrid');
    if (newEmployees.length === 0) {
        grid.innerHTML = '<div style="text-align: center; padding: 40px; color: #666;">Inga nya medarbetare ännu. Klicka på "Ny medarbetare" för att börja.</div>';
        return;
    }
    
    grid.innerHTML = newEmployees.map(emp => `
        <div class="employee-onboarding-card">
            <div class="employee-profile">
                <div class="employee-photo">${emp.name.charAt(0)}</div>
                <div class="employee-details">
                    <div class="employee-name">${emp.name}</div>
                    <div class="employee-role-badge">${emp.isConsultant ? '👔 Konsult' : '👤 Anställd'}</div>
                </div>
            </div>
            
            <div style="font-weight: 600; margin-bottom: 10px; color: #667eea;">📋 Behov & Utrustning:</div>
            <div class="needs-grid">
                <div class="need-item ${emp.needsComputer ? 'yes' : 'no'}">
                    ${emp.needsComputer ? '✅' : '❌'} Dator
                </div>
                <div class="need-item ${emp.needsOffice ? 'yes' : 'no'}">
                    ${emp.needsOffice ? '✅' : '❌'} Office 365
                </div>
                <div class="need-item ${emp.needsSlack ? 'yes' : 'no'}">
                    ${emp.needsSlack ? '✅' : '❌'} Slack
                </div>
                <div class="need-item ${emp.needsEmail ? 'yes' : 'no'}">
                    ${emp.needsEmail ? '✅' : '❌'} Email
                </div>
                <div class="need-item ${emp.needsCalendar ? 'yes' : 'no'}">
                    ${emp.needsCalendar ? '✅' : '❌'} Kalender
                </div>
                <div class="need-item ${emp.needsPhone ? 'yes' : 'no'}">
                    ${emp.needsPhone ? '✅' : '❌'} Telefon
                </div>
            </div>
            
            <div style="margin-top: 15px; padding-top: 15px; border-top: 2px solid #e9ecef; display: flex; justify-content: space-between; align-items: center;">
                <span style="color: #666; font-size: 0.85em;">📅 Startdatum: ${emp.startDate}</span>
                <button class="btn btn-primary btn-small" onclick="deleteEmployee('${emp.id}')">🗑️ Ta bort</button>
            </div>
        </div>
    `).join('');
}

// Start new onboarding
window.startNewOnboarding = function() {
    currentOnboarding = {
        id: Date.now().toString(),
        name: '',
        isConsultant: null,
        needsComputer: null,
        needsOffice: null,
        needsSlack: null,
        needsEmail: null,
        needsCalendar: null,
        needsPhone: null,
        startDate: new Date().toISOString().split('T')[0],
        step: 0
    };
    
    const chat = document.getElementById('onboardingAiChat');
    chat.innerHTML = '';
    
    const msg = document.createElement('div');
    msg.className = 'ai-message bot';
    msg.innerHTML = `🎉 Välkommen! Låt oss onboarda en ny medarbetare.<br><br>Vad heter den nya medarbetaren?`;
    chat.appendChild(msg);
    chat.scrollTop = chat.scrollHeight;
};

function askOnboardingAI(answer) {
    const chat = document.getElementById('onboardingAiChat');
    
    if (!currentOnboarding) {
        const msg = document.createElement('div');
        msg.className = 'ai-message bot';
        msg.innerHTML = `Klicka på "Ny medarbetare" för att starta en onboarding-process! 😊`;
        chat.appendChild(msg);
        chat.scrollTop = chat.scrollHeight;
        return;
    }
    
    // User message
    const userMsg = document.createElement('div');
    userMsg.className = 'ai-message user';
    userMsg.textContent = answer;
    chat.appendChild(userMsg);
    
    // Process answer
    setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.className = 'ai-message bot';
        
        if (currentOnboarding.step === 0) {
            currentOnboarding.name = answer;
            currentOnboarding.step = 1;
            botMsg.innerHTML = `Trevligt att träffas, ${answer}! 👋<br><br>Är ${answer} en konsult eller anställd?<br><br>Svara: <strong>konsult</strong> eller <strong>anställd</strong>`;
        } else if (currentOnboarding.step === 1) {
            const lowerAnswer = answer.toLowerCase();
            currentOnboarding.isConsultant = lowerAnswer.includes('konsult');
            currentOnboarding.step = 2;
            botMsg.innerHTML = `Perfekt! ${currentOnboarding.isConsultant ? '👔 Konsult noterat' : '👤 Anställd noterat'}.<br><br>Behöver ${currentOnboarding.name} en <strong>dator</strong>?<br><br>Svara: <strong>ja</strong> eller <strong>nej</strong>`;
        } else if (currentOnboarding.step === 2) {
            currentOnboarding.needsComputer = answer.toLowerCase().includes('ja');
            currentOnboarding.step = 3;
            botMsg.innerHTML = `${currentOnboarding.needsComputer ? '💻 Dator - Ja' : '❌ Dator - Nej'}<br><br>Behöver ${currentOnboarding.name} <strong>Office 365</strong>?<br><br>Svara: <strong>ja</strong> eller <strong>nej</strong>`;
        } else if (currentOnboarding.step === 3) {
            currentOnboarding.needsOffice = answer.toLowerCase().includes('ja');
            currentOnboarding.step = 4;
            botMsg.innerHTML = `${currentOnboarding.needsOffice ? '📊 Office 365 - Ja' : '❌ Office 365 - Nej'}<br><br>Behöver ${currentOnboarding.name} <strong>Slack</strong>?<br><br>Svara: <strong>ja</strong> eller <strong>nej</strong>`;
        } else if (currentOnboarding.step === 4) {
            currentOnboarding.needsSlack = answer.toLowerCase().includes('ja');
            currentOnboarding.step = 5;
            botMsg.innerHTML = `${currentOnboarding.needsSlack ? '💬 Slack - Ja' : '❌ Slack - Nej'}<br><br>Behöver ${currentOnboarding.name} en <strong>företagsemail</strong>?<br><br>Svara: <strong>ja</strong> eller <strong>nej</strong>`;
        } else if (currentOnboarding.step === 5) {
            currentOnboarding.needsEmail = answer.toLowerCase().includes('ja');
            currentOnboarding.step = 6;
            botMsg.innerHTML = `${currentOnboarding.needsEmail ? '📧 Email - Ja' : '❌ Email - Nej'}<br><br>Behöver ${currentOnboarding.name} åtkomst till <strong>företagskalender</strong>?<br><br>Svara: <strong>ja</strong> eller <strong>nej</strong>`;
        } else if (currentOnboarding.step === 6) {
            currentOnboarding.needsCalendar = answer.toLowerCase().includes('ja');
            currentOnboarding.step = 7;
            botMsg.innerHTML = `${currentOnboarding.needsCalendar ? '📅 Kalender - Ja' : '❌ Kalender - Nej'}<br><br>Behöver ${currentOnboarding.name} en <strong>företagstelefon</strong>?<br><br>Svara: <strong>ja</strong> eller <strong>nej</strong>`;
        } else if (currentOnboarding.step === 7) {
            currentOnboarding.needsPhone = answer.toLowerCase().includes('ja');
            currentOnboarding.step = 8;
            
            // Save employee
            newEmployees.push(currentOnboarding);
            saveData();
            renderNewEmployees();
            
            botMsg.innerHTML = `🎉 <strong>Klart!</strong> ${currentOnboarding.name} har lagts till.<br><br>
                <strong>Sammanfattning:</strong><br>
                👤 ${currentOnboarding.isConsultant ? 'Konsult' : 'Anställd'}<br>
                ${currentOnboarding.needsComputer ? '✅' : '❌'} Dator<br>
                ${currentOnboarding.needsOffice ? '✅' : '❌'} Office 365<br>
                ${currentOnboarding.needsSlack ? '✅' : '❌'} Slack<br>
                ${currentOnboarding.needsEmail ? '✅' : '❌'} Email<br>
                ${currentOnboarding.needsCalendar ? '✅' : '❌'} Kalender<br>
                ${currentOnboarding.needsPhone ? '✅' : '❌'} Telefon<br><br>
                Kortet har skapats ovan! 🎊<br><br>
                Vill du lägga till en ny medarbetare? Klicka "Ny medarbetare" igen.`;
            
            // Initialize gamification for new employee
            initializeGamification(currentOnboarding.id);
            
            activities.unshift({
                type: 'onboarding',
                description: `${currentOnboarding.name} lades till för onboarding`,
                timestamp: new Date().toISOString()
            });
            saveData();
            renderActivities();
            
            currentOnboarding = null;
        }
        
        chat.appendChild(botMsg);
        chat.scrollTop = chat.scrollHeight;
    }, 500);
}

window.deleteEmployee = function(id) {
    if (confirm('Är du säker på att du vill ta bort denna medarbetare?')) {
        newEmployees = newEmployees.filter(emp => emp.id !== id);
        quests = quests.filter(q => q.employeeId !== id);
        achievements = achievements.filter(a => a.employeeId !== id);
        saveData();
        renderNewEmployees();
        renderEmployeeSelector();
    }
};

// Gamification System
function initializeGamification(employeeId) {
    const employee = newEmployees.find(e => e.id === employeeId);
    if (!employee) return;

    employee.level = 1;
    employee.xp = 0;
    employee.xpToNextLevel = 100;
    employee.totalPoints = 0;
    employee.completedQuests = 0;

    // Create initial quests
    const initialQuests = [
        {
            id: Date.now() + '_1',
            employeeId: employeeId,
            title: '📚 Lär känna företaget',
            description: 'Svara rätt på 3 frågor om företagets historia och värderingar',
            type: 'quiz',
            difficulty: 'easy',
            xpReward: 50,
            completed: false,
            progress: 0,
            maxProgress: 3
        },
        {
            id: Date.now() + '_2',
            employeeId: employeeId,
            title: '👋 Träffa teamet',
            description: 'Presentera dig för minst 5 kollegor och lär dig deras namn',
            type: 'social',
            difficulty: 'easy',
            xpReward: 30,
            completed: false,
            progress: 0,
            maxProgress: 5
        },
        {
            id: Date.now() + '_3',
            employeeId: employeeId,
            title: '📖 Läs företagspolicies',
            description: 'Gå igenom och bekräfta att du förstått viktiga policies',
            type: 'reading',
            difficulty: 'medium',
            xpReward: 75,
            completed: false,
            progress: 0,
            maxProgress: policies.length || 3
        },
        {
            id: Date.now() + '_4',
            employeeId: employeeId,
            title: '🎯 Första projektet',
            description: 'Slutför ditt första arbetsuppdrag och be om feedback',
            type: 'work',
            difficulty: 'hard',
            xpReward: 150,
            completed: false,
            progress: 0,
            maxProgress: 1
        },
        {
            id: Date.now() + '_5',
            employeeId: employeeId,
            title: '☕ Fika med teamet',
            description: 'Delta i en fikapaus och lär känna företagskulturen',
            type: 'social',
            difficulty: 'easy',
            xpReward: 25,
            completed: false,
            progress: 0,
            maxProgress: 1
        },
        {
            id: Date.now() + '_6',
            employeeId: employeeId,
            title: '🔧 Setup din arbetsmiljö',
            description: 'Installera alla nödvändiga verktyg och program',
            type: 'technical',
            difficulty: 'medium',
            xpReward: 60,
            completed: false,
            progress: 0,
            maxProgress: 1
        }
    ];

    quests.push(...initialQuests);

    // Create achievements
    const employeeAchievements = [
        { id: '1', employeeId, icon: '🌟', name: 'Första dagen', description: 'Slutför din första dag', unlocked: false },
        { id: '2', employeeId, icon: '🎓', name: 'Snabbläsare', description: 'Läs alla policies', unlocked: false },
        { id: '3', employeeId, icon: '🤝', name: 'Social fjäril', description: 'Träffa alla i teamet', unlocked: false },
        { id: '4', employeeId, icon: '⚡', name: 'Snabbstartare', description: 'Nå Level 3 första veckan', unlocked: false },
        { id: '5', employeeId, icon: '🏆', name: 'Uppdragsmästare', description: 'Slutför 5 uppdrag', unlocked: false },
        { id: '6', employeeId, icon: '💯', name: 'Perfektionist', description: 'Få 100% på ett quiz', unlocked: false },
        { id: '7', employeeId, icon: '🚀', name: 'Raketstart', description: 'Samla 500 XP', unlocked: false },
        { id: '8', employeeId, icon: '👑', name: 'Onboarding-kung', description: 'Slutför alla uppdrag', unlocked: false }
    ];

    achievements.push(...employeeAchievements);
    saveData();
}

function renderEmployeeSelector() {
    const selector = document.getElementById('employeeSelector');
    if (newEmployees.length === 0) {
        selector.innerHTML = '';
        document.getElementById('gamificationStats').style.display = 'none';
        document.getElementById('questSection').style.display = 'none';
        document.getElementById('achievementSection').style.display = 'none';
        document.getElementById('quizSection').style.display = 'none';
        return;
    }

    selector.innerHTML = `
        <label style="font-weight: 600; margin-bottom: 8px; display: block;">Välj medarbetare för att se deras framsteg:</label>
        <select class="ai-input" style="width: 100%; padding: 12px;" onchange="selectEmployee(this.value)">
            <option value="">-- Välj medarbetare --</option>
            ${newEmployees.map(emp => `
                <option value="${emp.id}">${emp.name} - Level ${emp.level || 1} (${emp.totalPoints || 0} poäng)</option>
            `).join('')}
        </select>
    `;
}

window.selectEmployee = function(employeeId) {
    if (!employeeId) {
        document.getElementById('gamificationStats').style.display = 'none';
        document.getElementById('questSection').style.display = 'none';
        document.getElementById('achievementSection').style.display = 'none';
        document.getElementById('quizSection').style.display = 'none';
        return;
    }

    const employee = newEmployees.find(e => e.id === employeeId);
    if (!employee) return;

    document.getElementById('gamificationStats').style.display = 'flex';
    document.getElementById('questSection').style.display = 'block';
    document.getElementById('achievementSection').style.display = 'block';
    
    renderGamificationStats(employee);
    renderQuests(employeeId);
    renderAchievements(employeeId);
};

function renderGamificationStats(employee) {
    const stats = document.getElementById('gamificationStats');
    const xpPercent = (employee.xp / employee.xpToNextLevel) * 100;

    stats.innerHTML = `
        <div class="stat-card">
            <div class="stat-label">Level</div>
            <div class="stat-value">${employee.level || 1}</div>
        </div>
        <div class="stat-card gold">
            <div class="stat-label">Total Poäng</div>
            <div class="stat-value">${employee.totalPoints || 0}</div>
        </div>
        <div class="stat-card green">
            <div class="stat-label">Slutförda Uppdrag</div>
            <div class="stat-value">${employee.completedQuests || 0}</div>
        </div>
        <div style="flex: 0 0 100%; margin-top: -10px;">
            <div style="font-weight: 600; margin-bottom: 8px;">XP till nästa level: ${employee.xp || 0} / ${employee.xpToNextLevel || 100}</div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${xpPercent}%">${Math.round(xpPercent)}%</div>
            </div>
        </div>
    `;
}

function renderQuests(employeeId) {
    const questList = document.getElementById('questList');
    const employeeQuests = quests.filter(q => q.employeeId === employeeId && !q.completed);

    if (employeeQuests.length === 0) {
        questList.innerHTML = '<div style="text-align: center; padding: 40px; color: #666;">🎉 Alla uppdrag slutförda! Bra jobbat!</div>';
        return;
    }

    questList.innerHTML = employeeQuests.map(quest => {
        const progressPercent = (quest.progress / quest.maxProgress) * 100;
        return `
            <div class="quest-card" onclick="${quest.type === 'quiz' ? `startQuiz('${quest.id}')` : `updateQuestProgress('${quest.id}')`}">
                <div class="quest-header">
                    <div class="quest-title">${quest.title}</div>
                    <div class="quest-reward">⭐ ${quest.xpReward} XP</div>
                </div>
                <div class="quest-description">${quest.description}</div>
                <div class="progress-bar" style="margin-bottom: 15px;">
                    <div class="progress-fill" style="width: ${progressPercent}%">
                        ${quest.progress} / ${quest.maxProgress}
                    </div>
                </div>
                <div class="quest-footer">
                    <span class="quest-difficulty ${quest.difficulty}">${quest.difficulty === 'easy' ? '🟢 Lätt' : quest.difficulty === 'medium' ? '🟡 Medel' : '🔴 Svår'}</span>
                    <button class="btn btn-primary btn-small" onclick="event.stopPropagation(); ${quest.type === 'quiz' ? `startQuiz('${quest.id}')` : `updateQuestProgress('${quest.id}')`}">
                        ${quest.type === 'quiz' ? '🎯 Starta Quiz' : '✅ Uppdatera framsteg'}
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function renderAchievements(employeeId) {
    const achievementList = document.getElementById('achievementList');
    const employeeAchievements = achievements.filter(a => a.employeeId === employeeId);

    achievementList.innerHTML = employeeAchievements.map(ach => `
        <div class="achievement-badge ${ach.unlocked ? 'unlocked' : ''}">
            <div class="achievement-icon">${ach.icon}</div>
            <div class="achievement-name">${ach.name}</div>
            <div class="achievement-desc">${ach.description}</div>
            ${ach.unlocked ? '<div style="color: #28a745; font-weight: bold; margin-top: 10px;">🔓 UPPLÅST</div>' : '<div style="color: #666; margin-top: 10px;">🔒 Låst</div>'}
        </div>
    `).join('');
}

window.updateQuestProgress = function(questId) {
    const quest = quests.find(q => q.id === questId);
    if (!quest || quest.completed) return;

    quest.progress++;
    
    if (quest.progress >= quest.maxProgress) {
        completeQuest(questId);
    }

    saveData();
    selectEmployee(quest.employeeId);
};

function completeQuest(questId) {
    const quest = quests.find(q => q.id === questId);
    if (!quest || quest.completed) return;

    const employee = newEmployees.find(e => e.id === quest.employeeId);
    if (!employee) return;

    quest.completed = true;
    employee.xp = (employee.xp || 0) + quest.xpReward;
    employee.totalPoints = (employee.totalPoints || 0) + quest.xpReward;
    employee.completedQuests = (employee.completedQuests || 0) + 1;

    // Level up check
    while (employee.xp >= employee.xpToNextLevel) {
        employee.xp -= employee.xpToNextLevel;
        employee.level++;
        employee.xpToNextLevel = Math.floor(employee.xpToNextLevel * 1.5);
        
        alert(`🎉 Level Up! ${employee.name} är nu Level ${employee.level}!`);
    }

    // Check achievements
    checkAchievements(employee.id);

    activities.unshift({
        type: 'quest',
        description: `${employee.name} slutförde: ${quest.title}`,
        timestamp: new Date().toISOString()
    });

    alert(`✅ Uppdrag slutfört! +${quest.xpReward} XP`);
    
    saveData();
    renderActivities();
}

function checkAchievements(employeeId) {
    const employee = newEmployees.find(e => e.id === employeeId);
    const employeeAchievements = achievements.filter(a => a.employeeId === employeeId);
    const employeeQuests = quests.filter(q => q.employeeId === employeeId);

    employeeAchievements.forEach(ach => {
        if (ach.unlocked) return;

        let shouldUnlock = false;

        if (ach.name === 'Uppdragsmästare' && employee.completedQuests >= 5) shouldUnlock = true;
        if (ach.name === 'Snabbstartare' && employee.level >= 3) shouldUnlock = true;
        if (ach.name === 'Raketstart' && employee.totalPoints >= 500) shouldUnlock = true;
        if (ach.name === 'Onboarding-kung' && employeeQuests.every(q => q.completed)) shouldUnlock = true;
        if (ach.name === 'Snabbläsare' && employeeQuests.find(q => q.title.includes('policies') && q.completed)) shouldUnlock = true;

        if (shouldUnlock) {
            ach.unlocked = true;
            alert(`🏆 Ny prestation upplåst: ${ach.icon} ${ach.name}!`);
        }
    });
}

window.startQuiz = function(questId) {
    const quest = quests.find(q => q.id === questId);
    if (!quest) return;

    const quizSection = document.getElementById('quizSection');
    quizSection.style.display = 'block';
    quizSection.scrollIntoView({ behavior: 'smooth' });

    const companyQuestions = [
        {
            question: 'Vad är företagets viktigaste värdering?',
            options: ['Innovation', 'Teamwork', 'Integritet', 'Snabbhet'],
            correct: 1
        },
        {
            question: 'Vilket år grundades företaget?',
            options: ['2015', '2018', '2020', '2022'],
            correct: 1
        },
        {
            question: 'Vad är företagets vision?',
            options: ['Att bli störst', 'Att göra skillnad', 'Att tjäna pengar', 'Att växa snabbt'],
            correct: 1
        },
        {
            question: 'Hur många anställda har företaget?',
            options: ['1-10', '11-50', '51-100', '100+'],
            correct: 1
        },
        {
            question: 'Vad är företagets huvudprodukt?',
            options: ['Software', 'Konsulting', 'E-handel', 'Utbildning'],
            correct: 0
        }
    ];

    let currentQuestion = 0;
    let score = 0;

    function renderQuestion() {
        const q = companyQuestions[currentQuestion];
        quizSection.innerHTML = `
            <div class="quiz-container">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h3>📚 Företagsquiz</h3>
                    <span style="color: #667eea; font-weight: bold;">Fråga ${currentQuestion + 1} / ${companyQuestions.length}</span>
                </div>
                <div class="quiz-question">${q.question}</div>
                ${q.options.map((opt, idx) => `
                    <div class="quiz-option" onclick="answerQuestion(${idx}, ${q.correct})">
                        ${opt}
                    </div>
                `).join('')}
                <button class="btn btn-secondary" onclick="closeQuiz()" style="margin-top: 15px;">Avbryt</button>
            </div>
        `;
    }

    window.answerQuestion = function(selected, correct) {
        const options = document.querySelectorAll('.quiz-option');
        options[selected].classList.add(selected === correct ? 'correct' : 'wrong');
        options[correct].classList.add('correct');

        if (selected === correct) {
            score++;
            quest.progress++;
        }

        setTimeout(() => {
            currentQuestion++;
            if (currentQuestion < companyQuestions.length) {
                renderQuestion();
            } else {
                finishQuiz();
            }
        }, 1500);
    };

    function finishQuiz() {
        const percent = (score / companyQuestions.length) * 100;
        const passed = quest.progress >= quest.maxProgress;

        quizSection.innerHTML = `
            <div class="quiz-container" style="text-align: center;">
                <div style="font-size: 4em; margin-bottom: 20px;">${passed ? '🎉' : '📚'}</div>
                <h3>${passed ? 'Grattis!' : 'Bra försök!'}</h3>
                <div style="font-size: 2em; margin: 20px 0; color: #667eea; font-weight: bold;">
                    ${score} / ${companyQuestions.length} rätt
                </div>
                <div style="color: #666; margin-bottom: 20px;">
                    ${passed ? 'Du har slutfört quizzet!' : `Du behöver ${quest.maxProgress - quest.progress} rätt till för att klara uppdraget.`}
                </div>
                <div style="display: flex; gap: 10px; justify-content: center;">
                    ${!passed ? '<button class="btn btn-primary" onclick="startQuiz(\'' + questId + '\')">🔄 Försök igen</button>' : ''}
                    <button class="btn btn-secondary" onclick="closeQuiz()">Stäng</button>
                </div>
            </div>
        `;

        if (passed) {
            completeQuest(questId);
            
            // Check for perfect score achievement
            if (percent === 100) {
                const perfectAch = achievements.find(a => a.employeeId === quest.employeeId && a.name === 'Perfektionist');
                if (perfectAch && !perfectAch.unlocked) {
                    perfectAch.unlocked = true;
                    setTimeout(() => alert('🏆 Ny prestation: 💯 Perfektionist!'), 1000);
                }
            }
        }

        saveData();
        selectEmployee(quest.employeeId);
    }

    window.closeQuiz = function() {
        quizSection.style.display = 'none';
    };

    renderQuestion();
};

function renderActivities() {
    const list = document.getElementById('recentActivities');
    list.innerHTML = activities.slice(0, 5).map(activity => {
        const timeAgo = getTimeAgo(new Date(activity.timestamp));
        return `
            <div style="background: white; border: 2px solid #e9ecef; border-radius: 8px; padding: 15px; margin-bottom: 10px;">
                <div style="font-weight: 600;">${activity.description}</div>
                <div style="color: #666; font-size: 0.85em; margin-top: 5px;">${timeAgo}</div>
            </div>
        `;
    }).join('');
}

function getTimeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    if (seconds < 60) return 'just nu';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} min sedan`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h sedan`;
    const days = Math.floor(hours / 24);
    return `${days} dagar sedan`;
}

// Navigation
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            const view = item.dataset.view;
            
            document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
            document.getElementById(`${view}-view`).classList.add('active');

            if (view === 'documents') renderDocuments();
            if (view === 'policies') renderPolicies();
            if (view === 'onboarding') {
                renderOnboarding();
                renderNewEmployees();
                renderEmployeeSelector();
            }
        });
    });

    // Modals
    window.openAddDocumentModal = function() {
        document.getElementById('addDocumentModal').classList.add('active');
    };

    window.closeAddDocumentModal = function() {
        document.getElementById('addDocumentModal').classList.remove('active');
        document.getElementById('addDocumentForm').reset();
    };

    window.openAddPolicyModal = function() {
        document.getElementById('addPolicyModal').classList.add('active');
    };

    window.closeAddPolicyModal = function() {
        document.getElementById('addPolicyModal').classList.remove('active');
        document.getElementById('addPolicyForm').reset();
    };

    // Add document
    document.getElementById('addDocumentForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newDoc = {
            id: Date.now().toString(),
            name: document.getElementById('docName').value,
            category: document.getElementById('docCategory').value,
            description: document.getElementById('docDescription').value,
            tags: document.getElementById('docTags').value.split(',').map(t => t.trim()).filter(t => t),
            date: new Date().toISOString().split('T')[0]
        };

        documents.push(newDoc);
        activities.unshift({
            type: 'document',
            description: `Nytt dokument: ${newDoc.name}`,
            timestamp: new Date().toISOString()
        });

        saveData();
        updateStats();
        renderDocuments();
        renderActivities();
        closeAddDocumentModal();
        alert('✅ Dokument tillagt!');
    });

    // Add policy
    document.getElementById('addPolicyForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newPolicy = {
            id: Date.now().toString(),
            name: document.getElementById('policyName').value,
            type: document.getElementById('policyType').value,
            content: document.getElementById('policyContent').value,
            date: new Date().toISOString().split('T')[0]
        };

        policies.push(newPolicy);
        activities.unshift({
            type: 'policy',
            description: `Ny policy: ${newPolicy.name}`,
            timestamp: new Date().toISOString()
        });

        saveData();
        updateStats();
        renderPolicies();
        renderActivities();
        closeAddPolicyModal();
        alert('✅ Policy skapad!');
    });

    // Complete onboarding step
    window.completeStep = function(stepNum) {
        const step = onboardingSteps.find(s => s.step === stepNum);
        if (step) {
            step.completed = true;
            saveData();
            updateStats();
            renderOnboarding();
        }
    };

    // AI Chat
    document.getElementById('aiInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const question = e.target.value.trim();
            if (question) {
                askAI(question);
                e.target.value = '';
            }
        }
    });

    function askAI(question) {
        const chat = document.getElementById('aiChat');
        
        const userMsg = document.createElement('div');
        userMsg.className = 'ai-message user';
        userMsg.textContent = question;
        chat.appendChild(userMsg);

        const loadingMsg = document.createElement('div');
        loadingMsg.className = 'ai-message bot';
        loadingMsg.innerHTML = '🤔 Tänker...';
        chat.appendChild(loadingMsg);
        chat.scrollTop = chat.scrollHeight;

        setTimeout(() => {
            loadingMsg.remove();
            const aiMsg = document.createElement('div');
            aiMsg.className = 'ai-message bot';
            aiMsg.innerHTML = generateAIResponse(question);
            chat.appendChild(aiMsg);
            chat.scrollTop = chat.scrollHeight;
        }, 800);
    }

    function generateAIResponse(question) {
        const lower = question.toLowerCase();
        
        if (lower.includes('hej') || lower.includes('hejsan')) {
            return `👋 Hej! Jag är din AI Leadership Assistent. Jag kan hjälpa dig med företagsdokument, policies och onboarding. Vad behöver du?`;
        }
        
        if (lower.includes('policy') && (lower.includes('distans') || lower.includes('remote'))) {
            return `📜 <strong>Distansarbete Policy - Utkast:</strong><br><br>
                <strong>1. Syfte</strong><br>
                Denna policy definierar riktlinjer för distansarbete för att säkerställa produktivitet och balans.<br><br>
                <strong>2. Behörighet</strong><br>
                • Alla heltidsanställda kan ansöka om distansarbete<br>
                • Minst 1 års anställning krävs<br>
                • Chef godkänner utifrån rollens lämplighet<br><br>
                <strong>3. Arbetsschema</strong><br>
                • Kärnarbetstid 10:00-15:00 CET<br>
                • Tillgänglig på Slack/Teams<br>
                • Max 3 dagar distansarbete per vecka<br><br>
                Vill du att jag utvecklar någon del?`;
        }
        
        if (lower.includes('onboarding') || lower.includes('föreslå')) {
            return `🎯 <strong>Onboarding-plan för nya medarbetare:</strong><br><br>
                <strong>Vecka 1:</strong> Välkomstmail, kontrakt, IT-setup, introduktionsmöte<br>
                <strong>Vecka 2:</strong> Avdelningsintroduktion, första projekt, mentor-tilldelning<br>
                <strong>Vecka 3-4:</strong> Självständigt arbete med mentor-support<br>
                <strong>Månad 1:</strong> 30-dagars utvärdering med chef<br>
                <strong>Månad 3:</strong> 90-dagars review och målsättning<br><br>
                Vill du ha en mer detaljerad plan för specifik roll?`;
        }
        
        if (lower.includes('gdpr') || lower.includes('compliance')) {
            return `✅ <strong>GDPR Compliance Check:</strong><br><br>
                <strong>Status:</strong><br>
                ✅ Dataskyddspolicy - Uppdaterad<br>
                ✅ Samtycken dokumenterade<br>
                ⚠️ Personuppgiftsbiträdesavtal - Behöver ses över<br>
                ✅ Rätt till radering implementerad<br>
                ⚠️ DPIA för nytt HR-system saknas<br><br>
                <strong>Rekommendation:</strong> Uppdatera personuppgiftsbiträdesavtal och genomför DPIA för HR-systemet inom 30 dagar.`;
        }

        if (lower.includes('dokument') || lower.includes('lista')) {
            return `📋 <strong>Dina dokument:</strong><br><br>
                ${documents.slice(0, 5).map(doc => `• ${doc.name} (${doc.category})`).join('<br>')}<br><br>
                Totalt: ${documents.length} dokument. Vad vill du göra med dem?`;
        }

        return `Intressant fråga! Jag kan hjälpa dig med:<br><br>
            • <strong>"Skapa policy för distansarbete"</strong> - Generera policy-utkast<br>
            • <strong>"Föreslå onboarding-steg"</strong> - Strukturerad onboarding-plan<br>
            • <strong>"Granska GDPR-compliance"</strong> - Compliance-analys<br>
            • <strong>"Lista dokument"</strong> - Se alla företagsdokument<br><br>
            Vad behöver du hjälp med? 😊`;
    }

    // Initialize
    loadData();
    updateStats();
    renderDocuments();
    renderPolicies();
    renderOnboarding();
    renderNewEmployees();
    renderEmployeeSelector();
    renderActivities();
});
