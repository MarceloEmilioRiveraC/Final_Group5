# 👕 INSPIRER · Fashion Community Platform

## 📌 Overview

This project is a **Fashion Social Platform** where users can create posts about clothing, interact through comments, and engage with content. Administrators have access to analytics and moderation tools to manage the platform.

The application is built with a strong focus on **Clean Architecture**, ensuring scalability, maintainability, and clear separation of concerns from the beginning.

## Screenshots

Real captures of the public home, run locally on October 12, 2026. The desktop viewport is 1600×1000; the mobile viewport is 390×898. These show the existing application UI, not a mockup or an authenticated dashboard.

![INSPIRER public home on desktop](docs/screenshots/inspirer-home-desktop.webp)

<img src="docs/screenshots/inspirer-home-mobile.png" alt="INSPIRER public home in a mobile viewport" width="280">

The original desktop PNG is retained in [docs/screenshots](docs/screenshots). The photographs are the Unsplash assets already referenced by the application.

To view the public home locally:

```sh
cd frontend
npm ci
npm run dev -- --host 127.0.0.1 --port 5181 --strictPort
```

Open `http://127.0.0.1:5181`. Authenticated catalogue, posting and administration flows require the backend and a local MongoDB configured as described below; those flows were not exercised for these screenshots.

The frontend and backend builds passed. The frontend's eight existing Jest suites passed all 54 tests. This pass corrected the frontend TypeScript configuration, a post identifier type mismatch and an unused registration result; it did not change authentication or redesign the app.

---

## 🎯 Core Features

### 👤 Users

* Create and view fashion posts
* Comment on posts
* Like/interact with content

### 🛠️ Admin

* Manage posts (delete/moderate)
* View analytics (engagement, popularity)
* Monitor platform activity

---

## 🧱 Architecture

This project follows **Clean Architecture principles**, separating responsibilities into distinct layers:

```
Presentation → Application → Domain ← Infrastructure
```

### 1. Domain Layer

* Contains **core business logic**
* Independent of frameworks and UI
* Includes:

  * Entities (Post, User, Comment)
  * Repository interfaces

### 2. Application Layer

* Contains **use cases**
* Orchestrates business rules
* Examples:

  * GetPosts
  * CreatePost

### 3. Infrastructure Layer

* Handles **external systems**
* Implements repository interfaces
* Includes:

  * API communication
  * Data persistence (MongoDB via backend)

### 4. Presentation Layer

* React UI (Vite + TypeScript)
* Uses hooks and components
* Communicates only with **application layer**

---

## 📁 Project Structure

```
Final_Group5/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── domain/
│   │   ├── application/
│   │   ├── infrastructure/
│   │   ├── presentation/
│   │   └── shared/
│   │
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   └── services/
│   │
│   ├── tsconfig.json
│   └── package.json
│
├── .gitignore
├── README.md
```

---

## 🔄 Data Flow

1. UI triggers a **hook**
2. Hook calls a **use case**
3. Use case interacts with a **repository interface**
4. Infrastructure provides the **implementation**
5. Data flows back to UI

```
Component → Hook → Use Case → Repository → API/DB
```

---

## 🧩 Key Design Decisions

* **Dependency inversion**: Domain does not depend on infrastructure
* **Repository pattern** for data abstraction
* **Reusable UI components** for consistency
* **Hooks for state management and logic isolation**
* **Mock-first approach** before backend integration

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* TypeScript

### Backend (planned/integration)

* Node.js + Express
* MongoDB

### Other

* Axios (API communication)

---

## 🚀 Getting Started

### 1. Install dependencies

```
npm install
```

### 2. Run development server

```
npm run dev
```

---

## 🧪 Development Approach

* Start with **domain and use cases**
* Use **mock repositories first**
* Integrate backend only after flow is working
* Build UI using **small reusable components**

---

## 📐 Coding Guidelines

* Keep components **small and focused**
* Avoid business logic inside UI
* Use **interfaces for contracts**
* Prefer **composition over duplication**
* Maintain clear separation between layers

---

## 🔮 Future Improvements

* Authentication (user vs admin roles)
* Real backend integration (MongoDB)
* Advanced analytics dashboard
* Image uploads for posts
* Pagination and performance optimization

---

## ⚠️ Important Notes

* The UI layer must not directly access APIs or databases
* All data operations must go through **use cases**
* Repository interfaces define the contract for data access
* Infrastructure can be replaced without affecting core logic

---

## 🧠 Conceptual Summary

This project is structured to ensure:

* Predictable data flow
* Easy testing and extension
* Clear separation between logic and implementation
* Flexibility to swap technologies without breaking core behavior

---

## 📌 Status

🚧 In progress — currently implementing core post flow and UI structure

---
