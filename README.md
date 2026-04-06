# Airbean API

Detta projekt är ett REST API för en kaffebeställnings-app (Airbean). Användare kan se en meny, skapa konto och lägga beställningar. Alla beställningar sparas i en databas och kopplas till en användare.

Projektet är byggt med Node.js, Express och SQLite.

---

## Kom igång

Installera dependencies:

npm install

Starta servern:

npm run dev

Servern körs på:

http://localhost:3000

---

## Tekniker

- Node.js
- Express
- SQLite
- UUID
- Nodemon

---

## Databas

Projektet använder fyra tabeller:

- users (användare)
- products (meny)
- orders (beställningar)
- order_items (produkter i en beställning)

---

## API Endpoints

### Hämta meny

GET /api/menu

---

### Skapa användare

POST /api/users

Body:

```json
{
  "username": "Sebbe"
}
```

---

### Skapa order

POST /api/orders

Body:

```json
{
  "userId": "uuid...",
  "items": [
    { "productId": 1, "quantity": 2 },
    { "productId": 2, "quantity": 1 }
  ]
}
```

---

### Skapa order med kampanj

```json
{
  "userId": "uuid...",
  "items": [{ "productId": 1, "quantity": 2 }],
  "promoCode": "DISCOUNT10"
}
```

Om `DISCOUNT10` används ges 10% rabatt på totalpriset.

---

### Hämta en order

GET /api/orders/:orderId

---

### Hämta orderhistorik

GET /api/orders/user/:userId

---

## Validering

API:et kontrollerar att:

- userId finns
- items är en array
- productId är giltigt
- quantity är minst 1
- produkterna finns i menyn

Vid fel returneras ett felmeddelande.

---

## Hur priset beräknas

Priset räknas alltid i backend baserat på produkterna i databasen. Klienten kan alltså inte påverka priset själv.

---

## Kampanjfunktion

API:et har stöd för en kampanj via `promoCode`.

- DISCOUNT10 → ger 10% rabatt

Rabatten beräknas i backend.

---

## WebSockets

WebSockets har inte implementerats eftersom projektet inte kräver realtidsuppdateringar. Ett REST API räcker för att skapa och hämta data. WebSockets hade kunnat användas för att visa orderstatus i realtid.

---

## Arbetsmetod

Ensam i detta projekt.

---

## Författare

Sebastian Kahlau.
