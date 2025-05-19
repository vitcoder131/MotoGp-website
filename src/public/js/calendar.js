const gridBtn = document.getElementById('gridBtn');
const listBtn = document.getElementById('listBtn');
const btnGPs = document.getElementById('btnGPs');
const btnTests = document.getElementById('btnTests');

const gpContainer = document.getElementById('gpContainer');
const gpListView = document.getElementById('gpListView');
const testContainer = document.getElementById('testContainer');
const viewToggle = document.getElementById('viewToggle');

const ticketsSection = document.getElementById('ticketsSection');
const guidesSection = document.getElementById("guidesSection");
// Grid/List toggle for GPs
gridBtn.addEventListener('click', () => {
    gpContainer.style.display = 'grid';
    gpListView.style.display = 'none';
    gridBtn.classList.add('active');
    listBtn.classList.remove('active');
});

listBtn.addEventListener('click', () => {
    gpContainer.style.display = 'none';
    gpListView.style.display = 'flex';
    listBtn.classList.add('active');
    gridBtn.classList.remove('active');
});

// GPs / Tests toggle
btnGPs.addEventListener('click', () => {
    gpContainer.style.display = gridBtn.classList.contains('active') ? 'grid' : 'none';
    gpListView.style.display = listBtn.classList.contains('active') ? 'flex' : 'none';
    testContainer.style.display = 'none';
    viewToggle.style.display = 'flex';
    btnGPs.classList.add('active');
    btnTests.classList.remove('active');
    ticketsSection.style.display = 'block';
    guidesSection.style.display = "block";
});

btnTests.addEventListener('click', () => {
    gpContainer.style.display = 'none';
    gpListView.style.display = 'none';
    testContainer.style.display = 'flex';
    viewToggle.style.display = 'none';
    btnTests.classList.add('active');
    btnGPs.classList.remove('active');
    ticketsSection.style.display = 'none';
    guidesSection.style.display = "none";
    updateTestStatus();
});

function updateEventStatuses() {
    const today = new Date();
    const events = document.querySelectorAll('#gpContainer .event');

    let nextEventFound = false;

    events.forEach(event => {
        const start = event.getAttribute('data-start');
        const end = event.getAttribute('data-end');
        if (!start || !end) return;

        const startDate = new Date(start);
        const endDate = new Date(end);

        event.classList.remove('finished', 'upnext');

        if (endDate < today) {
            event.classList.add('finished');
        } else if (!nextEventFound && startDate >= today) {
            event.classList.add('upnext');
            nextEventFound = true;
        }
    });
}

updateEventStatuses();

function updateTestStatus() {
    const testItems = document.querySelectorAll('.test-item');
    const today = new Date();

    testItems.forEach(item => {
        const statusBox = item.querySelector('.event-status-tag');
        const startStr = item.dataset.start;
        const endStr = item.dataset.end;

        if (!startStr || !endStr || !statusBox) return;

        const startDate = new Date(startStr);
        const endDate = new Date(endStr);

        if (today < startDate) {
            statusBox.textContent = 'UP NEXT';
            statusBox.classList.add('event-status-upnext');
        } else if (today > endDate) {
            statusBox.textContent = 'FINISHED';
            statusBox.classList.remove('event-status-upnext');
            statusBox.style.background = 'black';
        } else {
            statusBox.textContent = '';
            statusBox.style.display = 'none';
        }
    });
}
updateTestStatus();
function toggleMenu() {
    document.getElementById('sidebar').classList.toggle('open');
}
document.addEventListener('DOMContentLoaded', () => {
    const yourBtn = document.getElementById('yourTimeBtn');
    const trackBtn = document.getElementById('trackTimeBtn');
    const yourTable = document.getElementById('yourTimeTable');
    const trackTable = document.getElementById('trackTimeTable');

    yourBtn.addEventListener('click', () => {
        yourBtn.classList.add('active');
        trackBtn.classList.remove('active');
        yourTable.style.display = 'block';
        trackTable.style.display = 'none';
    });

    trackBtn.addEventListener('click', () => {
        trackBtn.classList.add('active');
        yourBtn.classList.remove('active');
        yourTable.style.display = 'none';
        trackTable.style.display = 'block';
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const yourBtn = document.getElementById('yourTimeBtn');
    const trackBtn = document.getElementById('trackTimeBtn');
    const yourTable = document.getElementById('yourTimeTable');
    const trackTable = document.getElementById('trackTimeTable');

    yourBtn.addEventListener('click', () => {
        yourBtn.classList.add('active');
        trackBtn.classList.remove('active');
        yourTable.style.display = 'block';
        trackTable.style.display = 'none';
    });

    trackBtn.addEventListener('click', () => {
        trackBtn.classList.add('active');
        yourBtn.classList.remove('active');
        yourTable.style.display = 'none';
        trackTable.style.display = 'block';
    });
});
const targetDate = new Date("2025-06-06T00:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = String(days).padStart(2, '0');
    document.getElementById("hours").textContent = String(hours).padStart(2, '0');
    document.getElementById("minutes").textContent = String(minutes).padStart(2, '0');
    document.getElementById("seconds").textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

const yourBtn = document.getElementById('yourTimeBtn');
const trackBtn = document.getElementById('trackTimeBtn');
const yourTable = document.getElementById('yourTimeTable');
const trackTable = document.getElementById('trackTimeTable');

yourBtn.addEventListener('click', () => {
    yourBtn.classList.add('active');
    trackBtn.classList.remove('active');
    yourTable.style.display = 'block';
    trackTable.style.display = 'none';
});

trackBtn.addEventListener('click', () => {
    trackBtn.classList.add('active');
    yourBtn.classList.remove('active');
    yourTable.style.display = 'none';
    trackTable.style.display = 'block';
});