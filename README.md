# How to Run

You need Node.js and MongoDB installed.

## 1. Install dependencies

```
npm install
npm run install-all
```

## 2. Set up the database

Create a `backend/.env` file with:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=any_secret_key
```

Then seed the database:

```
npm run seed
```

## 3. Run the app

```
npm run dev
```

This starts both the backend (port 5000) and frontend (port 5173). Open http://localhost:5173 in your browser.
