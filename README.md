# Airbean API

Det här projektet är ett REST API för Airbean, där användare kan se en meny, skapa ett konto och lägga beställningar. Beställningarna sparas i en databas och kopplas till rätt användare via användar-ID.

Projektet är byggt med Node.js, Express och SQLite.

## Hur man startar projektet

Först installerar man dependencies:

```bash
npm install
```

Sedan startar man servern med:

```bash
npm run dev
```

Servern körs på:

```text
http://localhost:3000
```

## Tekniker som använts

- Node.js
- Express
- SQLite
- UUID
- Nodemon

## Databas

Projektet använder fyra tabeller:

- `users`
- `products`
- `orders`
- `order_items`

`users` används för att spara användare.
`products` innehåller menyprodukterna.
`orders` innehåller själva beställningen.
`order_items` innehåller vilka produkter som finns i varje beställning.

## API-endpoints

### Hämta meny

```text
GET /api/menu
```

Exempel på svar:

```json
[
  {
    "id": 1,
    "name": "Bryggkaffe",
    "price": 39
  }
]
```

### Skapa användare

```text
POST /api/users
```

Exempel på body:

```json
{
  "username": "Sebbe"
}
```

Exempel på svar:

```json
{
  "success": true,
  "user": {
    "id": "uuid...",
    "username": "Sebbe",
    "created_at": "..."
  }
}
```

### Skapa order

```text
POST /api/orders
```

Exempel på body:

```json
{
  "userId": "uuid...",
  "items": [
    { "productId": 1, "quantity": 2 },
    { "productId": 2, "quantity": 1 }
  ]
}
```

Exempel på svar:

```json
{
  "success": true,
  "order": {
    "id": 1,
    "userId": "uuid...",
    "totalPrice": 127,
    "status": "received",
    "createdAt": "...",
    "items": [
      { "productId": 1, "quantity": 2, "itemPrice": 39 },
      { "productId": 2, "quantity": 1, "itemPrice": 49 }
    ]
  }
}
```

### Hämta en specifik order

```text
GET /api/orders/:orderId
```

### Hämta orderhistorik för en användare

```text
GET /api/orders/user/:userId
```

## Validering

Projektet innehåller middleware för att kontrollera inkommande data.

Det som kontrolleras är bland annat:

- att `userId` finns med
- att `items` är en array
- att `productId` är giltigt
- att `quantity` är minst 1
- att produkterna faktiskt finns i menyn

Om något är fel returneras ett felmeddelande.

Exempel:

```json
{
  "error": "One or more products do not exist in the menu"
}
```

## Hur priset hanteras

Priset räknas ut i backend och hämtas från databasen. Det betyder att klienten inte själv kan bestämma priset i en order. Det gör att datan blir säkrare och mer korrekt.

## WebSocket-resonemang

Jag har inte implementerat WebSockets i projektet, men det hade kunnat användas för att ge användaren uppdateringar i realtid. Till exempel hade man kunnat visa när ordern tas emot, när den förbereds och när leveransen är på väg. Det hade gett en bättre användarupplevelse eftersom man hade sluppit uppdatera sidan manuellt för att se status.

## Arbetsmetod

Projektet har gjorts som ett grupparbete. Vi har använt Git för versionshantering och delat upp arbetet i olika delar. User stories och tasks har använts för att planera arbetet.

## Författare

Grupprojekt i kursen Frontendutveckling.
