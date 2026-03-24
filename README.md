# 🎧 ModiBeats-AI  

<p align="center">
  <img src="https://img.shields.io/badge/FullStack-Music%20Player-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Mood-Based-AI-green?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Node.js-Backend-black?style=for-the-badge" />
  <img src="https://img.shields.io/badge/React-Frontend-61dafb?style=for-the-badge" />
</p>

<p align="center">
  <b>🚀 Intelligent Music Player that understands your mood</b>
</p>

---

## 🌟 Features

- 🎯 Mood-Based Song Recommendation  
- ⚡ Real-Time Music Playback  
- 🔐 Authentication System  
- 📂 Playlist Management  
- 🧠 AI Ready Architecture  

---

## 🧠 How It Works

```mermaid
graph TD;
    A[User Mood Input] --> B[Frontend React App]
    B --> C[Backend API]
    C --> D[MongoDB Songs DB]
    D --> C
    C --> E[Filtered Songs]
    E --> F[Audio Player]
```

---

## 🏗️ Tech Stack

| Layer       | Technology |
|------------|-----------|
| Frontend    | React.js, Tailwind CSS |
| Backend     | Node.js, Express.js |
| Database    | MongoDB |
| DevOps      | Docker, GitHub Actions, Nginx |

---

## 📂 Project Structure

```bash
ModiBeats-AI/
├── client/          # React frontend
├── server/          # Node.js backend
├── docker/          # Docker configs
├── .github/         # CI/CD workflows
└── README.md
```

---

## 🔌 API Example

### 🎵 Recommend Songs

```http
POST /api/recommend
```

### Request
```json
{
  "mood": "chill"
}
```

### Response
```json
[
  {
    "title": "Song Name",
    "artist": "Artist",
    "url": "audio-url.mp3"
  }
]
```

---

## ⚙️ Setup Guide

### Clone Repo
```bash
git clone https://github.com/your-username/ModiBeats-AI.git
cd ModiBeats-AI
```

---

### Backend Setup
```bash
cd server
npm install
npm start
```

---

### Frontend Setup
```bash
cd client
npm install
npm run dev
```

---

## 🐳 Docker Setup

```bash
docker-compose up --build
```

---

## 📸 Screenshots

<p align="center">
  <img src="https://via.placeholder.com/800x400.png?text=Music+Player+UI" width="80%" />
</p>

---

## 🚀 Future Enhancements

- 🤖 AI Mood Detection (Face / Voice)
- 📊 Listening Analytics
- ⚡ WebSocket Real-Time Sync
- ☁️ AWS Deployment
- 🧠 ML Recommendation Engine

---

## 🧑‍💻 Author

**Shivaji Jagdale**

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
