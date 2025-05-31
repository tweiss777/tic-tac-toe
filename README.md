# 🕹️ Tic Tac Toe – Multiplayer with Sockets

A real-time multiplayer Tic Tac Toe game built with **React (Vite + TypeScript + SCSS)** on the frontend, and a **Node.js + Express + TypeScript** backend. Communication between clients is handled via **WebSockets**, allowing players to play against each other from different browsers.

## 🧱 Project Structure

```
tic-tac-toe/
├── client/      # React frontend (Vite, TypeScript, SCSS)
└── server/      # Node.js backend (Express, TypeScript, Socket.IO)
```

---

## 🚀 Features

- Real-time gameplay using **Socket.IO**
- Multiplayer support (multiple clients playing together)
- Responsive UI built with SCSS
- Type-safe development using TypeScript (both client and server)

---

## ⚙️ Backend – Setup & Usage

The backend is the core of this app, enabling socket communication between players.

### 🔧 Tech Stack

- **Node.js**
- **Express**
- **TypeScript**
- **Socket.IO**
- **Yarn**

### 📦 Installation

```bash
cd server
yarn install
```

### 🛠️ Development

```bash
yarn dev
```

This runs the server in development mode using `ts-node-dev`.

### 🏗️ Build

```bash
yarn build
```

Compiles the TypeScript code to JavaScript into the `dist/` folder.

### 🚀 Start (Production)

```bash
yarn start
```


### 🔌 WebSocket Events

The server uses Socket.IO to handle all real-time communication:

- `connection` – When a new client connects
- `joinGame` – Client joins a room
- `makeMove` – Client makes a move
- `gameUpdate` – Broadcasts the updated board state
- `gameOver` – Announces game winner or draw
- `disconnect` – Handles player disconnection

> Rooms are used to pair players. Each room hosts a single game between two clients.

---

## 💻 Frontend – Setup & Usage

### 🔧 Tech Stack

- **React**
- **Vite**
- **TypeScript**
- **SCSS**
- **Yarn**

### 📦 Installation

```bash
cd client
yarn install
```

### 🛠️ Development

```bash
yarn dev
```

Runs the frontend locally at `http://localhost:5173/` (default Vite port).

### ⚙️ Environment Variables
 - Make sure to add PORT to server's env variable or it defaults to 3000
 - For the client env ensure that VITE_SOCKET_URL points to the server
> Adjust the port if your server runs on a different one.

---

## 🔄 How It Works

1. **Player 1** opens the game in their browser and joins a game room.
2. **Player 2** opens the game from another browser or device.
3. The backend pairs them in the same room and broadcasts moves in real time.
4. Socket.IO handles the state sync across both players’ browsers.