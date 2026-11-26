const fs = require('fs');

const dampDb = db.getSiblingDB('damp');
const gamesPath = '/docker-entrypoint-initdb.d/games.json';

const games = JSON.parse(fs.readFileSync(gamesPath, 'utf8'));

dampDb.games.createIndex({ id: 1 }, { unique: true });

if (dampDb.games.countDocuments() === 0 && games.length > 0) {
    dampDb.games.insertMany(games);
    print(`Seeded ${games.length} games into damp.games`);
} else {
    print('damp.games already has data, skipping seed');
}
