const weddingDate = new Date('2026-04-26T10:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

    if (distance < 0) {
        document.getElementById('countdown-timer').innerHTML = '<div style="text-align: center; font-size: 1.5rem; color: var(--color-sage); grid-column: 1/-1;">🎉 The Wedding Day is Here! 🎉</div>';
    }
}

updateCountdown();
setInterval(updateCountdown, 1000);

function openMap() {
    alert('Add your venue Google Maps link here!\n\nReplace this function with:\nwindow.open("YOUR_GOOGLE_MAPS_LINK", "_blank");');
}

function showMoreVideos(btn){

document.querySelectorAll(".extra-video").forEach(el=>{
el.style.display="block";
});

btn.innerText = "aab aaiye milkar 27-April-2026 ko banenga videos ❤️";

}

const ADMIN_PASSWORD = 'yadav2026';

function openAdminPanel() {
    document.getElementById('adminModal').style.display = 'flex';
    document.getElementById('passwordSection').style.display = 'block';
    document.getElementById('guestListSection').style.display = 'none';
    document.getElementById('adminPassword').value = '';
    document.getElementById('passwordError').style.display = 'none';
}

function closeAdminPanel() {
    document.getElementById('adminModal').style.display = 'none';
}

function verifyPassword() {
    const password = document.getElementById('adminPassword').value;
    const errorDiv = document.getElementById('passwordError');

    if (password === ADMIN_PASSWORD) {
        document.getElementById('passwordSection').style.display = 'none';
        document.getElementById('guestListSection').style.display = 'block';
        loadGuestList();
    } else {
        errorDiv.textContent = '❌ Incorrect password. Please try again.';
        errorDiv.style.display = 'block';
    }
}

function loadGuestList() {
    const guestList = JSON.parse(localStorage.getItem('weddingGuests') || '[]');

    let totalGuests = 0;
    guestList.forEach(guest => {
        const guestCount = parseInt(guest.guests) || 0;
        totalGuests += guestCount;
    });

    document.getElementById('totalGuestCount').textContent = totalGuests;

    const detailsList = document.getElementById('guestDetailsList');

    if (guestList.length === 0) {
        detailsList.innerHTML = '<div style="text-align: center; padding: 20px; color: var(--color-charcoal); opacity: 0.6;">No guests have RSVP\'d yet.</div>';
    } else {
        detailsList.innerHTML = guestList.map((guest, index) => `
                    <div style="background: var(--color-cream); padding: 15px; border-radius: 10px; margin-bottom: 10px; border-left: 4px solid var(--color-sage);">
                        <div style="font-weight: 600; color: var(--color-charcoal); margin-bottom: 5px;">${index + 1}. ${guest.name}</div>
                        <div style="font-size: 0.9rem; color: var(--color-charcoal); opacity: 0.8;">
                            📧 ${guest.email}<br>
                            📱 ${guest.phone}<br>
                            👥 <strong>${guest.guests}</strong> guests<br>
                            🕐 ${guest.timestamp}
                        </div>
                    </div>
                `).join('');
    }
}

function clearAllGuests() {
    if (confirm('Are you sure you want to clear all guest data? This cannot be undone.')) {
        localStorage.removeItem('weddingGuests');
        loadGuestList();
        alert('All guest data has been cleared.');
    }
}

window.onclick = function (event) {
    const modal = document.getElementById('adminModal');
    if (event.target === modal) {
        closeAdminPanel();
    }
}

document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const title = this.getAttribute('title');
        if (title === 'WhatsApp') {
            window.open('https://wa.me/917321097599', '_blank');
        } else {
            alert(`${title} feature - Connect with us!`);
        }
    });
});