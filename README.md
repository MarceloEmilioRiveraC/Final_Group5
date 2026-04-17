# 👕 Fashion Community Platform

## 📌 Overview

This project is a **Fashion Social Platform** where users can create posts about clothing, interact through comments, and engage with content. Administrators have access to analytics and moderation tools to manage the platform.

The application is built with a strong focus on **Clean Architecture**, ensuring scalability, maintainability, and clear separation of concerns from the beginning.

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
