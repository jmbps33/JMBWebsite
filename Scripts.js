
// ==========================
// JMB Studio Production - Main Scripts.js
// ==========================

// Section Navigation
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    const target = document.getElementById(sectionId);
    if (target) target.classList.add('active');

    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    const activeBtn = Array.from(document.querySelectorAll('.nav-link')).find(btn => 
        btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(sectionId));
    if (activeBtn) activeBtn.classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Load & Show Section
function loadAndShowSection(sectionId) {
    setTimeout(() => showSection(sectionId), 500);
}

// Search System
function performSearch() {
    const query = document.getElementById('search-input').value.toLowerCase().trim();
    const clearBtn = document.getElementById('clear-search');
    const navBtn = document.getElementById('search-nav');
    const resultContainer = document.getElementById('search-results-content');

    if (query === '') {
        clearBtn.style.display = 'none';
        navBtn.style.display = 'none';
        resultContainer.innerHTML = '<div class="text-center text-gray-500"><div class="text-5xl mb-4">🔍</div><p>Enter a search term to find content across News, Gallery, and Partners.</p></div>';
        return;
    }

    clearBtn.style.display = 'flex';
    navBtn.style.display = 'inline-block';

    let results = '';
    const sources = [
        { id: 'news', title: 'Latest News' },
        { id: 'gallery', title: 'Gallery' },
        { id: 'partners', title: 'Partners' }
    ];

    sources.forEach(source => {
        const section = document.getElementById(source.id);
        if (section && section.innerText.toLowerCase().includes(query)) {
            results += `<div class="bg-white p-6 rounded-lg shadow mb-4"><h3 class="text-xl font-semibold text-blue-600 mb-2">${source.title}</h3><p class="text-gray-600">Found related results. <button onclick="showSection('${source.id}')" class="text-blue-500 underline">Go to Section</button></p></div>`;
        }
    });

    if (!results) results = '<div class="text-center text-gray-500"><div class="text-4xl mb-2">❌</div>No results found.</div>';
    resultContainer.innerHTML = results;
    showSection('search-results');
}

function clearSearch() {
    document.getElementById('search-input').value = '';
    performSearch();
}

// Partnership Form
function showPartnershipForm() {
    document.getElementById('partnership-form').style.display = 'block';
    window.scrollTo({ top: document.getElementById('partnership-form').offsetTop - 100, behavior: 'smooth' });
}

function submitPartnershipForm(event) {
    event.preventDefault();
    document.getElementById('success-modal').classList.add('active');
}

function generateMOA() {
    const company = document.getElementById('company-name').value;
    const contact = document.getElementById('contact-person').value;
    const type = document.getElementById('partnership-type').value;
    const desc = document.getElementById('description').value;

    const moaContent = `
        <h2 class="text-2xl font-bold mb-4 text-center">Memorandum of Agreement</h2>
        <p class="mb-2"><strong>Between:</strong> Jorenz Melo Balbuena Studio Production, Inc.</p>
        <p class="mb-2"><strong>And:</strong> ${company}</p>
        <p class="mb-2"><strong>Contact Person:</strong> ${contact}</p>
        <p class="mb-2"><strong>Partnership Type:</strong> ${type}</p>
        <p class="mt-4">${desc}</p>
        <p class="mt-6">This agreement signifies a partnership for creative collaboration and project excellence between both parties.</p>
        <p class="mt-6">Signed electronically on ${new Date().toLocaleDateString()}</p>
    `;

    document.getElementById('moa-content').innerHTML = moaContent;
    document.getElementById('moa-modal').classList.add('active');
}

function closeMOAModal() {
    document.getElementById('moa-modal').classList.remove('active');
}

function closeModal() {
    document.querySelectorAll('.modal').forEach(modal => modal.classList.remove('active'));
}

// Gallery Modal
function openProjectModal(title, desc, type) {
    const modal = document.getElementById('project-modal');
    document.getElementById('project-modal-title').innerText = title;
    document.getElementById('project-modal-description').innerText = desc;
    document.getElementById('project-modal-content').innerHTML = type === 'video' ? '<div class="text-4xl mb-4">🎬</div>Video Preview Unavailable' : '<div class="text-4xl mb-4">🖼️</div>Image Preview Unavailable';
    modal.classList.add('active');
}

function closeProjectModal() {
    document.getElementById('project-modal').classList.remove('active');
}

// Contact Modal
function openContactModal() {
    alert('Contact form modal to be developed.');
}

// Raffle Countdown
function updateCountdown() {
    const nextEvent = new Date('2028-01-01T00:00:00+08:00').getTime();
    const now = new Date().getTime();
    const diff = nextEvent - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const countdownDisplay = document.getElementById('countdown-display');
    if (countdownDisplay) countdownDisplay.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    if (diff < 0) {
        document.getElementById('raffle-status').textContent = '🎉 Raffle is now live! Register below!';
        document.getElementById('raffle-registration').style.display = 'block';
    } else {
        document.getElementById('raffle-status').textContent = 'Next raffle event countdown ongoing...';
    }
}

setInterval(updateCountdown, 1000);

// PH Time Display
function updatePHTime() {
    const phTime = new Date().toLocaleTimeString('en-PH', { timeZone: 'Asia/Manila' });
    document.getElementById('ph-time').textContent = phTime;
}
setInterval(updatePHTime, 1000);

// Admin Login
function handleAdminLogin(event) {
    event.preventDefault();
    const user = document.getElementById('admin-username').value;
    const pass = document.getElementById('admin-password').value;

    if (user === 'admin' && pass === 'jmb2025') {
        alert('✅ Welcome, Admin! Redirecting to control panel...');
        showSection('gallery');
    } else {
        alert('❌ Invalid credentials.');
    }
}

// Raffle Terms
function showRaffleTerms() {
    document.getElementById('raffle-terms-modal').classList.add('active');
}

function closeRaffleTerms() {
    document.getElementById('raffle-terms-modal').classList.remove('active');
}

console.log('✅ Scripts.js loaded successfully.');
