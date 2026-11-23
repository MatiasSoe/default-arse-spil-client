# Arkitektur og mappestruktur
```
project-root/
├── src/
│   ├── config/          # Håndterer database forbindelse
│   ├── controllers/     # Håndterer server respons baseret på ruten
│   ├── middleware/      # Validering af requests
│   ├── models/          # Data objekter og kald til api
│   ├── repositories/    # Håndterer data fra databasen
│   ├── routes/          # Express routes
│   ├── services/        # Håndterer logik og kald til api
│   ├── utils/           # Kontrollerede fejl
│   ├── validators/      # Validering
│   ├── app.js           # Konfiguration af express app
│   └── server.js        # Start server
├── public/              # Simpel HTML/CSS/fetch
├── tests/               
│   └── api/             # Endpoint test
├── package.json         # Project metadata and dependencies
└── README.md            # Project documentation
```

# STEP 1: Lav Scrum Board/Issues
- Lav et Scrum board i GitHub Project.
- Lav kolonnerne: Product Backlog, Sprint Backlog, In progress, Review, Done.
- Lav et Issue for hver opgave med acceptkriterier.
- Assign Issues til den specificerede bruger.
- Efter assign skal den valgte Issue rykkes til Sprint Backlog.

# REST-endpoints

| Metode | URL | Formål | Succes |
| --- | --- | --- | --- |
| GET | `/api/characters` | Alle karakterer | 200 |
| GET | `/api/characters?name=Doctor` | Søg efter navn | 200 |
| GET | `/api/characters/:id` | En karakter | 200 |
| POST | `/api/characters` | Opret karakter | 201 + Location |
| PUT | `/api/characters/:id` | Opdater felter (delvis opdatering i denne demo) | 200 |
| DELETE | `/api/characters/:id` | Slet karakter | 204 uden body |
| GET | `/api/external/shows` | Søg efter Doctor Who-serier på TVmaze | 200 |

**OBS:** `PUT` er her bevidst implementeret som *delvis opdatering*, selvom `PATCH` normalt ville være mere præcist. Diskutér om I vil omdøbe endpointet til `PATCH`, eller kræve et komplet objekt ved `PUT`.

### Eksempel i Postman

**POST** `http://localhost:3000/api/characters`  
Header: `Content-Type: application/json`

```json
{
  "name": "The Ninth Doctor",
  "actor": "Christopher Eccleston",
  "species": "Time Lord",
  "firstAppearance": 2005,
  "homePlanet": "Gallifrey",
  "description": "Den niende Doctor",
  "isFavorite": false
}
```

Kopiér `id` fra resultatet og prøv:

```http
GET http://localhost:3000/api/characters/<id>
PUT http://localhost:3000/api/characters/<id>
DELETE http://localhost:3000/api/characters/<id>
```

Ved PUT kan du eksempelvis sende `{"isFavorite": true}` som JSON-body.

**Forudsig svaret, før du trykker Send:** Hvad sker der ved ukendt gyldigt ID? Ved `abc` som ID? Ved manglende `name` i POST? Ved `firstAppearance: 100`? Ved et ukendt endpoint?

# Ekstern API

# Automatiseret test




