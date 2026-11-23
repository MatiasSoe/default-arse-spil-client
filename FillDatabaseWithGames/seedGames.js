const mongoose = require('mongoose');

// Erstat med din egen MongoDB connection string (f.eks. fra Atlas eller lokal MongoDB)
const MONGO_URI = 'mongodb://localhost:27017/damp';
const API_URL = 'https://www.freetogame.com/api/games';

// 1. Definer Schema (uden game_url)
const gameSchema = new mongoose.Schema(
    {
        id: { type: Number, required: true, unique: true },
        title: String,
        thumbnail: String,
        short_description: String,
        genre: String,
        platform: String,
        publisher: String,
        developer: String,
        release_date: String,
        freetogame_profile_url: String,
    },
    {
        // Tvinger Mongoose til at bruge præcis 'Games' (med stort G) i stedet for 'games'
        collection: 'games',
    }
);

const Game = mongoose.model('Game', gameSchema);

// 2. Hent data fra API og gem i MongoDB
async function importGames() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Forbundet til MongoDB...');

        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`API-fejl: ${response.status} ${response.statusText}`);
        }

        const games = await response.json();
        console.log(`Hentede ${games.length} spil fra API'et.`);

        // Fjern 'game_url' fra hvert spil og klargør til bulkWrite (undgår dubletter)
        const operations = games.map(({ game_url, ...gameData }) => ({
            updateOne: {
                filter: { id: gameData.id },
                update: { $set: gameData },
                upsert: true, // Opretter spillet hvis det ikke findes, ellers opdaterer det
            },
        }));

        const result = await Game.bulkWrite(operations);
        console.log(
            `Færdig! Oprettet: ${result.upsertedCount}, Opdateret: ${result.modifiedCount}`
        );
    } catch (error) {
        console.error('Der opstod en fejl:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Forbindelse til MongoDB lukket.');
    }
}

importGames();