const app = require('./src/app');
const connectDB = require('./src/config/db');
const PORT = process.env.PORT || 3000;

const start = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Serveren kører på http://localhost:${PORT}`);
    });
};


// void start() så der ikke er nogen floating promise warning i console,
// hvis der er en fejl i start() og den ikke fanges
void start().catch((error) => {
    console.error('Serveren kunne ikke starte:', error.message);
    process.exitCode = 1; // Valgfrit - sikre serveren ikke starter, hvis der ikke er forbindelse til databasen
});





