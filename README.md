# Melodify - Music Streaming Application

## 🎵 Overview
Melodify is a modern music streaming application built with **React** for the frontend and **Node.js** for the backend. It allows users to browse, play, and manage their favorite music seamlessly using the **YouTube Data API v3**.

## ✨ Features
- 🎶 Stream and play music using YouTube Data API v3
- 📂 Fetch and display music content dynamically
- 📜 Create and manage playlists
- 🔍 Search functionality for songs and artists
- ❤️ Like and favorite songs
- 🔄 Interactive and responsive UI
- 🛠️ User authentication pages are built but **authentication is yet to be implemented**

## 🚀 Technologies Used
### **Frontend (React - `music-player` folder)**
- React.js (Vite or CRA)
- React Icons
- React Router
- Redux (if used for state management)

### **Backend (Node.js - `backend` folder)**
- Node.js
- YouTube Data API v3 (for fetching and playing songs)
- MongoDB / PostgreSQL (Database, if applicable)

## 🛠️ Installation & Setup
### **Clone the Repository**
```bash
git clone https://github.com/your-username/melodify.git
cd melodify
```

### **Backend Setup**
```bash
cd backend
npm install
```
Create a `.env` file with your API keys and other secrets:
```env
PORT=5000
YOUTUBE_API_KEY=your_youtube_api_key
```
Start the backend server:
```bash
node server.js
```

### **Frontend Setup**
```bash
cd ../music-player
npm install
```
Start the frontend server:
```bash
npm start
```

## 📌 Usage
1. Run the **backend** (`localhost:5000` by default)
2. Run the **frontend** (`localhost:3000` by default)
3. Search and play songs using YouTube Data API v3!

## 🤝 Contributing
Contributions are welcome! Feel free to fork the repo, make improvements, and create a pull request.

## 📜 License
This project is licensed under the MIT License. Feel free to use and modify it!

---
🎧 **Melodify - Elevate Your Music Experience!** 🎶

