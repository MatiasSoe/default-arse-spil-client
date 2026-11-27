document.getElementById('logout-button').addEventListener('click', async () => {
    const response = await fetch('/api/account/logout', { method: 'POST' });

    if (!response.ok) {
        throw new Error('Kunne ikke logge ud');
    }

    window.location.href = '/login/';
});