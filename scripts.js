// scripts.js - Interactivity for JMB Studio Website

document.addEventListener('DOMContentLoaded', () => {
    updatePHTime();
    setInterval(updatePHTime, 1000);
});

function updatePHTime() {
    const phTime = new Date().toLocaleTimeString('en-PH', { hour12: true, timeZone: 'Asia/Manila' });
    const timeDisplay = document.getElementById('ph-time');
    if (timeDisplay) timeDisplay.textContent = phTime;
}

function showSection(id) {
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    const section = document.getElementById(id);
    if (section) section.classList.add('active');

    document.querySelectorAll('.nav-link').forEach(btn => btn.classList.remove('active'));
    const btn = Array.from(document.querySelectorAll('.nav-link')).find(b => b.textContent.trim().toUpperCase() === id.replace('-', ' ').toUpperCase());
    if (btn) btn.classList.add('active');
}

function loadAndShowSection(id) { showSection(id); window.scrollTo({ top: 0, behavior: 'smooth' }); }

function performSearch() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const clearBtn = document.getElementById('clear-search');
    const navBtn = document.getElementById('search-nav');
    const resultsSection = document.getElementById('search-results');
    const content = document.getElementById('search-results-content');
    if (!query) { clearBtn.style.display = 'none'; navBtn.style.display = 'none'; return; }
    clearBtn.style.display = 'block'; navBtn.style.display = 'inline-block';
    showSection('search-results');
    content.innerHTML = `<p class='text-center text-gray-600'>Search results for: <strong>${query}</strong></p>`;
}

function clearSearch() {
    document.getElementById('search-input').value = '';
    document.getElementById('clear-search').style.display = 'none';
    showSection('home');
}

function openModal(id) { document.getElementById(id)?.classList.add('active'); }
function closeModal() { document.querySelectorAll('.modal').forEach(m => m.classList.remove('active')); }

function openProjectModal(title, desc, type) {
    document.getElementById('project-modal-title').textContent = title;
    document.getElementById('project-modal-description').textContent = desc;
    const content = document.getElementById('project-modal-content');
    content.innerHTML = type === 'video' ? '<div class="text-6xl">🎥</div>' : '<div class="text-6xl">🖼️</div>';
    openModal('project-modal');
}

function closeProjectModal() { closeModal(); }
