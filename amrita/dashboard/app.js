/* --- Bulletproof App Logic --- */

// 1. Navigation Logic (Global function so HTML can see it)
window.showPage = function(pageId, element) {
    // 1. Remove active class from all Nav Items
    const allNavItems = document.querySelectorAll('.nav-item');
    allNavItems.forEach(item => item.classList.remove('active'));

    // 2. Add active class to clicked item
    if (element) {
        element.classList.add('active');
    } else {
        // Fallback: find item by ID if element wasn't passed
        const fallbackItem = document.getElementById('nav-' + pageId);
        if(fallbackItem) fallbackItem.classList.add('active');
    }

    // 3. Hide all Views
    const allViews = document.querySelectorAll('.view-container');
    allViews.forEach(view => view.classList.remove('active'));

    // 4. Show selected View
    const targetView = document.getElementById(pageId);
    if (targetView) {
        targetView.classList.add('active');
    } else {
        console.error("Page not found:", pageId);
    }

    // 5. Update Header Title
    const headerTitle = document.getElementById('page-header');
    if (headerTitle) {
        headerTitle.textContent = pageId.charAt(0).toUpperCase() + pageId.slice(1) + " Module";
    }
};

/* --- Developer Module --- */
window.loadFile = function(filename) {
    const display = document.getElementById('code-display');
    // Check if codeSnippets exists (from data.js)
    if (typeof codeSnippets !== 'undefined' && display && codeSnippets[filename]) {
        display.innerHTML = codeSnippets[filename];
        showToast(`Loaded ${filename}`);
    } else {
        console.error("Code snippet not found for:", filename);
    }
};

/* --- Agent Module --- */
function initAgentModule() {
    // Populate Logs if data exists
    const logList = document.getElementById('agent-logs');
    if (logList && typeof agentLogs !== 'undefined') {
        logList.innerHTML = ''; // Clear first
        agentLogs.forEach(log => {
            const li = document.createElement('li');
            li.className = 'log-item';
            li.innerHTML = `<span class="log-time">[${log.time}]</span> ${log.msg}`;
            logList.appendChild(li);
        });
    }

    // Initialize Button
    const initBtn = document.getElementById('init-agent-btn');
    if (initBtn) {
        initBtn.onclick = function() {
            showToast('Agent Init: Process Started');
            const li = document.createElement('li');
            li.className = 'log-item';
            const now = new Date();
            li.innerHTML = `<span class="log-time">[${now.toLocaleTimeString()}]</span> Initializing...`;
            if(logList) logList.prepend(li);
        };
    }
}

/* --- Status Module --- */
function initStatusModule() {
    // Timeline
    const timelineContainer = document.getElementById('timeline-container');
    if (timelineContainer && typeof timelineData !== 'undefined') {
        timelineContainer.innerHTML = '';
        timelineData.forEach(item => {
            const div = document.createElement('div');
            div.className = 'timeline-item';
            div.innerHTML = `
                <div class="timeline-date">${item.date}</div>
                <div class="timeline-title">${item.title}</div>
                <div style="color:var(--text-muted); font-size:0.9rem;">${item.desc}</div>
            `;
            timelineContainer.appendChild(div);
        });
    }

    // Commits
    const commitBody = document.getElementById('commit-history-body');
    if (commitBody && typeof commitHistory !== 'undefined') {
        commitBody.innerHTML = '';
        commitHistory.forEach(commit => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td style="color:var(--accent-secondary)">${commit.hash}</td>
                <td>${commit.msg}</td>
                <td>${commit.author}</td>
            `;
            commitBody.appendChild(row);
        });
    }
}

/* --- Testing Module --- */
function initTestingModule() {
    const effRange = document.getElementById('efficiency-range');
    const scalRange = document.getElementById('scalability-range');
    const effVal = document.getElementById('eff-val');
    const scalVal = document.getElementById('scal-val');
    const bars = document.querySelectorAll('.bar');

    if (effRange) {
        effRange.addEventListener('input', (e) => {
            if(effVal) effVal.textContent = e.target.value + '%';
            if(bars[0]) bars[0].style.height = e.target.value + '%';
        });
    }

    if (scalRange) {
        scalRange.addEventListener('input', (e) => {
            if(scalVal) scalVal.textContent = e.target.value + '%';
            if(bars[3]) bars[3].style.height = e.target.value + '%';
        });
    }
}

/* --- Sidebar Actions (Global) --- */
window.handleLogout = function() {
    if(confirm("Are you sure you want to logout?")) {
        showToast("Logging out...");
        setTimeout(() => {
            document.body.innerHTML = `
                <div style="display:flex; justify-content:center; align-items:center; height:100vh; background:#121212; color:white; flex-direction:column;">
                    <h1>Logged Out</h1>
                    <p style="color:#9ca3af; margin-top:10px;">Goodbye!</p>
                    <button onclick="location.reload()" style="margin-top:20px; padding:10px 20px; background:#4f46e5; border:none; color:white; cursor:pointer;">Reload App</button>
                </div>
            `;
        }, 1000);
    }
};

window.openSettings = function() {
    showToast("Settings panel would open here.");
};

/* --- Toast Utility (Global) --- */
window.showToast = function(message) {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
};

/* --- Master Initialization --- */
document.addEventListener('DOMContentLoaded', () => {
    console.log("App Loaded");
    
    // Initialize components
    try {
        initAgentModule();
        initStatusModule();
        initTestingModule();
    } catch (e) {
        console.error("Error initializing modules:", e);
    }

    // Initial load of code file
    loadFile('App.js');
});