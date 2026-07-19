# 🎬 Remote YouTube Controller

<p align="center">

![Python](https://img.shields.io/badge/Python-3.13-blue?logo=python)
![Flask](https://img.shields.io/badge/Flask-3.1-black?logo=flask)
![Socket.IO](https://img.shields.io/badge/Socket.IO-Real--Time-green)
![Chrome Extension](https://img.shields.io/badge/Chrome-Manifest%20V3-orange?logo=googlechrome)
![Render](https://img.shields.io/badge/Hosted%20on-Render-46E3B7)
![License](https://img.shields.io/badge/License-MIT-blue)

<p>

A **full-stack web application** and **Chrome Extension** that enables **real-time remote control of YouTube playback** from another laptop or mobile device. The project uses **Flask**, **Socket.IO**, and the **Chrome Extension API** to send commands instantly to an active YouTube tab.

---

# 🌐 Live Demo

### 🚀 Frontend

https://youtube-controller-1.onrender.com/

### 🔗 Backend API

https://youtube-controller.onrender.com/

### 💻 GitHub Repository

https://github.com/nitya325/youtube-controller

---

# ⚠️ Important

The live website **requires the included Chrome Extension** to control YouTube.

Without installing the extension, the website will load normally but **cannot send playback commands** to your browser.

The extension source code is included in this repository.

---

# 💡 Inspiration

This project was inspired by a real-life problem.

I often needed to help a family member use YouTube from another room, which meant repeatedly walking to their computer whenever they needed to play, pause, skip videos, adjust the volume, or prevent access to distracting content.

To solve this, I built a remote YouTube controller that allows YouTube to be controlled from another laptop or even a mobile phone through a web interface.

In addition to playback controls, the project also provides **remote content-control features**, allowing YouTube or specific YouTube channels to be blocked or unblocked remotely.

This project demonstrates real-world problem solving using full-stack web development, browser extensions, and real-time communication.

---

# 🎯 Project Goal

The objective of this project is to provide a lightweight remote-control and content-management solution for YouTube while demonstrating modern web development concepts including:

- Full-Stack Development
- Browser Extension Development
- Event-Driven Programming
- Real-Time Communication
- Client-Server Architecture
- Socket.IO
- Flask Backend Development

---

# 🏗 System Architecture

```text
         📱 Mobile / 💻 Laptop
                     │
                     ▼
          Remote Web Interface
             (HTML/CSS/JS)
                     │
           Socket.IO (Realtime)
                     │
                     ▼
              Flask Backend
                     │
                     ▼
          Chrome Extension (MV3)
                     │
                     ▼
         Active YouTube Browser Tab
```

---

# ✨ Features

## 🎮 Remote Playback Control

- ▶️ Play Video
- ⏸ Pause Video
- 🔇 Mute / Unmute
- 🔊 Volume Up / Down
- ⏩ Seek to any timestamp
- 📺 Live playback status updates

---

## 📡 Remote Device Control

- Control YouTube from another laptop
- Control YouTube from a mobile phone
- Real-time communication using Socket.IO
- Instant synchronization

---

## 🛡 Content Control

- 🚫 Block YouTube remotely
- ✅ Unblock YouTube
- 🚫 Block specific YouTube channels
- ✅ Unblock channels
- Lock screen overlay while YouTube is blocked

---

## 🌐 Web Application

- Responsive interface
- Live communication
- Flask backend
- Chrome Extension integration
- Hosted on Render

---

# 🛠 Tech Stack

## Frontend

- HTML5
- CSS3
- JavaScript (ES6)

---

## Backend

- Python 3
- Flask
- Flask-SocketIO
- Flask-CORS
- Gunicorn

---

## Real-Time Communication

- Socket.IO
- Python-SocketIO
- Engine.IO

---

## Database

- SQLite

---

## Browser Extension

- Chrome Extension API
- Manifest V3
- Background Service Worker
- Content Scripts
- Chrome Tabs API
- Chrome Messaging API

---

## Deployment

- Render (Frontend)
- Render (Backend)

---

## Version Control

- Git
- GitHub

---

# 📂 Project Structure

```text
youtube-controller/
│
├── backend/
│   ├── app.py
│   ├── database.py
│   ├── requirements.txt
│   ├── youtube_controller.db
│   └── Procfile
│
├── frontend/
│   ├── index.html
│   ├── script.js
│   └── style.css
│
├── extension/
│   ├── manifest.json
│   ├── background.js
│   └── content.js
│
├── .gitignore
├── LICENSE
└── README.md
```

---

# 🚀 How It Works

1. User opens the Remote Controller web application.

2. Commands are sent to the Flask backend using Socket.IO.

3. The backend broadcasts the command to the Chrome Extension.

4. The extension sends the command to the active YouTube tab.

5. The YouTube page executes the requested action instantly.

---

# 📷 Screenshots

## 🏠 Home Page

> <img width="1042" height="860" alt="image" src="https://github.com/user-attachments/assets/391a2853-251d-49c9-afdf-5513b56ed6a4" />


---

## 🔌 Chrome Extension

> <img width="513" height="272" alt="image" src="https://github.com/user-attachments/assets/d54e87da-1e51-4b1e-b897-ef6f8143d43c" />


---

# 🎥 Demo

<img width="800" height="450" alt="20260703_165958-ezgif com-video-to-gif-converter" src="https://github.com/user-attachments/assets/526295b4-3512-4a68-aea0-32a30e13d507" />

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/nitya325/youtube-controller.git
```

---

## Backend Setup

```bash
cd backend
python -m venv venv
```

### Windows

```bash
venv\Scripts\activate
```

### macOS/Linux

```bash
source venv/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run the backend

```bash
python app.py
```

---

## Frontend

Open

```
frontend/index.html
```

or run using **VS Code Live Server**.

---

## Chrome Extension Setup

1. Open Chrome

2. Navigate to

```
chrome://extensions/
```

3. Enable **Developer Mode**

4. Click

```
Load unpacked
```

5. Select the

```
extension/
```

folder.

6. Open YouTube.

7. Start the backend server.

8. Visit

https://youtube-controller-1.onrender.com/

Your remote controller is now ready.

---

# ⚡ Challenges Faced

During development, several technical challenges were encountered:

- Establishing stable real-time communication between the web application and the Chrome Extension.
- Managing communication across the frontend, backend, and browser extension.
- Synchronizing YouTube playback events in real time.
- Handling multiple YouTube tabs efficiently.
- Deploying a Socket.IO-based Flask application on Render.
- Designing a scalable event-driven architecture.

These challenges helped strengthen my understanding of full-stack development, browser extension APIs, and real-time systems.

---

# 🚀 Future Improvements

- User Authentication
- Multiple User Support
- Browser Support beyond Chrome
- Playlist Management
- Remote Video Search
- Keyboard Shortcuts
- Voice Commands
- Secure HTTPS Authentication
- Activity Logs
- Admin Dashboard

---

# 🤝 Contributing

Contributions are welcome!

1. Fork this repository.
2. Create a new feature branch.

```bash
git checkout -b feature-name
```

3. Commit your changes.

```bash
git commit -m "Add new feature"
```

4. Push your branch.

```bash
git push origin feature-name
```

5. Open a Pull Request.

---

# 📜 License

This project is licensed under the **MIT License**.

---

# 👨‍💻 Author

**Nitya Kushwaha**

GitHub: https://github.com/nitya325

---

## ⭐ Support

If you found this project useful or interesting, consider giving it a **⭐ Star** on GitHub.

It helps others discover the project and motivates future improvements.
