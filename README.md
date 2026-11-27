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
│   ├── views/           # static 404.html
│   └── app.js           # Konfiguration af express app
├── public/              # Simpel HTML/CSS/fetch
├── tests/               
│   └── api/             # Endpoint test
├── package.json         # Project metadata and dependencies
├── README.md            # Project documentation
├── .env                 # Miljøvariabler (ikke i git)
└── server.js            # Start server
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
| GET | `/api/users`| Hent alle brugere | 200 OK|
| GET | `/api/users/:id`| Hent specifik bruger | 200 OK |
| POST | `/api/users`| Opret ny bruger | 201 created |
| PUT | `/api/users/:id`| Tildel data til specifik bruger | 200 OK |
| DELETE | `/api/users/:id`| Slet specifik bruger| 200 OK |
| POST | `/api/account/register` | Opret en ny bruger | 201 created |
| POST | `/api/account/register` | Ugyldigt username| 400 bad request |
| POST | `/api/account/register` | Duplikeret email| 409 conflict |
| POST | `/api/account/register` | Ugyldigt password| 400 bad request |
| POST | `/api/account/login` | Bruger kan logge ind | 200 OK  |
| POST | `/api/account/login` | Ugyldigt email| 401 unauthorized |
| POST | `/api/account/login` | Ugyldigt password| 401 unauthorized |
| GET | `/api/account/me` | Tilgå ens account| 200 OK|
| POST | `/api/account/logout` | Log ud af account| 200 OK|
| GET | `/api/account/me` | Login påkrævet| 401 unauthorized |
| PATCH | `/api/profile/me` | Ændre desciption| 200 OK |
| PATCH | `/api/profile/me` | Description for lang | 400 bad request  |



**OBS:** `PUT` er her bevidst brugt til som admin i postman kan tildele data til specifikke bruger. `PATCH` er her brugt til brugeren selv, når logget ind, kan opdater.

### Eksempel i Postman

**POST** `http://localhost:3000/account/register`

```json
{
  "username": "Bobby",
  "email": "Bobby@test.com",
  "password": "abcd1234"
}
```
Resultat: 201 Created
```json
{
    "message": "Bruger oprettet"
}
```
# Ekstern API

# Login og JWT

Lokalt skal `.env` indeholde en `JWT_SECRET` på mindst 32 tegn. Generér en stærk værdi med:

```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Kopiér værdien ind i `.env` som `JWT_SECRET=...`; del eller commit ikke værdien. Serveren starter ikke, hvis nøglen mangler eller er for kort.

`POST /api/account/register` opretter kun brugeren og logger ikke ind. Klienten kan derefter sende brugeren til login. `POST /api/account/login` sætter en `HttpOnly`, `SameSite=Lax` cookie med en JWT, der udløber efter en time. På localhost over HTTP er `Secure` slået fra; den er slået til i produktion. `GET /api/account/me` kræver en gyldig cookie, og `POST /api/account/logout` sletter den.

Logout fjerner cookien fra browseren, men tilbagekalder ikke en allerede udstedt JWT. Den token kan derfor bruges indtil udløb; løsningen bruger ikke refresh tokens eller server-side sessions.

# Automatiseret test

```mermaid
flowchart TB
    Client["Client (Browser / API)"]

    subgraph Startup["Opstart (server.js)"]
        Start["assertJwtSecretConfigured() + connectDB() -> MongoDB"]
    end

    subgraph Express["Express Middleware (src/app.js)"]
        Global["morgan('dev') -> express.json() -> cookieParser()"]
        Static["express.static('public/static' & 'public')"]
    end

    subgraph Routing["API Routes"]
        R_Acc["/api/account<br/>POST /register, /login, /logout<br/>GET /me"]
        R_Prof["/api/profile<br/>GET /me, PATCH /me<br/>GET /:id"]
        R_Game["/api/games<br/>GET /, /store, /:id"]
        R_User["/api/users<br/>GET /, /:id<br/>PUT /:id, DELETE /:id"]
    end

    subgraph MW["Route Middleware & Validators"]
        Auth["authenticate.js<br/>(tjekker auth_token cookie + JWT)"]
        Joi["Joi Validators<br/>(validateRegister, validateLogin,<br/>validateUpdateDescription, validateUser)"]
        ValId["validateUser.js: validateId<br/>(tjekker Mongo ObjectId)"]
    end

    subgraph Layers["Applikations- og Datalag"]
        Ctrl["Controllers<br/>(account, profile, game, user)"]
        Svc["Services<br/>(forretningslogik, bcrypt, JWT)"]
        Repo["Repositories & Mongoose Models<br/>(userRepository/User, gameRepository/Game)"]
    end

    DB[("MongoDB")]

    subgraph Errors["Fejl- og 404-håndtering"]
        NotFound["notFoundHandler.js<br/>/api/* -> 404 JSON<br/>andet -> 404 page-not-found.html"]
        ErrHandler["errorHandler.js<br/>AppError -> err.status (400/401/404/409/500)<br/>Mongoose 11000 -> 409<br/>ValidationError/CastError -> 400<br/>entity.parse.failed -> 400<br/>Uventet fejl -> 500"]
    end

    Client -->|HTTP Request| Global
    Global -->|"Ugyldig JSON<br/>(entity.parse.failed)"| ErrHandler
    Global --> R_Acc & R_Prof & R_Game & R_User
    Global -->|"Ingen API-rute"| Static
    Static -->|"Fil fundet (200)"| Client
    Static -->|"Ingen fil"| NotFound

    R_Acc & R_Prof & R_Game & R_User --> Auth & Joi & ValId
    Auth & Joi & ValId -->|OK| Ctrl
    R_Game -->|"Ingen MW"| Ctrl
    R_Acc -->|"POST /logout<br/>(uden DB)"| Ctrl

    Auth -.->|"Manglende/ugyldig JWT<br/>Direkte 401 JSON"| Client
    Auth -.->|"Anden fejl -> next(err)"| ErrHandler
    Joi -.->|"Valideringsfejl<br/>Direkte 400 JSON"| Client
    ValId -.->|"Ugyldigt ID<br/>next(AppError 400)"| ErrHandler

    Ctrl --> Svc
    Svc --> Repo
    Repo -->|"Mongoose query/write"| DB

    DB -->|"Dokumenter / resultat"| Repo
    Repo --> Svc
    Svc --> Ctrl
    Ctrl -->|"Succes Response<br/>200 OK | 201 Created | 204 No Content<br/>(+ evt. Set-Cookie/Clear-Cookie auth_token)"| Client

    DB -.->|"DB-/Mongoose-fejl"| Repo
    Repo -.-> Svc
    Svc -.->|"throw AppError / Error"| Ctrl
    Ctrl -.->|"account, profile, game:<br/>next(error)"| ErrHandler
    Ctrl -.->|"userController:<br/>Direkte 404 / 500 JSON"| Client

    NotFound -->|"404 Not Found"| Client
    ErrHandler -->|"400 | 401 | 404 | 409 | 500 JSON"| Client
```

# Issue 17 se bibliotek + spil på user
MongoDB collections
1. games
2. users
3. user_games
* Indsæt dette i user_games collection for at teste i postman /get (http://localhost:3000/api/profile/me/games)
```json
{ 
  "user_id": { "$oid": "6b095e68c42d264eed58f0bd" },
  "game_id": { "$oid": "6b040923d297004478049380" },
  "purchasedAt": { "$date": "2026-11-27T11:45:00.000Z" }
}
```
Tjek selv efter objectID på bruger og spil.
