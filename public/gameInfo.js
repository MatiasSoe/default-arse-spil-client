const loadGameInfo = async () => {

    const id = new URLSearchParams(window.location.search).get('id');

    try {
        if (!id) {
            throw new Error('Game ID mangler i URL');
        }

        const response = await fetch(`/api/games/store/${encodeURIComponent(id)}`);
        if (!response.ok) {
            throw new Error('Kunne ikke hente spillet');
        }

        const game = await response.json();

        document.getElementById('game-title').textContent = game.title;
        document.getElementById('game-image').src = game.thumbnail;
        document.getElementById('game-image').alt = game.title;
        document.getElementById('game-description').textContent = game.short_description;
        document.getElementById('game-genre').textContent = game.genre;
        document.getElementById('game-platform').textContent = game.platform;
        document.getElementById('game-publisher').textContent = game.publisher;
        document.getElementById('game-developer').textContent = game.developer;
        document.getElementById('game-release-date').textContent = game.release_date;
        document.getElementById('game-price').textContent = `${game.price || 150} credits`;
    } catch (err) {
        console.error('Fejl ved indlæsning af store:', err);
        alert(err);
    }
}

loadGameInfo();