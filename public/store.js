const loadStoreGames = async () => {
    const container = document.getElementById('store-categories');

    try {
        const response = await fetch('/api/games/store');
        if (!response.ok) {
            throw new Error('Kunne ikke hente spil fra serveren');
        }

        const groupedGames = await response.json();
        container.innerHTML = '';

        for (const [genre, games] of Object.entries(groupedGames)) {
            const cardsHtml = games.map(game => `
        <article class="game-card store-card">
          <div class="game-cover" style="background-image: url('${game.thumbnail}');">
            <div class="cover-overlay">
                <div>
                    <button class="btn btn-primary" data-id="${game.id}">Køb</button>
                </div>
                <div>
                    <button class="btn btn-secondary info-button" data-id="${game.id}">Info</button>
                </div>
            </div>
          </div>
          <div class="game-info">
            <div class="game-title">${game.title}</div>
            <div class="store-price">${game.price || 150} credits</div>
          </div>
        </article>
      `).join('');

            container.innerHTML += `
        <section class="store-category">
          <h2 class="category-title">${genre}</h2>
          <div class="store-row">${cardsHtml}</div>
        </section>
      `;
        }
    } catch (error) {
        console.error('Fejl ved indlæsning af store:', error);
        container.innerHTML = '<p>Kunne ikke indlæse spillene lige nu.</p>';
    }

    container.addEventListener('click', (event) => {
        const button = event.target.closest('.info-button');
        if (!button) return;

        window.location.href =
            `/gameInfo.html?id=${encodeURIComponent(button.dataset.id)}`;
    });
}

loadStoreGames();