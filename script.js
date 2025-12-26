// API Base URL
const BASE_URL = 'https://discord.com/api/v10';

// DOM Elements
const loadBotInfoBtn = document.getElementById('loadBotInfo');
const loadGuildsBtn = document.getElementById('loadGuilds');

const botInfoDiv = document.getElementById('botInfo');
const botName = document.getElementById('botName');
const botId = document.getElementById('botId');
const botAvatar = document.getElementById('botAvatar');

const guildsContainer = document.getElementById('guildsContainer');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const sortSelect = document.getElementById('sortSelect');
const resultsInfo = document.getElementById('resultsInfo');

const loadingDiv = document.getElementById('loading');
const errorDiv = document.getElementById('error');

// ---------------- Utility ----------------
function showLoading() {
    loadingDiv?.classList.remove('hidden');
}

function hideLoading() {
    loadingDiv?.classList.add('hidden');
}

function showError(message) {
    if (!errorDiv) return;
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
    setTimeout(() => errorDiv.classList.add('hidden'), 5000);
}

function disableButtons(state) {
    if (loadBotInfoBtn) loadBotInfoBtn.disabled = state;
    if (loadGuildsBtn) loadGuildsBtn.disabled = state;
}

// ---------------- API ----------------
async function apiCall(endpoint) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
            Authorization: `Bot ${BOT_TOKEN}`,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }
    return response.json();
}

const getBotInfo = () => apiCall('/users/@me');
const getGuilds = () => apiCall('/users/@me/guilds');

// ---------------- Render ----------------
function displayBotInfo(data) {
    botName.textContent = data.username;
    botId.textContent = data.id;
    botAvatar.src = data.avatar
        ? `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png`
        : 'https://cdn.discordapp.com/embed/avatars/0.png';

    botInfoDiv.classList.remove('hidden');
}

let cachedGuilds = [];

function escapeHtml(text = '') {
    return text.replace(/[&"'<>]/g, c =>
        ({ '&': '&amp;', '"': '&quot;', "'": '&#39;', '<': '&lt;', '>': '&gt;' }[c])
    );
}

function renderGuildCard(guild) {
    const card = document.createElement('div');
    card.className = 'guild-card';

    card.innerHTML = `
        <img class="guild-avatar"
             src="${guild.icon
                ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`
                : 'https://cdn.discordapp.com/embed/avatars/0.png'}">
        <div class="guild-meta">
            <h3>${escapeHtml(guild.name)}</h3>
            <p>ID: ${guild.id}</p>
        </div>
    `;
    return card;
}

function displayGuilds(data, sortMode = 'az') {
    guildsContainer.innerHTML = '';
    cachedGuilds = [...data];

    if (!cachedGuilds.length) {
        resultsInfo.textContent = 'No servers found.';
        resultsInfo.classList.remove('hidden');
        return;
    }

    const sorted = cachedGuilds.sort((a, b) =>
        sortMode === 'za'
            ? b.name.localeCompare(a.name)
            : a.name.localeCompare(b.name)
    );

    sorted.forEach(g => guildsContainer.appendChild(renderGuildCard(g)));

    resultsInfo.textContent = `${sorted.length} server(s)`;
    resultsInfo.classList.remove('hidden');
}

// ---------------- Events ----------------
loadBotInfoBtn?.addEventListener('click', async () => {
    try {
        showLoading();
        disableButtons(true);
        displayBotInfo(await getBotInfo());
    } catch (e) {
        showError('Bot info request blocked by browser (CORS).');
    } finally {
        hideLoading();
        disableButtons(false);
    }
});

loadGuildsBtn?.addEventListener('click', async () => {
    try {
        showLoading();
        disableButtons(true);
        displayGuilds(await getGuilds(), sortSelect.value);
    } catch (e) {
        showError('Guild request blocked by browser (CORS).');
    } finally {
        hideLoading();
        disableButtons(false);
    }
});

searchInput?.addEventListener('input', () => {
    const q = searchInput.value.toLowerCase();
    const filtered = cachedGuilds.filter(g => g.name.toLowerCase().includes(q));
    displayGuilds(filtered, sortSelect.value);
});

sortSelect?.addEventListener('change', () => {
    displayGuilds(cachedGuilds, sortSelect.value);
});
